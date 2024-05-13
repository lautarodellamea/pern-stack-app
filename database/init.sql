-- esto lo ejecutamos en el DBeaver para crear la tabla
CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
)

-- esto lo ejecutamos en el DBeaver para crear la tabla
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)