import axios from './axios';
import { User } from '../interfaces/User';
export const registerUser = (newUser : User) => axios.post('user', newUser);
export const loginUser = (user : User) => axios.post('login', user);
export const tokenVerify = () => axios.get('verify');
export const logOutUser = () => axios.post('logout')