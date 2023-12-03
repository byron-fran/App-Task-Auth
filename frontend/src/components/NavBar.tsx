
import { NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
    const { LogOut, user } = useAuth()
    return (
        <div className="nav_container">
            <nav className="nav">
                <NavLink to='/form'>
                    Add new task
                </NavLink>
                <NavLink to='/login' onClick={LogOut}>
                    Logout
                </NavLink>
                <h2>
                    Hello, {user?.name}
                </h2>

            </nav>
        </div>
    )
}

export default NavBar