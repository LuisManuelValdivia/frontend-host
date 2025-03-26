// src/pages/admin/EditCompanyInfo.tsx
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';

function EditCompanyInfo() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mision, setMision] = useState('');
  const [vision, setVision] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const companyId = '67d91e349cef817283dbde96'; // Ajusta al ID real

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const resp = await api.get(`/company/${companyId}`);
      const data = resp.data;
      setTitulo(data.titulo || '');
      setUbicacion(data.ubicacion || '');
      setMision(data.mision || '');
      setVision(data.vision || '');
      setTelefono(data.telefono || '');
      setCorreo(data.correo || '');
    } catch (error) {
      toast.error('Error al cargar la información de la empresa');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: any = {};

    if (titulo.trim()) updateData.titulo = titulo;
    if (ubicacion.trim()) updateData.ubicacion = ubicacion;
    if (mision.trim()) updateData.mision = mision;
    if (vision.trim()) updateData.vision = vision;
    if (telefono.trim()) updateData.telefono = telefono;
    if (correo.trim()) updateData.correo = correo;

    if (Object.keys(updateData).length === 0) {
      toast.info('No has modificado ningún campo.');
      return;
    }

    try {
      await api.put(`/company/${companyId}`, updateData);
      toast.success('Información actualizada');
      navigate('/admin/company');
    } catch (error: any) {
      toast.error('Error al actualizar la información');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div
          className="col-md-6 col-lg-4"
          style={{
            backgroundColor: '#D6E0F5',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <h4 className="mb-3 text-center">Editar Información General</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Título (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Ubicación (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Misión (opcional)</label>
              <textarea
                className="form-control"
                value={mision}
                onChange={(e) => setMision(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Visión (opcional)</label>
              <textarea
                className="form-control"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Teléfono (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Correo (opcional)</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
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

export default EditCompanyInfo;
