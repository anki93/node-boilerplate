import { Router } from 'express';
import { UserConroller } from '../controllers'

const router = Router()

router.get('/', UserConroller.index)

export default router;
