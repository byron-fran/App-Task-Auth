import { Routes, Route } from 'react-router-dom'
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/home/Home";
import LoginPage from "./auth/LoginPage";
import Form from './pages/Form';
import PrivateRoutes from "./private/PrivateRoutes";

function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path='/form' element={<Form/>} />
          <Route path="/update/:id?" element={<Form />}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
