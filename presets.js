module.exports = {

		/**
		* Get the available presets.
		*
		* @returns {Object[]} the available feedbacks
		* @access public
		* @since 1.1.0
		*/

		getPresets(updates) {
			var presets = [];

			presets.push({
				category: 'Timer control',
				label: 'Start / Stop',
				bank: {
					style: 'text',
					text: '$(label:state)\\n$(label:time)',
					size: '14',
					color: '16777215',
					bgcolor: this.rgb(0, 255, 0),
				},
				actions: [
					{
						action: 'startStop',
					},
				],
				feedbacks: [
					{
						type: 'state_color',
						options: {
							run_bg: this.rgb(0,255,0),
							run_fg: this.rgb(255,255,255),
							Sumup_bg: this.rgb(255,255,0),
							Sumup_fg: this.rgb(0,0,0),
							Overtime_bg: this.rgb(255,0,0),
							Overtime_fg: this.rgb(255,255,255),
							Stopped_bg: this.rgb(0,0,0),
							Stopped_fg: this.rgb(255,255,255)							
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Repeat',
				bank: {
					style: 'text',
					text: 'Repeat',
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,255)
				},
				actions: [
					{
						action: 'repeat',
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Total Time Up',
				bank: {
					style: 'text',
					text: 'Total\\nTime Up',
					size: '14',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,255)
				},
				actions: [
					{
						action: 'ttime',
						options: {
							dir: 'up',
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Total Time down',
				bank: {
					style: 'text',
					text: 'Total\\nTime down',
					size: '14',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,255)
				},
				actions: [
					{
						action: 'ttime',
						options: {
							dir: 'down',
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Sum-up Time Up',
				bank: {
					style: 'text',
					text: 'Sum-up\\nTime Up',
					size: '14',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,255)
				},
				actions: [
					{
						action: 'sutime',
						options: {
							dir: 'up',
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Sum-up Time down',
				bank: {
					style: 'text',
					text: 'Sum-up\\nTime down',
					size: '14',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,255)
				},
				actions: [
					{
						action: 'sutime',
						options: {
							dir: 'down',
						}
					}
				]
			});
			presets.push({
				category: 'Timer control',
				label: 'Blink',
				bank: {
					style: 'text',
					text: 'Blink',
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'blink',
					}
				],
				feedbacks: [
					{
						type: 'Blink',
						options: {
							Blink_on_bg: this.rgb(255,0,0),
							Blink_on_fg: this.rgb(255,255,255),
							Blink_off_bg: this.rgb(0,0,0),
							Blink_off_fg: this.rgb(255,255,255),
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Beep',
				bank: {
					style: 'text',
					text: 'Beep',
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'beep',
					}
				],
				feedbacks: [
					{
						type: 'Beep',
						options: {
							Beep_on_bg: this.rgb(255,0,0),
							Beep_on_fg: this.rgb(255,255,255),
							Beep_off_bg: this.rgb(0,0,0),
							Beep_off_fg: this.rgb(255,255,255),
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Clear',
				bank: {
					style: 'text',
					text: 'Clear',
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(255,0,0)
				},
				actions: [
					{
						action: 'clear',
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Seconds',
				bank: {
					style: 'text',
					text: 'Seconds',
					size: '14',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,255)
				},
				actions: [
					{
						action: 'seconds',
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Program 1',
				bank: {
					style: 'text',
					text: 'PGM 1',
					size: '18',
					color: '16777215',
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'programs',
						options: {
							pgm: 'P1',
						}
					}
				],
				feedbacks: [
					{
						type: 'P1',
						options: {
							P1_on_bg: this.rgb(255,0,0),
							P1_on_fg: this.rgb(255,255,255),
							P1_off_bg: this.rgb(0,0,0),
							P1_off_fg: this.rgb(255,255,255),
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Program 2',
				bank: {
					style: 'text',
					text: 'PGM 2',
					size: '18',
					color: '16777215',
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'programs',
						options: {
							pgm: 'P2',
						}
					}
				],
				feedbacks: [
					{
						type: 'P2',
						options: {
							P2_on_bg: this.rgb(255,0,0),
							P2_on_fg: this.rgb(255,255,255),
							P2_off_bg: this.rgb(0,0,0),
							P2_off_fg: this.rgb(255,255,255),
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Program 3',
				bank: {
					style: 'text',
					text: 'PGM 3',
					size: '18',
					color: '16777215',
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'programs',
						options: {
							pgm: 'P3',
						}
					}
				],
				feedbacks: [
					{
						type: 'P3',
						options: {
							P3_on_bg: this.rgb(255,0,0),
							P3_on_fg: this.rgb(255,255,255),
							P3_off_bg: this.rgb(0,0,0),
							P3_off_fg: this.rgb(255,255,255),
						}
					}
				]
			});

			presets.push({
				category: 'Timer control',
				label: 'Session',
				bank: {
					style: 'text',
					text: 'Session',
					size: '18',
					color: '16777215',
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'programs',
						options: {
							pgm: 'P4',
						}
					}
				],
				feedbacks: [
					{
						type: 'Session',
						options: {
							Session_on_bg: this.rgb(255,0,0),
							Session_on_fg: this.rgb(255,255,255),
							Session_off_bg: this.rgb(0,0,0),
							Session_off_fg: this.rgb(255,255,255),
						}
					}
				]
			});
			
		

			return presets;
		}
};
