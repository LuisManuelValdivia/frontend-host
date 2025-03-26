import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../config/axios';

function Footer() {
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  // Ajusta al _id real de tu documento en la BD
  const companyId = '67d91e349cef817283dbde96';

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      setUbicacion(resp.data.ubicacion || '');
      setTelefono(resp.data.telefono || '');
      setCorreo(resp.data.correo || '');
    } catch (error) {
      console.error('Error al cargar datos de la empresa en el footer:', error);
    }
  };

  return (
    <footer className="text-center text-lg-start mt-4"
      style={{ backgroundColor: '#2D2D2C', color: '#ffffff' }}
    >
      <div className="container p-4">
        <div className="row">

          {/* Sección 1: Ubicación y "¿Quiénes somos?" */}
          <div className="col-md-4 text-start">
            <h6>Ubicación</h6>
            <p>{ubicacion}</p>
            <h6>
              <Link to="/quienes-somos" style={{ textDecoration: 'none' }}>
                ¿Quiénes somos?
              </Link>
            </h6>
          </div>

          {/* Sección 2: Contacto y Redes Sociales */}
          <div className="col-md-4 text-start">
            <h6>Contacto</h6>
            <p>Teléfono: {telefono}</p>
            <p>Correo: {correo}</p>
            <h6>Redes Sociales</h6>
            <p>Facebook / Instagram / X (Twitter)</p>
          </div>

          {/* Sección 3: Preguntas Frecuentes, Términos, Políticas */}
          <div className="col-md-4 text-start">
            <h6>
              <Link to="/preguntas-frecuentes" style={{ textDecoration: 'none' }}>
                Preguntas Frecuentes
              </Link>
            </h6>
            <h6>
              <Link to="/terminos-condiciones" style={{ textDecoration: 'none' }}>
                Términos y Condiciones
              </Link>
            </h6>
            <h6>
              <Link to="/politicas-privacidad" style={{ textDecoration: 'none' }}>
                Políticas de Privacidad
              </Link>
            </h6>
          </div>
        </div>

        <p className="mt-3">
          &copy; 2025 Smart Drape's. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
