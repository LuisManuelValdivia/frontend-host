import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para cada campo, incluyendo categoría
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // Se envuelve fetchProductData en useCallback para que su referencia sea estable
  const fetchProductData = useCallback(async () => {
    try {
      const resp = await api.get(`/products/${id}`);
      const prod = resp.data;
      setCodigo(prod.codigo);
      setNombre(prod.nombre);
      setPrecio(String(prod.precio));
      setDescripcion(prod.descripcion);
      setStock(String(prod.stock));
      setProveedor(prod.proveedor);
      setCategoria(prod.categoria || '');
      if (prod.imagenes && prod.imagenes.length > 0) {
        setCurrentImageUrl(prod.imagenes[0]);
      }
    } catch (error) {
      toast.error('Error al cargar los datos del producto');
    }
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const validateFields = () => {
    if (!codigo.trim()) {
      toast.error('El código no puede estar vacío');
      return false;
    }
    if (!nombre.trim()) {
      toast.error('El nombre no puede estar vacío');
      return false;
    }
    if (!precio || isNaN(Number(precio)) || Number(precio) < 0) {
      toast.error('El precio debe ser un número no negativo');
      return false;
    }
    if (!descripcion.trim()) {
      toast.error('La descripción no puede estar vacía');
      return false;
    }
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
      toast.error('El stock debe ser un número no negativo');
      return false;
    }
    if (!proveedor.trim()) {
      toast.error('Debes seleccionar un proveedor');
      return false;
    }
    if (!categoria.trim()) {
      toast.error('Debes seleccionar una categoría');
      return false;
    }
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
      let imageUrl = currentImageUrl;

      if (imagen) {
        const formData = new FormData();
        formData.append('file', imagen);
        formData.append('upload_preset', 'mi_preset');
        const cloudResp = await axios.post(
          'https://api.cloudinary.com/v1_1/dfb5ytub8/image/upload',
          formData,
          { withCredentials: false }
        );
        imageUrl = cloudResp.data.secure_url;
      }

      const productData = {
        codigo,
        nombre,
        precio: Number(precio),
        descripcion,
        stock: Number(stock),
        proveedor,
        categoria,
        imagenes: [imageUrl]
      };

      await api.put(`/products/${id}`, productData);
      toast.success('Producto actualizado con éxito');
      navigate('/admin/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar producto');
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
          <h3 className="mb-3 text-center">Editar producto</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Código del producto</label>
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
              <label>Imagen actual</label>
              <div>
                {currentImageUrl ? (
                  <img src={currentImageUrl} alt="Producto" style={{ maxWidth: '150px' }} />
                ) : (
                  <p>No hay imagen previa</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label>Nueva imagen (opcional)</label>
              <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
