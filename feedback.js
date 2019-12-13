module.exports = {

		/**
		* Get the available feedbacks.
		*
		* @returns {Object[]} the available feedbacks
		* @access public
		* @since 1.1.0
		*/

		getFeedbacks() {
			var feedbacks = {}

			feedbacks['state_color'] = {
				label: 'Change color from state',
				description: 'Change the colors of a bank according to the timer state',
				options: [
					{
						type: 'colorpicker',
						label: 'Running: Foreground color',
						id: 'run_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Running: Background color',
						id: 'run_bg',
						default: this.rgb(0,255,0)
					},
					{
						type: 'colorpicker',
						label: 'Sum-up: Foreground color',
						id: 'Sumup_fg',
						default: this.rgb(0,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Sum-up: Background color',
						id: 'Sumup_bg',
						default: this.rgb(255,255,0)
					},
					{
						type: 'colorpicker',
						label: 'Overtime: Foreground color',
						id: 'Overtime_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Overtime: Background color',
						id: 'Overtime_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Stopped: Foreground color',
						id: 'Stopped_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Stopped: Background color',
						id: 'Stopped_bg',
						default: this.rgb(0,0,0)
					}

				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.state == 'Running') {
						return {
							color: feedback.options.run_fg,
							bgcolor: feedback.options.run_bg
						};
					}
					if (this.feedbackstate.state == 'Sum-up') {
						return {
							color: feedback.options.Sumup_fg,
							bgcolor: feedback.options.Sumup_bg
						}
					}
					if (this.feedbackstate.state == 'Overtime') {
						return {
							color: feedback.options.Overtime_fg,
							bgcolor: feedback.options.Overtime_bg
						}
					}
					if (this.feedbackstate.state == 'Stopped') {
						return {
							color: feedback.options.Stopped_fg,
							bgcolor: feedback.options.Stopped_bg
						}
					}
				}
			},
			feedbacks['P1'] = {
				label: 'Change color when P1 is active',
				description: 'Change the colors of a bank according P1 is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'P1_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'P1_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'P1_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'P1_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.P1 == 'On') {
						return {
							color: feedback.options.P1_on_fg,
							bgcolor: feedback.options.P1_on_bg
						};
					}
					else if (this.feedbackstate.P1 == 'Off') {
						return {
							color: feedback.options.P1_off_fg,
							bgcolor: feedback.options.P1_off_bg
						}
					}
				}
				
			},
			feedbacks['P2'] = {
				label: 'Change color when P2 is active',
				description: 'Change the colors of a bank according P2 is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'P2_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'P2_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'P2_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'P2_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.P2 == 'On') {
						return {
							color: feedback.options.P2_on_fg,
							bgcolor: feedback.options.P2_on_bg
						};
					}
					else if (this.feedbackstate.P2 == 'Off') {
						return {
							color: feedback.options.P2_off_fg,
							bgcolor: feedback.options.P2_off_bg
						}
					}
				}
				
			},
			feedbacks['P3'] = {
				label: 'Change color when P3 is active',
				description: 'Change the colors of a bank according P3 is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'P3_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'P3_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'P3_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'P3_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.P3 == 'On') {
						return {
							color: feedback.options.P3_on_fg,
							bgcolor: feedback.options.P3_on_bg
						};
					}
					else if (this.feedbackstate.P3 == 'Off') {
						return {
							color: feedback.options.P3_off_fg,
							bgcolor: feedback.options.P3_off_bg
						}
					}
				}
				
			},
			feedbacks['Session'] = {
				label: 'Change color when Session is active',
				description: 'Change the colors of a bank according Session is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Session_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Session_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Session_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Session_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.Session == 'On') {
						return {
							color: feedback.options.Session_on_fg,
							bgcolor: feedback.options.Session_on_bg
						};
					}
					else if (this.feedbackstate.Session == 'Off') {
						return {
							color: feedback.options.Session_off_fg,
							bgcolor: feedback.options.Session_off_bg
						}
					}
				}
				
			},
			feedbacks['Seconds'] = {
				label: 'Change color when Seconds is active',
				description: 'Change the colors of a bank according Seconds is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Seconds_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Seconds_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Seconds_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'SSeconds_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.Seconds == 'On') {
						return {
							color: feedback.options.Seconds_on_fg,
							bgcolor: feedback.options.Seconds_on_bg
						};
					}
					else if (this.feedbackstate.Seconds == 'Off') {
						return {
							color: feedback.options.Seconds_off_fg,
							bgcolor: feedback.options.Seconds_off_bg
						}
					}
				}
				
			},
			feedbacks['Beep'] = {
				label: 'Change color when Beep is active',
				description: 'Change the colors of a bank according P1 is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Beep_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Beep_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Beep_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Beep_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.Beep == 'On') {
						return {
							color: feedback.options.Beep_on_fg,
							bgcolor: feedback.options.Beep_on_bg
						};
					}
					else if (this.feedbackstate.Beep == 'Off') {
						return {
							color: feedback.options.Beep_off_fg,
							bgcolor: feedback.options.Beep_off_bg
						}
					}
				}
				
			},
			feedbacks['Blink'] = {
				label: 'Change color when Blink is active',
				description: 'Change the colors of a bank according Blink is active',
				options: [
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Blink_on_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Blink_on_bg',
						default: this.rgb(255,0,0)
					},
					{
						type: 'colorpicker',
						label: 'Foreground color',
						id: 'Blink_off_fg',
						default: this.rgb(255,255,255)
					},
					{
						type: 'colorpicker',
						label: 'Background color',
						id: 'Blink_off_bg',
						default: this.rgb(0,0,0)
					}
				],
				callback: (feedback, bank) => {
					if (this.feedbackstate.Blink == 'On') {
						return {
							color: feedback.options.Blink_on_fg,
							bgcolor: feedback.options.Blink_on_bg
						};
					}
					else if (this.feedbackstate.Blink == 'Off') {
						return {
							color: feedback.options.Blink_off_fg,
							bgcolor: feedback.options.Blink_off_bg
						}
					}
				}
				
			}

			return feedbacks;
		}
}
