//Закрытие окна на страницу портфолио

// const btn = document.querySelector()
// btn.addEventListener("click", function (e) {
// 	this.parentNode.classList.toggle("portfolio__main-block--close")
// })

// [data-js]="popup-image"
// [data-js]="popup-text"
// [data-js]="popup-date"
// [data-js]="popup-title"
// [data-js]="popup-logo"
// class="portfolio__main-game-card"
// class="portfolio__main-game-card-img"
// document
// 	.querySelectorAll(`[data-js="game-item"]`)
// 	.forEach((el) => el.addEventListener("click", () => {}))
//{ &quot;url&quot;: &quot;/local/templates/delement/ajax/main_subscribe_email.php&quot;, &quot;method&quot;: &quot;POST&quot;, &quot;isResetAfterSuccess&quot;: true, &quot;isShowLoader&quot;: true }

//MutationObserver

import { delay, createElement } from "../utils"

class PopupHelper {
	constructor(options) {
		this.popup = document.querySelector(`[data-js="popup-block"]`)

		this.state = {
			open: false,
		}
		this.selectors = {
			cross: `[data-js="popup-cross"]`,
			logo: `[data-js="popup-logo"]`,
			container: `[data-js="popup-container-images"]`,
			images: `[data-js="popup-image"]`,
			text: `[data-js="popup-text"]`,
			date: `[data-js="popup-date"]`,
			title: `[data-js="popup-title"]`,
			detail: `data-js-portfolio-detail`,
			overlay: `[data-id="popup-overlay"]`,
			item: `[data-js="game-item"]`,
			itemsContainer: `[data-js="portfolio-content"]`,
		}
		this.dataAttributes = {
			images: {
				name: `data-js`,
				value: "popup-image",
			},
		}
		this.classes = {
			images: {
				block: "portfolio__main-game-card",
				image: "portfolio__main-game-card-img",
			},
			popup: "portfolio__main-block--open",
			overlay: "active",
		}

		this.findElements()
		this.acceptEvents()
	}

	findElements() {
		this.cross = this.popup.querySelector(this.selectors.cross)
		this.logo = this.popup.querySelector(this.selectors.logo)
		this.container = this.popup.querySelector(this.selectors.container)
		this.images = this.popup.querySelectorAll(this.selectors.images)
		this.text = this.popup.querySelector(this.selectors.text)
		this.date = this.popup.querySelector(this.selectors.date)
		this.title = this.popup.querySelector(this.selectors.title)
		this.items = document.querySelectorAll(this.selectors.item)
		this.itemsContainer = document.querySelector(this.selectors.itemsContainer)
		this.overlay = document.querySelector(this.selectors.overlay)
	}

	clearImages() {
		this.container.innerHTML = ""
	}

	togglePopup(item) {
		this.state.open = !this.state.open
		if (this.state.open) {
			document.documentElement.classList.toggle("disabled-scroll", true)
			this.overlay.classList.toggle(this.classes.overlay)
			this.popup.classList.toggle(this.classes.popup)
			this.clearImages()
			const detailData = JSON.parse(item.getAttribute(this.selectors.detail))
			this.logo.src = detailData.logo
			detailData.images.forEach((image) => {
				/*создаем div */
				const rootDIV = createElement(
					"div",
					{
						class: this.classes.images.block,
						[this.dataAttributes.images.name]: [
							this.dataAttributes.images.value,
						],
					},
					this.container
				)

				/* внутри div создаем картинку */
				createElement(
					"img",
					{
						src: image,
						class: this.classes.images.image,
					},
					rootDIV
				)
			})
			this.title = detailData.title
			this.text = detailData.text
			this.date = detailData.date
			delay(1000).then(() => (this.popup.style.overflowY = "auto"))
		} else {
			document.documentElement.classList.toggle("disabled-scroll", false)
			this.popup.classList.toggle(this.classes.popup)
			this.overlay.classList.toggle(this.classes.overlay)
			this.popup.style.overflowY = "hidden"
		}
	}

	// findGameItems() {
	// 	this.items = document.querySelectorAll(this.selectors.item)
	// 	this.bindItemsClick()
	// }

	bindCrossClick() {
		if (this.cross) {
			this.cross.addEventListener("click", () => {
				this.togglePopup()
			})
		}
	}

	bindClickOverlay() {
		if (this.overlay) {
			this.overlay.addEventListener("click", (e) => {
				this.cross.click()
			})
		}
	}

	bindItemsClick() {
		this.items.forEach((item) =>
			item.addEventListener("click", () => {
				this.togglePopup(item)
			})
		)
	}

	acceptEvents() {
		this.bindItemsClick()
		this.bindCrossClick()
		this.bindClickOverlay()
	}
}

export const popupHelper = new PopupHelper()
