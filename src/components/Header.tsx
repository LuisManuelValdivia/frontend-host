import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/axios';

function Header() {
  const { isLoggedIn, checkSession, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estado para el título de la empresa
  const [tituloEmpresa, setTituloEmpresa] = useState('');
  // Ajusta con el _id real de tu documento en la colección "company"
  const companyId = '67d91e349cef817283dbde96';

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      setTituloEmpresa(resp.data.titulo || "Smart Drape's");
    } catch (error) {
      console.error(error);
      setTituloEmpresa("Smart Drape's");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/users/logout', {}, { withCredentials: true });
      toast.info('Sesión cerrada');
      await checkSession();
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cerrar sesión.');
    }
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark shadow" 
      style={{ background: 'linear-gradient(90deg, #7E76F4, #B2AAEE)', 
        color: '#fff',
        textShadow: '0 1px 2px rgba(255, 247, 247, 0.3)', // Sombra para dar contraste
      }}
    >
      <div className="container-fluid">
        
        {/* LOGO + Título de la empresa */}
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
        >
          <img
            src="/images/icono.png"
            alt="Logo"
            style={{ width: '40px', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 'bold' }}>{tituloEmpresa}</span>
        </Link>

        {/* Botón toggler (para modo responsive en pantallas pequeñas) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* 1. NO logueado */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* 2. Logueado con rol distinto de 'admin' */}
            {isLoggedIn && user?.rol !== 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/monitoreo-iot">
                    Monitoreo IoT
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-perfil">
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}

            {/* 3. Logueado con rol 'admin' */}
            {isLoggedIn && user?.rol === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">
                    Dashboard Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-perfil">
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
