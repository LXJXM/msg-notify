import { RouterProvider } from "react-router-dom"
import { globalRouters } from "@/popup/router"
import "./style.scss"

function Popup() {
	return <RouterProvider router={globalRouters} />
}

export default Popup
