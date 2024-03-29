import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar el componente Link
import { useNavigate } from 'react-router-dom';


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
  const [estatusRes, setEstatusRes] = useState('Pendiente'); // Valor predeterminado 'Pend'
  //const [mostrarEstadoReservacion, setMostrarEstadoReservacion] = useState(false); // Estado para controlar la visibilidad del campo Estado Reservación
  const [showModal, setShowModal] = useState(false); // Estado para controlar si se muestra el modal
  const navigate = useNavigate(); // Hook useNavigate para la navegación

  // Componente de modal para mostrar los datos del usuario
  const ModalDatosUsuario = ({ cedula, nombre, fechaIngreso, fechaSalida, tipoHabitacion, onClose }) => {
    return (

      <div className="modal-background" >
        <div className="modal-content">
          <h2>Datos Usuario</h2>
          <p>Cédula: {cedula}</p>
          <p>Nombre: {nombre}</p>
          <p>Fecha de Ingreso: {fechaIngreso}</p>
          <p>Fecha de Salida: {fechaSalida}</p>
          <p>Tipo de Habitación: {tipoHabitacion}</p>

        </div>
      </div>
    );
  };

  const handleClienteSubmit = async (e) => {
    e.preventDefault();
    // Cambiar el estatus_res a 'Conf' al confirmar la reserva

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
    setEstatusRes('Confirmada');


    // Ajustar el formato de las fechas al formato esperado en la base de datos (DD-MM-YYYY)
    const fechaIngresoFormatted = formatDate(fechaIngreso);
    const fechaSalidaFormatted = formatDate(fechaSalida);

    const reservacionData = {
      cedula_cliente: cedula,
      id_habitacion: idHabitacion,
      //estatus_res: 'Pend', // Establecemos el estatus de la reserva como Pendiente
      estatus_res: 'Conf', // Usar el estado actual de estatus_res
      fechaingreso_res: fechaIngresoFormatted,
      fechasalida_res: fechaSalidaFormatted
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
        setShowModal(true); // Mostrar el modal después de confirmar la reserva
      } else {
        console.error('Error al crear la reservación:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

// Función para ajustar el formato de la fecha
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

  const handleCancelar = () => {
    setShowModal(false);
    navigate('/Hoteles'); // Navegar a la ruta '/Hoteles '
  };

  const handleCloseModal = () => {
    // Cerrar el modal cambiando el estado
    setShowModal(false);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!reservaConfirmada ? (
        <form onSubmit={handleClienteSubmit} style={{  width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>Registrar Cliente</h2>
          {/* Campos del formulario para registrar cliente */}
          <div>
            <label htmlFor="cedula_cliente">Cédula:</label>
            <input
              type="text"
              id="cedula_cliente"
              value={cedula}
              onChange={(e) => {
                let value = e.target.value;
                // Limitar a 10 dígitos
                if (value.length > 10) {
                  value = value.slice(0, 10);
                }
                // Validar que solo sean números
                if (!isNaN(value) || value === '') {
                  setCedula(value);
                }
              }}
              placeholder="1234567890"
              required
              style={{ marginLeft: '30px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => {
                const value = e.target.value;
                // Validar que solo sean letras
                if (/^[a-zA-Z]+$/.test(value) || value === '') {
                  setApellido(value);
                }
              }}
              required
              style={{ marginLeft: '22px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
            />
          </div>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => {
                const value = e.target.value;
                // Validar que solo sean letras
                if (/^[a-zA-Z]+$/.test(value) || value === '') {
                  setNombre(value);
                }
              }}
              required
              style={{ marginLeft: '22px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
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
              style={{ marginLeft: '13px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => {
                const value = e.target.value;
                // Validar que solo sean números
                if (/^[0-9]*$/.test(value) || value === '') {
                  setTelefono(value);
                }
              }}
              required
              style={{ marginLeft: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
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
              style={{ marginLeft: '39px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '7px', border: 'none', borderRadius: '5px' }}>Registrar Cliente</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleReservacionSubmit} style={{  width: '350px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>Confirmar Reserva</h2>
          {/* Campos del formulario para confirmar reservación */}
          <div>
            <label htmlFor="fechaIngreso">Fecha de ingreso:</label>
            <input
              type="date"
              id="fechaIngreso"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              required
              style={{ marginLeft: '35px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
            />
          </div>
          <div>
            <label htmlFor="fechaSalida">Fecha de salida:</label>
            <input
              type="date"
              id="fechaSalida"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              required
              style={{ marginLeft: '45px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px' }}
            />
          </div>

          <div>
            <label htmlFor="estadoReservacion">Estado Reservación:</label>
            <input
              type="text"
              id="estadoReservacion"
              value={estatusRes}
              readOnly // Hacer que el campo sea de solo lectura
              required
              style={{ marginLeft: '15px', border: '1px solid #ccc', borderRadius: '5px', padding: '3px', width: '111px'}}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!showModal && <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '7px', border: 'none', borderRadius: '5px' }}>Confirmar Reserva</button>}
          </div>
        </form>
      )}

      {/* Modal de datos del usuario */}
      {showModal && (
        <div className="modal-background" style={{  width: '350px', padding: '11px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div className="modal-content">
            <h2>Datos Usuario</h2>
            <p>Cédula: {cedula}</p>
            <p>Nombre: {nombre}</p>
            <p>Fecha de Ingreso: {fechaIngreso}</p>
            <p>Fecha de Salida: {fechaSalida}</p>
            <p>Tipo de Habitación: {idHabitacion}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCliente;
