// import { Router } from 'express'
// cambiamos esta linea para que este enrutador maneje los errores
import Router from 'express-promise-router'

import { getAllTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'

const router = Router()

router.get("/", getAllTasks)

router.get("/:id", getTask)

router.post("/", createTask)

router.put("/:id", updateTask)

router.delete("/:id", deleteTask)

export default router