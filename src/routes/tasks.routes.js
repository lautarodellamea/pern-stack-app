import { Router } from 'express'

const router = Router()


router.get("/tasks", (req, res) => res.send("obteniendo tareas"))

router.get("/tasks/:id", (req, res) => res.send("obteniendo tarea unica"))

router.post("/tasks", (req, res) => res.send("creando una tarea"))

router.put("/tasks/:id", (req, res) => res.send("actualizando tarea"))

router.delete("/tasks/:id", (req, res) => res.send("borando tarea"))

export default router