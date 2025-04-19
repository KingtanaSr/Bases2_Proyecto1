import React, { useState } from 'react';
import './Button4.css';

const Button4 = () => {
  const [clientes, setClientes] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleFetchClients = async () => {
    // Si ya se mostró la lista, al presionar de nuevo la ocultamos
    if (showList) {
      setShowList(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/clientes');
      if (!response.ok) {
        throw new Error('Error al obtener los clientes');
      }

      const data = await response.json();
      console.log('Clientes recibidos:', data);
      setClientes(data);
      setShowList(true); // Mostramos la lista
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      alert('Error al obtener la lista de clientes');
    }
  };

      return (
        <div className="client-list-container">
      <div className="centered-content">
        <button className="view-button" onClick={handleFetchClients}>
          {showList ? 'Ocultar clientes' : 'Ver clientes'}
        </button>

        {showList && (
          <ul className="client-list">
            {clientes.map((cliente, index) => (
              <li key={index}>
                <strong>{cliente.NOMBRE}</strong> - {cliente.CEDULA}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Button4;