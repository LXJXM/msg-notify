import { Button, Input } from "antd"
import { useState } from "react"
import imgLogo from "@/popup/images/logo.png"
import "./style.scss"

function Login() {
	return (
		<div className="P-login">
			<img className="P-login__logo" src={imgLogo} />
			<div className="P-login__tips">
				<p>未登录</p>
				<p>登录后才能使用，鲁大师管理后台消息提醒插件</p>
			</div>
			<Button type="primary" block>
				立即登录
			</Button>
		</div>
	)
}

export default Login
