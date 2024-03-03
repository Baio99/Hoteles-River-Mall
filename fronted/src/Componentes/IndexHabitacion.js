import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import FormularioCliente from './FormularioCliente';
import '../Estilos/IndexHabitacion.css';

const IndexHabitacion = () => {
  const { idHotel } = useParams();
  const navigate = useNavigate();
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const fetchHabitaciones = async () => {
    try {
      const idHotel = window.location.pathname.split('/').pop();
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

  const handleSeleccionarCliente = (habitacion) => {
    setSelectedHabitacion(habitacion);
  };

  return (
    <div>
      <h1>Habitaciones</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Hoteles">Hoteles</Link></li>
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
                <button onClick={() => handleSeleccionarCliente(habitacion)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedHabitacion && (
        <div>
          <h3>Reservar habitación {selectedHabitacion.id_habitacion}</h3>
          <FormularioCliente idHabitacion={selectedHabitacion.id_habitacion} />
        </div>
      )}
    </div>
  );
};

export default IndexHabitacion;
