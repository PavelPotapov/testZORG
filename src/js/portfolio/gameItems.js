import { clearChildElements, createElement } from "../utils"

export class GameItemsHelper {
	constructor() {
		this.selectors = {
			gameItems: "[data-js='game-item']",
			portfolioContent: "[data-js='portfolio-content']",
		}
		this.state = {
			isRequesting: false,
		}

		this.classes = {
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
