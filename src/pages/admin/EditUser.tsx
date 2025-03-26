// src/pages/admin/EditUser.tsx
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../config/axios';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');

  const [verContraseña, setVerContraseña] = useState(false);

  const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get(`/users/${id}`);
        const user = resp.data;
        setNombre(user.nombre || '');
        setCorreo(user.correo || '');
        setTelefono(user.telefono || '');
        setPreguntaSecreta(user.preguntaSecreta || '');
        setRespuestaSecreta(user.respuestaSecreta || '');
      } catch (error) {
        toast.error('Error al cargar los datos del usuario');
      }
    })();
  }, [id]);

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '');
    setTelefono(valor.slice(0, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: any = {};

    // Validaciones front
    if (nombre.trim()) {
      if (!soloLetrasRegex.test(nombre)) {
        toast.error('El nombre solo puede contener letras y espacios.');
        return;
      }
      updateData.nombre = nombre;
    }

    if (correo.trim()) {
      if (!correoRegex.test(correo)) {
        toast.error('El formato del correo no es válido.');
        return;
      }
      updateData.correo = correo;
    }

    if (password.trim()) {
      if (!contraseñaRegex.test(password)) {
        toast.error(
          'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, dígitos y un carácter especial.'
        );
        return;
      }
      updateData.password = password;
    }

    if (telefono.trim()) {
      if (telefono.length !== 10) {
        toast.error('El teléfono debe ser de 10 dígitos numéricos.');
        return;
      }
      updateData.telefono = telefono;
    }

    if (preguntaSecreta.trim()) {
      updateData.preguntaSecreta = preguntaSecreta;
    }

    if (respuestaSecreta.trim()) {
      updateData.respuestaSecreta = respuestaSecreta;
    }

    if (Object.keys(updateData).length === 0) {
      toast.info('No has modificado ningún campo.');
      return;
    }

    try {
      const resp = await api.put(`/users/${id}`, updateData);
      toast.success(resp.data.message || 'Usuario actualizado con éxito.');
      navigate('/admin/users');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar usuario.');
    }
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
          <h2 className="mb-3 text-center">Editar Usuario</h2>
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="mb-3">
              <label>Nombre (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label>Correo (opcional)</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label>Nueva Contraseña (opcional)</label>
              <div className="input-group">
                <input
                  type={verContraseña ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Teléfono */}
            <div className="mb-3">
              <label>Teléfono (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>

            {/* Pregunta Secreta */}
            <div className="mb-3">
              <label>Pregunta Secreta (opcional)</label>
              <select
                className="form-control"
                value={preguntaSecreta}
                onChange={(e) => setPreguntaSecreta(e.target.value)}
              >
                <option value="">-- No cambiar --</option>
                <option value="mascota">¿Cuál es el nombre de tu primera mascota?</option>
                <option value="ciudad">¿Cuál es la ciudad que te gustaría visitar en el futuro?</option>
                <option value="comida">¿Cuál es tu comida favorita?</option>
              </select>
            </div>

            {/* Respuesta Secreta */}
            <div className="mb-3">
              <label>Respuesta Secreta (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={respuestaSecreta}
                onChange={(e) => setRespuestaSecreta(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;

