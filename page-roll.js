class PageRoll extends HTMLElement{
	constructor() {
		super();
		this.currentPageIndex = 0;
		this.allow = this.getAttribute('allow');
		this.behavior = this.getAttribute('behavior') || 'smooth';
		this.block = this.getAttribute('block') || 'center';
		this.inline = this.getAttribute('inline') || 'center';

		window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
		window.addEventListener('keydown', this.handleKey.bind(this)); //  ,{ passive: false }
	}

	numberOfPages() {
		return document.getElementsByClassName('page').length;
	}

	goToPage() {
		if (this.allow == 'down') {
			if (this.currentPageIndex < 0 || this.currentPageIndex > this.numberOfPages()) {
				this.currentPageIndex = 0;
			}
		}
		if (this.allow == 'up-down') {
			if (this.currentPageIndex > this.numberOfPages()) {
				this.currentPageIndex = 0;
			}
			if (this.currentPageIndex < 0) {
				this.currentPageIndex = this.numberOfPages() + this.currentPageIndex;
			}
		}

		document.getElementById(`page-${this.currentPageIndex}`).scrollIntoView({
			behavior: this.behavior,
			block: this.block,
			inline: this.inline,
		});
	}

	handleWheel(event) {
		event.preventDefault();
		if (event.deltaY > 0) {
			this.currentPageIndex += 1;
		} else {
			this.currentPageIndex -= 1;
		}

		this.goToPage(this.currentPageIndex);
	}

	handleKey(event) {
		if (event.keyCode == 33) {
			this.currentPageIndex -= 1
		}
		if (event.keyCode == 34) {
			this.currentPageIndex += 1;
		}
		if (event.keyCode == 35) {
			this.currentPageIndex += 1;
		}
		if (event.keyCode == 36) {
			this.currentPageIndex -= 1;
		}

		this.goToPage(this.currentPageIndex);

	}

	handleTouch() {
		// if (touchendY < touchstartY) {
		// 	pageNumber -= 1;
		// }

		// if (touchendY < touchstartY) {
		// 	pageNumber += 1;
		// }

		// if (pageNumber < 0) {
		// 	pageNumber = 0;
		// }

		// goToPage(pageNumber);
	}
}

(function init() {
// 	// const pageRoll = new PageRoll();
// 	window.addEventListener('wheel', pageRoll.handleWheel.bind(pageRoll), { passive: false });
// 	window.addEventListener('keydown', pageRoll.handleKey.bind(pageRoll)); //  ,{ passive: false }
// 	// window.addEventListener('touchend', handlers.touchHandler); // , { passive: false }
	window.customElements.define('page-roll', PageRoll);
})();

