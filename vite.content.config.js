import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { CRX_CONTENT_OUTDIR } from "./globalConfig"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		// 输出目录
		outDir: CRX_CONTENT_OUTDIR,
		lib: {
			entry: [path.resolve(__dirname, "src/content/index.jsx")],
			// content script 不支持ES6, 因此不使用es模式，需要改为cjs模式
			formats: ["cjs"],
			// 设置生成的文件名
			fileName: () => {
				// 将文件后缀强制定为js，否则会生成cjs的后缀名
				return "content.js"
			}
		},
		rollupOptions: {
			output: {
				assetFileNames: () => {
					// 附属文件名，content script 会生成配套的css
					return "content.css"
				}
			}
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	define: {
		"process.env.NODE_ENV": null
	},
	plugins: [react()]
})
