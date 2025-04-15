import React, { useState } from 'react';
import './Button2.css';

const Button2 = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cliente creado con éxito');
        setFormData({
          cedula: '',
          nombre: '',
        });
      } else {
        const errorMessage = await response.json();
        alert(`Error: ${errorMessage.error}`);
      }
    } catch (error) {
      alert('Hubo un error al crear el cliente. Por favor, intenta más tarde.');
    }
  };

  return (
    <div>
      <button className="create-button" onClick={() => document.getElementById('form').style.display = 'block'}>
        Crear cliente
      </button>

      <form id="form" style={{ display: 'none' }} onSubmit={handleSubmit}>
        <input type="text" name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required />
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <button type="submit">Guardar cliente</button>
      </form>
    </div>
  );
};

export default Button2;
