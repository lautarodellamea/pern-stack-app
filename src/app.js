import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import tasksRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas
app.get('/', (req, res) => {
  res.json({ message: "welcome to my API" })
})
app.use("/api/tasks", tasksRoutes)
app.use("/api/auth", authRoutes)



app.get('/test', (req, res) => {
  throw new Error("error de conexion!")
  res.send("test")
})

// error handler
// middleware que va abajo de todo y asi manejamos los errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message
  })
})

export default app