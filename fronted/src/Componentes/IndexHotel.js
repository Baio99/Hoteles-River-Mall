import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IndexHotel = () => {
  const navigate = useNavigate();

  const [hoteles, setHoteles] = useState([]);
  const [ubicacionBusqueda, setUbicacionBusqueda] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/hoteles')
      .then(response => response.json())
      .then(data => setHoteles(data))
      .catch(error => console.error('Error fetching hoteles:', error));
  }, []);

  const handleSearchChange = (e) => {
    setUbicacionBusqueda(e.target.value);
  };

  const handleHotelSelection = (idHotel) => {
    console.log("ID del hotel seleccionado:", idHotel); // Imprime el ID del hotel seleccionado
    navigate(`/habitaciones/${idHotel}`);
};
  
  const filteredHoteles = hoteles.filter((hotel) =>
    hotel.ubicacion_hotel.toLowerCase().includes(ubicacionBusqueda.toLowerCase())
  );

  const categoriasUbicacion = [...new Set(hoteles.map((hotel) => hotel.ubicacion_hotel))];

  return (
    <div className="container">
      <h1>Hoteles</h1>
      <div className="navbar">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Hoteles">Hoteles</Link></li>
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