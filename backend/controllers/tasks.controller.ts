import { request, response } from 'express'
import Task from '../models/Task';
import { Task as TaskInterface } from '../interfaces/Task';

import dotenv from 'dotenv';
dotenv.config();


const createTask = async (req = request, res = response) => {
    const {userId, title, content,   } : TaskInterface= req.body;

    try {
        
        const newTask  = Task.build(req.body );
        await newTask.save();   
        if(!newTask) return res.status(400).json({ message: 'Task not created' });
        return res.status(200).json({
            newTask,
            message: 'Task created successfully'
        })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

const getTaskById = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const task = await Task.findByPk(id);
        if(!task) return res.status(400).json({message : 'Task not found'});
        return res.status(200).json({task});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};
const getTasks = async (req = request, res = response) => {
    try {
        const tasks = await Task.findAll({where : {userId : req.body.userId}});
        if(!tasks) return res.status(400).json({message : 'Tasks not found'});
        return res.status(200).json({tasks});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

const deleteTaskById =  async (req = request, res = response) => {
    const {userId} : TaskInterface = req.body;
    
    const {id} = req.params;
    try {
        //get all tasks by userId
        const tasks = await Task.findAll({where : {userId}});
        if(!tasks) return res.status(400).json({message : 'Tasks not found'});
        //find task by id
        const taskFind = tasks.find(task => task.id === Number(id));
        //delete task
        await taskFind?.destroy(); 
        if(!taskFind) return res.status(400).json({message : 'Task not found'});

        return res.status(200).json({message : 'Task deleted successfully'});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

const updateTask = async (req = request, res = response) => {
    const {userId} : TaskInterface = req.body;

    const {id} = req.params;
    const {title, description} = req.body;
    try {
        const task = await Task.findByPk(id);
        if(!task) return res.status(400).json({message : 'Task not found'});
        task.title = title;
        task.description = description;
        await task.save();
        return res.status(200).json({message : 'Task updated successfully'});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}
export {
    createTask,
    getTaskById,
    getTasks,
    deleteTaskById,
    updateTask
}