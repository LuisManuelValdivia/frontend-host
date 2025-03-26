import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de React-Toastify
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RecuperarPassword from './pages/RecuperarPassword';
import AdminPerfil from './pages/AdminPerfil';
import MonitoreoIot from './pages/MonitoreoIot';
import AgregarDispositivo from './pages/AgregarDispositivo';

// Rutas de productos públicos
import VistaCatalogo from './pages/VistaCatalogo';
import VistaDetalle from './pages/VistaDetalle';

// Rutas de administración
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsManagement from './pages/admin/ProductsManagement';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import UsersManagement from './pages/admin/UsersManagement';
import AddUser from './pages/admin/AddUser';
import EditUser from './pages/admin/EditUser';
import AdminCompanyPanel from './pages/admin/AdminCompanyPanel';
import EditCompanyInfo from './pages/admin/EditCompanyInfo';
import EditCompanyPreguntas from './pages/admin/EditCompanyPreguntas';
import EditCompanyTerminos from './pages/admin/EditCompanyTerminos';
import EditCompanyPoliticas from './pages/admin/EditCompanyPoliticas';

import QuienesSomos from './pages/QuienesSomos';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import TerminosCondiciones from './pages/TerminosCondiciones';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';

//import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

axios.defaults.baseURL = 'https://backend-usp8.onrender.com/';  // URL de tu backend
axios.defaults.withCredentials = true;            // Enviar/recibir cookies

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
      <Breadcrumbs />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="/admin-perfil" element={<AdminPerfil />} />
          <Route path="/monitoreo-iot" element={ <ProtectedRouteUser> <MonitoreoIot /> </ProtectedRouteUser>} />
          <Route path="/agregar-dispositivo" element={ <ProtectedRouteUser> <AgregarDispositivo /> </ProtectedRouteUser> } />

          {/* Rutas públicas para la sección de productos */}
          <Route path="/productos" element={<VistaCatalogo />} />
          <Route path="/vista-detalle/:id" element={<VistaDetalle />} />

          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
          
          {/* Rutas protegidas para el panel de administración */}
          {/* Panel de Administración */}
          <Route path="/admin/dashboard" element={ <ProtectedRouteAdmin> <AdminDashboard /> </ProtectedRouteAdmin> } />

          <Route path="/admin/products" element={ <ProtectedRouteAdmin> <ProductsManagement /> </ProtectedRouteAdmin> } />
          <Route path="/admin/products/add" element={ <ProtectedRouteAdmin> <AddProduct /> </ProtectedRouteAdmin> } />
          <Route path="/admin/products/edit/:id" element={ <ProtectedRouteAdmin> <EditProduct /> </ProtectedRouteAdmin> } />
          <Route  path="/admin/users" element={ <ProtectedRouteAdmin> <UsersManagement /> </ProtectedRouteAdmin> } />
          <Route path="/admin/users/add" element={ <ProtectedRouteAdmin> <AddUser /> </ProtectedRouteAdmin> } />
          <Route path="/admin/users/edit/:id" element={ <ProtectedRouteAdmin> <EditUser /> </ProtectedRouteAdmin> } />

          {/* Panel principal de "Administrar información de empresa" */}
          <Route path="/admin/company" element={ <ProtectedRouteAdmin> <AdminCompanyPanel /> </ProtectedRouteAdmin> } />

          {/* Formularios separados */}
          <Route path="/admin/company/info" element={ <ProtectedRouteAdmin> <EditCompanyInfo /></ProtectedRouteAdmin> } />
          <Route path="/admin/company/preguntas" element={ <ProtectedRouteAdmin> <EditCompanyPreguntas /> </ProtectedRouteAdmin> } />
          <Route path="/admin/company/terminos" element={ <ProtectedRouteAdmin> <EditCompanyTerminos /> </ProtectedRouteAdmin> } />
          <Route path="/admin/company/politicas" element={ <ProtectedRouteAdmin> <EditCompanyPoliticas /> </ProtectedRouteAdmin> } />

          {/* Puedes agregar más rutas según se requiera */}

        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
