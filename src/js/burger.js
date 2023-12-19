export default function () {
	const burger = document.querySelector('[data-js="burger"]')
	const laptopMenu = document.querySelector('[data-js="laptop-menu"]')
	const laptopMenuOverlay = document.querySelector('[data-js="overlay"]')
	const html = document.documentElement
	if (burger) {
		burger.addEventListener("click", (e) => {
			burger.classList.toggle("active")
			html.classList.toggle("disabled-scroll")
			if (laptopMenu) {
				laptopMenu.classList.toggle("active")
			}
			if (laptopMenuOverlay) {
				laptopMenuOverlay.classList.toggle("active")
			}
		})
	}
}
