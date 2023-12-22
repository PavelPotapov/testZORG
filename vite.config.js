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
