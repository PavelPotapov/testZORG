export class AriaHidden {
	constructor(selector, mobileQuerySize) {
		this.selectors = {
			nodeElement: selector,
		}

		this.mobileQuerySize = window.matchMedia(
			`(max-width: ${mobileQuerySize}px)`
		)

		this.findElements()
		this.firstInit()
		this.bindEvents()
	}

	findElements() {
		this.nodeElement = document.querySelector(this.selectors.nodeElement)
	}

	show() {
		this.nodeElement.setAttribute("aria-hidden", "false")
	}

	hide() {
		this.nodeElement.setAttribute("aria-hidden", "true")
	}

	firstInit() {
		if (this.mobileQuerySize.matches) this.hide()
		else this.show()
	}

	changeView(event) {
		if (event.matches) this.hide()
		else this.show()
	}

	bindEvents() {
		this.mobileQuerySize.addEventListener("change", (e) => {
			this.changeView(e)
		})
	}
}

new AriaHidden('[data-js="laptop-menu"]', 1000)
