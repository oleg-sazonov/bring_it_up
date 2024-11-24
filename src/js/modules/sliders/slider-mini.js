'use strict';

import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(container, next, prev, activeClass, animate, autoplay) {
		super(container, next, prev, activeClass, animate, autoplay);
	}

	decorizeSlides() {
		for (let i = 0; i < this.slides.length; i++) {
			if (this.slides[i].tagName === 'BUTTON') {
				continue;
			}
			this.slides[i].classList.remove(this.activeClass);

			if (this.animate) {
				this.slides[i].querySelector('.card__title').style.opacity = '0.4';
				this.slides[i].querySelector('.card__controls-arrow').style.opacity = '0';
	
			}
		}

		if (this.slides[0].tagName !== 'BUTTON') {
			this.slides[0].classList.add(this.activeClass);
			if (this.animate) {
				this.slides[0].querySelector('.card__title').style.opacity = '1';
				this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
			}
		}



		// [...this.slides].forEach(slide => {
		// 	if (slide.tagName !== 'BUTTON') {
		// 		slide.classList.remove(this.activeClass);

		// 		if (this.animate) {
		// 			slide.querySelector('.card__title').style.opacity = '0.4';
		// 			slide.querySelector('.card__controls-arrow').style.opacity = '0';
		
		// 		}
		// 	}
		// });

		// if (this.slides[0].tagName !== 'BUTTON') {
		// 	this.slides[0].classList.add(this.activeClass);
		// 	if (this.animate) {
		// 		this.slides[0].querySelector('.card__title').style.opacity = '1';
		// 		this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
	
		// 	}
		// }
	}

	bindTriggers() {
		// Listener get first elem(child) in container and put them in the end of container
		this.next.addEventListener('click', () => {
			this.container.appendChild(this.slides[0]);
			this.decorizeSlides();
		});

		// Listener get last elem(child) in container and put them before the first one elem(child)
		this.prev.addEventListener('click', () => {
			let active = this.slides[this.slides.length - 1];
			this.container.insertBefore(active, this.slides[0]);
			this.decorizeSlides();
		});
	}

	init() {
		this.container.style.cssText = `
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			align-items: flex-start;
		`;

		this.bindTriggers();
		this.decorizeSlides();
	}
}