-- esto lo ejecutamos en el DBeaver para crear la tabla
CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
)


-- añadiremos una columna nueva a la tabla ya creada, para vincular al usuario que ha creado la tarea (una llave foranea)
ALTER TABLE task ADD COLUMN user_id INTEGER REFERENCES users(id)


-- esto lo ejecutamos en el DBeaver para crear la tabla
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- agregaremos una nueva columna a la tabla users para la foto de perfil (usamos gravatar)
ALTER TABLE users ADD COLUMN gravatar VARCHAR(255)