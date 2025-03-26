import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/axios';

function VistaDetalle() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = useCallback(async () => {
    try {
      const resp = await api.get(`/products/${id}`);
      setProduct(resp.data);
    } catch (error: any) {
      toast.error('Error al cargar los detalles del producto');
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAgregarAlCarrito = () => {
    toast.success('Producto agregado con éxito');
  };

  if (!product) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <img
              src={product.imagenes[0]}
              className="card-img-top"
              alt={product.nombre}
              style={{
                maxHeight: '400px',
                objectFit: 'contain'
              }}
            />
            <div className="card-body">
              <h3 className="card-title">{product.nombre}</h3>
              <h4>${product.precio}</h4>
              <h5>Stock disponible: {product.stock}</h5>
              <p>
                <strong>Categoría:</strong> {product.categoria}
              </p>
              <p className="card-text">{product.descripcion}</p>
              <button className="btn btn-primary" onClick={handleAgregarAlCarrito}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaDetalle;
