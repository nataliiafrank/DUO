import Swiper from 'swiper';

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
	gallerySwiperContainer: document.querySelector('.js-gallery-slider'),
	gallerySwiperButtonLeft: document.querySelector('.js-gallery-slider-prev'),
	gallerySwiperButtonRight: document.querySelector('.js-gallery-slider-next'),
	testimonialSwiperContainer: document.querySelector('.js-testimonial-slider'),
	testimonialSwiperPagination: document.querySelector('.js-testimonial-slider-pagination'),
}


/// Functions
const featuresScroll = () => {
	const btnsArr = Array.from(domSelectors.featuresButton);

	btnsArr.forEach(item => {
		if (item.classList.contains(state.active)) {
			let itemOffset = item.offsetLeft - 180;
			//set the scroll to the active button

			if (windowWidth < bp.tablet) {
				domSelectors.featuresButtons.scrollLeft = itemOffset;
			} else {
				domSelectors.featuresButtons.scrollLeft = 0;
			}
		}
	});
}

const sliderInit = (container, options) => new Swiper(container, options);

const gallerySliderOptions = {
	speed: 400,
	initialSlide: 1,
	slidesPerView: 'auto',
	spaceBetween: 15,
	centeredSlides: true,
	loop: true,
	centeredSlidesBounds: true,
	navigation: {
		nextEl: domSelectors.gallerySwiperButtonRight,
		prevEl: domSelectors.gallerySwiperButtonLeft,
	},
	breakpoints: {
		// when window width is >= 768px
		768: {
			spaceBetween: 74,
			keyboard: {
				enabled: true,
			},
		},
	}
}

const testimonialSliderOptions = {
	speed: 400,
	slidesPerView: 1,
	centeredSlides: true,
	loop: true,
	centeredSlidesBounds: true,
	autoHeight: true,
	pagination: {
		el: domSelectors.testimonialSwiperPagination,
		clickable: true,
	},
}

const gallerySlider = sliderInit(domSelectors.gallerySwiperContainer, gallerySliderOptions);
const testimonialSlider = sliderInit(domSelectors.testimonialSwiperContainer, testimonialSliderOptions);

/// Event Listeners
// Features
window.addEventListener('load', featuresScroll);
window.addEventListener('resize', featuresScroll);