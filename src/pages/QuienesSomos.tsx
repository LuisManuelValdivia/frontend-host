import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/axios';

function QuienesSomos() {
  const [mision, setMision] = useState('');
  const [vision, setVision] = useState('');
  //const navigate = useNavigate();

  // Ajusta con el _id real de tu documento "company"
  const companyId = '67d91e349cef817283dbde96';

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      setMision(resp.data.mision || '');
      setVision(resp.data.vision || '');
    } catch (error) {
      toast.error('Error al cargar la información de la empresa');
    }
  };

  return (
    <div className="container">
      <h3>¿Quiénes Somos?</h3>
      <h5>Misión</h5>
      <p>{mision}</p>
      <h5>Visión</h5>
      <p>{vision}</p>
    </div>
  );
}

export default QuienesSomos;
