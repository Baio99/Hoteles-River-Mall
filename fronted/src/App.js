import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clientes from './Componentes/IndexClientes';
import Total from './Componentes/IndexTotal';
import Reservacion from './Componentes/IndexReservacion';
import Habitacion from './Componentes/IndexHabitacion';
import Hotel from './Componentes/IndexHotel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Total />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Reservacion" element={<Reservacion />} />
        <Route path="/habitaciones/:id" element={<Habitacion />} /> {/* Definición de la ruta para habitaciones */}
        <Route path="/Hoteles" element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;
