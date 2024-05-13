// import { Router } from 'express'
// cambiamos esta linea para que este enrutador maneje los errores
import Router from 'express-promise-router'

import { getAllTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'

import { isAuth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get("/", isAuth, getAllTasks)

router.get("/:id", isAuth, getTask)

router.post("/", isAuth, createTask)

router.put("/:id", isAuth, updateTask)

router.delete("/:id", isAuth, deleteTask)

export default router