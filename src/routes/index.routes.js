import { Router } from 'express'
import { database } from '../controllers/index.controllers.js'

const router = Router()

router.get('/database', database)
 
export default router
