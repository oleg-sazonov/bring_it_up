'use strict';

export default class ShowInfo {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers);
	}

	init() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const sibling = btn.closest('.module__info-show').nextElementSibling;

				sibling.classList.toggle('msg');
				sibling.classList.add('animate__animated', 'animate__fadeIn');
				sibling.style.marginTop = '20px';
			});
		});
	}
}