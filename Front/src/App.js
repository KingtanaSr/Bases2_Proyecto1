import { useState } from 'react';
import logo from './Assets/logo.svg';
import logoTEC from './Assets/logo tec.png';
import './App.css';
import Button1 from './Components/Button1';
import Button2 from './Components/Button2';
import Button3 from './Components/Button3';
import ListaPublicaciones from './Components/ListaPublicaciones';
import ListaColecciones from './Components/ListaColecciones';
import Button4 from './Components/Button4';
import Login from './Components/Login'; 

function App() {
  const [usuario, setUsuario] = useState(null); // Estado para saber si hay sesión iniciada

  // Si no hay sesión, mostramos el login
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

  
// Si hay sesión, mostramos la interfaz principal
  return (
    <div className="App">
      <header className="App-header">
        
        <img src={logoTEC} className="logo-tec" alt="logoTEC" />
        <h2>PROYECTO 1 BD2 - Bienvenido, {usuario}</h2>

      {/* Botón de cerrar sesión */}
      <button
        className="logout-button"
        type="button"
        onClick={() => setUsuario(null)}
      >
        Cerrar sesión
      </button>

        <div className="button-container">
          <Button2 />
          <Button1 />
          <Button3 />
        </div>
        <Button4 />
      </header>
    </div>
  );
}

export default App;
