/*global chrome*/
import { apiRequest, apiReqs } from "@/api"
import { MAIN_URL } from "@/common/config/index.js"
let userInfo = null
// manifest.json的Permissions配置需添加declarativeContent权限
chrome.runtime.onInstalled.addListener(function () {
	// 默认先禁止Page Action。如果不加这一句，则无法生效下面的规则
	// chrome.action.disable()
	// chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
	// 	// 设置规则
	// 	let rule = {
	// 		// 运行插件运行的页面URL规则
	// 		conditions: [
	// 			new chrome.declarativeContent.PageStateMatcher({
	// 				pageUrl: {
	// 					// 适配所有域名以“www.”开头的网页
	// 					// hostPrefix: 'www.'
	// 					// 适配所有域名以“.antgroup.com”结尾的网页
	// 					// hostSuffix: ".juejin.cn"
	// 					// 适配域名为“ant-design.antgroup.com”的网页
	// 					// hostEquals: "admin-aliyun-test.ludashi.com"
	// 					// 适配https协议的网页
	// 					// schemes: ['https'],
	// 				}
	// 			})
	// 		],
	// 		actions: [new chrome.declarativeContent.ShowAction()]
	// 	}
	// 	// 整合所有规则
	// 	const rules = [rule]
	// 	// 执行规则
	// 	chrome.declarativeContent.onPageChanged.addRules(rules)
	// })
	// todo test
	// setInterval(() => {
	// 	apiReqs.getUnreadMsgNum({
	// 		data: { user_name: "zhanghengpu" },
	// 		success: res => {
	// 			console.log("未读消息数获取成功", res)
	// 			console.log(res.data.total)
	// 			// todo 只要消息不是零就闪烁
	// 			if (res.data.total >= 0) {
	// 				chrome.action.setBadgeText({ text: "new" })
	// 				chrome.action.setBadgeTextColor({ color: "#FFFFFF" })
	// 				chrome.action.setBadgeBackgroundColor({ color: "#FF0000" })
	// 			} else {
	// 				// 重置状态
	// 				chrome.action.setBadgeText({ text: "" })
	// 			}
	// 		},
	// 		fail: error => {
	// 			console.log("未读消息数获取失败", error)
	// 		}
	// 	})
	// }, 5000)

	console.log(111)
	console.log(222)
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// 接收来自popup script的消息，requset里不允许传递function和file类型的参数
	chrome.tabs.query({ currentWindow: true, active: true }, function () {
		const { type } = message
		// 接收来自content的api请求
		if (type === "apiRequest") {
			let { config } = message
			// API请求成功的回调
			config.success = data => {
				data.result = "succ"
				sendResponse(data)
			}
			// API请求失败的回调
			config.fail = msg => {
				sendResponse({
					result: "fail",
					msg
				})
			}

			// 发起请求
			apiRequest(config)
		}
	})
	return true
})

chrome.runtime.onMessage.addListener((message, sender, response) => {
	if (message.type == "initPopup") {
		response({ userInfo })
		return true
	}


	//  todo 还不确定要不要用
	if (message.type == "updateBadgeText") {
		if (message.text > 0) {
			chrome.action.setBadgeText({ text: message.text.toString() })
		} else {
			chrome.action.setBadgeText({ text: "" })
		}
		return true
	}
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete" && tab.active) {
		// 当页面加载完成且当前标签页处于活动状态时
		console.log("tab updataed!")
		console.log("main url: ", MAIN_URL)
		chrome.cookies.get({ url: MAIN_URL, name: "LUP" }, res => {
			console.log("background res:", res)
			if (res && res.value) {
				userInfo = decodeURIComponent(res.value)
			} else {
				userInfo = null
			}
			console.log("backround userInfo:", userInfo)
		})

		// 打开任意页面时检测 admin.ludashi.com 域名下面的用户cookie是否存在即可

		// 如果未收到响应或响应中不包含会话数据
		// const url = new URL(tab.url)
		// console.log(url.hostname)

		// let getActive = chrome.tabs.query({
		// 	active: true,
		// 	currentWindow: true
		// })

		// let getting = chrome.cookies.get({
		// 	url: tabs[0].url,
		// 	name: "LUP"
		// })

		// {
		// 	"domain": "admin-aliyun-test.ludashi.com",
		// 	"expirationDate": 1701164709.982491,
		// 	"hostOnly": true,
		// 	"httpOnly": false,
		// 	"name": "LUP",
		// 	"path": "/",
		// 	"sameSite": "unspecified",
		// 	"secure": false,
		// 	"session": false,
		// 	"storeId": "0",
		// 	"value": "id%3D209%26username%3Dlijiaming%26email%3Dlijiaming%2540ludashi.com%26name%3D%25E6%259D%258E%25E5%2598%2589%25E6%2598%258E%26enabled%3D1%26createtime%3D2022-03-11%2B11%253A19%253A44%26auth_type%3D0"
		// }

		// 能从cookie中解出name说明已经登录
	}
})

// console.log("background:", chrome.cookies)
