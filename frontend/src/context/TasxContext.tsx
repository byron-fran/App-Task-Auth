import 
{
    useEffect,
    useState, 
    SetStateAction,
    Dispatch,
    createContext,
    ReactNode,
    FC
} 
from  'react';
import { Task } from '../types/Task';


export interface TaskAuthProps {
    task : Task,
    setTask : Dispatch<SetStateAction<Task>>
}

const defaultValueContext : TaskAuthProps = {
    task : {
        title : '',
        description : ''
    },
    setTask : () => {}
};

export const TaskContext =  createContext<TaskAuthProps>(defaultValueContext);

interface TaskProviderProps  {
    children : ReactNode
}

export const TaskProvider : FC<TaskProviderProps>  = (({children}) => {
    const [task, setTask] = useState<Task>(defaultValueContext.task);

    useEffect(() => {

    }, [])
    return (
        <TaskContext.Provider value={{task, setTask}}>
            {children}
        </TaskContext.Provider>
    )
})