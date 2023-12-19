/**
 * Функция отправки данных с форм
 * @param {string} url - ручка для отправки
 * @param {FormData} formData - данные формы
 * @returns {bool} - true - все прошло успешно, false - возникли ошибки
 */
export async function postFormRequest(url, formData) {
	try {
		const response = await fetch(url, { method: "POST", body: formData })
		return response.ok
	} catch (error) {
		return false
	}
}
