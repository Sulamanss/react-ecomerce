import { Outlet } from "react-router-dom"
import Navbar from "../component/NavBar"

export const Layout = () => {
    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}