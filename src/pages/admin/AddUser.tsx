// src/pages/admin/AddUser.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../config/axios';

function AddUser() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');

  const [verContraseña, setVerContraseña] = useState(false);
  const navigate = useNavigate();

  const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/;

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '');
    setTelefono(valor.slice(0, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validaciones
    if (!nombre.trim()) {
      toast.error('El nombre no puede estar vacío.');
      return;
    }
    if (!soloLetrasRegex.test(nombre)) {
      toast.error('El nombre solo puede contener letras y espacios.');
      return;
    }
    if (!correo.trim()) {
      toast.error('El correo no puede estar vacío.');
      return;
    }
    if (!correoRegex.test(correo)) {
      toast.error('El formato del correo no es válido.');
      return;
    }
    if (!contraseña) {
      toast.error('La contraseña no puede estar vacía.');
      return;
    }
    if (!contraseñaRegex.test(contraseña)) {
      toast.error(
        'La contraseña debe tener al menos 8 caracteres, e incluir mayúsculas, minúsculas, dígitos y un carácter especial.'
      );
      return;
    }
    if (!confirmarContraseña) {
      toast.error('Debes confirmar la contraseña.');
      return;
    }
    if (contraseña !== confirmarContraseña) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }
    if (telefono.length !== 10) {
      toast.error('El teléfono debe ser de 10 dígitos numéricos.');
      return;
    }
    if (!preguntaSecreta) {
      toast.error('Debes seleccionar una pregunta secreta.');
      return;
    }
    if (!respuestaSecreta.trim()) {
      toast.error('La respuesta secreta no puede estar vacía.');
      return;
    }

    try {
      await api.post('/users/register', {
        nombre,
        correo,
        contraseña,
        telefono,
        preguntaSecreta,
        respuestaSecreta
      });
      toast.success('Usuario agregado con éxito!');
      navigate('/admin/users');
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error al agregar usuario.');
      }
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
          <h2 className="mb-3 text-center">Agregar Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <div className="input-group">
                <input
                  type={verContraseña ? 'text' : 'password'}
                  className="form-control"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setVerContraseña(!verContraseña)}
                >
                  {verContraseña ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>
            <div className="mb-3">
              <label>Pregunta Secreta</label>
              <select
                className="form-control"
                value={preguntaSecreta}
                onChange={(e) => setPreguntaSecreta(e.target.value)}
              >
                <option value="">-- Selecciona una pregunta --</option>
                <option value="mascota">¿Cuál es el nombre de tu primera mascota?</option>
                <option value="ciudad">¿Cuál es la ciudad que te gustaría visitar en el futuro?</option>
                <option value="comida">¿Cuál es tu comida favorita?</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Respuesta a la Pregunta Secreta</label>
              <input
                type="text"
                className="form-control"
                value={respuestaSecreta}
                onChange={(e) => setRespuestaSecreta(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Agregar usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
