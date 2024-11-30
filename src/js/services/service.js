'use strict';

const message = {
	loading: 'Loading...',
	success: `Thanks! We'll contact with you soon!`,
	failure: `Something went wrong...`,
	spinner: 'assets/img/spinner.gif',
	ok: 'assets/img/ok.png',
	fail: 'assets/img/fail.png'
};

let statusMessage = document.createElement('div'),
	statusImg = document.createElement('img'),
	textMessage = document.createElement('div');

// statusMessage.classList.add('status');
statusMessage.style.cssText = `
	margin-top: 15px;
	font-size: 18px;
	color: grey;
`;
statusImg.classList.add('animate__animated', 'animate__fadeIn');

const handleStatus = (status = 'loading', selector = statusMessage, img = statusImg, msg = textMessage) => {

	switch (status) {
		case 'loading':
			img.setAttribute('src', message.spinner);
			msg.textContent = message.loading;
			break;
		case 'idle': 
			img.setAttribute('src', message.ok);
			msg.textContent = message.success;
			break;
		case 'error':
			img.setAttribute('src', message.fail);
			msg.textContent = message.failure;
			break;
	}

	selector.append(img);
	selector.append(msg);

	return selector;
};

const postData = async (url, data) => {
	let res = await fetch(url, {
		method: 'POST',
		body: data
	});

	return await res.text();
};

const getResource = async (url) => {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch${url}, status: ${res.status}`);
	} 

	return await res.json();
};

const initPhoneMask = () => {
	let setCursorPosition = (position, element) => {
		element.focus();

		if (element.setSelectionRange) {
			element.setSelectionRange(position, position);
		} else if (element.createTextRange) {
			let range = element.createTextRange();

			range.collapse(true);
			range.moveEnd('character', position); 
			range.moveStart('character', position); 
			range.select();
		}
	};

	function createMask(event) {
		let matrix = '+1 (___) ___-____',
			i = 0,
			def = matrix.replace(/\D/g, ''),
			val = this.value.replace(/\D/g, '');

		if (def.length >= val.length) {
			val = def;
		}

		this.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});

		if (event.type === 'blur') {
			if (this.value.length == 3) {
				this.value = '';
			}
		} else {
			setCursorPosition(this.value.length, this); 
		}
	}

	let inputs = document.querySelectorAll('[name="phone"]');

	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('keypress', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
	});
}

export {postData, getResource, handleStatus, initPhoneMask};