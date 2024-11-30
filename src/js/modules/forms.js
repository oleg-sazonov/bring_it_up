'use strict';

import { postData, handleStatus, initPhoneMask } from "../services/service";

export default class Form {
	constructor(forms) {
		this.forms = document.querySelectorAll(forms);
		this.path = 'assets/question.php';
		this.message = 'Please fill out all the inputs!';
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll('[type="email"]');
	
		mailInputs.forEach(input => {
			input.addEventListener('input', () => {
				input.value = input.value.replace(/[^a-z 0-9 @ \.]/ig, '');
			});
		});
	}

	validateInput(input, form, message) {
        if (input.value.trim() === '' || (input.id === 'phone' && input.value.length < 3)) {
			input.style.border = '1px solid red'; 
			form.parentNode.append(message);
            return false;
        } else {
			input.style.border = ''; 
			message.textContent = '';
            return true;
        }
    };

	init() {
		initPhoneMask();
		this.checkMailInputs();

		this.forms.forEach(form => {

			const inputs = Array.from(form.querySelectorAll('input'));
			let statusMessage = document.createElement('div');
			statusMessage.style.cssText = `
				margin-top: 15px;
				font-size: 18px;
				color: grey;
			`;
        
			form.addEventListener('submit', e => {
				e.preventDefault();

				let allValid = true;

				inputs.forEach(input => {
					if (!this.validateInput(input, form, statusMessage)) {
						allValid = false; 
					}
				});

				// Real-time validation
				inputs.forEach(input => {
					input.addEventListener('input', () => this.validateInput(input, form, statusMessage));
				});

				if (allValid) {
					form.parentNode.append(handleStatus('loading'));

					const formData = new FormData(form);
					postData(this.path, formData)
						.then(res => {
							console.log(res);
							handleStatus('idle');
						})
						.catch(() => {
							handleStatus('error');
						})
						.finally(() => {
							form.reset();
							setTimeout(() => {
								handleStatus().remove();
							}, 6000);
						})
				} else {
					statusMessage.textContent = 'Please fill out all inputs.';
				}
			});
		});
	}
}