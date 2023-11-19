
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '@/popup/components/nav'
import './style.scss'

function Entry() {
    // 获取当前路由location
    const location = useLocation()

    return (
        <div className="M-entry">
            <Nav location={location} />
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    )
}

export default Entry