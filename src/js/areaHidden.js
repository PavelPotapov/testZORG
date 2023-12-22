/**
 * Класс для контролирования элементов, у которых должен быть area-hidden: true
 * @class
 */
export class AriaHidden {
	/**
	 * Конструктор
	 * @constructor
	 * @param {string} selector - Селектор элемента, за которым нужно следить
	 * @param {number} mobileQuerySize - Разрешение, меньше которого будет навешиваться area-hidden: false на выбранный элемент
	 */
	constructor(selector, mobileQuerySize) {
		this.selectors = {
			nodeElement: selector,
		}

		this.mobileQuerySize = window.matchMedia(
			`(max-width: ${mobileQuerySize}px)`
		)
		//Вызываем внутренние методы в конструкторе
		this.findElements()
		this.firstInit()
		this.bindEvents()
	}

	findElements() {
		this.nodeElement = document.querySelector(this.selectors.nodeElement)
	}

	hide() {
		this.nodeElement.setAttribute("aria-hidden", "false")
	}

	show() {
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

/**
 * @example Пример использования
 */
new AriaHidden('[data-js="laptop-menu"]', 1000)
