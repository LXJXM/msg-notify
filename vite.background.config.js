import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { CRX_BACKGROUND_OUTDIR } from "./globalConfig"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		// 输出目录
		outDir: CRX_BACKGROUND_OUTDIR,
		lib: {
			entry: [path.resolve(__dirname, "src/background/index.jsx")],
			// background script 不支持ES6, 因此不使用es模式，需要改为cjs模式
			formats: ["cjs"],
			// 设置生成的文件名
			fileName: () => {
				// 将文件后缀强制定为js，否则会生成cjs的后缀名
				return "background.js"
			}
		},
		rollupOptions: {
			output: {
				assetFileNames: () => {
					// 附属文件名，background script 会生成配套的css
					return "background.css"
				}
			}
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	// define: {
	// 	"process.env.NODE_ENV": null
	// },
	plugins: [react()]
})
