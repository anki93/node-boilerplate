import { Router } from 'express';
import { userController } from '../controllers'
import { validateLoginRequest } from "../requests"
const router = Router()

router.get('/', userController.index)
router.post('/login', validateLoginRequest, userController.login.bind(userController))
router.get('/register', userController.register)

export default router;
