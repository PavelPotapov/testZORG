class Loader {
	constructor() {
		if (!Loader.instance) {
			Loader.instance = this
		}

		this.classes = {
			overlayActive: "active",
			loaderActive: "clock-loader--active",
		}

		this.selectors = {
			loader: "[data-js='clock-loader']",
			overlay: "[data-js='loader-overlay']",
		}
		this.state = {
			active: false,
		}
		this.findElements()
		return Loader.instance
	}

	findElements() {
		this.loader = document.querySelector(this.selectors.loader)
		this.overlay = document.querySelector(this.selectors.overlay)
	}

	showLoader() {
		this.loader.classList.add(this.classes.loaderActive)
		this.overlay.classList.add(this.classes.overlayActive)
	}

	hideLoader() {
		this.loader.classList.remove(this.classes.loaderActive)
		this.overlay.classList.remove(this.classes.overlayActive)
	}
}

export const singleToneLoader = new Loader()
