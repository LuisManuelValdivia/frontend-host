// src/pages/AgregarDispositivo.tsx
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

interface Device {
  _id?: string;
  mac: string;
  nombre: string;
}

function AgregarDispositivo() {
  const [mac, setMac] = useState('');
  const [nombre, setNombre] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  // Cargar lista de dispositivos desde el backend
  const fetchDevices = async () => {
    try {
      const resp = await api.get('/devices');
      setDevices(resp.data || []);
    } catch (error) {
      toast.error('Error al cargar dispositivos');
    }
  };

  // Agregar un nuevo dispositivo
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mac.trim() || !nombre.trim()) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    try {
      await api.post('/devices', { mac, nombre });
      toast.success('Dispositivo agregado');
      setMac('');
      setNombre('');
      fetchDevices(); // Recargar la lista
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al agregar dispositivo');
    }
  };

  // Manejar la acción "Administrar" que redirige al Monitoreo IoT
  const handleAdministrar = (deviceId: string) => {
    navigate('/monitoreo-iot');
  };

  return (
    <div className="container mt-4">
      {/* Contenedor centrado */}
      <div className="row justify-content-center">
        {/* Columna con fondo, padding y bordes redondeados */}
        <div
          className="col-md-6 col-lg-4"
          style={{
            backgroundColor: '#D6E0F5',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <h3 className="mb-3 text-center">Agregar Dispositivo</h3>
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label>MAC del dispositivo</label>
              <input
                type="text"
                className="form-control"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Nombre del Dispositivo</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Agregar
            </button>
          </form>
        </div>
      </div>

      {/* Tabla de dispositivos */}
      <div className="row mt-4">
        <div className="col">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>MAC</th>
                <th>Nombre del dispositivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((dev) => (
                <tr key={dev._id}>
                  <td>{dev.mac}</td>
                  <td>{dev.nombre}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleAdministrar(dev._id!)}
                    >
                      Administrar
                    </button>
                  </td>
                </tr>
              ))}
              {devices.length === 0 && (
                <tr>
                  <td colSpan={3}>No hay dispositivos registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AgregarDispositivo;