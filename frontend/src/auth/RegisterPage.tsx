import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth';
import { User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {

  const Navigate = useNavigate()
  const { handleSubmit, register, formState: { errors }, reset } = useForm<User>();
  const {SignUp} = useAuth() 

  const onSubmit =handleSubmit((data) => {
    SignUp(data)
    //clean form
    reset();
    Navigate('/')

  })


  return (
    <div className='form_container'>
      <div className='form_div'>
        <form onSubmit={onSubmit}>
          <div className='form_field '>
            <label htmlFor="name">Name</label>
            {errors.name?.type === 'required' && (<p className='form_error'>Name is required</p>)}
            {errors.name?.type === 'minLength' && (<p className='form_error'>The name must be at least 2 characters </p>)}
            {errors.name?.type === 'maxLength' && (<p className='form_error'>The name must have a maximum of 20 characters</p>)}
            <input type="text"
              placeholder='write your name'
              {...register('name', { required: true, minLength: 2, maxLength: 50 })} />
          </div>
          {/* end field form */}
          <div className='form_field'>
            <label htmlFor="email">Email</label>
            {errors.email?.type === 'required' && (<p className='form_error'>Email is required</p>)}
            {errors.email?.type === 'minLength' && (<p className='form_error'>The Email must be at least 2 characters </p>)}
            {errors.email?.type === 'maxLength' && (<p className='form_error'>The email must have a maximum of 20 characters</p>)}
            {errors.email?.type === 'pattern' && (<p className='form_error'>{errors.email.message}</p>)}
            <input
              type="email"
              placeholder='write your email'
              {...register('email', {
                required: true, minLength: 3, maxLength: 40, pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Expresión regular para validar el correo
                  message: "It must be a valid email"
                }
              })} />
          </div>
          {/* end field form */}
          <div className='form_field'>
            <label htmlFor="password">Write a password</label>
            {errors.password?.type == 'required' && (<p className='form_error'>Password is required</p>)}
            {errors.password?.type === 'minLength' && (<p className='form_error'>The Password must be at least 2 characters</p>)}
            {errors.password?.type === 'maxLength' && (<p className='form_error'>The password must have a maximum of 20 characters</p>)}
            {errors.password?.type === 'pattern' && (<p className='form_error'>{errors.password.message}</p>)}
            <input type="password"
              placeholder='write your password'
              autoComplete='on'
              {...register('password', {
                required: true, minLength: 6, maxLength: 20, pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: 'Your password must have at least one number and one letter'
                }
              })}
            />
          </div>
          <button className='form_btn'>Create account</button>
          <Link to='/login'>Do you have an account ?</Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage