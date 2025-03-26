// src/pages/admin/EditCompanyPreguntas.tsx
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';

function EditCompanyPreguntas() {
  const navigate = useNavigate();
  const [preguntasFrecuentes, setPreguntasFrecuentes] = useState('');
  const companyId = '67d91e349cef817283dbde96';

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      setPreguntasFrecuentes(resp.data.preguntasFrecuentes || '');
    } catch (error) {
      toast.error('Error al cargar la información de la empresa');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preguntasFrecuentes.trim()) {
      toast.info('No has modificado nada o el campo está vacío.');
      return;
    }
    try {
      await api.put(`/company/${companyId}`, {
        preguntasFrecuentes
      });
      toast.success('Preguntas Frecuentes actualizadas');
      navigate('/admin/company');
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div
          className="col-md-8 col-lg-6"
          style={{
            backgroundColor: '#D6E0F5',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <h4 className="mb-3 text-center">Editar Preguntas Frecuentes</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Preguntas Frecuentes (opcional)</label>
              <textarea
                className="form-control"
                rows={10}
                value={preguntasFrecuentes}
                onChange={(e) => setPreguntasFrecuentes(e.target.value)}
              />
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

export default EditCompanyPreguntas;
