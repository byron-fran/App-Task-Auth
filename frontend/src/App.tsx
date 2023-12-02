// import { useState } from "react"
import { Task } from "./types/Task"
import { Routes, Route, useParams } from 'react-router-dom'
// import Form from "./pages/Form"
// import ListTasks from "./pages/ListTask";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/home/Home";
import LoginPage from "./auth/LoginPage";
import Form from './pages/Form';

import PrivateRoutes from "./private/PrivateRoutes";

function App() {


  return (
    <>
      {/* <h1>Hola desde sass</h1>
      <div>
        <Form 
          task={task}
          setTask={setTask}/>
        <ListTasks setTask={setTask}/>
      </div> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path='/form' element={<Form/>} />
          <Route path="/update/:id" element={<Form />}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
