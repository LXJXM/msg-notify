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
			const userInfo = message.userInfo
			console.log("popup: ", userInfo)
			// 创建URLSearchParams对象，并传入参数字符串
			const urlParams = new URLSearchParams(userInfo)

			// 获取name参数的值
			const nameValue = urlParams.get("name")

			// 解码name值为中文
			const decodedName = decodeURIComponent(nameValue)
			if (decodedName) {
				setUsername(decodedName)
				console.log(decodedName) // 输出：李嘉明
			}
			// todo 进一步调整功能，实现点击和那个消息通知一样的登录效果

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
			<MsgList username={username} list={msgList} />
		</div>
	)
}

export default Popup
