import { pool } from '../db.js'


export const getAllTasks = async (req, res) => res.send("obteniendo tareas")



export const getTask = async (req, res) => res.send("obteniendo una tarea")



export const createTask = async (req, res, next) => {

  // extraemos los datos que recibamos del lado del cliente
  // console.log(req.body)
  const { title, description } = req.body

  // colocamos todo dentro de un try catch porque si llegamos a tener un error por la parte de la base dedatos, me crashea la aplicacion y no puedo seguir haciendo consultas, no llega a caer a mi manejador de error (error handler) en el app.js
  try {
    // db insert
    const result = await pool.query("INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *", [title, description])
    // console.log(result)

    // si quisieramos hacer otras consultas podemos llamar varias veces el pool.query

    res.json(result.rows[0])

  } catch (error) {
    // console.log(error)

    // logica a ejecutar segun el error (los errores tienen codigos en postgres)
    if (error.code === "23505") {
      return res.status(400).send("ya existe una tarea con ese nombre")
    }

    // de esta forma le decimos que vaya al siguiente middleware, pero al enviarle el error va hacia el handler error
    // una vez que tratamos todos los errores aqui, lo mando al handler error del app.js
    // recordar pasar el next como argumento al createTask (esta funcion)
    next(error)
  }

}



export const updateTask = async (req, res) => res.send("actualizando tarea")



export const deleteTask = async (req, res) => res.send("borando tarea")


