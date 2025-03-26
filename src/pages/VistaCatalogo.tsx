import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/axios';

function VistaCatalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts('', '', 1);
  }, []);

  // Función para obtener productos con búsqueda, categoría y paginación
  const fetchProducts = async (query = '', cat = '', page = 1) => {
    try {
      // Llamamos al endpoint con search, category, page y limit
      const resp = await api.get(
        `/products?search=${query}&category=${cat}&page=${page}&limit=6`
      );
      // resp.data = { products, currentPage, totalPages }
      setProducts(resp.data.products);
      setCurrentPage(resp.data.currentPage);
      setTotalPages(resp.data.totalPages);
    } catch (error: any) {
      toast.error('Error al cargar productos');
    }
  };

  // Manejo del buscador
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm, category, 1);
  };

  // Manejo del botón Filtrar
  const handleFilter = () => {
    fetchProducts(searchTerm, category, 1);
  };

  // Función para cambiar de página
  const handlePageChange = (newPage: number) => {
    fetchProducts(searchTerm, category, newPage);
  };

  return (
    <div className="container mt-4">
      {/* Encabezado de la vista catálogo */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Título */}
        <div>
          <h3>Catálogo de productos</h3>
        </div>

        {/* Buscador con ancho fijo y estilo form-control-sm */}
        <div className="me-2">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: '400px', height: '38px' }}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        {/* Filtro por categoría usando un <select> */}
        <div className="d-flex align-items-center me-2">
          <label className="me-2">Categoría:</label>
          <select
            className="form-select"
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
          <button
            className="btn btn-secondary ms-2"
            onClick={handleFilter}
          >
            Filtrar
          </button>
        </div>

        {/* Ícono de carrito */}
        <div>
          <Link to="/carrito">
            <i className="bi bi-cart" style={{ fontSize: '1.5rem', color: '#000' }}></i>
          </Link>
        </div>
      </div>

      {/* Listado de productos en tarjetas */}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.imagenes[0]}
                className="card-img-top"
                alt={product.nombre}
                style={{
                  height: '350px',
                  objectFit: 'cover'
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">
                  Precio: ${product.precio} <br />
                  Categoría: {product.categoria}
                </p>
                {/* Botón para ir a los detalles */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/vista-detalle/${product._id}`)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            {/* Botón siguiente */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
    </div>
  );
}

export default VistaCatalogo;
