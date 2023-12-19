/**
 * Класс для создания loader. Он используется в разных случаях, например при фильтрации на странице портфолио или во время отправки формы вакансии
 *
 * @class
 */
class Loader {
	/**
	 * @constructor
	 * @returns {Loader.instance} - ссылка на единственный экземпляр Loader на странице.
	 */
	constructor() {
		if (!Loader.instance) {
			Loader.instance = this
		}
		/** классы для взаимодействия с loader
		 * @type {Object}
		 * @property {string} overlayActive - класс для отображения заднего фона
		 * @property {string} loaderActive - класс для отображения loader
		 */

		this.classes = {
			overlayActive: "active",
			loaderActive: "clock-loader--active",
		}
		/** классы для взаимодействия с loader
		 * @type {Object}
		 * @property {string} loader - селектор для loader
		 * @property {string} overlay - селектор для заднего фона
		 */
		this.selectors = {
			loader: "[data-js='clock-loader']",
			overlay: "[data-js='loader-overlay']",
		}
		/** состояние loader
		 * @type {Object}
		 * @property {bool} active - показан ли loader
		 */
		this.state = {
			active: false,
		}

		//Вызываем внутренние методы в конструкторе
		this.findElements()
		return Loader.instance
	}

	/**
	 * Внутренний метод поиска необходимых DOM элементов для loader
	 * @method
	 * @private
	 * @returns {undefined}
	 */
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
