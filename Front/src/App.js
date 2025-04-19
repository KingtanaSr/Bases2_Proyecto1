import { useState } from 'react';
import logoTEC from './Assets/logo tec.png';
import './App.css';
import Button1 from './Components/Button1'; // Insertar cliente
import Button2 from './Components/Button2'; // Actualizar cliente
import Button3 from './Components/Button3'; // Eliminar cliente
import Button4 from './Components/Button4'; // Ver clientes
import Login from './Components/Login';
import ProveedorProductoCRUD from './Components/ProveedorProductoCRUD';
import Reporte1 from './Components/DetalleProducto';
import Reporte2 from './Components/VentasPorProvincia';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vistaActiva, setVistaActiva] = useState('inicio');

  // Mostrar login si no hay sesión iniciada
  if (!usuario) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoTEC} className="logo-tec-login" alt="logoTEC" />
          <h2>Inicio de Sesión</h2>
          <Login setUsuario={setUsuario} />
        </header>
      </div>
    );
  }

  // Si hay sesión iniciada
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoTEC} className="logo-tec" alt="logoTEC" />
        <h2>PROYECTO 1 BD2 - Bienvenido, {usuario}</h2>

        {/* Botón de cerrar sesión */}
        <button
          className="logout-button"
          type="button"
          onClick={() => {
            setUsuario(null);
            setVistaActiva('inicio');
          }}
        >
          Cerrar sesión
        </button>

        {/* Navegación entre vistas */}
        <div className="nav-buttons">
          <button onClick={() => setVistaActiva('clientes')}>
            CRUD Clientes
          </button>
          <button onClick={() => setVistaActiva('proveedorProducto')}>
            CRUD Proveedor-Producto
          </button>
          <button onClick={() => setVistaActiva('reportes')}>
            Reportes
          </button>
        </div>

        {/* Vista de CRUD Clientes */}
        {vistaActiva === 'clientes' && (
          <div className="button-container">
            <Button2 />
            <Button1 />
            <Button3 />
            <Button4 />
          </div>
        )}

        {/* Vista de CRUD Proveedor-Producto */}
        {vistaActiva === 'proveedorProducto' && (
          <div className="button-container">
            <ProveedorProductoCRUD />
          </div>
        )}

        {/* Vista de Reportes */}
        {vistaActiva === 'reportes' && (
          <div className="button-container">
            <Reporte1 />
            <Reporte2 />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
