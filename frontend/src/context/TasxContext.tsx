import 
{
    useState, 
    SetStateAction,
    Dispatch,
    createContext,
    ReactNode,
    FC
} 
from  'react';
import { Task } from '../types/Task';
import { 
    createTaskRequest, 
    deleteTaskByIdRequest, 
    getTasksRequest,
    updateTaskByIdRequest
} 
    from '../api/tasks';
import { AxiosError } from 'axios';

export interface TaskAuthProps {
    task : Task,
    setTask : Dispatch<SetStateAction<Task>>,
    createTask : (task : Task) => void,
    getAllTasks : () => void,
    deletTaskById : (id : string | number) => void,
    updateTaskById : (id : string | number,data : Task) => void
    tasks : Task[],
    setTasks : Dispatch<SetStateAction<Task[]>>
}

const defaultValueContext : TaskAuthProps = {
    task : {
        title : '',
        description : ''
    },
    setTask : () => {},
    createTask : () => {},
    getAllTasks : () => {},
    deletTaskById : () => {},
    updateTaskById : () => {},
    tasks : [],
    setTasks : () => {},
};

export const TaskContext =  createContext<TaskAuthProps>(defaultValueContext);

interface TaskProviderProps  {
    children : ReactNode
}

export const TaskProvider : FC<TaskProviderProps>  = (({children}) => {

    const [task, setTask] = useState<Task>(defaultValueContext.task);
    const [tasks, setTasks] = useState<Task[]>(defaultValueContext.tasks)

    //CRUD TASKS
    //function to create a new task
    const createTask = async (task : Task)=> {
        try{    
            await createTaskRequest(task);
        }
        catch(error : unknown){
            if(error instanceof AxiosError){
                console.log(error.response?.data)
            }
        }
    };

    const getAllTasks = async () => {
        try{
            const res = await getTasksRequest();
            setTasks(res.data.tasks)
        }
        catch(error : unknown){
            if(error instanceof AxiosError){
                console.log(error.response?.data)
            }
        }
    };
    const deletTaskById = async (id : string | number) => {
        try{
            const tasksFilter = tasks.filter(task => task.id !== id);
            await deleteTaskByIdRequest(id);
            setTasks(tasksFilter)
        }
        catch(error : unknown){
            if(error instanceof AxiosError){
                console.log(error.response);
                return
            }
            throw new Error('Something wrong')
        }
    };
    const updateTaskById = async (id : string | number, data : Task) => {
        try{
           await updateTaskByIdRequest(id, data);
        
           
        }
        catch(error : unknown){
            if(error instanceof AxiosError){
               return(error.response);
            }
        }
    }
    return (
        <TaskContext.Provider value={{
                task, 
                setTask,
                createTask,
                getAllTasks,
                tasks,
                setTasks,
                deletTaskById,
                updateTaskById
                }}>
            {children}
        </TaskContext.Provider>
    )
})