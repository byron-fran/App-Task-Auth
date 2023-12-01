// import { useState } from "react"
// import { Task } from "./types/Task"
import {Routes, Route} from 'react-router-dom'
// import Form from "./pages/Form"
// import ListTasks from "./pages/ListTask";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/home/Home";
import LoginPage from "./auth/LoginPage";
import ListTasks from './pages/ListTask';
function App() {
  // const [task, setTask] = useState<Task>({
  //   title : '',
  //   content : '',
   
    
  // })

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
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path='/tasks' element={<ListTasks/>}/>
      </Routes>
    </>
  )
}

export default App
