'use strict';

export default class Difference {
	constructor(oldOfficer, newOfficer, items) {
		try {
			this.oldOfficer = document.querySelector(oldOfficer);
			this.newOfficer = document.querySelector(newOfficer);
			this.oldItems = this.oldOfficer.querySelectorAll(items);
			this.newItems = this.newOfficer.querySelectorAll(items);
			this.items = items;
			this.oldCounter = 0;
			this.newCounter = 0;
		} catch(e){}
	}

	bindTriggers(officer, items, counter) {
		officer.querySelector('.plus').addEventListener('click', () => {
			if (counter !== items.length - 2) {
				this.showItems(items, counter);
				counter++;
			} else {
				this.showItems(items, counter);
				items[items.length - 1].remove();
			}
		});
	}

	showItems(items, counter) {
		items[counter].style.display = 'flex';
		items[counter].classList.add('animate__animated', 'animate__fadeIn');
		items[counter].style.setProperty('--animate-duration', '1s');
	}

	hideItems(items) {
		items.forEach((item, i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
	}

	init() {
		try {
			this.hideItems(this.oldItems);
			this.hideItems(this.newItems);
			this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
			this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
		} catch(e){}
	}
}