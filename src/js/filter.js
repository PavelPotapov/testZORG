class FilterHelper {
	constructor(selector, target) {
		this.node = document.querySelector(selector)
		this.target = document.querySelector(target)
		this.state = {
			active: false,
		}
		this.classes = {
			active: "portfolio__filter-list--active",
		}
		this.acceptEvents()
	}
	toggleFilter(event) {
		if (this.state.active) {
			this.target.classList.remove(this.classes.active)
		} else {
			this.target.classList.add(this.classes.active)
		}
		this.state.active = !this.state.active
	}

	acceptEvents() {
		this.node.addEventListener("click", this.toggleFilter.bind(this))
	}
}

const selector = "[data-js='filter']"
const selector2 = "[data-js='filter-btn']"
const target = ".portfolio__filter-list"
new FilterHelper(selector2, target)
new FilterHelper(selector, target)
