import React, { useState } from 'react';

/* Está función se encarga de mostrar la lista de colecciones al selecionar el botón 
mostrar colecciones, después se encarga de mostrar la lista de publicaciones según
la colección que se haya seleccionado, y por último muestra los detalles de una
publicación determinada. Esto se hace por medio de llamadas al backend, que es donde
se encuentran los query con los select que se encargan de realizar las consultas a
la base de datos y así obtener las colecciones, publicaciones y sus datos. */

function ListaColecciones() {
  const [colecciones, setColecciones] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [publications, setPublications] = useState([]);
  const [collectionsVisible, setCollectionsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Función para obtener las colecciones desde el backend
  const fetchColecciones = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/collections');
      const data = await response.json();
      setColecciones(data); // Se guardan las colecciones en el estado
      setCollectionsVisible(true); // Se muestra la lista de colecciones después de cargarlas
    } catch (error) {
      console.error('Error al obtener las colecciones:', error);
      alert('Error al cargar las colecciones.');
    }
  };

  // Función para obtener las publicaciones de la colección seleccionada
  const fetchPublications = async (collectionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/publications_by_collection?collectionId=${collectionId}`);
      const data = await response.json();
      setPublications(data); // Guardar las publicaciones en el estado
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      alert('Error al cargar las publicaciones.');
    }
  };

  // Función para alternar la expansión de los detalles de la publicación
  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="colect-section">
      <h2>Búsqueda por Colección</h2>

      {/* Botón para mostrar las colecciones */}
      <button onClick={fetchColecciones}>Mostrar Colecciones</button>

      {/* Mostrar la lista de colecciones solo si collectionsVisible es true */}
      {collectionsVisible && (
        <ul>
          {colecciones.length === 0 && <li>No hay colecciones para mostrar.</li>}
          {colecciones.map((col) => (
            <li key={col.id}>
              <button className="collection-button" onClick={() => {
                setSelectedCollection(col);
                fetchPublications(col.id); // Cargar publicaciones al seleccionar la colección
              }}>
                {col.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Publicaciones de la colección seleccionada */}
      {selectedCollection && (
        <div>
          <h3>Publicaciones en la colección: {selectedCollection.name}</h3>
          <ul>
            {publications.length === 0 && <li>No hay publicaciones para mostrar.</li>}
            {publications.map((pub, index) => (
              <li key={index}>
                <button onClick={() => toggleExpand(index)}>
                  {pub.title}
                </button>
                {expandedIndex === index && ( // Mostrar detalles si está expandida
                  <div>
                    <p>Id de la especie: {pub.id}</p>
                    <p>Fecha de publicación: {pub.date_of_publication}</p>
                    <p>Magazine/Editorial: {pub.magazine_name}</p>
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
      )}
    </div>
  );
}

export default ListaColecciones;
