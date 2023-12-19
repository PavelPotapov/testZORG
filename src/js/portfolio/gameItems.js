import { clearChildElements, createElement } from "../utils"

/**
 * Класс для упрощения взаимодействия с элементами, которые триггерят открытия модального окна просмотра информации об игре
 * @class
 */
class GameItemsHelper {
	/**
	 * @constructor
	 * @returns {GameItemsHelper.instance} - ссылка на единственный экземпляр класса
	 */
	constructor() {
		if (!GameItemsHelper.instance) {
			GameItemsHelper.instance = this
		}
		/**
		 * Селекторы
		 * @type {Object}
		 * @property {string} gameItems - карточки игр, при клике на которые и вызывает открытие окна
		 * @property {portfolioContent} portfolioContent - контейнер, внутри которого лежат эти карточки
		 */
		this.selectors = {
			gameItems: "[data-js='game-item']",
			portfolioContent: "[data-js='portfolio-content']",
		}
		/**
		 * Информация о состоянии
		 * @type {Object}
		 * @property {boolean} isRequesting - идет ли запрос за новыми карточками
		 */

		this.state = {
			isRequesting: false,
		}
		/**
		 * Какие классы потребуется для создания новых карточек и картинок внутри них
		 * @type {Object}
		 * @property {string} gameItem - класс для карточки
		 * @property {string} gameItemImage - класс для картинки внутри карточки
		 */
		this.classes = {
			gameItem: "portfolio__item",
			gameItemImage: "portfolio__item-img",
		}
		//Вызываем внутренние методы в конструкторе
		this.findElements()
		return GameItemsHelper.instance
	}

	/**
	 * Внутренний метод поиска необходимых DOM элементов / игровых карточек
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	findElements() {
		this.portfolioContent = document.querySelector(
			this.selectors.portfolioContent
		)
		this.gameItems = document.querySelectorAll(this.selectors.gameItems)
	}
	/**
	 * Внутренний метод очистки игровых карточек со страницы
	 * @method
	 * @public
	 * @returns {Promise}
	 */
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

	/**
	 * Внутренний метод создания карточек
	 * @method
	 * @public
	 * @param {Object | undefined} dataJs данные получение из data-атрибута элемента, если данных не будет, форма будет без информации
	 * @param {string} dataJs.title заголовок игры
	 * @param {string} dataJs.logo ссылка на картинку игры (лого)
	 * @param {string} dataJs.date дата выпуска игры
	 * @param {string} dataJs.text описание игры
	 * @param {string[]} dataJs.images список картинок игры (скриншоты)
	 * @returns {undefined}
	 */
	createItems(dataJs) {
		dataJs.forEach((item) => {
			const divRoot = createElement(
				"div",
				{
					class: this.classes.gameItem,
					"data-js": "game-item",
					"data-js-portfolio-detail": JSON.stringify(item),
				},
				this.portfolioContent
			)
			console.log(item)
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

export const gameItemsHelper = new GameItemsHelper()
