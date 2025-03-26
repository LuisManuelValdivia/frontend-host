import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';

function AddProduct() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const navigate = useNavigate();

  // Validar campos, incluyendo categoría
  const validateFields = () => {
    if (!codigo.trim()) { toast.error('Código vacío'); return false; }
    if (!nombre.trim()) { toast.error('Nombre vacío'); return false; }
    if (!precio || isNaN(+precio) || +precio < 0) { toast.error('Precio inválido'); return false; }
    if (!descripcion.trim()) { toast.error('Descripción vacía'); return false; }
    if (!stock || isNaN(+stock) || +stock < 0) { toast.error('Stock inválido'); return false; }
    if (!proveedor.trim()) { toast.error('Proveedor vacío'); return false; }
    if (!categoria.trim()) { toast.error('La categoría no puede estar vacía'); return false; }
    if (!imagen) { toast.error('Imagen requerida'); return false; }
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      // Subir imagen a Cloudinary
      const formData = new FormData();
      formData.append('file', imagen as File);
      formData.append('upload_preset', 'mi_preset');
      const cloudResp = await axios.post(
        'https://api.cloudinary.com/v1_1/dfb5ytub8/image/upload',
        formData,
        { withCredentials: false }
      );
      const imageUrl = cloudResp.data.secure_url;

      // Crear producto en la BD
      const productData = {
        codigo,
        nombre,
        precio: +precio,
        descripcion,
        stock: +stock,
        proveedor,
        categoria,
        imagenes: [imageUrl]
      };

      await api.post('/products', productData);
      toast.success('Producto agregado');
      navigate('/admin/products');
    } catch (error: any) {
      toast.error('Error al agregar producto');
    }
  };

  return (
    <div className="container mt-4">
      {/* Centrar el contenido */}
      <div className="row justify-content-center">
        {/* Contenedor angosto con fondo y bordes redondeados */}
        <div
          className="col-md-6 col-lg-4"
          style={{
            backgroundColor: '#D6E0F5',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <h3 className="mb-3 text-center">Ingresa los datos</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Código</label>
              <input
                type="text"
                className="form-control"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Precio</label>
              <input
                type="number"
                className="form-control"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Descripción</label>
              <textarea
                className="form-control"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Stock</label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Proveedor</label>
              <select
                className="form-control"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
              >
                <option value="">-- Selecciona un proveedor --</option>
                <option value="DecoCort">DecoCort</option>
                <option value="TecnoParts">TecnoParts</option>
                <option value="FerreMax">FerreMax</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Categoría</label>
              <select
                className="form-control"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">-- Selecciona una categoría --</option>
                <option value="Cortinas">Cortinas</option>
                <option value="Sensores">Sensores</option>
                <option value="Marcos">Marcos</option>
                <option value="IoT">IoT</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Imagen del producto</label>
              <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Agregar producto</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
