
export class AriaHidden {
	constructor(selector, mobileQuerySize) {
		this.instance = document.querySelector(selector)
		this.mobileQuerySize = window.matchMedia(
			`(max-width: ${mobileQuerySize}px)`
		)
		this.firstInit()
		this.bindEvents()
	}

	show() {
		this.instance.setAttribute("aria-hidden", "true")
	}

	hide() {
		this.instance.setAttribute("aria-hidden", "false")
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
		this.mobileQuerySize.addEventListener("change", this.changeView.bind(this))
	}
}


