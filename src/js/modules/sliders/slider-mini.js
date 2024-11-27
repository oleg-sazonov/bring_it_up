'use strict';

import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(container, next, prev, activeClass, animate, autoplay) {
		super(container, next, prev, activeClass, animate, autoplay);
	}

	decorizeSlides() {
		[...this.slides].forEach(slide => {
			slide.classList.remove(this.activeClass);

			if (this.animate) {
				slide.querySelector('.card__title').style.opacity = '0.4';
				slide.querySelector('.card__controls-arrow').style.opacity = '0';
	
			}
		});

		this.slides[0].classList.add(this.activeClass);
		if (this.animate) {
			this.slides[0].querySelector('.card__title').style.opacity = '1';
			this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
		}
	}

	nextSlide() {
		for (let i = 1; i < this.slides.length; i++) {
			if (this.slides[i].tagName !== 'BUTTON') {
				this.container.appendChild(this.slides[0]);
				this.decorizeSlides();
				break;
			} else {
				this.container.appendChild(this.slides[i]);
				i--;
			}
		}
	}

	prevSlide() {
		for (let i = this.slides.length - 1; i > 0; i--) {
			if (this.slides[i].tagName !== 'BUTTON') {
				let active = this.slides[this.slides.length - 1];

				if (active.tagName === 'BUTTON') {
					active = this.slides[this.slides.length - 2];
				}
				if (active.tagName === 'BUTTON') {
					active = this.slides[this.slides.length - 3];
				}

				this.container.insertBefore(active, this.slides[0]);
				this.decorizeSlides();
				break;
			} 
		}
	}

	bindTriggers() {

		// Listener get first elem(child) in container and put them in the end of container
		this.next.addEventListener('click', () => {
			this.nextSlide();
		});

		// Listener get last elem(child) in container and put them before the first one elem(child)
		this.prev.addEventListener('click', () => {
			this.prevSlide(); 
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
		// First call to get styles for the first element
		this.decorizeSlides();
	}
}