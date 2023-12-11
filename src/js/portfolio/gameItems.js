import { createElement } from "../utils"

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
		this.portfolioContent.innerHTML = ""
	}

	showLoader() {
		this.loader.classList.add(this.classes.loaderActive)
	}

	hideLoader() {
		this.loader.classList.remove(this.classes.loaderActive)
	}

	createItems(itemsInfo) {
		itemsInfo.forEach((item) => {
			/*elementType,
                attributes,
                parentNode = undefined,
                parentElementSelector*/

			/*
                <div
								class="portfolio__item"
								data-js="game-item"
								data-js-portfolio-detail='{"images":["../../public/img/team.png","../../public/img/team.png","../../public/img/team.png","../../public/img/team.png","../../public/img/team.png"],"logo":"../../public/img/team.png","title":"Brawl Royale","date":"25.05.2022","text":"Lorem ipsum dolor sit amet consectetur. Massa id lobortis viverra interdum."}'
							>
								<img
									src="../../public/img/team.png"
									alt=""
									class="portfolio__item-img"
								/>
                                JSON.parse(item)
							</div>*/

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
