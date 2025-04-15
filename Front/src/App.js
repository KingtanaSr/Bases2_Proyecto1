import logo from './Assets/logo.svg';
import logoTEC from './Assets/logo tec.png';
import './App.css';
import Button1 from './Components/Button1';
import Button2 from './Components/Button2';
import Button3 from './Components/Button3';
import ListaPublicaciones from './Components/ListaPublicaciones';
import ListaColecciones from './Components/ListaColecciones';
import Button4 from './Components/Button4';

/* Es el componente principal de la aplicación, se importan
los distintos componentes que se van a utilizar, se organiza
la visualización de los distintos elementos con los que el 
usuario va a interactuar.*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logoTEC} className="logo-tec" alt="logoTEC" />
        <h2>PROYECTO 1 BD2</h2>
        <div className="button-container">
          <Button2 />
          <Button1 />
          <Button3 />
        </div>

        {/* Listas de publicaciones y colecciones */}
        <ListaPublicaciones />
        <Button4 />
      </header>
    </div>
  );
}


export default App;