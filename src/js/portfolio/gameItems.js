import { clearChildElements, createElement } from "../utils"

export class GameItemsHelper {
	constructor() {
		this.selectors = {
			gameItems: "[data-js='game-item']",
			portfolioContent: "[data-js='portfolio-content']",
			loader: "[data-js='clock-loader']",
		}
		this.state = {
			isRequesting: false,
		}

		this.classes = {
			loaderActive: "clock-loader--active",
			gameItem: "portfolio__item",
			gameItemImage: "portfolio__item-img",
		}

		this.dataAttributes = {
			gameItem: {
				names: ["data-js", "data-js-portfolio-detail"],
			},
		}

		this.findElements()
	}

	findElements() {
		this.portfolioContent = document.querySelector(
			this.selectors.portfolioContent
		)
		this.gameItems = document.querySelectorAll(this.selectors.gameItems)
		this.loader = document.querySelector(this.selectors.loader)
	}

	clearContents() {
		return new Promise((resolve, reject) => {
			try {
				clearChildElements(this.portfolioContent)
				resolve()
			} catch {
				reject()
			}
		})
	}

	showLoader() {
		this.loader.classList.add(this.classes.loaderActive)
	}

	hideLoader() {
		this.loader.classList.remove(this.classes.loaderActive)
	}

	createItems(itemsInfo) {
		itemsInfo.forEach((item) => {
			const divRoot = createElement(
				"div",
				{
					class: this.classes.gameItem,
					"data-js": "game-item",
					"data-js-portfolio-detail": JSON.stringify(item),
				},
				this.portfolioContent
			)
			const img = createElement(
				"img",
				{
					class: this.classes.gameItemImage,
					src: item.logo,
					alt: item.title,
				},
				divRoot
			)
			this.portfolioContent.appendChild(divRoot)
		})
	}
}
