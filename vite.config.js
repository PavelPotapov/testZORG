import { resolve } from "path"
import { defineConfig } from "vite"

const root = resolve(__dirname, "src")
const ourDir = resolve(__dirname, "build")

export default defineConfig({
	root: "./src",
	build: {
		outDir: "../build",
		assetsDir: "assets",
		input: {
			main: resolve(__dirname, "index.html"),
			studia: resolve(__dirname, "pages", "studia", "index.html"),
			portfolio: resolve(__dirname, "pages", "portfolio", "index.html"),
			advance: resolve(__dirname, "pages", "advance", "index.html"),
			facility: resolve(__dirname, "pages", "facility", "index.html"),
			404: resolve(__dirname, "pages", "404", "index.html"),
		},
	},
})
