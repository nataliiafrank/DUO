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
	modelsSwiperContainer: document.querySelector('.js-models-slider'),
}


/// Functions
// FEATURES
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

// SLIDER
// initialising swiper instance
const createSliderInstance = (container, options) => {
	if (!container) {
		return null;
	}

	return new Swiper(container, options);
}

// define slider options
const gallerySliderOptions = {
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

const modelsSliderOptions = {
	slidesPerView: 'auto',
	spaceBetween: 15,
	centeredSlides: true,
	loop: true,
	centeredSlidesBounds: true
}

// breakpoint where swiper will be destroyed
const createBreakpoint = (breakpoint) => window.matchMedia(`(min-width:${breakpoint}px)`);

// handle resize
const startSlider = (sliderCreater, shouldDestroy, breakpoint) => {
	let sliderInstance = sliderCreater();

	if (!sliderInstance || !shouldDestroy) {
		return;
	}

	breakpoint.addListener(() => {
		if (breakpoint.matches) {
			if (!sliderInstance) {
				return;
			}

			sliderInstance.destroy(true, true);
		} else {
			sliderInstance = sliderCreater();
		}
	});
};

// functins for creating and starting slider instances
const createGallerySlider = () => createSliderInstance(domSelectors.gallerySwiperContainer, gallerySliderOptions);
startSlider(createGallerySlider, false);

const createTestimonialSlider = () => createSliderInstance(domSelectors.testimonialSwiperContainer, testimonialSliderOptions);
startSlider(createTestimonialSlider, false);

const createModelSlider = () => createSliderInstance(domSelectors.modelsSwiperContainer, modelsSliderOptions);
startSlider(createModelSlider, true, createBreakpoint(bp.tablet));


/// Event Listeners
// Features
window.addEventListener('load', featuresScroll);
window.addEventListener('resize', featuresScroll);