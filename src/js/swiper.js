// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle"

// import styles bundle
import "swiper/css/bundle"

const swiper = new Swiper(".mySwiper", {
	loop: true,
	grabCursor: true,
	spaceBetween: 10,
	slidesPerView: 1.5,
	centeredSlides: true,
	pagination: {
		el: ".swiper-pagination",
		dynamicMainBullets: 5,
		clickable: true,
	},
})
