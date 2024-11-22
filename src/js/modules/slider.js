'use strict';

export default class Slider {
	constructor(page, btns){
		this.page = document.querySelector(page);
		this.slides = [...this.page.children];
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 1;
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		this.slides.forEach(slide => {
			slide.classList.add('animate__animated', 'animate__fadeIn');
			slide.style.setProperty('--animate-duration', '0.2s');
			slide.style.display = 'none';
		});

		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	render() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.plusSlides(1);
			});

			btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		this.showSlides(this.slideIndex);
	}
}