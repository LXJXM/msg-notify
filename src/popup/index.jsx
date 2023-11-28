/*global chrome*/
// import { RouterProvider } from "react-router-dom"
// import { globalRouters } from "@/popup/router"
import "./style.scss"
import { useEffect, useState } from "react"
import MsgList from "@/popup/pages/msg-list"
import Login from "@/popup/pages/login"
import { apiReqs } from "@/api"
function Popup() {
	const [msgList, setMsgList] = useState([])
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
			
			// if (userInfo && userInfo.access_token) {
			// 	$(".notice-main").css("display", "block")
			// 	$(".not-logged").css("display", "none")
			// 	let firstItem = $(".tab-items").eq(0)
			// 	firstItem.css("color", "#00a8f3")
			// 	firstItem.find(".focus-img").css("display", "block")
			// 	firstItem.find(".blur-img").css("display", "none")
			// 	setTimeout(() => {
			// 		renderMessage() //留言
			// 		noReadMessage() //未读消息
			// 	}, 1000)
			// } else {
			// 	userInfo = {}
			// 	$(".notice-main").css("display", "none")
			// 	$(".not-logged").css("display", "flex")
			// }
			// changeMenu() //切换菜单
		})

		// apiReqs.getMsgList({
		// 	data: {
		// 		user_name: "zhanghengpu",
		// 		page: 1,
		// 		limit: 20
		// 	},
		// 	success: res => {
		// 		console.log("列表数据获取成功", res)
		// 		console.log(res.data.lists)
		// 		setMsgList(res.data.lists || [])
		// 	},
		// 	fail: error => {
		// 		console.log("列表数据获取失败", error)
		// 	}
		// })
		// https://admin-aliyun-test.ludashi.com/
	}, [])
	// return <RouterProvider router={globalRouters} />

	return (
		<div className="P-container">
			{username ? <MsgList username={username} list={msgList} /> : <Login />}
		</div>
	)
}

export default Popup
