import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IndexHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    // Cargar datos iniciales (simulando datos desde el servidor al montar el componente)
    updateHabitacionesTable();
  }, []);

  const createHabitacion = async () => {
    try {
      // Simulando una solicitud de creación al servidor
      const nuevaHabitacion = {
        id_habitacion: habitaciones.length + 1,
        id_hotel: 101,
        tipo_habitacion: 'Individual',
        precio_habitacion: 80,
        disponibilidad_habitacion: 1,
      };

      // Simulando una respuesta exitosa del servidor
      const habitacionesActualizadas = [...habitaciones, nuevaHabitacion];
      setHabitaciones(habitacionesActualizadas);
    } catch (error) {
      console.error('Error al crear la habitación:', error);
    }
  };

  const deleteHabitacion = async (idHabitacion) => {
    try {
      // Simulando una solicitud de eliminación al servidor
      // En un entorno real, aquí deberías hacer una solicitud DELETE al servidor
      // y manejar la respuesta del servidor

      // Simulando una respuesta exitosa del servidor
      const habitacionesActualizadas = habitaciones.filter(habitacion => habitacion.id_habitacion !== idHabitacion);
      setHabitaciones(habitacionesActualizadas);
    } catch (error) {
      console.error('Error al eliminar la habitación:', error);
    }
  };

  const updateHabitacionesTable = async () => {
    try {
      // Simulando una solicitud para obtener las habitaciones desde el servidor
      // En un entorno real, aquí deberías hacer una solicitud GET al servidor
      // y manejar la respuesta del servidor

      // Simulando una respuesta exitosa del servidor
      const habitacionesDesdeServidor = [
        { id_habitacion: 1, id_hotel: 101, tipo_habitacion: 'Doble', precio_habitacion: 120, disponibilidad_habitacion: 1 },
        { id_habitacion: 2, id_hotel: 101, tipo_habitacion: 'Suite', precio_habitacion: 200, disponibilidad_habitacion: 0 },
        // ... Otras habitaciones
      ];

      setHabitaciones(habitacionesDesdeServidor);
    } catch (error) {
      console.error('Error al obtener las habitaciones:', error);
    }
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
