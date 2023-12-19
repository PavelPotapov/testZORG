import { createElement, delay } from "../utils"
import { popupHelper } from "./popupImages"
import { GameItemsHelper } from "./gameItems"
import { singleToneLoader } from "../loader"

const gameItemsHelper = new GameItemsHelper()

class FilterHelper {
	constructor() {
		if (!FilterHelper.instance) {
			FilterHelper.instance = this
		}
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

		this.isSearching = false // был ли когда-то поиск, если да - то при клике на сброс фильтра будет вызывать submit для получения информации, если нет - то фильтр просто сбрасывает checkboxes
		this.currentChecked = 0 //кол-во выбранных checkbox элементов
		this.loader = singleToneLoader
		this.findElements()
		this.acceptEvents()
		return FilterHelper.instance
	}

	findElements() {
		this.filterBtn = document.querySelector(this.selectors.filterBtn)
		this.filterList = document.querySelector(this.selectors.filterList)
		this.clearBtn = document.querySelector(this.selectors.clearBtn)
		this.submitBtn = document.querySelector(this.selectors.submitBtn)
		this.form = document.querySelector(this.selectors.form)
		this.checkboxes = document.querySelectorAll(this.selectors.checkboxes)
		this.overlay = document.querySelector(this.selectors.overlay)
	}

	async createFilterRequest(url, formData) {
		try {
			gameItemsHelper.clearContents()
			this.loader.showLoader()
			const response = await fetch(url, { method: "POST", body: formData })

			if (!response.ok) {
				throw new Error("Ошибка выполнения запроса")
			}

			const gameItems = await response.json()
			return gameItems
		} catch (error) {
			this.loader.hideLoader()
			return error
		}
	}

	submitHandler(e) {
		function emptyData() {
			const info = createElement("p", {
				style: "color: #fff; font-size: 20px; font-family: Montserrat",
				"data-js": "game-item",
			})
			info.textContent = "По данному запросу ничего не найдено 🙃"
			gameItemsHelper.portfolioContent.appendChild(info)
		}

		this.isSearching = true
		e.preventDefault()
		if (this.isMobileSize) {
			//скрываем фильтр на мобильном разрешении
			this.toggleFilter()
		}
		const formData = new FormData(this.form)
		const data = JSON.parse(this.form.dataset.jsDetails)
		this.createFilterRequest(data.url, formData)
			.then(async (response) => {
				if (response) {
					await gameItemsHelper.clearContents()
					gameItemsHelper.createItems(response)
					popupHelper.findGameItems() //там же навешивается слушатель событий
					delay(500).then(() => {
						this.loader.hideLoader()
					})
				} else {
					emptyData()
				}
			})
			.catch((error) => {
				emptyData()
			})
	}

	bindFormSubmit() {
		this.form.addEventListener("submit", (e) => {
			this.submitHandler(e)
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
			if (this.isSearching) {
				this.submitBtn.click()
				this.isSearching = false
			}
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

	hideFilter(mathes) {
		if (mathes) {
			this.state.filterActive = false
			if (this.state.clearBtnShown) {
				this.clearBtn.classList.add(this.classes.hiddenClearBtn)
			}
			this.filterList.classList.remove(this.classes.activeFilter)
			this.submitBtn.classList.remove(this.classes.activeSubmit)
		}
	}

	bindMediaQuery() {
		this.isMobileSize = false
		const mobileWidthMediaQuery = window.matchMedia("(max-width: 1056px)")
		this.isMobileSizeChecker(mobileWidthMediaQuery.matches)
		mobileWidthMediaQuery.addEventListener("change", (event) => {
			this.isMobileSizeChecker(event.matches)
		})
	}

	isMobileSizeChecker(matches) {
		this.isMobileSize = matches ? true : false
	}

	acceptEvents() {
		this.bindMediaQuery()
		this.bindFilterClick()
		this.bindCheckboxesClick()
		this.bindClearBtnClick()
		this.bindFormSubmit()
	}
}

new FilterHelper()
