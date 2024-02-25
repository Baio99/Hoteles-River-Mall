import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IndexHotel = () => {
  // Estado para almacenar los hoteles
  const [hoteles, setHoteles] = useState([]);

  // Efecto para cargar los hoteles al montar el componente
  useEffect(() => {
    updateHotelesTable();
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al montar el componente

  // Función para crear un nuevo hotel
  const createHotel = () => {
    // Implementa la lógica de creación de hoteles aquí
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado después de crear el hotel
    updateHotelesTable();
  };

  // Función para eliminar un hotel
  const deleteHotel = (idHotel) => {
    // Implementa la lógica de eliminación de hoteles aquí
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado después de eliminar el hotel
    updateHotelesTable();
  };

  // Función para cargar los hoteles
  const updateHotelesTable = () => {
    // Implementa la lógica para obtener los hoteles desde el servidor
    // Puedes utilizar fetch o axios para realizar una petición al servidor
    // Actualiza el estado con los hoteles obtenidos
    const mockHoteles = [
      { id_hotel: 1, ubicacion_hotel: 'Quito', numerohabitaciones_hotel: 100, categoria_hotel: '5 estrellas', nombre_hotel: 'Hotel Ejemplo' },
      // Otros hoteles
    ];
    setHoteles(mockHoteles);
  };

  return (
    <div>
      <h1>Hoteles</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Hoteles">Hoteles</Link></li>
        <li><Link to="/Clientes">Clientes</Link></li>
        <li><Link to="/Habitacion">Habitaciones</Link></li>
        <li><Link to="/Reservacion">Reservaciones</Link></li>
      </ul>
      {/* Formulario para crear hoteles */}
      <h2>Crear Hotel</h2>
      {/* Implementa los campos y lógica de entrada del formulario aquí */}
      <button onClick={createHotel}>Crear</button>

      {/* Tabla para mostrar los hoteles */}
      <h2>Hoteles</h2>
      <table>
        <thead>
          <tr>
            <th>ID Hotel</th>
            <th>Ubicación Hotel</th>
            <th>Número de Habitaciones</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hoteles.map((hotel) => (
            <tr key={hotel.id_hotel}>
              <td>{hotel.id_hotel}</td>
              <td>{hotel.ubicacion_hotel}</td>
              <td>{hotel.numerohabitaciones_hotel}</td>
              <td>{hotel.categoria_hotel}</td>
              <td>{hotel.nombre_hotel}</td>
              <td>
                <button onClick={() => deleteHotel(hotel.id_hotel)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexHotel;
