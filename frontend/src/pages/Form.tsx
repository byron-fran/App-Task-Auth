import React, { SetStateAction, useEffect} from 'react';
import {Task} from '../types/Task';
import { useForm } from 'react-hook-form';
import useTask from '../hooks/useTask';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskByIdRequest } from '../api/tasks';
import { AxiosError } from 'axios';
// import {generarId} from '../helpers';
// import {useDispatch, useSelector} from 'react-redux';

type formProps = {
  setTask? : React.Dispatch<SetStateAction<Task>>,
  task? : Task
}

const Form : React.FC<formProps> = () => {
  const {createTask, tasks, updateTaskById} = useTask();
  const Navigate = useNavigate()
  const {register, handleSubmit,reset, setValue, formState : {errors}} = useForm<Task>()
  const {id} = useParams();

  
  const onSubmit =  handleSubmit((data) => {
    const idFound = tasks.find(task => task.id == id);
 
    if(idFound){
      console.log(idFound.id)
      updateTaskById(idFound?.id, data)
    
    }
    else {
         createTask(data)
    }
 
    //Navigate to home
    Navigate('/')
    //clean form
    reset()
  })


  useEffect(() => {
    const getTaskById =  async () => {
      try{

        const res = await getTaskByIdRequest(id);
        console.log(res.data.task)
        setValue('title', res.data.task?.title);
        setValue('description', res.data?.task?.description)
      }
      catch(error : unknown){
        if(error instanceof AxiosError){
          console.log(error)
        }
      }
    }
    getTaskById()
  }, [id])


   return (
    <div className='container'>
      <div>
        <form onSubmit={onSubmit} className='formulario'>
          <div>
            <label htmlFor='title'>title</label>
            <input type='text' id='title' placeholder='write a title'
              {...register('title')}
              />
          </div>
          <div>
            <label htmlFor='content'>Content</label>
            <textarea id='content' placeholder='Write a content'
              {...register('description')}
            />
          </div>
            <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  )
};



export default Form