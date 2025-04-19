import React, { useState } from 'react';
import './reportes.css';

const DetalleProducto = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    if (!nombreProducto.trim()) return alert('Ingrese el nombre del producto');

    try {
      const res = await fetch(`http://localhost:5000/api/reportes/detalle-producto/${encodeURIComponent(nombreProducto)}`);
      if (!res.ok) throw new Error('Error en la consulta');
      const data = await res.json();
      setResultados(data);
      setError('');
    } catch (err) {
      setError('No se pudo obtener el detalle');
      setResultados([]);
    }
  };

  return (
    <div className="reporte-container">
      <h2>Detalle de artículos vendidos</h2>
      <input
        type="text"
        value={nombreProducto}
        onChange={(e) => setNombreProducto(e.target.value)}
        placeholder="Nombre del producto"
        className="input"
      />
      <button onClick={handleBuscar} className="boton">Buscar</button>

      {resultados.length > 0 && (
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Cliente</th>
              <th>Sucursal</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((fila, i) => (
              <tr key={i}>
                <td>{fila.PRODUCTO}</td>
                <td>{fila.CANTIDAD}</td>
                <td>{fila.CLIENTE}</td>
                <td>{fila.NOMBRE_FACTURACION}</td>
                <td>{new Date(fila.FECHA).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p className="reporte-error">{error}</p>}
    </div>
  );
};

export default DetalleProducto;
