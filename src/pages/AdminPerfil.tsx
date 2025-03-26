import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/axios';

function AdminPerfil() {
  // ESTADOS
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');

  // Para mostrar/ocultar la contraseña
  const [verContraseña, setVerContraseña] = useState(false);

  const navigate = useNavigate();

  // REGEX
  const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // CARGAR DATOS DEL USUARIO DESDE EL BACKEND
  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get('/users/check-auth');
        if (!resp.data.loggedIn) {
          navigate('/login');
        } else {
          const user = resp.data.user;
          // Rellenar estados con lo que exista
          setNombre(user.nombre || '');
          setCorreo(user.correo || '');
          setTelefono(user.telefono || '');
          setPreguntaSecreta(user.preguntaSecreta || '');
          setRespuestaSecreta(user.respuestaSecreta || '');
        }
      } catch (error) {
        navigate('/login');
      }
    })();
  }, [navigate]);

  // Restringir teléfono a 10 dígitos si el usuario lo edita
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, ''); // quitar no-dígitos
    setTelefono(valor.slice(0, 10)); // max 10
  };

  // ACTUALIZAR PERFIL (todos los campos opcionales)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparamos un objeto con los campos que el usuario "quiere" modificar
    const updateData: any = {};

    // Validar nombre
    if (nombre.trim()) {
      if (!soloLetrasRegex.test(nombre)) {
        toast.error('El nombre solo puede contener letras y espacios.');
        return;
      }
      updateData.nombre = nombre;
    }

    // Validar correo
    if (correo.trim()) {
      if (!correoRegex.test(correo)) {
        toast.error('El formato del correo no es válido.');
        return;
      }
      updateData.correo = correo;
    }

    // Validar contraseña
    if (password.trim()) {
      if (!contraseñaRegex.test(password)) {
        toast.error(
          'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, dígitos y un carácter especial.'
        );
        return;
      }
      updateData.password = password;
    }

    // Validar teléfono
    if (telefono.trim()) {
      if (telefono.length !== 10) {
        toast.error('El teléfono debe ser de 10 dígitos numéricos.');
        return;
      }
      updateData.telefono = telefono;
    }

    // Pregunta secreta
    if (preguntaSecreta.trim()) {
      updateData.preguntaSecreta = preguntaSecreta;
    }

    // Respuesta secreta
    if (respuestaSecreta.trim()) {
      updateData.respuestaSecreta = respuestaSecreta;
    }

    // Si el usuario deja todo vacío, no se enviará ningún campo
    if (Object.keys(updateData).length === 0) {
      toast.info('No has modificado ningún campo.');
      return;
    }

    try {
      const resp = await api.put('/users/update-profile', updateData);
      toast.success(resp.data.message || 'Perfil actualizado exitosamente.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar perfil.');
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
          <h2 className="mb-3">Editar Perfil</h2>
          <form onSubmit={handleUpdate}>
            {/* NOMBRE (opcional) */}
            <div className="mb-3">
              <label>Nombre (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* CORREO (opcional) */}
            <div className="mb-3">
              <label>Correo (opcional)</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            {/* CONTRASEÑA (opcional) con ojito */}
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

            {/* TELÉFONO (opcional) */}
            <div className="mb-3">
              <label>Teléfono (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>

            {/* PREGUNTA SECRETA (opcional) */}
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

            {/* RESPUESTA SECRETA (opcional) */}
            <div className="mb-3">
              <label>Respuesta Secreta (opcional)</label>
              <input
                type="text"
                className="form-control"
                value={respuestaSecreta}
                onChange={(e) => setRespuestaSecreta(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPerfil;
