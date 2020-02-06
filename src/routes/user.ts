import { Router } from 'express';
import { UserConroller } from '../controllers'

const router = Router()

router.get('/', UserConroller.index)
router.post('/signin', UserConroller.signIn)
router.get('/signup', UserConroller.signUp)

export default router;
