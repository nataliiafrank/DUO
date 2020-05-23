// Defining global veriables
const bp = {
	mobile: 320,
	tablet: 768,
	desktop: 1024,
	largeDesctop: 1440
}

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const state = {
	active: 'is-active',
	desabled: 'is-disabled'
}

const domSelectors = {
	features: document.querySelector('.js-features'),
	featuresButtons: document.querySelector('.js-features-buttons'),
	featuresButton: document.querySelectorAll('.js-features-button'),
}


/// Functions
const featuresScroll = () => {
	const btnsArr = Array.from(domSelectors.featuresButton);

	btnsArr.forEach(item => {
		if(item.classList.contains(state.active)) {
			let itemOffset = item.offsetLeft - 180;
			//set the scroll to the active button

			if(windowWidth < bp.tablet) {
				domSelectors.featuresButtons.scrollLeft = itemOffset;
			} else {
				domSelectors.featuresButtons.scrollLeft = 0;
			}
		}
	});
}


/// Event Listeners
window.addEventListener('load', featuresScroll);
window.addEventListener('resize', featuresScroll);