import React, { useState } from 'react';
import './Button1.css';

/* Esta función permite modificar un dato de un cliente existente.
   El usuario ingresa la cédula del cliente, la columna a modificar y el nuevo dato.
   La solicitud se envía al backend usando el endpoint PUT correspondiente. */

const Button1 = () => {
  const [cedula, setCedula] = useState('');
  const [columna, setColumna] = useState('');
  const [nuevoDato, setNuevoDato] = useState('');

  const handleModify = async () => {
    const bodyData = {
      columna,
      nuevoDato,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/cliente/cedula/${cedula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la modificación');
      }

      alert('Cliente modificado con éxito');

      setCedula('');
      setColumna('');
      setNuevoDato('');
    } catch (error) {
      console.error('Error modificando el cliente:', error);
      alert(`Error modificando el cliente: ${error.message}`);
    }
  };

  return (
    <div className="form-container2">
      <input
        type="text"
        placeholder="Cédula del cliente"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Columna a modificar"
        value={columna}
        onChange={(e) => setColumna(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nuevo dato"
        value={nuevoDato}
        onChange={(e) => setNuevoDato(e.target.value)}
        required
      />
      <button className="modify-button" onClick={handleModify}>
        Modificar cliente
      </button>
    </div>
  );
};

export default Button1;
