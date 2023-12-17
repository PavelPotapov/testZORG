// function deleteFile() {
// 	document.getElementById("input-file").value = ""
// }

// document.querySelector("#test").addEventListener("click", function (e) {
// 	e.preventDefault()
// 	deleteFile()
// })
import { delay, disableScroll } from "./utils"

class ContactFormHelper {
	constructor() {
		this.state = {
			open: false,
			deleteBtnShown: false,
			filesUpload: false,
		}

		this.selectors = {
			deleteBtn: "[data-js='delete-file']",
			modalCrossBtn: "[data-js='contact-modal-cross']",
			contactFormModal: "[data-js='contact-modal']",
			overlay: "[data-id='popup-overlay']",
			inputFile: "#input-file",
			getFileBtn: "[data-js='get-file-btn']",
			form: "[data-js='contact-form']",
		}

		this.classes = {
			openContactForm: "contact-modal--open",
			overlayActive: "active",
			deleteBtnActive: "contact-modal__delete-file--shown",
		}

		this.findElements()
		this.acceptEvents()
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
	}

	bindClickGetFileBtn() {
		if (this.getFileBtn) {
			this.getFileBtn.addEventListener("click", (e) => {
				e.preventDefault()
				this.inputFile.click()
			})
		}
	}

	toggleModalContact() {
		if (this.contactFormModal && this.overlay) {
			this.state.open = !this.state.open
			if (this.state.open) {
				disableScroll()
				this.overlay.classList.add(this.classes.overlayActive)
				this.contactFormModal.classList.add(this.classes.openContactForm)
				delay(500).then(() => (this.contactFormModal.style.overflowY = "auto"))
			} else {
				this.contactFormModal.classList.remove(this.classes.openContactForm)
				this.overlay.classList.remove(this.classes.overlayActive)
			}
		}
	}

	bindClickOverlay() {}

	bindClickModalCrossBtn() {
		if (this.modalCrossBtn && this.contactFormModal) {
			this.modalCrossBtn.addEventListener("click", () => {
				this.toggleModalContact()
			})
		}
	}

	showFileName() {
		if (this.inputFile.files && this.inputFile.files.length > 0) {
			this.getFileBtn.textContent = this.inputFile.files[0].name
		} else {
			this.getFileBtn.textContent = "Прикрепить резюме"
		}
	}

	bindChangeInputFile() {
		this.inputFile.addEventListener("change", (e) => {
			this.state.filesUpload = true
			this.state.deleteBtnShown = true
			this.deleteBtn.classList.add(this.classes.deleteBtnActive)
			this.showFileName()
		})
	}

	bindDeleteBtnClick() {
		if (this.deleteBtn) {
			this.deleteBtn.addEventListener("click", () => {
				this.inputFile.value = null
				console.log("Файл удален")
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
		document.querySelector("#test").addEventListener("click", () => {
			this.toggleModalContact()
		})
	}
}

new ContactFormHelper()
