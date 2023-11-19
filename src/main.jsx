import React from "react"
import ReactDOM from "react-dom/client"
import Popup from "@/popup"
import { ConfigProvider } from "antd"
// 引入Ant Design中文语言包
import zhCN from "antd/locale/zh_CN"
// 全局样式
import "@/common/styles/frame.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ConfigProvider locale={zhCN}>
			<Popup />
		</ConfigProvider>
	</React.StrictMode>
)
