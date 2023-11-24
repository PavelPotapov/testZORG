// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle"

// import styles bundle
import "swiper/css/bundle"

const swiper = new Swiper(".mySwiper", {
	loop: true,
	grabCursor: true,
	spaceBetween: 10,
	slidesPerView: 1.2,
	centeredSlides: true,
	autoplay: {
		delay: 1000, // время задержки между сменой слайдов (в миллисекундах)
		disableOnInteraction: true, // отключение автопрокрутки при взаимодействии пользователя
	},
	pagination: {
		el: ".swiper-pagination",
		dynamicMainBullets: 5,
		clickable: true,
	},
})
