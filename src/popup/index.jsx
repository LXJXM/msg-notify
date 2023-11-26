// import { RouterProvider } from "react-router-dom"
// import { globalRouters } from "@/popup/router"
import "./style.scss"
import { useEffect, useState } from "react"
import MsgList from "@/popup/pages/msg-list"
import Login from "@/popup/pages/login"
import { apiReqs } from "@/api"
function Popup() {
	const [msgList, setMsgList] = useState([])

	useEffect(() => {
		apiReqs.getMsgList({
			data: {
				user_name: "zhanghengpu",
				page: 1,
				limit: 20
			},
			success: res => {
				console.log("列表数据获取成功", res)
				console.log(res.data.lists)
				setMsgList(res.data.lists || [])
			},
			fail: error => {
				console.log("列表数据获取失败", error)
			}
		})
	}, [])
	// return <RouterProvider router={globalRouters} />

	return (
		<div className="P-container">
			<MsgList list={msgList} />
		</div>
	)
}

export default Popup
