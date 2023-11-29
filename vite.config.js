import { resolve } from "path"
import { defineConfig } from "vite"

const root = resolve(__dirname, "src")
const ourDit = resolve(__dirname, "build")

export default defineConfig({
	root: "./src",
	build: {
		outDir: "../build",
		assetsDir: "assets",
		input: {
			main: resolve(__dirname, "index.html"),
			about: resolve(__dirname, "pages", "about", "index.html")
		}
	},
})
