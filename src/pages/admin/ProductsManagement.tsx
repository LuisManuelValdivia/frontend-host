import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../config/axios';

function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Al montar el componente, obtenemos la primera página (página 1)
  useEffect(() => {
    fetchProducts('', '', 1);
  }, []);

  // Función para obtener productos (búsqueda, categoría y paginación)
  const fetchProducts = async (query = '', cat = '', page = 1) => {
    try {
      // Llamamos al endpoint, pasando search, category, page y limit=6
      const resp = await api.get(
        `/products?search=${query}&category=${cat}&page=${page}&limit=6`
      );

      // Asumiendo que resp.data = { products, currentPage, totalPages }
      setProducts(resp.data.products || []);
      setCurrentPage(resp.data.currentPage);
      setTotalPages(resp.data.totalPages);
    } catch (error: any) {
      toast.error('Error al cargar productos');
    }
  };

  // Manejo del buscador
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reseteamos a la página 1
    fetchProducts(searchTerm, category, 1);
  };

  // Manejo del botón Filtrar
  const handleFilter = () => {
    // También resetea a la página 1
    fetchProducts(searchTerm, category, 1);
  };

  // Cambio de página
  const handlePageChange = (newPage: number) => {
    fetchProducts(searchTerm, category, newPage);
  };

  // Eliminar producto
  const handleDelete = async (id: string) => {
    const confirmDel = window.confirm('¿Desea eliminar el producto?');
    if (confirmDel) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Producto eliminado');
        // Recargamos la página actual con el mismo filtro y búsqueda
        fetchProducts(searchTerm, category, currentPage);
      } catch (error: any) {
        toast.error('Error al eliminar producto');
      }
    }
  };

  // Mostrar detalles en un modal
  const handleShowDetails = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      <h3>Administrar productos</h3>

      <div className="d-flex justify-content-between mb-3">
        {/* Búsqueda */}
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            Buscar
          </button>
        </form>

        {/* Filtro por categoría */}
        <div className="d-flex align-items-center">
          <label className="me-2">Categoría:</label>
          <select
            className="form-select me-2"
            style={{ width: '150px' }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Cortinas">Cortinas</option>
            <option value="Sensores">Sensores</option>
            <option value="Marcos">Marcos</option>
            <option value="IoT">IoT</option>
          </select>
          <button className="btn btn-secondary" onClick={handleFilter}>
            Filtrar
          </button>
        </div>

        {/* Agregar producto */}
        <Link to="/admin/products/add" className="btn btn-primary">
          Agregar producto
        </Link>
      </div>

      {/* Tabla de productos */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod: any) => (
            <tr key={prod._id}>
              <td>{prod.nombre}</td>
              <td>{prod.precio}</td>
              <td>{prod.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-1"
                  onClick={() => handleShowDetails(prod)}
                >
                  Detalles
                </button>
                <Link
                  to={`/admin/products/edit/${prod._id}`}
                  className="btn btn-sm btn-warning me-1"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(prod._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {/* Botón anterior */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </button>
            </li>
            {/* Páginas */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            {/* Botón siguiente */}
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedProduct && (
        <>
          <div
            className="modal fade show"
            style={{ display: 'block', zIndex: 1050 }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalles del Producto</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Código:</strong> {selectedProduct.codigo}</p>
                  <p><strong>Nombre:</strong> {selectedProduct.nombre}</p>
                  <p><strong>Precio:</strong> {selectedProduct.precio}</p>
                  <p><strong>Descripción:</strong> {selectedProduct.descripcion}</p>
                  <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                  <p><strong>Proveedor:</strong> {selectedProduct.proveedor}</p>
                  <p><strong>Categoría:</strong> {selectedProduct.categoria}</p>
                  {selectedProduct.imagenes && selectedProduct.imagenes.length > 0 && (
                    <img
                      src={selectedProduct.imagenes[0]}
                      alt={selectedProduct.nombre}
                      className="img-fluid"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
            onClick={handleCloseModal}
          ></div>
        </>
      )}
    </div>
  );
}

export default ProductsManagement;

