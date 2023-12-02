
import { NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
const NavBar = () => {
    const {LogOut} = useAuth()
  return (
    <div>NavBar
        <nav>
            <NavLink to='/login' onClick={LogOut}>
                Logout
            </NavLink>
            <NavLink to='/form'>
                Add new task
            </NavLink>
        </nav>
    </div>
  )
}

export default NavBar