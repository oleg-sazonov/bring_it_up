'use strict';

export default class VideoPlayer {
	constructor(triggers, overlay){
		this.buttons = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.close');
	}

	bindTriggers() {
		this.buttons.forEach(btn => {
			btn.addEventListener('click', () => {
				if (document.querySelector('iframe#frame')) {
					this.overlay.style.display = 'flex';
					if (this.path !== btn.getAttribute('data-url')) {
						this.path = btn.getAttribute('data-url');
						this.player.loadVideoById({videoId: this.path});
					}
				} else {
					this.path = btn.getAttribute('data-url');
				
					this.createPlayer(this.path);
					this.overlay.classList.remove('animate__fadeOut');
					this.overlay.classList.add('animate__fadeIn');
				}
			});
		});
	}

	bindCloseTriggers() {
		[this.close, this.overlay].forEach(trigger => {
			trigger.addEventListener('click', e => {
				if (e.target === this.overlay || this.close) {
					this.overlay.style.display = 'none';
					this.player.stopVideo();
				}
			});
		});

		// window.addEventListener('keydown', (e) => {
		// 	if (e.key === 'Escape' || e.code === 'Escape') {
		// 		e.stopImmediatePropagation();
		// 		this.overlay.style.display = 'none';
		// 		this.player.stopVideo();
		// 	}
		// });
	}

	createPlayer(url) {
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: `${url}`
		});

		console.log(this.player);
		this.overlay.style.display = 'flex';
	}

	init() {
		if (this.buttons.length > 0) {
			const tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
			this.bindTriggers();
			this.bindCloseTriggers();
		}
	}
}