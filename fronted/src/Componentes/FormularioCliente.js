import React, { useState } from 'react';

const FormularioCliente = ({ idHabitacion }) => {
  const [cedula, setCedula] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');

  const handleClienteSubmit = async (e) => {
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
        setReservaConfirmada(true); // Activamos la confirmación de reserva
      } else {
        console.error('Error al crear el cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleReservacionSubmit = async (e) => {
    e.preventDefault();

    const reservacionData = {
      cedula_cliente: cedula,
      id_habitacion: idHabitacion,
      estatus_res: 'Pend', // Establecemos el estatus de la reserva como Pendiente
      fechaingreso_res: fechaIngreso,
      fechasalida_res: fechaSalida
    };

    try {
      const response = await fetch('http://localhost:8000/reservaciones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservacionData)
      });

      if (response.ok) {
        console.log('Reservación creada exitosamente');
      } else {
        console.error('Error al crear la reservación:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      {!reservaConfirmada ? (
        <form onSubmit={handleClienteSubmit}>
          <h2>Registrar Cliente</h2>
          {/* Campos del formulario para registrar cliente */}
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
          <button type="submit">Registrar Cliente</button>
        </form>
      ) : (
        <form onSubmit={handleReservacionSubmit}>
          <h2>Confirmar Reserva</h2>
          {/* Campos del formulario para confirmar reservación */}
          <div>
            <label htmlFor="fechaingreso_res">Fecha de Ingreso:</label>
            <input
              type="date"
              id="fechaingreso_res"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="fechasalida_res">Fecha de Salida:</label>
            <input
              type="date"
              id="fechasalida_res"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              required
            />
          </div>
          <button type="submit">Confirmar Reserva</button>
        </form>
      )}
    </div>
  );
};

export default FormularioCliente;
