import {Router} from 'express';
import { createTask, getTaskById, getTasks, deleteTaskById, updateTask } from '../controllers/tasks.controller';
import { checkAuth } from '../middlewares/user.token';

const router = Router();

router.post('/task', checkAuth, createTask);
router.get('/task/:id', checkAuth, getTaskById);
router.get('/tasks', checkAuth, getTasks);
router.delete('/task/:id', checkAuth, deleteTaskById);
router.put('/task/:id', checkAuth, updateTask);


export default router;