class FilterHelper {
	constructor(selector, target) {
		this.node = document.querySelector(selector)
		this.target = document.querySelector(target)
		this.state = {
			active: false,
		}
		this.classes = {
			active: ".portfolio__filter-list--active",
		}
		this.bind()
	}
	toggleFilter(event) {
		if (this.state.active) {
			this.target.classList.remove("portfolio__filter-list--active")
		} else {
			this.target.classList.add("portfolio__filter-list--active")
		}

		this.state.active = !this.state.active
	}

	bind() {
		this.node.addEventListener("click", this.toggleFilter.bind(this))
	}
}

const selector = "[data-js='filter']"
const target = ".portfolio__filter-list"

const selector2 = "[data-js='filter-btn']"
new FilterHelper(selector2, target)
new FilterHelper(selector, target)
