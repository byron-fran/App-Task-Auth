import {FC} from 'react'
import { Task } from "../types/Task"
import useTask from '../hooks/useTask';
import { useNavigate } from 'react-router-dom';

interface CardTaskProps  {
    task : Task
}
const CardTask : FC<CardTaskProps> = ({task}) => {
    const Navigate = useNavigate();
    const {deletTaskById} = useTask();
    const handleUpdate = (id : string) => {
        Navigate(`/update/${id}`)
    }
  return (
    <div>
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div>
                <button
                    onClick={() => deletTaskById(task.id)}>Delete</button>
                <button
                    onClick={() => handleUpdate(task.id)} 
                    >Update
                </button>
            </div>
        </div>
    </div>
  )
}

export default CardTask