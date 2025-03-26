// src/pages/PoliticasPrivacidad.tsx
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

function PoliticasPrivacidad() {
  const [politicasPrivacidad, setPoliticasPrivacidad] = useState('');
  //const navigate = useNavigate();
  const companyId = '67d91e349cef817283dbde96';

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      setPoliticasPrivacidad(resp.data.politicasPrivacidad || '');
    } catch (error) {
      toast.error('Error al cargar la información de la empresa');
    }
  };

  // Quitar el \n literal
  const displayText = politicasPrivacidad.replace(/\\n/g, '\n');

  return (
    <div className="container mt-4" style={{ whiteSpace: 'pre-line' }}>
      <h3>Políticas de Privacidad</h3>
      {/* Muestra el texto sin los \n */}
      <p>{displayText}</p>
    </div>
  );
}

export default PoliticasPrivacidad;
