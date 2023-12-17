import { resolve } from "path"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import pages from "./vitejs/pages.config"
import { pageData } from "./vitejs/handleBarsContext"

const pagesInput = {}

pages.forEach((page) => {
	pagesInput[page.name] = page.path
})

export default defineConfig({
	root: "./src",
	build: {
		outDir: "../build",
		assetsDir: "assets",
		rollupOptions: {
			input: {
				...pagesInput,
			},
		},
		// input: {
		// 	main: resolve(__dirname, "index.html"),
		// 	studia: resolve(__dirname, "pages", "studia", "index.html"),
		// 	portfolio: resolve(__dirname, "pages", "portfolio", "index.html"),
		// 	advance: resolve(__dirname, "pages", "advance", "index.html"),
		// 	facility: resolve(__dirname, "pages", "facility", "index.html"),
		// 	404: resolve(__dirname, "pages", "404", "index.html"),
		// 	modal: resolve(__dirname, "pages", "modal", "index.html"),
		// },
	},
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "partials"),
			templateExtension: ".hbs",
			context(pagePath) {
				return pageData[pagePath]
			},
		}),
	],
})
