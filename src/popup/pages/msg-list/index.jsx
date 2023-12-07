/*global chrome*/
import "./style.scss"
import Logo from "@/popup/images/logo.png"
import { Avatar, Collapse, List, Badge, Empty, Button } from "antd"
import { useEffect, useState } from "react"
import { apiReqs } from "@/api"

function MsgList(props) {
	const [list, setList] = useState([])
	const [unreadNum, setUnreadNum] = useState(list.length)
	useEffect(() => {
		console.log(333333, props.username, props.cookieString)
		if (props.username && props.cookieString) {
			console.log("messageChecked: Send!")
			chrome.runtime.sendMessage({ type: "messageChecked" })

			apiReqs.getMsgList({
				data: {
					user_name: props.username,
					page: 1,
					limit: 20
				},
				cookies: props.cookieString,
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
		}
	}, [props.username, props.cookieString])

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
				<div className="P-list__username">{props.username}</div>
				<div className="P-list__tips">
					当前页面有 <div className="P-list__num">{unreadNum}</div> 条未读消息
				</div>
			</div>
			<div className="P-list__container">
				{list.length !== 0 ? (
					<List
						grid={{ column: 1 }}
						dataSource={list}
						renderItem={item => (
							<MsgListItem {...item} onClick={handleMsgClick} />
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
		if (checkState) {
			return
		}
		setCheckState(true)
		props.onClick()
		apiReqs.markMsgRead({
			data: {
				user_name: props.user_name,
				id: props.id
			},
			cookies: props.cookieString,
			success: res => {
				console.log("标记已读成功", res)
			},
			fail: error => {
				console.log("标记已读失败", error)
			}
		})
	}

	return (
		<List.Item onClick={handleClick}>
			<Badge dot={!checkState}>
				<Collapse
					className="P-list__item"
					items={[
						{
							label: props.title,
							children: (
								<div>
									<div>{props.create_time}</div>
									<div
										dangerouslySetInnerHTML={{ __html: props.content }}
									></div>
									{props.url && (
										<Button
											type="primary"
											block
											onClick={() => window.open(props.url)}
										>
											立即查看
										</Button>
									)}
								</div>
							)
						}
					]}
				/>
			</Badge>
		</List.Item>
	)
}

export default MsgList
