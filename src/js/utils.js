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
	document.documentElement.classList.toggle("disabled-scroll", true)
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
