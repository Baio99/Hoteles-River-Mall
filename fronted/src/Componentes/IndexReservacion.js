import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IndexReservacion = () => {
  // Estado para almacenar las reservaciones
  const [reservaciones, setReservaciones] = useState([]);
  
  // Efecto para cargar las reservaciones al montar el componente
  useEffect(() => {
    updateReservacionesTable();
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al montar el componente

  // Función para crear una nueva reservación
  const createReservacion = () => {
    // Implementa la lógica de creación de reservaciones aquí
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado después de crear la reservación
    updateReservacionesTable();
  };

  // Función para eliminar una reservación
  const deleteReservacion = (idReservacion) => {
    // Implementa la lógica de eliminación de reservaciones aquí
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado después de eliminar la reservación
    updateReservacionesTable();
  };

  // Función para cargar las reservaciones
  const updateReservacionesTable = () => {
    // Implementa la lógica para obtener las reservaciones desde el servidor
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado con las reservaciones obtenidas
    const mockReservaciones = [
      { ID_RESERVACION: 1, CEDULA_CLIENTE: '1234567890', ESTADO_RESERVACION: 'Conf', DETALLES_RESERVACION: '2024-02-28' },
      // Otras reservaciones
    ];
    setReservaciones(mockReservaciones);
  };

  return (
    <div>
      <h1>Reservaciones</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Hoteles">Hoteles</Link></li>
        <li><Link to="/Reservacion">Reservaciones</Link></li>
      </ul>

      {/* Formulario para crear reservaciones */}
      <h2>Crear Reservación</h2>
      {/* Implementa los campos y lógica de entrada del formulario aquí */}
      <button onClick={createReservacion}>Crear</button>

      {/* Tabla para mostrar las reservaciones */}
      <h2>Reservaciones</h2>
      <table>
        <thead>
          <tr>
            <th>ID Reservación</th>
            <th>Cédula Cliente</th>
            <th>Estado Reservación</th>
            <th>Detalles Reservación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservaciones.map((reservacion) => (
            <tr key={reservacion.ID_RESERVACION}>
              <td>{reservacion.ID_RESERVACION}</td>
              <td>{reservacion.CEDULA_CLIENTE}</td>
              <td>{reservacion.ESTADO_RESERVACION}</td>
              <td>{reservacion.DETALLES_RESERVACION}</td>
              <td>
                <button onClick={() => deleteReservacion(reservacion.ID_RESERVACION)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexReservacion;
