import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import { createAccessToken } from '../libs/jwt.js'


export const signin = async (req, res) => res.send("iniciando sesion")

export const signup = async (req, res) => {
  const { name, email, password } = req.body
  console.log(name, email, password)

  try {

    // encriptar contraseña con bcrypt en 10 vueltas
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log(hashedPassword)


    const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword])


    console.log(result)

    // genero el token y le pasamos lo que queremos guardar en el
    const token = await createAccessToken({ id: result.rows[0].id })


    // return res.json(result.rows[0])
    return res.json({ token: token })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El email ya esta registrado" })
    }
  }

}

export const signout = async (req, res) => res.send("cerrando sesion")

export const profile = async (req, res) => res.send("perfil del usuario")
