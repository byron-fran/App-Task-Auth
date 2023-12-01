import React, { SetStateAction} from 'react';
import {Task} from '../types/Task'
import {generarId} from '../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, updateTask} from '../redux/slices/taskSlice'
import { RootState } from '../redux/store';
type formProps = {
  setTask : React.Dispatch<SetStateAction<Task>>,
  task : Task
}

const Form : React.FC<formProps> = ({setTask, task}) => {

  const dispatch = useDispatch();
  const state = useSelector((state : RootState) => state.tasks)

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const taskFound = state.tasks.find((_task : Task) => _task.id === task.id);
      if(taskFound){
        dispatch(updateTask(task))
      }
      else{
        dispatch(addTask({...task, id : generarId()}));
       
      }
  
      setTask({
        title : '',
        content : '',
        id : ''
      })
     
  }
  return (
    <div className='container'>
      <div>
        <form onSubmit={ handleSubmit} className='formulario'>
          <div>
            <label htmlFor='title'>title</label>
            <input type='text' name='title' id='title' placeholder='write a title'
              value={task.title}
              onChange={(e) => setTask({...task, title : e.target.value})}/>
          </div>
          <div>
            <label htmlFor='content'>Content</label>
            <textarea name='content' id='content' placeholder='Write a content'
              value={task.content}
              onChange={(e) => setTask({...task, content : e.target.value})}
            />
          </div>
            <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  )
};



export default Form