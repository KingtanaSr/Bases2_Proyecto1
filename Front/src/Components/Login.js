import React, { useState } from 'react';

function Login({ setUsuario }) {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [modoRegistro, setModoRegistro] = useState(false); // <- nuevo estado

  // Función para iniciar sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsuario(nombre_usuario);
        setMensaje('Inicio de sesión exitoso');
      } else {
        setMensaje(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  // Función para registrar nuevo usuario
  const handleCrearUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario creado con éxito');
        setNombreUsuario('');
        setContraseña('');
        setMensaje(data.message || 'Usuario registrado con éxito');
        setModoRegistro(false); // volver a login
      } else {
        setMensaje(data.message || 'Error al crear usuario');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={modoRegistro ? handleCrearUsuario : handleSubmit}>
        <h3 className="titulo-login">{modoRegistro ? 'Crear Usuario' : 'Iniciar Sesión'}</h3>
        <input
          type="text"
          placeholder="Usuario (10 carácteres max)"
          value={nombre_usuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña (8 carácteres)"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">{modoRegistro ? 'Registrarse' : 'Ingresar'}</button>
        <button
          type="reg"
          className="toggle-button"
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setMensaje('');
          }}
        >
          {modoRegistro
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
