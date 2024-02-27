const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a tu API!');
});

// Conectar a la base de datos
async function connectDB() {
  try {
    await oracledb.createPool({
      user: 'tu_usuario',
      password: 'tu_contraseña',
      connectString: 'tu_conexion',
    });
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
}

// Iniciar la aplicación
async function startApp() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

// Iniciar la aplicación
startApp();
