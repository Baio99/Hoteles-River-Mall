import React from 'react';
import '../Estilos/IndexTotal.css';
import { Link } from 'react-router-dom';

function IndexTotal() {
  return (
    <div>
      <h1>Menú</h1>

      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Hoteles">Hoteles</Link></li>
        <li><Link to="/Clientes">Clientes</Link></li>
        <li><Link to="/Reservacion">Reservaciones</Link></li>
      </ul>

      <div className="content">
        <div style={{ textAlign: 'center' }}>
          <h2>GESTION DE HABITACIONES PARA HOTELES </h2>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <img src="https://ga.fsc.org/sites/default/files/inline-images/GA%20website%20images%20%281000%20%C3%97%20512%20px%29.png" alt="Imagen de Hoteles" style={{ width: '1500px', height: '800px' }} />
          </div>
        </div>
      </div>

      <footer className="text-center text-white fixed-bottom">
        <div style={{ textAlign: 'center' }}>
          <h2>Contactos:</h2>
          <h2>gwchicango@espe.edu.ec</h2>
          <h2>@espe.edu.ec</h2>
          <h2>baiza@espe.edu.ec</h2>
          <h2>@espe.edu.ec</h2>
        </div>
      </footer>
    </div>
  );
}

export default IndexTotal;
