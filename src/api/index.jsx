// 目标地址
export const MAIN_URL = "http://admin-aliyun-test.ludashi.com"
// 请求服务器地址（开发环境模拟请求地址）
let API_DOMAIN =
	"http://admin-aliyun-test.ludashi.com/pcgameconsole/ConsoleUserMessages"
// 请求服务器地址（正式build环境真实请求地址）
// if (import.meta.env.MODE === 'production') {
//     API_DOMAIN = 'http://localhost/api/'
// }

// API请求正常，数据正常
export const API_CODE = {
	// API请求正常
	OK: 200,
	// API请求正常，数据异常
	ERR_DATA: 403,
	// API请求正常，空数据
	ERR_NO_DATA: 301,
	// API请求正常，登录异常
	ERR_LOGOUT: 401
}
// API请求异常报错内容
export const API_FAILED = "网络连接异常，请稍后再试"

// API请求汇总
export const apiReqs = {
	// 获取未读消息总数
	getUnreadMsgNum: config => {
		config.url = API_DOMAIN + "/MessageTotal"

		apiRequest(config)
	},
	// 获取消息列表
	getMsgList: config => {
		config.url = API_DOMAIN + "/MessageLists"
		apiRequest(config)
	},
	// 标记消息已读
	markMsgRead: config => {
		config.url = API_DOMAIN + "/MessageRead"
		apiRequest(config)
	}
}

/*
 * API请求封装（带验证信息）
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 * config.cookies: [必传]携带的用户凭证
 */

export function apiRequest(config) {
	console.log("config: ", config)
	// 如果没有设置config.data，则默认为{}
	if (config.data === undefined) {
		config.data = {}
	}

	// 如果没有设置config.method，则默认为post
	config.method = config.method || "get"

	// 请求头设置
	let headers = {}
	let url = config.url
	// 如果不长传文件，fetch()默认的Content-Type为text/plain;charset=UTF-8，需要手动进行修改。
	headers["Content-Type"] = "application/json;charset=UTF-8"
	headers["Cookie"] = config.cookies

	url += "?" + objectToQueryString(config.data)

	// 准备好请求的全部数据
	let axiosConfig = {
		method: config.method,
		headers
	}

	// 发起请求
	fetch(url, axiosConfig)
		.then(res => res.json())
		.then(result => {
			// 请求结束的回调
			config.done && config.done()
			// 请求成功的回调
			config.success && config.success(result)
		})
		.catch(() => {
			// 请求结束的回调
			config.done && config.done()
			// 请求失败的回调
			config.fail && config.fail(API_FAILED)
		})
}

function objectToQueryString(obj) {
	const keyValuePairs = []
	for (const key in obj) {
		keyValuePairs.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
		)
	}
	return keyValuePairs.join("&")
}
