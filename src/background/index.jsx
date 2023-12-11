/*global chrome*/
import { apiReqs } from "@/api"
import { MAIN_URL } from "@/api"
let userInfo = null
let queryInterval = null
let cookieString = ""
let suspend = false
const msgQueryAlarm = "msg-query-alarm"
const msgNotificationId = "UserReplyNotification"

// 初始化操作
chrome.runtime.onInstalled.addListener(initMsgNotify)
chrome.runtime.onStartup.addListener(initMsgNotify)

// 浏览器关闭后清除一些事件
chrome.runtime.onSuspend.addListener(function () {
	clearInterval(queryInterval)
})

// 监听与popup页面的通信
chrome.runtime.onMessage.addListener((message, sender, response) => {
	// 初始化返回用户信息给popup
	if (message.type == "initPopup") {
		chrome.cookies.getAll({ url: MAIN_URL }, res => {
			console.log("background res:", res)
			if (res && res.length > 0) {
				cookieString = ""
				userInfo = null
				res.forEach(item => {
					if (item.name === "LUP") {
						userInfo = decodeURIComponent(item.value)
					}
					cookieString += `${item.name}=${item.value};`
				})
			} else {
				cookieString = ""
				userInfo = null
			}
			console.log("发出消息:", userInfo, cookieString)
			response({ userInfo, cookieString })
		})

		return true
	}

	// 用户已查看则可以继续轮询
	if (message.type == "messageChecked") {
		console.log("messageChecked: Received!")
		// 继续轮询
		suspend = false
		// 重置图标信息
		chrome.action.setBadgeText({ text: "" })
		return true
	}
})

function initMsgNotify() {
	chrome.action.setBadgeTextColor({ color: "#FFFFFF" })
	chrome.action.setBadgeBackgroundColor({ color: "#FF0000" })
	chrome.alarms.create(msgQueryAlarm, {
		delayInMinutes: 0,
		periodInMinutes: 5
	})
	console.log("发出警报")
}

chrome.alarms.onAlarm.addListener(alarm => {
	console.log("监听到的警报信息：", alarm)
	if (alarm.name === msgQueryAlarm) {
		console.log("1 userInfo：", userInfo)
		console.log("2 cookieString：", cookieString)
		console.log("3 suspend: ", suspend)

		if (userInfo && cookieString && !suspend) {
			apiReqs.getUnreadMsgNum({
				data: { user_name: userInfo },
				cookies: cookieString,
				success: res => {
					console.log("未读消息数获取成功", res)
					// 发生请求错误要停止请求
					if (res.errno !== 0) {
						suspend = true
					}

					if (res.data && res.data.total > 0) {
						console.log("有新消息")
						const text =
							parseInt(res.data.total) > 99 ? "99+" : String(res.data.total)
						// 新消息状态
						chrome.action.setBadgeText({ text: text })
						// 暂停轮询
						suspend = true

						const options = {
							type: "basic",
							iconUrl: "/images/app.png",
							title: "LDS Admin 消息中心提醒",
							message: "您有" + res.data.total + "条未读消息！"
						}

						chrome.notifications.clear(msgNotificationId)
						chrome.notifications.create(msgNotificationId, options)
					}
				},
				fail: error => {
					console.log("未读消息数获取失败", error)
				}
			})
		}
	}
})

chrome.notifications.onClicked.addListener(notificationId => {
	if (notificationId === msgNotificationId) {
		chrome.tabs.create({
			url: `${MAIN_URL}/pcgameconsole/ConsoleUserMessages/index`
		})
	}
})
