import React, { useState } from 'react';

const FormularioCliente = ({ idHabitacion }) => {
  const [cedula, setCedula] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const clienteData = {
      cedula_cliente: cedula,
      apellidos_cliente: apellido,
      nombres_cliente: nombre,
      direccion_cliente: direccion,
      telefono_cliente: telefono,
      email_cliente: email
    };
  
    try {
      const response = await fetch('http://localhost:8000/clientes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteData)
      });
  
      if (response.ok) {
        console.log('Cliente creado exitosamente');
      } else {
        console.error('Error al crear el cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservar habitación</h2>
      <div>
        <label htmlFor="cedula_cliente">Cédula:</label>
        <input
          type="text"
          id="cedula_cliente"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default FormularioCliente;
