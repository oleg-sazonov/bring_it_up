'use sctrict';

import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor(btns) {
		super(btns);
		this.slides = [...this.container.children];
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		try {
			this.hanson.style.opacity = 0;

			if (n === 3) {
				this.hanson.classList.add('animate__animated');
				setTimeout(() => {
					this.hanson.style.opacity = 1;
					this.hanson.classList.add('animate__fadeInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('animate__fadeInUp');
			}
		} catch(e){}

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
		try {
			this.hanson = document.querySelector('.hanson');
		} catch(e) {}
		
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