export async function postFormRequest(url, formData) {
	try {
		const response = await fetch(url, { method: "POST", body: formData })
		return response.ok
	} catch (error) {
		return false
	}
}
