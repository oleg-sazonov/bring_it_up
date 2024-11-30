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

	init() {
		initPhoneMask();
		this.checkMailInputs();
		this.forms.forEach(form => {
			// const submitButton = form.querySelector('button[type="submit"]');

			// if (form.querySelector('status')) {
			// 	form.parentNode.remove(form.querySelector('status'));
			// }

			// let statusMessage = document.createElement('div');
			// statusMessage.classList.add('status');
			// statusMessage.style.cssText = `
			// margin-top: 15px;
			// font-size: 18px;
			// color: grey;
			// `;
        
			// form.addEventListener('input', () => {
			// 	const inputs = Array.from(form.querySelectorAll('input'));
			// 	const allFilled = inputs.every(input => input.value.trim() !== '');
	
			// 	submitButton.disabled = !allFilled;
			// });

			form.addEventListener('submit', e => {
				e.preventDefault();

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
			});
		});
	}
}