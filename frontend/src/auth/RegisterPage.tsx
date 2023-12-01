import React from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {  useDispatch, useSelector } from 'react-redux'
import { postUser } from '../redux/thunks';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../interfaces/User';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';


// const schema = z.object({
//   name: z.string().min(3).max(50),
//   email: z.string().email(),
//   password: z.string().min(6).max(100),
//   password_repeat: z.string().min(6).max(100),
// });


const RegisterPage  : React.FC=  () => {
  const user = useSelector((state : RootState) => state.user  )
  const {errors} = useSelector((state : RootState) => state.errors);
  console.log(errors)
  const Navigate = useNavigate()
  const {handleSubmit, register} = useForm<User>( );
  const dispatch = useDispatch<AppDispatch>();
    
  const onSubmit = handleSubmit((data) => {
    dispatch(postUser(data))
    // if(Object.values(user).length > 0){
    //   Navigate('/tasks')
    // }
  })


  return (
    <div className='form_container'>
        <div className='form_div'>
          <form onSubmit={onSubmit}>
            <div className='form_field '>
              {errors && errors.map((error : string ) => (<p key={Math.random().toString(16)}>{error}</p>))}
              <label htmlFor="name">Name</label>
              <input type="text"  placeholder='write your name'
                {...register('name')} />
            </div>
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
            <div className='form_field'>
              <label htmlFor="password_repeat">Repeat your password</label>
              <input type="password"  placeholder='repeat your password' 
              autoComplete='on'
                {...register('password_repeat')}/>
            </div>
            <button className='form_btn'>Create account</button>
            <Link to='/login'>Do you have an account ?</Link>
          </form>
        </div>
    </div>
  )
}

export default RegisterPage