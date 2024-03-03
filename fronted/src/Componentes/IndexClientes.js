import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../Estilos/IndexClientes.css';

const Cliente = () => {
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [apellidosCliente, setApellidosCliente] = useState('');
  const [nombresCliente, setNombresCliente] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [numCuentaCliente, setNumCuentaCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [cedulaError, setCedulaError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const [createResult, setCreateResult] = useState('');

  useEffect(() => {
    updateClientesTable();
  }, []); // Se ejecuta solo en la carga inicial

  const validarCedula = (event) => {
    const value = event.target.value;
    const newValue = value.replace(/\D/g, '');

    if (newValue !== value) {
      setCedulaError(true);
    } else {
      setCedulaError(false);
    }

    setCedulaCliente(newValue);
  };

  const validarTelefono = (event) => {
    const value = event.target.value;
    const newValue = value.replace(/\D/g, '');

    if (newValue !== value) {
      setTelefonoError(true);
    } else {
      setTelefonoError(false);
    }

    setTelefonoCliente(newValue);
  };

  const createCliente = () => {
    const clienteData = {
      cedula_cliente: cedulaCliente,
      apellidos_cliente: apellidosCliente,
      nombres_cliente: nombresCliente,
      direccion_cliente: direccionCliente,
      telefono_cliente: telefonoCliente,
      email_cliente: emailCliente,
      numcuenta_cliente: parseInt(numCuentaCliente),
    };

    fetch("http://localhost:8000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData),
    })
      .then((response) => response.json())
      .then((data) => {
        setCreateResult(data.message);
        // Limpiar los campos del formulario
        setCedulaCliente('');
        setApellidosCliente('');
        setNombresCliente('');
        setDireccionCliente('');
        setTelefonoCliente('');
        setEmailCliente('');
        setNumCuentaCliente('');
        // Actualizar la tabla de clientes
        updateClientesTable();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateClientesTable = () => {
    fetch("http://localhost:8000/clientes")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data.clientes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCliente = (cedulaCliente) => {
    fetch(`http://localhost:8000/clientes/${cedulaCliente}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setCreateResult(data.message);
        // Actualizar la tabla de clientes
        updateClientesTable();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* ... Resto del código de Menú ... */}
      <h1>CLIENTES</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Hoteles">Hoteles</Link></li>
        <li><Link to="/Clientes">Clientes</Link></li>
        <li><Link to="/Habitacion">Habitaciones</Link></li>
        <li><Link to="/Reservacion">Reservaciones</Link></li>
      </ul>

      <h2>Crear Cliente</h2>
      <div className="form-group">
        <label>Cédula Cliente:</label>
        <input type="text" id="cedula_cliente" value={cedulaCliente} onChange={validarCedula} />
        {cedulaError && <span id="cedula_error" style={{ color: 'red' }}>La cédula debe contener solo números</span>}
      </div>

      {/* ... Resto del código del formulario ... */}

      <div class="form-group">
        <label>Apellidos Cliente:</label>
        <input type="text" id="apellidos_cliente" />
    </div>
    <div class="form-group">
        <label>Nombres Cliente:</label>
        <input type="text" id="nombres_cliente" />
    </div>
    <div class="form-group">
        <label>Dirección Cliente:</label>
        <input type="text" id="direccion_cliente" />
    </div>
    <div class="form-group">
        <label>Teléfono Cliente:</label>
        <input type="text" id="telefono_cliente"  />
        <span id="telefono_error" style={{ color: 'red', display: 'none' }}>El teléfono debe contener solo números</span>

    </div>

  
    <div class="form-group">
        <label>Email Cliente:</label>
        <input type="text" id="email_cliente" />
    </div>
  
    <div class="form-group">
        <input type="submit" value="Crear" onclick="createCliente()" />
    </div>


<h2>Clientes</h2>
    <table id="clientesTable">
        <thead>
            <tr>
                <th>Cédula Cliente</th>
                <th>Apellidos Cliente</th>
                <th>Nombres Cliente</th>
                <th>Dirección Cliente</th>
                <th>Teléfono Cliente</th>
                <th>Email Cliente</th>
                <th>Número de Cuenta</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>



    

      <div className="result" id="createResult">{createResult}</div>
      <footer className="text-center text-white fixed-bottom" style={{ backgroundColor: '#0b0409' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Contactos:</h2>
          <h2>gwchicango@espe.edu.ec </h2>
          <h2>@espe.edu.ec</h2>
          <h2>baiza@espe.edu.ec</h2>
          <h2>@espe.edu.ec</h2>
        </div>
      </footer>
    </div>
  );
};

export default Cliente;
