import React, { SetStateAction, useEffect } from 'react';
import { Task } from '../types/Task';
import { useForm } from 'react-hook-form';
import useTask from '../hooks/useTask';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskByIdRequest } from '../api/tasks';
import { AxiosError } from 'axios';


type formProps = {
  setTask?: React.Dispatch<SetStateAction<Task>>,
  task?: Task
}

const Form: React.FC<formProps> = () => {
  const { createTask, tasks, updateTaskById } = useTask();
  const Navigate = useNavigate()
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Task>()
  const { id } = useParams();


  const onSubmit = handleSubmit((data) => {
    const idFound = tasks.find((task: Task) => task.id == id);

    if (idFound) {
      updateTaskById(idFound.id, data)

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
    const getTaskById = async () => {
      try {

        const res = await getTaskByIdRequest(id);

        setValue('title', res.data.task?.title);
        setValue('description', res.data?.task?.description)
      }
      catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error)
        }
      }
    }
    getTaskById()
  }, [id])


  return (

    <div className='form_container'>
      <form onSubmit={onSubmit} className='form_div'>
        <div className='form_field'>
          <label htmlFor='title'>title</label>
          {errors.title?.type === 'required' && (<p className='form_error'>Title is required</p>)}
          {errors.title?.type === 'maxLength' && (<p className='form_error'>Title Not must be than 50 characters</p>)}
          <input type='text' id='title' placeholder='write a title'
            {...register('title', { required: true, maxLength: 50 })}
          />
        </div>
        <div className='form_field'>
          <label htmlFor='content'>Decription</label>
          {errors.description?.type === 'required' && (<p className='form_error'>Description is required</p>)}
          <textarea id='content' placeholder='Write a description'
            {...register('description', { required: true })}
          />
        </div>
        <button className='form_btn' type='submit'>{id ? 'Update' : 'Add'}</button>
      </form>
    </div>

  )
};



export default Form