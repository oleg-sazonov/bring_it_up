'use strict';

import MainSlider from "./modules/sliders/slider-main";
import MiniSlider from "./modules/sliders/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/forms";
import ShowInfo from "./modules/showInfo";
import Download from "./modules/download";

window.addEventListener('DOMContentLoaded', () => {
	const mainSlider = new MainSlider({container: '.page', btns: '.next'});
	mainSlider.render();

	const modulePageSlider = new MainSlider({
		container: '.moduleapp', 
		btns: '.next',
		prevModule: '.prevmodule',
		nextModule: '.nextmodule'	
	});
	modulePageSlider.render();

	const showUpSlider = new MiniSlider({
		container: '.showup__content-slider',
		next: '.showup__next',
		prev: '.showup__prev',
		activeClass: 'card-active',
		animate: true
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		container: '.modules__content-slider',
		next: '.modules__info-btns .slick-next',
		prev: '.modules__info-btns .slick-prev',
		activeClass: 'card-active',
		animate: true,
		autoplay: true
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		container: '.feed__slider',
		next: '.feed__slider .slick-next',
		prev: '.feed__slider .slick-prev',
		activeClass: 'feed__item-active'
	});
	feedSlider.init();

	new VideoPlayer('.showup .play', '.overlay').init();
	new VideoPlayer('.module__video-item .play','.overlay').init();
	new Difference('.officerold', '.officernew', '.officer__card-item').init();
	new Form('.form').init();
	new ShowInfo('.plus__content').init();
	new Download('.download').init();
});