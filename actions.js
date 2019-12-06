module.exports = {

	/**
	* Get the available actions.
	*
	* @returns {Object[]} the available actions
	* @access public
	* @since 1.1.0
	*/

	getActions() {
		var actions = {};
		actions['startStop'] = { label: 'Start/Stops timer with current duration'},
		actions['repeat'] = { label: 'Repeat timer'},
		actions['ttime'] = {
			label: 'Time Up/Down',
			options: [{
				type: 'dropdown',
				label: 'Total Time Up/Down',
				id: 'dir',
				choices: [
					{ id: 'up', label: 'Time Up'},
					{ id: 'down', label: 'Time Down'},
				]
			}]
		},
		actions['sutime'] = {
			label: 'Sum-up Time Up/Down',
			options: [{
				type: 'dropdown',
				label: 'Sum-up Time Up/Down',
				id: 'dir',
				choices: [
					{ id: 'up', label: 'Sum-up Time Up'},
					{ id: 'down', label: 'Sum-up Time Down'},
				]
			}]
		},
		actions['seconds'] = { label: 'Set seconds'},
		actions['beep'] = { label: 'Beep on/off'},
		actions['blink'] = { label: 'Blink on/off'},
		actions['clear'] = { label: 'Clear timer'},
		actions['programs'] = {
			label: 'Select Program',
			options: [{
					type: 'dropdown',
					label: 'Programs',
					id: 'pgm',
					choices: [
						{ id: 'P1', label: 'Program 1'},
						{ id: 'P2', label: 'Program 2'},
						{ id: 'P3', label: 'Program 3'},
						{ id: 'P4', label: 'Program 4'}
					]
			}]
		}
		return actions;
	}
}
