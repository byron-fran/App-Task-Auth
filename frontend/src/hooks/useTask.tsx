import {  useContext } from "react"
import { TaskContext } from "../context/TasxContext"

const useTask = () => {
    const context = useContext(TaskContext)
  return context
}

export default useTask