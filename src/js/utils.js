import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"
/**
 * Функция задержки
 * @param {number} ms - миллисекунды для задержки
 * @returns {Promise}
 */
export function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms)
	})
}
/**
 * Функция создания элемента
 * @param {string} elementType - Тип элемента, div, li и тд.тп.
 * @param {Object} attributes - Атрибуты элемента
 * @param {HTMLElement | undefined} parentNode - Родительский элемент, если нет, значит будет смотреть на селектор далее
 * @param {string | undefined} parentElementSelector - Селектор родительского элемент, если нет, значит будет смотреть на селектор далее.
 * Должен быть либо селектор родителя, либо родитель
 * @returns {HTMLElement | Error}
 */
export function createElement(
	elementType,
	attributes,
	parentNode = undefined,
	parentElementSelector
) {
	try {
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
	} catch (e) {
		throw new Error(e)
	}
}
/**
 * Функция отключения скролла на странице
 * @returns {undefined}
 */
export function disableScroll() {
	document.documentElement.classList.add("disabled-scroll")
}
/**
 * Функция включения скролла на странице
 * @returns {undefined}
 */
export function enableScroll() {
	document.documentElement.classList.remove("disabled-scroll")
}
/**
 * Функция удаления всех дочерних элементов из переданного узла, включая слушателей событий
 * @param {HTMLElement} node - Узел
 * @returns {undefined | Error}
 */
export function clearChildElements(node) {
	try {
		while (node.firstChild) {
			node.removeChild(node.firstChild)
		}
	} catch (err) {
		throw new Error(err)
	}
}
/**
 * Функция создания уведомления об успехе.
 * Обертка над классом Toastify из библиотеки toastify-js
 * @param {string | undefined} text - Текст сообщения, если не отправим, будет дефолтное уведомление
 * @returns {undefined}
 */
export function createSuccessfulToast(text) {
	Toastify({
		text: text ?? "Данные успешно отправлены. Мы свяжемся с вами 🚀",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_success",
		onClick: function () {}, // Callback after click
	}).showToast()
}
/**
 * Функция создания уведомления о неудаче или ошибке.
 * Обертка над классом Toastify из библиотеки toastify-js
 * @param {string | undefined} text - Текст сообщения, если не отправим, будет дефолтное уведомление
 * @returns {undefined}
 */
export function createErrorToast(text) {
	Toastify({
		text: text ?? "Что-то пошло не так, попробуйте позже 🤨",
		duration: 3000,
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
/**
 * Функция получения данных из data-атрибутов элемента
 * @param {HTMLElement} node - DOM элемент, в котором ищем
 * @param {string} dataSelector - Selector дата атрибута, например "[data-js='test']"
 * @returns {Object | null}
 */
export function getDataFromDataJS(node, dataSelector) {
	try {
		return JSON.parse(node.getAttribute(dataSelector))
	} catch (e) {
		return null
	}
}
/**
 * Установка значения для CSS переменной.
 * @param {string} variableName - Имя CSS переменной.
 * @param {string} value - Значение, которое нужно установить.
 * @returns {undefined}
 */
export function setCssVariable(variableName, value) {
	document.documentElement.style.setProperty(variableName, value)
}
