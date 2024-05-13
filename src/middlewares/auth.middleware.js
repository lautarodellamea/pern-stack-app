// este middleware va a comprobar si el usuario esta autenticado o no

import jwt from "jsonwebtoken"

export const isAuth = (req, res, next) => {
  // console.log(req.headers)
  // console.log(req.cookies.token)

  // para poder leer la cookie directamente usamos el modulo cookie-parser
  // sino importamos y usamos este paquete en el app.js no funcionara
  // app.use(cookieParser());
  // console.log(req.cookies)
  // console.log(req.cookies.token)
  const token = req.cookies.token

  // si no tiene token no estariamos autorizado
  if (!token) {
    return res.status(401).json({ message: "No estas autorizado" })
  }

  // pero si tendriamos el token deberiamos de verificarlo
  // debo pasarle la llave secreta
  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err) return res.status(401).json({ message: "No estas autorizado" })

    // guardo el dato en request donde todas las rutas pueden acceder, y asi podremos ver quien es id que hace la peticion
    req.userId = decoded.id

    console.log(decoded)


    // el next es porque como vamos a usar este middleware dentro de rutas, este debe dejar seguir el flujo de la ruta
    next()
  })

}
