function goToPage(pageNumber) {
	document.getElementById(`page-${pageNumber}`).scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "center",
	});
}

function handlePageChange() {
	let pageNumber = 0;
	let touchstartY = 0;
	let touchendY = 0;
	let swipedir;
	let startX;
	let startY;
	let distX;
	let distY;
	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;
	let elapsedTime;
	let startTime;

	window.addEventListener('touchstart', function (e) {
		var touchobj = e.changedTouches[0];
		swipedir = 'none'
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		e.preventDefault()
	}, { passive: false });

	window.addEventListener('touchmove', function (e) {
		e.preventDefault() // prevent scrolling when inside DIV
	}, { passive: false });

	window.addEventListener('touchend', function (e) {
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX;
		distY = touchobj.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				swipedir = (distX < 0) ? 'left' : 'right';
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
				swipedir = (distY < 0) ? 'up' : 'down';
			}
		}
		e.preventDefault();

		if (swipedir === 'up') { pageNumber += 1; }
		if (swipedir === 'down') { pageNumber -= 1; }
		goToPage(pageNumber);
		
	}, { passive: false });

	function _handleWheel(event) {
		event.preventDefault();

		if (event.deltaY > 0) {
			pageNumber += 1;
		} else {
			pageNumber -= 1;
		}

		try { // TypeError
			goToPage(pageNumber);
		} catch (error) {
			return;
		}
	}

	function _handleKey(event) {
		event.preventDefault();

		if (event.keyCode == 33) {
			pageNumber -= 1
		}
		if (event.keyCode == 34) {
			pageNumber += 1;
		}
		if (event.keyCode == 35) {
			pageNumber += 1;
		}
		if (event.keyCode == 36) {
			pageNumber -= 1;
		}
		try { // TypeError
			sectionNumber = 0;
			goToPage(pageNumber);
		} catch (error) {
			return;
		}
	}

	function _handleTouch(event) {
		console.log(pageNumber);

		if (touchendY < touchstartY) {
			pageNumber -= 1;
		}
		
		if (touchendY < touchstartY) {
			pageNumber += 1;
		}

		if (pageNumber < 0) {
			pageNumber = 0;
		}

		goToPage(pageNumber);
	}

	return { wheelHandler: _handleWheel, keyHandler: _handleKey, touchHandler: _handleTouch };
}


let handlers = handlePageChange();
window.addEventListener('wheel', handlers.wheelHandler, { passive: false });
window.addEventListener('keydown', handlers.keyHandler, { passive: false });
window.addEventListener('touchend', handlers.touchHandler, { passive: false });
