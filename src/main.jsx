import React from "react"
import ReactDOM from "react-dom/client"
import Popup from "@/popup"
// todo 在popup页面调试content script，仅用于开发环境，build前记得要注释掉。
// import '@/content'

import { ConfigProvider } from "antd"
// 引入Ant Design中文语言包
import zhCN from "antd/locale/zh_CN"
// 全局样式
import "@/common/styles/frame.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ConfigProvider
			locale={zhCN}
			theme={{
				token: {
					// Seed Token，影响范围大
					colorPrimary: "#7ab472",
					// 派生变量，影响范围小
					colorBgContainer: "#f6ffed"
				}
			}}
		>
			<Popup />
		</ConfigProvider>
	</React.StrictMode>
)
