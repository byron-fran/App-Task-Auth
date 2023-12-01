import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {  useDispatch } from 'react-redux'
import {createUser} from '../redux/slices/UserSlice'
import { User } from '../interfaces/User';

const LoginPage  : React.FC= () => {
  
  const {handleSubmit, register} = useForm();
  const dispatch = useDispatch();
    
  const onSubmit = handleSubmit((data) => {
    dispatch(createUser(data as User))
    
  })
  return (
    <div className='form_container'>
    <div className='form_div'>
      <form onSubmit={onSubmit}>
        {/* end field form */}
        <div className='form_field'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='write your email'
            {...register('email')} />
        </div>
           {/* end field form */}
        <div className='form_field'>
          <label htmlFor="password">Write a password</label>
          <input type="password" placeholder='write your password' 
          autoComplete='on'
            {...register('password')}/>
        </div>
           {/* end field form */}

        <button className='form_btn'>Login</button>
        <Link to='/register'>Create an account</Link>
      </form>
    </div>
</div>
  )
}

export default LoginPage