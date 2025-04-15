import React, { useState } from 'react';
import './Button4.css';

/* Esta función llamada Button4 se encarga de mostrar la lista de clientes 
   registrados en el sistema. Al hacer clic en el botón, realiza una solicitud
   GET al backend y muestra los datos en pantalla. */

const Button4 = () => {
  const [clientes, setClientes] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleFetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clientes');
      if (!response.ok) {
        throw new Error('Error al obtener los clientes');
      }

      const data = await response.json();
      console.log('Clientes recibidos:', data);
      setClientes(data);
      setShowList(true);
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      alert('Error al obtener la lista de clientes');
    }
  };

  return (
    <div className="client-list-container">
      <button className="view-button" onClick={handleFetchClients}>
        Ver clientes
      </button>

      {showList && (
        <ul className="client-list">
          {clientes.map((cliente, index) => (
            <li key={index}>
              <strong>Nombre:</strong> {cliente.NOMBRE} <br />
              <strong>Cédula:</strong> {cliente.CEDULA}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Button4;
