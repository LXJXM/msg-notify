/*global chrome*/
import { apiRequest, apiReqs } from "@/api"

// manifest.json的Permissions配置需添加declarativeContent权限
chrome.runtime.onInstalled.addListener(function () {
	// 默认先禁止Page Action。如果不加这一句，则无法生效下面的规则
	chrome.action.disable()
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// 设置规则
		let rule = {
			// 运行插件运行的页面URL规则
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: {
						// 适配所有域名以“www.”开头的网页
						// hostPrefix: 'www.'
						// 适配所有域名以“.antgroup.com”结尾的网页
						hostSuffix: ".juejin.cn"
						// 适配域名为“ant-design.antgroup.com”的网页
						// hostEquals: "admin-aliyun-test.ludashi.com"
						// 适配https协议的网页
						// schemes: ['https'],
					}
				})
			],
			actions: [new chrome.declarativeContent.ShowAction()]
		}
		// 整合所有规则
		const rules = [rule]
		// 执行规则
		chrome.declarativeContent.onPageChanged.addRules(rules)
	})
	// todo test
	setInterval(() => {
		apiReqs.getUnreadMsgNum({
			data: { user_name: "zhanghengpu" },
			success: res => {
				console.log("未读消息数获取成功", res)
				console.log(res.data.total)
				// todo 只要消息不是零就闪烁
				chrome.action.setBadgeText({ text: String(res.data.total) })
				chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] })
			},
			fail: error => {
				console.log("未读消息数获取失败", error)
			}
		})
	}, 2000)

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
