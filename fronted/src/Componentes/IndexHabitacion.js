import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IndexHabitacion = () => {
  // Estado para almacenar las habitaciones
  const [habitaciones, setHabitaciones] = useState([]);

  // Efecto para cargar las habitaciones al montar el componente
  useEffect(() => {
    updateHabitacionesTable();
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al montar el componente

  // Función para crear una nueva habitación
  const createHabitacion = () => {
    // Implementa la lógica de creación de habitaciones aquí
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado después de crear la habitación
    updateHabitacionesTable();
  };

  // Función para eliminar una habitación
  const deleteHabitacion = (idHabitacion) => {
    // Implementa la lógica de eliminación de habitaciones aquí
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado después de eliminar la habitación
    updateHabitacionesTable();
  };

  // Función para cargar las habitaciones
  const updateHabitacionesTable = () => {
    // Implementa la lógica para obtener las habitaciones desde el servidor
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado con las habitaciones obtenidas
    const mockHabitaciones = [
      { id_habitacion: 1, id_hotel: 101, tipo_habitacion: 'Doble', precio_habitacion: 120, disponibilidad_habitacion: 1 },
      // Otras habitaciones
    ];
    setHabitaciones(mockHabitaciones);
  };

  return (
    <div>
      <h1>Habitaciones</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Hoteles">Hoteles</Link></li>
        <li><Link to="/Clientes">Clientes</Link></li>
        <li><Link to="/Habitacion">Habitaciones</Link></li>
        <li><Link to="/Reservacion">Reservaciones</Link></li>
      </ul>

      {/* Formulario para crear habitaciones */}
      <h2>Crear Habitación</h2>
      {/* Implementa los campos y lógica de entrada del formulario aquí */}
      <button onClick={createHabitacion}>Crear</button>

      {/* Tabla para mostrar las habitaciones */}
      <h2>Habitaciones</h2>
      <table>
        <thead>
          <tr>
            <th>ID Habitación</th>
            <th>ID Hotel</th>
            <th>Tipo de Habitación</th>
            <th>Precio de la Habitación</th>
            <th>Disponibilidad de la Habitación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((habitacion) => (
            <tr key={habitacion.id_habitacion}>
              <td>{habitacion.id_habitacion}</td>
              <td>{habitacion.id_hotel}</td>
              <td>{habitacion.tipo_habitacion}</td>
              <td>{habitacion.precio_habitacion}</td>
              <td>{habitacion.disponibilidad_habitacion === 1 ? 'Disponible' : 'No disponible'}</td>
              <td>
                <button onClick={() => deleteHabitacion(habitacion.id_habitacion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexHabitacion;
