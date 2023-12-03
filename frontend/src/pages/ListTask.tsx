import useTask from "../hooks/useTask"
import CardTask from "../components/CardTask";

const ListTask = () => {
  const { tasks } = useTask();


  return (
    <>

      <main className="task_container">
      {tasks.length > 1 && (<h2 className="task_title">You have, {tasks.length} tasks</h2>)}
      {tasks.length === 1 && (<h2 className="task_title">You have, {tasks.length} task</h2>)}
      {!tasks.length && (<h2 className="task_title">Yet don't have you task</h2>)}
        <div className="task_grid">
          {tasks && tasks.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}

        </div>


      </main>
    </>
  )
}

export default ListTask