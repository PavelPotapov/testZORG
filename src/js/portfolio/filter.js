import { delay } from "../utils"
import { popupHelper } from "./popupImages"
import { GameItemsHelper } from "./gameItems"

const gameItemsHelper = new GameItemsHelper()

class FilterHelper {
	constructor() {
		this.selectors = {
			submitBtn: "[data-js='filter-submit']",
			clearBtn: "[data-js='filter-clear']",
			filterBtn: "[data-js='filter']",
			filterList: "[data-js='filter-list']",
			form: "[data-js='form-filter']",
			checkboxes: "[data-js='filter-check']",
		}
		this.state = {
			filterActive: false,
			checked: false,
			clearBtnShown: false,
			searchBtnShown: true,
		}
		this.classes = {
			activeFilter: "portfolio__filter-list--active",
			activeSubmit: "portfolio__filter-submit--active",
			activeClearBtn: "portfolio__filter-clear--active",
			hiddenClearBtn: "portfolio__filter-clear--hidden",
		}

		this.currentChecked = 0 //кол-во выбранных checkbox элементов
		this.findElements()
		this.acceptEvents()
	}

	findElements() {
		this.filterBtn = document.querySelector(this.selectors.filterBtn)
		this.filterList = document.querySelector(this.selectors.filterList)
		this.clearBtn = document.querySelector(this.selectors.clearBtn)
		this.submitBtn = document.querySelector(this.selectors.submitBtn)
		this.form = document.querySelector(this.selectors.form)
		this.checkboxes = document.querySelectorAll(this.selectors.checkboxes)
	}

	async createFilterRequest(url, formData) {
		try {
			gameItemsHelper.clearContents()
			gameItemsHelper.showLoader()

			const response = await fetch(url, { method: "POST", body: formData })

			if (!response.ok) {
				throw new Error("Ошибка выполнения запроса")
			}

			const gameItems = await response.json()
			return gameItems
		} catch (error) {
			console.log(error)
		}
	}

	bindFormSubmit() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault()
			const formData = new FormData(this.form)
			for (let pair of formData.entries()) {
			}
			const data = JSON.parse(this.form.dataset.jsDetails)
			this.createFilterRequest(data.url, formData)
				.then((response) => {
					gameItemsHelper.createItems(response)
					//popupHelper.findGameItems()
					//console.log(popupHelper.items)
				})
				.catch((error) => {})
		})
	}

	bindCheckboxesClick() {
		this.checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("change", (e) => {
				if (e.target.checked) {
					this.state.clearBtnShown = true
					this.currentChecked += 1
					this.clearBtn.classList.add(this.classes.activeClearBtn)
				} else {
					this.currentChecked -= 1
					if (this.currentChecked === 0) {
						this.state.clearBtnShown = false
						this.clearBtn.classList.remove(this.classes.activeClearBtn)
					}
				}
			})
		})
	}

	bindClearBtnClick() {
		this.clearBtn.addEventListener("click", () => {
			this.checkboxes.forEach((checkbox) => {
				checkbox.checked = false
			})
			this.currentChecked = 0
			this.state.clearBtnShown = false
			this.clearBtn.classList.remove(this.classes.activeClearBtn)
		})
	}

	bindFilterClick() {
		this.filterBtn.addEventListener("click", () => {
			this.toggleFilter()
		})
	}

	toggleFilter() {
		this.state.filterActive = !this.state.filterActive
		if (this.state.filterActive) {
			this.filterList.classList.add(this.classes.activeFilter)
			this.submitBtn.classList.add(this.classes.activeSubmit)
			if (this.state.clearBtnShown) {
				this.clearBtn.classList.remove(this.classes.hiddenClearBtn)
			}
		} else {
			if (this.state.clearBtnShown) {
				this.clearBtn.classList.add(this.classes.hiddenClearBtn)
			}

			this.filterList.classList.remove(this.classes.activeFilter)
			this.submitBtn.classList.remove(this.classes.activeSubmit)
		}
	}

	acceptEvents() {
		this.bindFilterClick()
		this.bindCheckboxesClick()
		this.bindClearBtnClick()
		this.bindFormSubmit()
	}
}

new FilterHelper()
