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
	desabled: 'is-disabled',
	valid: 'is-valid',
	invalid: 'is-invalid'
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
	form: document.querySelector('.js-form'),
	formContainer: document.querySelector('.js-form-container'),
	formPhoneInput: document.querySelector('.js-form-input-phone'),
	formSubmit: document.querySelector('.js-form-submit'),
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
const createSliderInstance = (container, options, breakpoint) => {
	if (!container || (breakpoint && breakpoint.matches)) {
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

	if (!shouldDestroy) {
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

const createModelSlider = () => createSliderInstance(domSelectors.modelsSwiperContainer, modelsSliderOptions, createBreakpoint(bp.tablet));
startSlider(createModelSlider, true, createBreakpoint(bp.tablet));


// FORM
// phone number simple validation
const phoneValid = () => {
	const input = domSelectors.formPhoneInput;
	const phoneRe = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

	if (input.value.match(phoneRe)) {
		console.log('true - valid number');
		return true;
	} else {
		console.log("Not a valid Phone Number");
		return false;
	}
}

// showing error and thank you message
const handleFormValid = (e) => {
	e.preventDefault();

	const container = domSelectors.formContainer;
	const form = domSelectors.form;
	const input = domSelectors.formPhoneInput;
	const error = document.querySelector('.js-form-error');

	if(phoneValid()) {
		form.classList.add(state.valid);
		container.insertAdjacentHTML(
			'beforeend', 
			`<p class="banner-callback__thanks">Thank you for your interest, we will give you a callback very soon.</p>`
		);
	} else {
		form.classList.add(state.invalid);
		input.focus();

		if(!error) {
			domSelectors.form.insertAdjacentHTML(
				'afterbegin',
				`<span class="banner-callback__error js-form-error">Please enter a valid US phone number in the format xxx-xxx-xxxx.</span>`
			);
		}
	}
}


/// Event Listeners
// Features
window.addEventListener('load', featuresScroll);
window.addEventListener('resize', featuresScroll);
domSelectors.formSubmit.addEventListener('click', handleFormValid);