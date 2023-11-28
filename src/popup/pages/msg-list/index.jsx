import "./style.scss"
import Logo from "@/popup/images/logo.png"
import { Avatar, Collapse, List, Badge, Empty } from "antd"
import { useEffect, useState } from "react"
import { apiReqs } from "@/api"

function MsgList(props) {
	const [list, setList] = useState([])
	const [unreadNum, setUnreadNum] = useState(list.length)
	// todo 1.消息需要做分页处理
	// todo 2.点击消息后发送标记已阅读
	useEffect(() => {
		apiReqs.getMsgList({
			data: {
				user_name: props.username,
				page: 1,
				limit: 20
			},
			success: res => {
				console.log("列表数据获取成功", res)
				console.log(res.data.lists)
				setList(res.data.lists || [])
				setUnreadNum(res.data.lists.length || 0)
			},
			fail: error => {
				console.log("列表数据获取失败", error)
			}
		})
	}, [])

	const handleMsgClick = () => {
		if (unreadNum <= 0) {
			return
		}
		setUnreadNum(unreadNum - 1)
	}

	return (
		<div className="P-list">
			<div className="P-list__user">
				<Avatar size="large" src={Logo} />
				<div className="P-list__username">lijiaming</div>
				<div className="P-list__tips">
					您有 <div className="P-list__num">{unreadNum}</div> 条未读消息
				</div>
			</div>
			<div className="P-list__container">
				{list.length !== 0 ? (
					<List
						grid={{ column: 1 }}
						dataSource={list}
						renderItem={item => (
							<MsgListItem title={item.title} onClick={handleMsgClick} />
						)}
					/>
				) : (
					<Empty className="P-list__empty" />
				)}
			</div>
		</div>
	)
}

function MsgListItem(props) {
	const [checkState, setCheckState] = useState(false)

	const handleClick = () => {
		setCheckState(true)
		props.onClick()
	}

	return (
		<List.Item onClick={handleClick}>
			<Badge dot={!checkState}>
				<Collapse
					className="P-list__item"
					items={[
						{ label: props.title, children: <p>计划A费用超标，点击前往查看</p> }
					]}
				/>
			</Badge>
		</List.Item>
	)
}

export default MsgList
