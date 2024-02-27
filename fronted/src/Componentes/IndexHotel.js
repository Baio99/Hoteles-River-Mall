import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Estilos/IndexHotel.css'; // Asegúrate de tener la ruta correcta al archivo CSS

const IndexHotel = () => {
  const navigate = useNavigate();

  // Estado para almacenar los hoteles, la ubicación de búsqueda y nuevo hotel
  const [hoteles, setHoteles] = useState([
    { id_hotel: 1, ubicacion_hotel: 'Quito', numerohabitaciones_hotel: 100, categoria_hotel: '5 estrellas', nombre_hotel: 'Hotel Ejemplo Quito' },
    { id_hotel: 2, ubicacion_hotel: 'Guayaquil', numerohabitaciones_hotel: 80, categoria_hotel: '4 estrellas', nombre_hotel: 'Hotel Ejemplo Guayaquil' },
    { id_hotel: 3, ubicacion_hotel: 'Cuenca', numerohabitaciones_hotel: 120, categoria_hotel: '3 estrellas', nombre_hotel: 'Hotel Ejemplo Cuenca' },
    { id_hotel: 4, ubicacion_hotel: 'Galápagos', numerohabitaciones_hotel: 50, categoria_hotel: '5 estrellas', nombre_hotel: 'Hotel Ejemplo Galápagos' },
    { id_hotel: 5, ubicacion_hotel: 'Manta', numerohabitaciones_hotel: 90, categoria_hotel: '4 estrellas', nombre_hotel: 'Hotel Ejemplo Manta' },
    { id_hotel: 6, ubicacion_hotel: 'Quito', numerohabitaciones_hotel: 100, categoria_hotel: '5 estrellas', nombre_hotel: 'Hotel Ejemplo Quito' },
    { id_hotel: 7, ubicacion_hotel: 'Guayaquil', numerohabitaciones_hotel: 80, categoria_hotel: '4 estrellas', nombre_hotel: 'Hotel Ejemplo Guayaquil' },
    { id_hotel: 8, ubicacion_hotel: 'Cuenca', numerohabitaciones_hotel: 120, categoria_hotel: '3 estrellas', nombre_hotel: 'Hotel Ejemplo Cuenca' },
    { id_hotel: 9, ubicacion_hotel: 'Galápagos', numerohabitaciones_hotel: 50, categoria_hotel: '5 estrellas', nombre_hotel: 'Hotel Ejemplo Galápagos' },
    { id_hotel: 510, ubicacion_hotel: 'Manta', numerohabitaciones_hotel: 90, categoria_hotel: '4 estrellas', nombre_hotel: 'Hotel Ejemplo Manta' },
  
  ]);
  const [ubicacionBusqueda, setUbicacionBusqueda] = useState('');
  const [nuevoHotel, setNuevoHotel] = useState({
    nombre_hotel: '',
    ubicacion_hotel: '',
    numerohabitaciones_hotel: 0,
    categoria_hotel: '',
  });

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setUbicacionBusqueda(e.target.value);
  };

  // Función para manejar cambios en el formulario de nuevo hotel
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoHotel((prevHotel) => ({ ...prevHotel, [name]: value }));
  };

  // Función para manejar la selección de un hotel y redirigir a las habitaciones
  const handleHotelSelection = (idHotel) => {
    // Puedes personalizar la ruta según tu estructura de rutas
    // navigate(`/habitaciones/${idHotel}`);
    navigate(`/habitaciones`);
  };

  // Filtra los hoteles en función de la ubicación de búsqueda
  const filteredHoteles = hoteles.filter((hotel) =>
    hotel.ubicacion_hotel.toLowerCase().includes(ubicacionBusqueda.toLowerCase())
  );

  // Categorización de hoteles por ubicación
  const categoriasUbicacion = [...new Set(hoteles.map((hotel) => hotel.ubicacion_hotel))];

  return (
    <div className="container">
      <h1>Hoteles</h1>
      <div className="navbar">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Hoteles">Hoteles</Link></li>
          <li><Link to="/Clientes">Clientes</Link></li>
          <li><Link to="/Reservacion">Reservaciones</Link></li>
        </ul>
      </div>

      <h2>Categorías de Ubicación</h2>
      <select className="locationCategories" onChange={handleSearchChange}>
        <option value="">Todas</option>
        {categoriasUbicacion.map((categoria, index) => (
          <option key={index} value={categoria}>{categoria}</option>
        ))}
      </select>

      <h2>Hoteles Disponibles</h2>
      <table className="hotelTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Número de Habitaciones</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredHoteles.map((hotel) => (
            <tr key={hotel.id_hotel}>
              <td>{hotel.nombre_hotel}</td>
              <td>{hotel.ubicacion_hotel}</td>
              <td>{hotel.numerohabitaciones_hotel}</td>
              <td>{hotel.categoria_hotel}</td>
              <td>
                <button onClick={() => handleHotelSelection(hotel.id_hotel)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default IndexHotel;
