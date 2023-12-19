import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"
import { GameItemsHelper } from "./portfolio/gameItems"

export function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms)
	})
}

export function createElement(
	elementType,
	attributes,
	parentNode = undefined,
	parentElementSelector
) {
	const newElement = document.createElement(elementType)
	const parentElement =
		parentNode ?? document.querySelector(parentElementSelector)
	if (attributes) {
		for (let key in attributes) {
			newElement.setAttribute(key, attributes[key])
		}
	}
	if (parentNode) {
		parentElement.appendChild(newElement)
	}
	return newElement
}

export function disableScroll() {
	document.documentElement.classList.add("disabled-scroll")
}

export function enableScroll() {
	document.documentElement.classList.remove("disabled-scroll")
}

export function clearChildElements(node) {
	try {
		while (node.firstChild) {
			node.removeChild(node.firstChild)
		}
	} catch (err) {
		throw new Error(err)
	}
}

export function createSuccessfulToast(text) {
	Toastify({
		text: text ?? "Данные успешно отправлены. Мы свяжемся с вами 🚀",
		duration: 3000,
		//destination: "https://github.com/apvarun/toastify-js",
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_success",
		onClick: function () {}, // Callback after click
	}).showToast()
}

export function createErrorToast(text) {
	Toastify({
		text: text ?? "Что-то пошло не так, попробуйте позже 🤨",
		duration: 300000,
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_error",
		style: {
			background: "rgba(121,9,9,1)",
		},
		onClick: function () {}, // Callback after click
	}).showToast()
}
