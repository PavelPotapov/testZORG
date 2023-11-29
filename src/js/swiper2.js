// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle"

// import styles bundle
import "swiper/css/bundle"

const swiper = new Swiper(".mySwiper", {
	loop: true,
	grabCursor: true,
	spaceBetween: 0,
	slidesPerView: 3,
	centeredSlides: true,
	effect: "creative",
	autoplay: {
		delay: 1000, // время задержки между сменой слайдов (в миллисекундах)
		disableOnInteraction: true, // отключение автопрокрутки при взаимодействии пользователя
	},
	pagination: {
		el: ".swiper-pagination",
		dynamicMainBullets: 5,
		clickable: true,
	},
	creativeEffect: {
		prev: {
			translate: ["-100%", 0, 0],
			opacity: 0.9,
			scale: 0.75,
		},
		next: {
			translate: ["100%", 0, 0],
			opacity: 0.9,
			scale: 0.75,
		},
	},
})
