// src/pages/TerminosCondiciones.tsx
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

function TerminosCondiciones() {
  const [terminosCondiciones, setTerminosCondiciones] = useState('');
  //const navigate = useNavigate();
  const companyId = '67d91e349cef817283dbde96';

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      setTerminosCondiciones(resp.data.terminosCondiciones || '');
    } catch (error) {
      toast.error('Error al cargar la información de la empresa');
    }
  };

  // Quitar el \n literal
  const displayText = terminosCondiciones.replace(/\\n/g, '\n');

  return (
    <div className="container mt-4" style={{ whiteSpace: 'pre-line' }}>
      <h3>Términos y Condiciones</h3>
      {/* Muestra el texto sin los \n */}
      <p>{displayText}</p>
    </div>
  );
}

export default TerminosCondiciones;
