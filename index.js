var tcp           = require('../../tcp');
var instance_skel = require('../../instance_skel');
var actions       = require('./actions');
var feedback      = require('./feedback');
var presets       = require('./presets');

var debug;
var log;
var lineEndings;

class instance extends instance_skel {
	/**
	* Create an instance.
	*
	* @param {EventEmitter} system - the brains of the operation
	* @param {string} id - the instance ID
	* @param {Object} config - saved user configuration parameters
	* @since 1.1.0
	*/
	constructor(system, id, config) {
		super(system, id, config);

		Object.assign(this, {...actions,...feedback,...presets});

		this.lineEndings = '\r';
		this.feedbackstate = {
			time: '00:00',
			state: 'STOPPED',
			
		};

		this.actions(); // export actions

	}
	/**
	 * Setup the actions.
	 *
	 * @param {EventEmitter} system - the brains of the operation
	 * @access public
	 * @since 1.1.0
	 */
	actions(system) {
		this.setActions(this.getActions());
	}
	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.1.0
	 */
	config_fields() {

		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls Dsan Limitimer by <a href="http://dsan.com" target="_new">Dsan</a>.'
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				regex: this.REGEX_IP
			},
			{	type: 'textinput',
				id:   'port',
				label:'Target port',
				width: 6
			},
			{
				type: 'text',
				id: 'info',
				width: 6,
				label: 'Feedback',
				value: 'This module has support for getting information about the timer back to companion.'
			}
		]
	}
	/**
	 * Executes the provided action.
	 *
	 * @param {Object} action - the action to be executed
	 * @access public
	 * @since 1.0.0
	 */
	action(action) {
		var id = action.action;
		var cmd;
		var opt = action.options;

		switch (id){

			case 'startStop':
				cmd = '>STOP 66';
				break;

			case 'repeat':
				cmd = '>REPT 5B';
				break;

			case 'clear':
				cmd = '>CLR 01';
				break;

			case 'ttime':
				if (opt.dir == "up") {
					cmd = '>TTUP 6D';
					break;
				};
				if (opt.dir == "down") {
					cmd= '>TTDN 5A';
					break;
				};

			case 'sutime':
				if (opt.dir == "up") {
					cmd = '>STUP 6C';
					break;
				};
				if (opt.dir == "down") {
					cmd= '>STDN 59';
					break;
				};

			case 'beep':
				cmd = '>BEEP 3C';
				break;

			case 'blink':
				cmd = '>BLNK 47';
				break;
			
			case 'seconds':
				cmd = '>SSEC 4E';
				break;

			case 'programs':
				if (opt.pgm == "P1") {
					cmd = '>PRG1 3A';
					break;
				};
				if (opt.pgm == "P2") {
					cmd = '>PRG2 3B';
					break;
				};
				if (opt.pgm == "P3") {
					cmd = '>PRG3 3C';
					break;
				};
				if (opt.pgm == "P4") {
					cmd = '>SESS 5E';
					break;
				};
				


		}

		if (cmd !== undefined) {
			debug('sending ', cmd, "to", this.config.host);
			if (this.currentStatus != this.STATUS_OK) {
				this.init_tcp(() => {
					this.socket.send(cmd + this.lineEndings);
				});
			} else {
				this.socket.send(cmd + this.lineEndings);
				console.log("sending"+ cmd + this.lineEndings + this.config.host + ":" + this.config.port);
			}
		}
	}
	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.1.0
	 */
	destroy() {

		if (this.timer) {
			clearInterval(this.timer);
			delete this.timer;
		}

		if (this.socket !== undefined) {
			this.socket.destroy();
		}
		debug("destroy", this.id);
	}
	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @access public
	 * @since 1.1.0
	 */
	init() {
		debug = this.debug;
		log = this.log;

		this.initPresets();
		this.init_tcp();
		this.initVariables();
		this.initFeedbacks();
	}
	/**
	 * INTERNAL: use setup data to initalize the tcp socket object.
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	init_tcp() {
		if (this.socket !== undefined) {
			this.socket.destroy();
			delete this.socket;
		}

		if (this.config.host) {
			this.socket = new tcp(this.config.host, this.config.port, { reconnect: false });

			this.socket.on('status_change', (status, message) => {
				this.status(status, message);
			});

			this.socket.on('error', (err) => {
				this.debug("Network error", err);
				this.log('error',"Network error: " + err.message);
			});
		
			this.socket.on('connect', () => {
				this.debug("Connected");
				this.feedbackstate = {
					time: '00:00',
					state: 'STOPPED'
					
				};

				
				this.socket.receivebuffer = '';
			});

			// separate buffered stream into lines with responses
			this.socket.on('data', (chunk) => {
				var i = 0, line = '', offset = 0;

				this.socket.receivebuffer += chunk;
				// console.log("incomming" + chunk)

				while ( (i = this.socket.receivebuffer.indexOf('\r', offset)) !== -1) {
					line = this.socket.receivebuffer.substr(offset, i - offset);
					offset = i + 2;
					this.socket.emit('receiveline', line.toString());
				}
				this.socket.receivebuffer = this.socket.receivebuffer.substr(offset);
			});

			this.socket.on('receiveline', (data) => {

				var info = data.toString().split(/[= ]+/);
				if (info[0].substr(0,1) === '>') {
					info[0] = info[0].substr(1,info[0].length);
				}
				console.log('INFO ',info)
				if (info.length == 3) {
					
					if (info[0] == 'RTSTR') {
						this.feedbackstate.time = info[1];
						this.updateTime();
						this.updateState();
					}
				}
				if (info.length == 2) {

					if (info[0] == 'GRNLEDON') {
						this.feedbackstate.state = 'Running';
						this.updateState();
						this.checkFeedbacks('state_color');
					}

					if (info[0] == 'YELLEDON') {
						this.feedbackstate.state = 'Sum-up';
						this.updateState();
						this.checkFeedbacks('state_color');
					}

					if (info[0] == 'REDLEDON') {
						this.feedbackstate.state = 'Overtime';
						this.updateState();
						this.checkFeedbacks('state_color');
					}
						
					if (info[0] == 'REDLEDOF' && 'YELLEDOF' && 'GRNLEDOF'){
						this.feedbackstate.state = 'Stopped';
						this.updateState();
						this.checkFeedbacks('state_color');
					}

					if (info[0] == 'P1LEDON') {
						this.feedbackstate.P1 = 'On';
						this.updateP1();
						this.checkFeedbacks('P1');
					}

					if (info[0] == 'P1LEDOF') {
						this.feedbackstate.P1 = 'Off';
						this.updateP1();
						this.checkFeedbacks('P1');					
					}

					if (info[0] == 'P2LEDON') {
						this.feedbackstate.P2 = 'On';
						this.updateP2();
						this.checkFeedbacks('P2');
					}

					if (info[0] == 'P2LEDOF') {
						this.feedbackstate.P2 = 'Off';
						this.updateP2();
						this.checkFeedbacks('P2');					
					}

					if (info[0] == 'P3LEDON') {
						this.feedbackstate.P3 = 'On';
						this.updateP3();
						this.checkFeedbacks('P3');
					}

					if (info[0] == 'P3LEDOF') {
						this.feedbackstate.P3 = 'Off';
						this.updateP3();
						this.checkFeedbacks('P3');					
					}

					if (info[0] == 'SESLEDON') {
						this.feedbackstate.Session = 'On';
						this.updateSession();
						this.checkFeedbacks('Session');
					}

					if (info[0] == 'SESLEDOF') {
						this.feedbackstate.Session = 'Off';
						this.updateSession();
						this.checkFeedbacks('Session');					
					}

					if (info[0] == 'BPLEDON') {
						this.feedbackstate.Beep = 'On';
						this.updateBeep();
						this.checkFeedbacks('Beep');
					}

					if (info[0] == 'BPLEDOF') {
						this.feedbackstate.Beep = 'Off';
						this.updateBeep();
						this.checkFeedbacks('Beep');					
					}

					if (info[0] == 'BKLEDON') {
						this.feedbackstate.Blink = 'On';
						this.updateBlink();
						this.checkFeedbacks('Blink');
					}

					if (info[0] == 'BKLEDOF') {

						this.feedbackstate.Blink = 'Off';
						this.updateBlink();
						this.checkFeedbacks('Blink');					
					}

					if (info[0] == 'SMON') {

						this.feedbackstate.Seconds = 'On';
						this.updateSeconds();
						this.checkFeedbacks('Seconds');					
					}

					if (info[0] == 'SMOF') {

						this.feedbackstate.Seconds = 'Off';
						this.updateSeconds();
						this.checkFeedbacks('Seconds');					
					}

					
					
				}
				
			});

			this.socket.on('end', () => {
				debug('Disconnected, ok');
				this.socket.destroy();
				delete this.socket;
			});
		}
	}
	
	/**
	 * INTERNAL: initialize feedbacks.
	 *
	 * @access protected
	 * @since 1.1.0
	 */
	
	
	 initFeedbacks() {
		// feedbacks
		var feedbacks = this.getFeedbacks();

		this.setFeedbackDefinitions(feedbacks);
	}
	
	/**
	 * INTERNAL: initialize presets.
	 *
	 * @access protected
	 * @since 1.1.0
	 */
	initPresets (updates) {
		var presets = this.getPresets(updates);

		this.setPresetDefinitions(presets);
	}
	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.1.0
	 */
	updateConfig (config) {
		var resetConnection = false;

		if (this.config.host != config.host)
		{
			resetConnection = true;
		}

		this.config = config;
		this.initPresets();
		this.initVariables();
		this.initFeedbacks();
		if (resetConnection === true || this.socket === undefined) {
			this.init_tcp();
		}
	}
	/**
	 * INTERNAL: initialize variables.
	 *
	 * @access protected
	 * @since 1.1.0
	 */
	initVariables() {

		var variables = [
			{
				label: 'State of timer (Running, Sum-up, Overtime, Stopped)',
				name: 'state'
			},
			{
				label: 'P1 (on,off)',
				name: 'P1'
			},
			{
				label: 'P2 (on,off)',
				name: 'P2'
			},
			{
				label: 'P3 (on,off)',
				name: 'P3'
			},
			{
				label: 'Session (on,off)',
				name: 'Session'
			},
			{
				label: 'Beep (on,off)',
				name: 'Beep'
			},
			{
				label: 'Blink (on,off)',
				name: 'Blink'
			},
			{
				label: 'Seconds (on,off)',
				name: 'Seconds'
			},
			{
				label: 'Current time of timer (mm:ss)',
				name: 'time'
			},
			{
				label: 'Current time of timer (minutes)',
				name: 'time_m'
			},
			{
				label: 'Current time of timer (seconds)',
				name: 'time_s'
			},
		];

		this.updateTime();
		this.setVariableDefinitions(variables);
	}

	

	updateTime() {
		var info = this.feedbackstate.time.split(':');
		this.setVariable('time', this.feedbackstate.time);
		this.setVariable('time_hm', info[0] + ':' + info[1]);
		this.setVariable('time_m', info[0]);
		this.setVariable('time_s', info[1]);

	}

	updateState() {	
		this.setVariable('state', this.feedbackstate.state);
	}

	updateP1() {	
		this.setVariable('P1', this.feedbackstate.P1);
	}

	updateP2() {	
		this.setVariable('P2', this.feedbackstate.P2);
	}

	updateP3() {	
		this.setVariable('P3', this.feedbackstate.P3);
	}

	updateSession() {	
		this.setVariable('Session', this.feedbackstate.Session);
	}

	updateBeep() {	
		this.setVariable('Beep', this.feedbackstate.Beep);
	}

	updateBlink() {	
		this.setVariable('Blink', this.feedbackstate.Blink);
	}

	updateSeconds() {	
		this.setVariable('Seconds', this.feedbackstate.Seconds);
	}




}

exports = module.exports = instance;
