import { postFormRequest } from "./API/contactFormAPI"
import { singleToneLoader } from "./loader"
import {
	clearChildElements,
	createElement,
	delay,
	disableScroll,
	enableScroll,
} from "./utils"
import { createErrorToast, createSuccessfulToast } from "./utils"

class ContactFormHelper {
	constructor() {
		if (!ContactFormHelper.instance) {
			ContactFormHelper.instance = this
		}

		this.state = {
			open: false,
			deleteBtnShown: false,
			filesUpload: false,
		}

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

		this.classes = {
			openContactForm: "contact-modal--open",
			overlayActive: "active",
			deleteBtnActive: "contact-modal__delete-file--shown",
		}

		this.dataAttributes = {
			form: "data-js-details",
			item: "data-js-contact-form-info",
		}

		this.loader = singleToneLoader
		this.findElements()
		this.acceptEvents()
		return ContactFormHelper.instance
	}

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

	clearContents() {
		this.title.innerHTML = ""
		this.date.innerHTML = ""
		this.workType.innerHTML = ""
		this.message.innerHTML = ""
		clearChildElements(this.requirementsList)
		this.deleteBtn.click()
	}

	getDataFromDataJS(node, dataSelector) {
		try {
			const data = JSON.parse(node.getAttribute(dataSelector))
			return data
		} catch (e) {
			console.error(e)
			return null
		}
	}

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

	toggleModalContact(dataJS) {
		if (this.contactFormModal && this.overlay) {
			this.state.open = !this.state.open
			if (this.state.open) {
				disableScroll()
				this.clearContents()
				this.putInfoInside(dataJS)
				this.overlay.classList.add(this.classes.overlayActive)
				this.contactFormModal.classList.add(this.classes.openContactForm)
				delay(500).then(() => (this.contactFormModal.style.overflowY = "auto"))
			} else {
				this.contactFormModal.classList.remove(this.classes.openContactForm)
				this.overlay.classList.remove(this.classes.overlayActive)
				enableScroll()
			}
		}
	}

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

	async sendFormData() {
		try {
			const formData = new FormData(this.form)
			const url = JSON.parse(this.form.getAttribute(this.dataAttributes.form))[
				"url"
			]
			this.loader.showLoader()
			const response = await postFormRequest(url, formData)
			if (response) {
				this.loader.hideLoader()
				createSuccessfulToast()
				this.toggleModalContact()
				await delay(500)
				this.clearContents()
				this.clearFormBtn.click()
			} else {
				createErrorToast()
			}
		} catch (err) {
			this.loader.hideLoader()
			createErrorToast()
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
				const dataJS = this.getDataFromDataJS(
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
