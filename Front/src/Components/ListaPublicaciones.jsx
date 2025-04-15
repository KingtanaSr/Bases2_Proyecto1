import React, { useState } from 'react';
import './SearchBar.css';
import './LC.css';

/* La función ListaPublicaciones se encarga de mostrar
la lista de publicaciones según un nombre científico ingresado por el usuario, 
adicionalmente se puede filtrar por el nombre de una publicación en 
específico. Como salida mostrar la lista de publicaciones, si las hay, o
un mensaje que dice que no se encontraron publicaciones. */

function ListaPublicaciones() {
  const [species, setSpecies] = useState(''); // Estado para capturar el nombre científico
  const [publications, setPublications] = useState([]); // Estado para almacenar los resultados de las publicaciones
  const [expandedIndex, setExpandedIndex] = useState(null); // Estado para manejar qué publicación está expandida

  // Función para hacer la solicitud al backend
  const fetchPublications = async () => {
    if (!species) {
      alert('Por favor, ingresa un nombre científico.');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/publications?species=${species}`);
      const data = await response.json();
      setPublications(data); 
      setExpandedIndex(null);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      alert('Error al buscar publicaciones. Intenta nuevamente.');
    }
  };

  // Función para manejar el evento cuando se hace clic en el botón "Buscar"
  const handleSearch = () => {
    fetchPublications(); // Llama a la función para hacer la búsqueda
  };

  // Función que cambia entre expandir y colapsar la hacer clic en un título de publicación
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="publi-section">
      <h2>Búsqueda de Publicaciones</h2>
  
      <div className="search-bar-container">
        <input 
          type="text"
          className="search-input"
          placeholder="Escribe un nombre científico" 
          value={species} 
          onChange={(e) => setSpecies(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}> 🔍</button>
      </div>

      {/* Lista de publicaciones obtenidas */}
      <ul>
        {publications.length === 0 && <li>No hay publicaciones para mostrar.</li>}
        {publications.map((pub, index) => (
          <li className='lista-publicaciones' key={index}>
            <h3 onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
              {pub.title}
            </h3>
            {expandedIndex === index && (
              <div>
                <p>Id de la especie: {pub.id}</p>
                <p>Fecha de publicación: {pub.date_of_publication}</p>
                <p>Mgazine/Editorial: {pub.magazine_name}</p>
                <p>DOI: {pub.doi}</p>
                <p>ISBN: {pub.isbn}</p>
                <p>Instituto: {pub.institute}</p>
                <p>País: {pub.country}</p>
                <p>Autor: {pub.author_name}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPublicaciones;

