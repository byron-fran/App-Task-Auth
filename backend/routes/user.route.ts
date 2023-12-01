import {register, login, logout, verifyToken } from  '../controllers/user.controller'
import {Router} from 'express'  
import { registerSchema } from '../schemas/userValidate';
import { validateUser } from '../middlewares/user.validate';
const router = Router();

router.post('/user', validateUser(registerSchema), register );
router.post('/login', login );
router.post('/logout', logout );
router.get('/verify', verifyToken );
export default router;