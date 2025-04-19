import React, { useState } from 'react';
import './reportes.css';

const VentasProvinciaMes = () => {
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    if (!mes.trim() || !anio.trim()) {
      return alert('Por favor ingrese todos los campos');
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/reportes/ventas-provincia?mes=${mes}&anio=${anio}`
      );
      if (!res.ok) throw new Error('Error en la consulta');
      const data = await res.json();
      setVentas(data);
      setError('');
    } catch (err) {
      setVentas([]);
      setError('No se pudo obtener la información de ventas');
    }
  };

  return (
    <div className="reporte-container">
      <h2>Ventas por provincia en un mes</h2>
      <input
        type="number"
        placeholder="Mes (1-12)"
        value={mes}
        onChange={(e) => setMes(e.target.value)}
      />
      <input
        type="number"
        placeholder="Año"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
      />
      <button className="boton" onClick={handleBuscar}>
        Buscar
      </button>

      {ventas.length > 0 && (
        <table className="tabla">
          <thead>
            <tr>
              <th>Provincia</th>
              <th>Total Ventas</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, i) => (
              <tr key={i}>
                <td>{venta.NOMBRE_PROVINCIA}</td>
                <td>{venta.TOTAL_VENTAS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p className="reporte-error">{error}</p>}
    </div>
  );
};

export default VentasProvinciaMes;
