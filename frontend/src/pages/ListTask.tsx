// import {RootState} from '../redux/store'
// import {useSelector, useDispatch} from 'react-redux';
// import {deleteTask} from '../redux/slices/taskSlice';
// import {Task} from '../types/Task'
// import { SetStateAction } from 'react';


// type taskProps = {
//   setTask : React.Dispatch<SetStateAction<Task>>
// }

// const ListTasks : React.FC<taskProps> = ({setTask}) => {

//   const state = useSelector((state : RootState) => state.tasks);

//   const dispatch = useDispatch();
//   const handleDelete = (id : string) => {
//     dispatch(deleteTask(id))
//   };

//   const handleUpdate = (task : Task) => {
//     setTask(task)
//   }
//   return (
//     <div>
//       <h1>List Tasks</h1>
//       <div>
//         {state.tasks.length > 0 &&  state.tasks.map((task : Task) => (
//           <div key={task.id}>
//               <h1>{task.title}</h1>
//               <p>{task.content}</p>
//               <div>
//                 <button onClick ={() => handleDelete(task.id)}>Delete</button>
//                 <button onClick={() => handleUpdate(task)}>Update</button>
//               </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// };

// export default ListTasks


const ListTask = () => {
  return (
    <div>ListTask</div>
  )
}

export default ListTask