import useTask from "../hooks/useTask"
import CardTask from "../components/CardTask";

const ListTask = () => {
  const {tasks} = useTask();
  
  
  return (
    <div>
        {tasks && tasks.map((task) => (
          <CardTask key={task.id} task={task}/>
        ))}
    </div>
  )
}

export default ListTask