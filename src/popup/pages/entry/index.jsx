import { Outlet } from "react-router-dom"
import "./style.scss"

function Entry() {
	return (
		<div className="M-entry">
			<div className="main-container">
				<Outlet />
			</div>
		</div>
	)
}

export default Entry
