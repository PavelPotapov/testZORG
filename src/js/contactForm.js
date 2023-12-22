import { postFormRequest } from "./API/contactFormAPI"
import { singleToneLoader } from "./loader"
import {
	clearChildElements,
	createElement,
	delay,
	disableScroll,
	enableScroll,
	getDataFromDataJS,
} from "./utils"
import { createErrorToast, createSuccessfulToast } from "./utils"

class ContactFormHelper {
	/**
	 * Конструктор для работы с формой отправки резюме / контактов, используется на главной странице и на странице работы
	 * @constructor
	 * @returns {ContactFormHelper.instance} - Ссылка на единственный экземпляр
	 */
	constructor() {
		/**
		 * Используется SingleTone
		 */
		if (!ContactFormHelper.instance) {
			ContactFormHelper.instance = this
		}
		/**
		 * Информация о состоянии формы
		 * @type {Object}
		 * @property {boolean} open - открыта ли форма.
		 * @property {boolean} deleteBtnShown - отображается ли кнопка удаления загруженного резюме
		 * @property {boolean} filesUpload - загрузили ли резюме
		 */
		this.state = {
			open: false,
			deleteBtnShown: false,
			filesUpload: false,
		}
		/**
		 * Селекторы для получения DOM элементов формы
		 * @type {Object}
		 */
		this.selectors = {
			deleteBtn: "[data-js='delete-file']",
			modalCrossBtn: "[data-js='contact-modal-cross']",
			contactFormModal: "[data-js='contact-modal']",
			overlay: "[data-js='contact-form-overlay']",
			inputFile: "#input-file",
			getFileBtn: "[data-js='get-file-btn']",
			form: "[data-js='contact-form']",
			items: "[data-js='vacancy-item']",
			title: "[data-js='contact-modal-title']",
			date: "[data-js='contact-modal-date']",
			workType: "[data-js='contact-modal-work-type']",
			message: "[data-js='contact-modal-message']",
			requirementsItem: "[data-js='contact-modal-req-item']",
			requirementsList: "[data-js='contact-modal-req-list']",
			requirementsTitle: "[data-js='contact-modal-req-title']",
			clearFormBtn: "[data-js='contact-modal-reset']",
		}
		/**
		 * С какими классами нужно взаимодействовать, чтобы открывать форму / задний overlay / отображать кнопку удаления резюме
		 * @type {Object}
		 * @property {string} openContactForm - класс для открытия формы
		 * @property {string} overlayActive - класс для отображения заднего фона
		 * @property {string} openContactForm - класс для отображения кнопки удаления резюме
		 */
		this.classes = {
			openContactForm: "contact-modal--open",
			overlayActive: "active",
			deleteBtnActive: "contact-modal__delete-file--shown",
		}
		/**
		 * Атрибуты из которых достаем информацию
		 * @type {Object}
		 * @property {string} form - из какого атрибута формы надо достать данные для отправки
		 * @property {string} item - из какого атрибута элемента надо достать данные для отображения в форме
		 */
		this.dataAttributes = {
			form: "data-js-details",
			item: "data-js-contact-form-info",
		}
		/**
		 * Объект loader для отображения во время отправки / загрузки
		 * Ссылается на единственный уже созданный объект класса Loader
		 * @type {Loader}
		 */
		this.loader = singleToneLoader
		//Вызываем внутренние методы в конструкторе
		this.findElements()
		this.acceptEvents()
		return ContactFormHelper.instance
	}

	/**
	 * Внутренний метод поиска необходимых DOM элементов для формы
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	findElements() {
		this.deleteBtn = document.querySelector(this.selectors.deleteBtn)
		this.modalCrossBtn = document.querySelector(this.selectors.modalCrossBtn)
		this.contactFormModal = document.querySelector(
			this.selectors.contactFormModal
		)
		this.overlay = document.querySelector(this.selectors.overlay)
		this.inputFile = document.querySelector(this.selectors.inputFile)
		this.getFileBtn = document.querySelector(this.selectors.getFileBtn)
		this.form = document.querySelector(this.selectors.form)
		this.items = document.querySelectorAll(this.selectors.items)
		this.date = document.querySelector(this.selectors.date)
		this.title = document.querySelector(this.selectors.title)
		this.workType = document.querySelector(this.selectors.workType)
		this.message = document.querySelector(this.selectors.message)
		this.requirementsItems = document.querySelectorAll(
			this.selectors.requirementsItem
		)
		this.requirementsList = document.querySelector(
			this.selectors.requirementsList
		)
		this.requirementsTitle = document.querySelector(
			this.selectors.requirementsTitle
		)
		this.clearFormBtn = document.querySelector(this.selectors.clearFormBtn)
	}
	/**
	 * Внутренний метод очистки DOM элементов формы, чтобы при следующем открытии заполнить ее необходимыми данными
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	clearContents() {
		this.title.innerHTML = ""
		this.date.innerHTML = ""
		this.workType.innerHTML = ""
		this.message.innerHTML = ""
		clearChildElements(this.requirementsList)
		this.deleteBtn.click()
	}
	/**
	 * Внутренний метод заполнения DOM элементов формы полученными данными из data-атрибута
	 * @private
	 * @param {Object|undefined} dataJs данные получение из data-атрибута элемента, если данных не будет, форма будет без информации
	 * @param {string} dataJs.title заголовок вакансии
	 * @param {string} dataJs.date дата вакансии
	 * @param {string} dataJs.typeWork удаленно / в офисе
	 * @param {string} dataJs.message текст вакансии
	 * @param {string[]} dataJs.requirements основные требования
	 * @returns {undefined}
	 */
	putInfoInside(dataJS) {
		if (dataJS) {
			this.requirementsTitle.innerHTML = "Основные требования:"
			this.title.innerHTML = dataJS.title
			this.date.innerHTML = dataJS.date
			this.workType.innerHTML = dataJS.typeWork
			this.message.innerHTML = dataJS.message
			//создание элементов списка
			dataJS.requirements.forEach((item) => {
				createElement(
					"li",
					{
						"data-js": "contact-modal-req-item",
						class: "contact-modal__requirements-item",
					},
					this.requirementsList
				).innerHTML = item
			})
			this.requirementsItems.forEach((item, index, arr) => {
				item.innerHTML = dataJS.requirements[index]
			})
		} else {
			this.requirementsTitle.innerHTML = ""
		}
	}
	/**
	 * Внутренний метод для открытия / закрытия формы. В зависимости от state.open формы
	 * @method
	 * @private
	 * @param {Object | undefined} dataJs данные получение из data-атрибута элемента, если данных не будет, форма будет без информации
	 * @param {string} dataJs.title заголовок вакансии
	 * @param {string} dataJs.date дата вакансии
	 * @param {string} dataJs.typeWork удаленно / в офисе
	 * @param {string} dataJs.message текст вакансии
	 * @param {string[]} dataJs.requirements основные требования
	 * @returns {undefined}
	 */
	toggleModalContact(dataJS) {
		if (this.contactFormModal && this.overlay) {
			this.state.open = !this.state.open
			if (this.state.open) {
				//отключаем скролл на всей странице
				disableScroll()
				//чистим форму от предыдущего вызова
				this.clearContents()
				//вставляем в форму полученные данные
				this.putInfoInside(dataJS)
				//активируем overlay формы
				this.overlay.classList.add(this.classes.overlayActive)
				//открываем форму
				this.contactFormModal.classList.add(this.classes.openContactForm)
				//через 0.5 сек добавляем возможность прокрутки по оси y.
				/*
				Важно делать это с задержкой, иначе анимация открытия формы, которая реализована 
				через изменение max-height будет выглядеть некрасиво, постоянно отображая вертикальный скролл
				до момент полного открытия формы
				*/
				delay(500).then(() => (this.contactFormModal.style.overflowY = "auto"))
			} else {
				//закрываем форму
				this.contactFormModal.classList.remove(this.classes.openContactForm)
				//убираем overlay
				this.overlay.classList.remove(this.classes.overlayActive)
				//разрешаем скролл на всей странице
				enableScroll()
			}
		}
	}
	/**
	 * Отображение выбранного файла
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	showFileName() {
		if (this.inputFile.files && this.inputFile.files.length > 0) {
			this.getFileBtn.textContent = this.inputFile.files[0].name
		} else {
			this.getFileBtn.textContent = "Прикрепить резюме"
		}
	}

	bindSubmitForm() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault()
			this.sendFormData()
			this.clearFormBtn.click()
		})
	}
	/**
	 * Асинхронная отправка данных с формы в формате FormData post запросом
	 * У формы должен быть data атрибут описанный в dataAttributes.form = data-js-details внутри которого должно быть поле url, по этому url будет отправлен запрос
	 * @method
	 * @returns {Promise}
	 */
	async sendFormData() {
		try {
			const formData = new FormData(this.form)
			const url = getDataFromDataJS(this.form, this.dataAttributes.form)["url"]
			//показываем loader на время ожидания
			this.loader.showLoader()
			const response = await postFormRequest(url, formData)
			if (response) {
				this.loader.hideLoader()
				createSuccessfulToast()
				//закрываем форму
				this.toggleModalContact()
				//ждем пока закроется форма
				await delay(500)
				//чистим контент внутри формы
				this.clearContents()
				//удаляем загруженный файл
				this.clearFormBtn.click()
			} else {
				createErrorToast()
			}
		} catch (err) {
			createErrorToast()
		} finally {
			this.loader.hideLoader()
		}
	}

	bindClearFormBtn() {
		this.clearFormBtn.addEventListener("click", (e) => {
			e.target.click()
		})
	}

	bindClickItems() {
		this.items.forEach((items) =>
			items.addEventListener("click", (e) => {
				const dataJS = getDataFromDataJS(
					e.currentTarget,
					this.dataAttributes.item
				)
				if (dataJS) {
					this.toggleModalContact(dataJS)
				} else {
					this.toggleModalContact()
				}
			})
		)
	}

	bindClickGetFileBtn() {
		if (this.getFileBtn) {
			this.getFileBtn.addEventListener("click", (e) => {
				e.preventDefault()
				this.inputFile.click()
			})
		}
	}

	bindClickOverlay() {
		if (this.overlay) {
			this.overlay.addEventListener("click", (e) => {
				this.modalCrossBtn.click()
			})
		}
	}

	bindClickModalCrossBtn() {
		if (this.modalCrossBtn && this.contactFormModal) {
			this.modalCrossBtn.addEventListener("click", () => {
				this.toggleModalContact()
			})
		}
	}

	bindChangeInputFile() {
		if (this.inputFile) {
			this.inputFile.addEventListener("change", (e) => {
				this.state.filesUpload = true
				this.state.deleteBtnShown = true
				this.deleteBtn.classList.add(this.classes.deleteBtnActive)
				this.showFileName()
			})
		}
	}

	bindDeleteBtnClick() {
		if (this.deleteBtn) {
			this.deleteBtn.addEventListener("click", () => {
				this.inputFile.value = null
				this.state.filesUpload = false
				this.state.deleteBtnShown = false
				this.deleteBtn.classList.remove(this.classes.deleteBtnActive)
				this.showFileName()
			})
		}
	}
	/**
	 * Подписка на все события, включая submit
	 * @method
	 * @private
	 * @returns {undefined}
	 */
	acceptEvents() {
		this.bindClickModalCrossBtn()
		this.bindChangeInputFile()
		this.bindDeleteBtnClick()
		this.bindClickGetFileBtn()
		this.bindClickItems()
		this.bindClickOverlay()
		this.bindClearFormBtn()
		this.bindSubmitForm()
	}
}

new ContactFormHelper()
