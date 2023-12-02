import { Task  } from "../interfaces/Task";
import axios from './axios';

export const getTasksRequest = () => axios.get(`tasks`);
export const getTaskByIdRequest = (id :number | string) => axios.get(`task/${id}`);
export const createTaskRequest = (newTask : Task) => axios.post(`task`, newTask);
export const deleteTaskByIdRequest = (id :number | string) => axios.delete(`task/${id}`);
export const updateTaskByIdRequest =(id : number | string, task : Task) => axios.put(`task/${id}`, task)
