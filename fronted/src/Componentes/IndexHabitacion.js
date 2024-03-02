import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const IndexHabitacion = () => {
  const { idHotel } = useParams(); // Recuperar el ID del hotel de la URL

  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetchHabitaciones();
  }, []);

const fetchHabitaciones = async () => {
    try {
        const idHotel = window.location.pathname.split('/').pop(); // Obtener el ID del hotel de la URL
        const response = await fetch(`http://localhost:8000/habitaciones/${idHotel}`);

        if (!response.ok) {
            throw new Error('Error al obtener las habitaciones');
        }
        const data = await response.json();
        setHabitaciones(data);
    } catch (error) {
        console.error(error);
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

      <h2>Habitaciones del Hotel ID: {idHotel}</h2>
      <table>
        <thead>
          <tr>
            <th>ID Habitación</th>
            <th>ID Hotel</th>
            <th>Tipo de Habitación</th>
            <th>Precio de la Habitación</th>
            <th>Disponibilidad de la Habitación</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexHabitacion;