import React, { useState, useEffect } from 'react';
import './ProveedorProductoCRUD.css';

const ProveedorProductoCRUD = () => {
  // Crear
  const [formData, setFormData] = useState({ proveedor_id: '', producto_id: '' });
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);

  // Cargar proveedores y productos al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProveedores = await fetch('http://localhost:5000/api/proveedores');
        const resProductos = await fetch('http://localhost:5000/api/productos');
        const dataProveedores = await resProveedores.json();
        const dataProductos = await resProductos.json();

        setProveedores(dataProveedores);
        setProductos(dataProductos);
      } catch (err) {
        alert('Error al cargar proveedores o productos');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/proveedor-producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Relación creada con éxito');
        setFormData({ proveedor_id: '', producto_id: '' });
      } else {
        const errorMessage = await response.json();
        alert(`Error: ${errorMessage.error}`);
      }
    } catch (error) {
      alert('Error al crear la relación');
    }
  };


  // Ver
  const [relaciones, setRelaciones] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleFetch = async () => {
    if (showList) {
      setShowList(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/proveedor-productos');
      if (!response.ok) throw new Error('Error al obtener las relaciones');
      const data = await response.json();
      setRelaciones(data);
      setShowList(true);
    } catch (error) {
      alert('Error al obtener los datos');
    }
  };

  // Modificar
  const [modCedula, setModCedula] = useState('');
  const [columna, setColumna] = useState('');
  const [nuevoDato, setNuevoDato] = useState('');

  const handleModify = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/proveedor-producto/id/${modCedula}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columna, nuevoDato }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la modificación');
      }
      alert('Relación modificada con éxito');
      setModCedula('');
      setColumna('');
      setNuevoDato('');
    } catch (error) {
      alert(`Error modificando la relación: ${error.message}`);
    }
  };

  // Eliminar
  const [relacionSeleccionada, setRelacionSeleccionada] = useState(null);
  const handleDeleteRelacion = async () => {
    if (!relacionSeleccionada) {
      alert('Seleccione una relación primero');
      return;
    }
    const { id_producto, id_proveedor } = relacionSeleccionada;
    try {
      const response = await fetch(`http://localhost:5000/api/proveedor-producto/${id_producto}/${id_proveedor}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al eliminar');
      }
      alert('Relación eliminada con éxito');
      setRelaciones((prev) =>
        prev.filter(
          (rel) => !(rel.id_producto === id_producto && rel.id_proveedor === id_proveedor)
        )
      );
      setRelacionSeleccionada(null);
    } catch (error) {
      alert(`Error eliminando la relación: ${error.message}`);
    }
  };

  return (
    <>
    {/* Crear */}
      <div className="create-form">
      <button
        className="crud-button create-button"
        onClick={() => document.getElementById('create-form').style.display = 'block'}
      >
        Crear relación
      </button>

      <form id="create-form" style={{ display: 'none' }} onSubmit={handleSubmit}>
        <select name="proveedor_id" value={formData.proveedor_id} onChange={handleChange} required>
          <option value="">Seleccione un proveedor</option>
          {proveedores.map((p) => (
            <option key={p.ID_PROVEEDOR} value={p.ID_PROVEEDOR}>
              {p.NOMBRE}
            </option>
          ))}
        </select>

        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          <option value="">Seleccione un producto</option>
          {productos.map((p) => (
            <option key={p.ID_PRODUCTO} value={p.ID_PRODUCTO}>
              {p.NOMBRE}
            </option>
          ))}
        </select>

        <button type="submit">Guardar relación</button>
      </form>
    </div>

      {/* Ver */}
      <div className="pp-list-container">
        <div className="pp-centered-content">
          <button className="pp-view-button" onClick={handleFetch}>
            {showList ? 'Ocultar relaciones' : 'Ver relaciones'}
          </button>
          {showList && (
            <ul className="pp-list">
              {relaciones.map((r, i) => (
                <li key={i}>
                  <strong>{r.NOMBRE_PROVEEDOR}</strong> - {r.NOMBRE_PRODUCTO}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Modificar */}
      <div className="modify-form">
        <input type="text" placeholder="ID relación" value={modCedula} onChange={(e) => setModCedula(e.target.value)} />
        <input type="text" placeholder="Columna a modificar" value={columna} onChange={(e) => setColumna(e.target.value)} />
        <input type="text" placeholder="Nuevo dato" value={nuevoDato} onChange={(e) => setNuevoDato(e.target.value)} />
        <button className="modify-button" onClick={handleModify}>Modificar relación</button>
      </div>

      {/* Eliminar */}
      <div className="delete-form">
      <select
          className="select-relacion"
          value={relacionSeleccionada ? `${relacionSeleccionada.id_producto}-${relacionSeleccionada.id_proveedor}` : ''}
          onChange={(e) => {
            const [id_producto, id_proveedor] = e.target.value.split('-');
            const seleccionada = relaciones.find(
              (rel) =>
                rel.id_producto === id_producto &&
                rel.id_proveedor === id_proveedor
            );
            setRelacionSeleccionada(seleccionada);
          }}
        >
          <option value="">Seleccione una relación</option>
          {relaciones.map((rel, idx) => (
            <option key={idx} value={`${rel.id_producto}-${rel.id_proveedor}`}>
              {rel.NOMBRE_PRODUCTO} - {rel.NOMBRE_PROVEEDOR}
            </option>
          ))}
        </select>
        <button className="crud-button delete-button" onClick={handleDeleteRelacion}>
          Eliminar relación
        </button>
      </div>
    </>
  );
};

export default ProveedorProductoCRUD;
