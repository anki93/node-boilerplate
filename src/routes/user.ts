import { Router } from 'express';
import { UserConroller } from '../controllers'

const users = Router()

users.get('/', UserConroller.index)

export { users };
