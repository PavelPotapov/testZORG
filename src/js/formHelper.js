import { postFormRequest } from "./API/contactFormAPI"
import { singleToneLoader } from "./loader"
import { createErrorToast, createSuccessfulToast } from "./utils"

singleToneLoader
/**
 * Нужен для обработки форм на страницах
 * @class
 */
export class FormHelper {
	/**
	 * @param {string} selector - селектор формы
	 */
	constructor(selector) {
		this.selector = selector
		this.findElements()
		this.acceptEvents()
		this.loader = singleToneLoader
	}

	findElements() {
		this.form = document.querySelector(this.selector)
	}

	async submitHandler(e) {
		e.preventDefault()
		try {
			this.loader.showLoader()
			const response = await postFormRequest(
				this.form.action,
				new FormData(this.form)
			)
			if (response) {
				createSuccessfulToast("Данные успешно отправлены 🚀")
			} else {
				createErrorToast()
			}
		} catch (e) {
			console.log(e)
		} finally {
			this.loader.hideLoader()
		}
	}

	bindSubmitForm() {
		if (this.form) {
			this.form.addEventListener("submit", (e) => {
				this.submitHandler(e)
			})
		}
	}

	acceptEvents() {
		this.bindSubmitForm()
	}
}
