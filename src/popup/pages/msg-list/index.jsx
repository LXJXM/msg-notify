import "./style.scss"
import Logo from "@/popup/images/logo.png"
import { Avatar, Collapse, List, Badge, Empty } from "antd"
import { useEffect, useState } from "react"

function MsgList(props) {
	const [unreadMsgNum, setUnreadMsgNum] = useState(props.list.length)
	
	useEffect(() => {
		setUnreadMsgNum(props.list.length)
	}, [props.list])

	const handleMsgClick = () => {
		if (unreadMsgNum <= 0) {
			return
		}

		setUnreadMsgNum(unreadMsgNum - 1)
	}

	return (
		<div className="P-list">
			<div className="P-list__user">
				<Avatar size="large" src={Logo} />
				<div className="P-list__username">lijiaming</div>
				<div className="P-list__tips">
					您有 <div className="P-list__num">{unreadMsgNum}</div> 条未读消息
				</div>
			</div>
			<div className="P-list__container">{props.list.length !== 0 ? <List grid={{ column: 1 }} dataSource={props.list} renderItem={item => <MsgListItem title={item.title} onClick={handleMsgClick} />} /> : <Empty className="P-list__empty" />}</div>
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
				<Collapse className="P-list__item" items={[{ label: props.title, children: <p>计划A费用超标，点击前往查看</p> }]} />
			</Badge>
		</List.Item>
	)
}

export default MsgList
