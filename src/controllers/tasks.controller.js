import { pool } from '../db.js'


export const getAllTasks = async (req, res) => {
  const result = await pool.query("SELECT * FROM task")
  return res.json(result.rows)
}



export const getTask = async (req, res) => {
  const result = await pool.query("SELECT * FROM task WHERE id = $1", [req.params.id])
  console.log(result)


  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No existe una tarea con ese id" })
  }
  return res.json(result.rows[0])

}



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
      return res.status(409).json({ message: "ya existe una tarea con ese titulo" })
    }

    // de esta forma le decimos que vaya al siguiente middleware, pero al enviarle el error va hacia el handler error
    // una vez que tratamos todos los errores aqui, lo mando al handler error del app.js
    // recordar pasar el next como argumento al createTask (esta funcion)
    next(error)
  }

}



export const updateTask = async (req, res) => {
  const id = req.params.id
  const { title, description } = req.body

  const result = await pool.query("UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id])


  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No existe una tarea con ese id" })
  }

  return res.json(result.rows[0])


}



export const deleteTask = async (req, res) => {
  const result = await pool.query("DELETE FROM task WHERE id = $1 ", [req.params.id])
  console.log(result)

  // el rowCount es el numero de filas afectadas en este caso por el DELETE
  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No existe una tarea con ese id" })
  }

  // cuando eliminamos por lo general no retornamos nada, sino que un codigo 204 indica que todo ha ido bien
  return res.sendStatus(204)


}


