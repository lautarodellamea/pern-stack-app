import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

// middlewares para 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: "welcome to my API" })
})





app.get('/test', (req, res) => {
  throw new Error("error de conexion!")
  res.send("test")
})

// middleware que va abajo de todo y asi manejamos los errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message
  })
})

export default app