import React, { useState } from 'react';
import './Button3.css';

/* Esta función llamada Button3 se encarga de borrar un cliente.
   Tiene como entrada la cédula del cliente que se va a eliminar y 
   retorna un mensaje de éxito o error en caso contrario. */

const Button3 = () => {
  const [cedula, setCedula] = useState('');

  const handleDelete = async () => {
    if (!cedula) {
      alert('Por favor ingresa la cédula del cliente que deseas eliminar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cliente/cedula/${cedula}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      const data = await response.json();
      console.log(data.message);
      alert('Cliente eliminado con éxito');
    } catch (error) {
      console.error('Error en el manejo de la eliminación:', error);
      alert('Error al eliminar el cliente');
    }
  };

  return (
    <div className="basic-form">
      <input
        type="text"
        placeholder="Cédula del cliente"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <button className="delete-button" onClick={handleDelete}>
        Borrar cliente
      </button>
    </div>
  );
};

export default Button3;
