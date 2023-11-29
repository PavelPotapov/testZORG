import Swiper from "swiper/bundle"
// import styles bundle
import "swiper/css/bundle"

var swiper = new Swiper(".swiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 3,
	pagination: {
		el: ".swiper-pagination",
		dynamicMainBullets: 5,
		clickable: true,
	},
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 4,
		slideShadows: true,
	},
	loop: true,
	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	keyboard: {
		enabled: true,
	},

	spaceBetween: 0,
	centeredSlides: true,
	effect: "creative",
	autoplay: {
		delay: 1000, // время задержки между сменой слайдов (в миллисекундах)
		disableOnInteraction: true, // отключение автопрокрутки при взаимодействии пользователя
	},
	// mousewheel: {
	// 	thresholdDelta: 70,
	// },
	// breakpoints: {
	// 	560: {
	// 		slidesPerView: 2.5,
	// 	},
	// 	768: {
	// 		slidesPerView: 3,
	// 	},
	// 	1024: {
	// 		slidesPerView: 3,
	// 	},
	// },
})
