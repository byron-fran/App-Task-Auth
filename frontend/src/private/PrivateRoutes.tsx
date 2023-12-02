import { useAuth } from "../hooks/useAuth"
import { Outlet , Navigate} from "react-router-dom";

const PrivateRoutes = () => {

    const {isAuthenticathed} = useAuth();
    if(!isAuthenticathed ) return <Navigate to='login'/>
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default PrivateRoutes