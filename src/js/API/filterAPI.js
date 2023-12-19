/**
 * Функция отправки данных для фильтрации
 * @param {string} url - ручка для отправки данных фильтра
 * @param {FormData} formData - данные формы
 * @returns {Object[] | Error} - ответ список объектов для отображения на странице профиля 
 * @example
 * Что жду от сервера
 * [{"images": ["../../public/img/team.png", "../../public/img/team.png", "../../public/img/team.png"], "logo": "../../public/img/team.png",
    "title": "Brawl Royale", "date": "25.05.2022", "text": "Lorem ipsum dolor sit amet consectetur. Massa id lobortis viverra interdum."}, {"images": ["../../public/img/team.png", "../../public/img/team.png", "../../public/img/team.png"], "logo": "../../public/img/team.png", "title": "Brawl Royale", "date": "25.05.2022", "text": "Lorem ipsum dolor sit amet consectetur. Massa id lobortis viverra interdum."}, {"images": ["../../public/img/team.png", "../../public/img/team.png", "../../public/img/team.png"], "logo": "../../public/img/team.png", "title": "Brawl Royale", "date": "25.05.2022", "text": "Lorem ipsum dolor sit amet consectetur. Massa id lobortis viverra interdum."}]
 */
export async function postFilterRequest(url, formData) {
	try {
		const response = await fetch(url, { method: "POST", body: formData })
		if (!response.ok) {
			throw new Error("Ошибка выполнения запроса")
		}
		return response.json()
	} catch (error) {
		throw new Error(error)
	}
}
