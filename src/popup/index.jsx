/*global chrome*/
// import { RouterProvider } from "react-router-dom"
// import { globalRouters } from "@/popup/router"
import "./style.scss"
import { useEffect, useState } from "react"
import MsgList from "@/popup/pages/msg-list"
import Login from "@/popup/pages/login"
function Popup() {
	const [username, setUsername] = useState("")
	useEffect(() => {
		chrome.runtime.sendMessage({ type: "initPopup" }, function (message) {
			console.log("popup msg: ", message)
			if (message.userInfo) {
				// 创建URLSearchParams对象，并传入参数字符串
				const urlParams = new URLSearchParams(message.userInfo)
				// 获取name参数的值
				const nameValue = urlParams.get("username")
				setUsername(nameValue)
			}
		})
	}, [])

	return (
		<div className="P-container">
			{username ? <MsgList username={username} /> : <Login />}
		</div>
	)
}

export default Popup
