import ReactDOM from "react-dom/client"
import { useState } from "react"
import "./style.scss"
import MainModal from "./components/main-modal"

function Content() {
	const [mainModalVisiable, setMainModalVisiable] = useState()

	const handleClick = () => {
		setMainModalVisiable(true)
	}

	return (
		<div className="CRX-content">
			<div className="content-entry" onClick={handleClick}></div>
			{mainModalVisiable ? <MainModal onClose={() => setMainModalVisiable(false)} /> : null}
		</div>
	)
}

// 创建id为CRX-container的div
const app = document.createElement("div")
app.id = "CRX-container"
// 将刚创建的div插入body最后
document.body.appendChild(app)
// 将ReactDOM插入刚创建的div
const crxContainer = ReactDOM.createRoot(document.getElementById("CRX-container"))
crxContainer.render(<Content />)
