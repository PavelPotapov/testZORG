import { disableScroll, enableScroll } from "./utils"

/**
 * Класс для Burger
 * @class
 */
class Burger {
	/**
	 *
	 * @param {Object} param - объект параметров
	 * @param {number} param.maxWidth - ширина viewport с которой отображается burger
	 * @returns {Burger.instance} - ссылка на единственный экземпляр класса
	 */
	constructor({ maxWidth = 1000 }) {
		if (!Burger.instance) {
			Burger.instance = this
		}
		/**
		 * Селекторы для DOM элементов burger
		 * @type {Object}
		 * @property {string} burger - кнопка burger
		 * @property {string} laptopMenu - боковое меню
		 * @property {string} overlay - overlay
		 */
		this.selectors = {
			burger: '[data-js="burger"]',
			laptopMenu: '[data-js="laptop-menu"]',
			overlay: '[data-js="overlay"]',
		}
		/**
		 * Состояние burger
		 * @type {Object}
		 * @property {boolean} open - показан ли burger
		 */
		this.state = {
			open: false,
		}
		/**
		 * Классы для управления burger
		 * @type {Object}
		 * @property {string} burger - показать burger
		 * @property {string} overlay - показать overlay
		 * @property {string} laptopMenu - показать menu
		 */
		this.classes = {
			burger: "active",
			overlay: "active",
			laptopMenu: "active",
		}

		this.maxWidth = maxWidth
		/**
		 * @property {MediaQueryList} mobileWidthMediaQuery - объект matchMedia для контроля ViewPort
		 */
		this.mobileWidthMediaQuery = window.matchMedia(
			`(max-width: ${this.maxWidth}px)`
		)
		//Вызов внутренних методов
		this.firstInit()
		this.findElements()
		this.acceptEvents()
		return Burger.instance
	}
	/**
	 * Поиск DOM элементов необходимых для реализации burger
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	findElements() {
		this.burger = document.querySelector(this.selectors.burger)
		this.laptopMenu = document.querySelector(this.selectors.laptopMenu)
		this.overlay = document.querySelector(this.selectors.overlay)
	}

	hideMenu() {
		if (this.laptopMenu && this.overlay) {
			enableScroll()
			this.state = !this.state
			this.burger.classList.remove(this.classes.burger)
			this.laptopMenu.classList.remove(this.classes.laptopMenu)
			this.overlay.classList.remove(this.classes.overlay)
		}
	}

	showMenu() {
		if (this.laptopMenu && this.overlay) {
			disableScroll()
			this.state = !this.state
			this.burger.classList.add(this.classes.burger)
			this.laptopMenu.classList.add(this.classes.laptopMenu)
			this.overlay.classList.add(this.classes.overlay)
		}
	}

	toggleBurger() {
		if (this.burger) {
			if (this.state) {
				this.showMenu()
			} else {
				this.hideMenu()
			}
		}
	}
	/**
	 * метод. нужен при первой инициализации, чтобы при переходе на мобильное устройство принудительно скрыть бокове меню
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	firstInit() {
		if (!this.mobileWidthMediaQuery.matches) this.hideMenu()
	}
	/**
	 * Подписка на изменение ViewPort, чтобы скрыть боковое меню в нужный момент
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	bindMediaQuery() {
		this.mobileWidthMediaQuery.addEventListener("change", (event) => {
			//если пользователь открыл боковое меню и расширил видимость просмотра, что кнопка скрытия бокового меню исчезла, то боковое меню принудительно закроется
			if (!event.matches) {
				this.hideMenu()
			}
		})
	}

	bindClickBurger() {
		if (this.burger) {
			this.burger.addEventListener("click", (e) => {
				this.toggleBurger()
			})
		}
	}
	/**
	 * Подписка на все события
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	acceptEvents() {
		this.bindClickBurger()
		this.bindMediaQuery()
	}
}

export const burger = new Burger({ maxWidth: 1000 })
