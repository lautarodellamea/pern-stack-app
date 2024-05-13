import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import { createAccessToken } from '../libs/jwt.js'


export const signin = async (req, res) => {
  const { email, password } = req.body


  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No existe una cuenta con ese email" })
  }

  const user = result.rows[0]

  // desencriptar la contraseña
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res.status(401).json({ message: "Contraseña incorrecta" })
  }

  // generamos un token y lo enviamos al frontend
  const token = await createAccessToken({ id: user.id })

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000 // 1 dia
  })

  return res.json(user)







}

export const signup = async (req, res, next) => {



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

    // guardemos el token en una cookie
    // este se envia al cliente en el header 
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000 // 1 dia
    })


    return res.json(result.rows[0])
    // return res.json({ token: token })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El email ya esta registrado" })
    }

    next(error)
  }

}

export const signout = async (req, res) => {
  // aca debemos eliminar la cookie
  res.clearCookie("token")
  return res.status(200).json({ message: "Sesion cerrada" })

}

export const profile = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.userId])

  return res.json(result.rows[0])
}
