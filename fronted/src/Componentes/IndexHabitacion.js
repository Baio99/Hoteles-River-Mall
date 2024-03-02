import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';

const IndexHabitacion = () => {
  const { idHotel } = useParams(); // Recuperar el ID del hotel de la URL

  const [habitaciones, setHabitaciones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [clienteData, setClienteData] = useState({
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: '',
  });

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

  const openModal = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setHabitacionSeleccionada(null);
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteData({
      ...clienteData,
      [name]: value,
    });
  };

  const guardarCliente = async () => {
    // Lógica para enviar los datos del cliente al servidor
    console.log('Datos del cliente:', clienteData);

    // Simulación de una solicitud al servidor (ajusta según tu lógica)
    // await fetch('http://localhost:8000/clientes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(clienteData),
    // });

    // Actualizar el estado y cerrar el modal
    setHabitacionSeleccionada(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Habitaciones</h1>
      <ul>
        {/* ... (otros enlaces) */}
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
                {habitacionSeleccionada !== habitacion ? (
                  <button onClick={() => openModal(habitacion)}>Reservar</button>
                ) : (
                  <button onClick={closeModal}>Cancelar Reserva</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Formulario de Cliente"
      >
        <h2>Formulario de Cliente</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Campos del formulario (nombre, correo, etc.) */}
          <label>
            Nombres:
            <input type="text" name="nombres" value={clienteData.nombres} onChange={handleInputChange} />
          </label>
          <label>
            Apellidos:
            <input type="text" name="apellidos" value={clienteData.apellidos} onChange={handleInputChange} />
          </label>
          <label>
            Dirección:
            <input type="text" name="direccion" value={clienteData.direccion} onChange={handleInputChange} />
          </label>
          <label>
            Teléfono:
            <input type="text" name="telefono" value={clienteData.telefono} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" value={clienteData.email} onChange={handleInputChange} />
          </label>
          <button onClick={closeModal}>
            Cancelar
          </button>
          <button onClick={guardarCliente}>
            Guardar Cliente
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default IndexHabitacion;
