import { resolve } from "path"

const pages = [
	{ name: "main", path: resolve(__dirname, "../src/index.html") },
	{
		name: "advance",
		path: resolve(__dirname, "../src/pages", "advance.html"),
	},
	{
		name: "facility",
		path: resolve(__dirname, "../src/pages", "facility.html"),
	},
	{ name: "404", path: resolve(__dirname, "../src/pages", "404.html") },

	{
		name: "portfolio",
		path: resolve(__dirname, "../src/pages", "portfolio.html"),
	},
]

export default pages
