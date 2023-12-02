import React, { SetStateAction} from 'react';
import {Task} from '../types/Task';
import { useForm } from 'react-hook-form';
// import {generarId} from '../helpers';
// import {useDispatch, useSelector} from 'react-redux';

type formProps = {
  setTask : React.Dispatch<SetStateAction<Task>>,
  task : Task
}

const Form : React.FC<formProps> = ({setTask, task}) => {
  const {register, handleSubmit,reset, setValue, formState : {errors}} = useForm<Task>()


  const onSubmit = handleSubmit((data) => {
    console.log(data);

    //clean form
    reset()
  })
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