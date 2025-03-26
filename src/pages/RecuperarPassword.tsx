import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/axios';

function RecuperarPassword() {
  const [correo, setCorreo] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [preguntaCargada, setPreguntaCargada] = useState(false);
  const [verContraseña, setVerContraseña] = useState(false);

  const navigate = useNavigate();

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/;

  // 1. Obtener la pregunta secreta
  const handleGetQuestion = async () => {
    if (!correo.trim()) {
      toast.error('Por favor ingresa un correo.');
      return;
    }
    if (!correoRegex.test(correo)) {
      toast.error('El formato del correo no es válido.');
      return;
    }
    try {
      const resp = await api.get('/users/question', { params: { correo } });
      setPreguntaSecreta(resp.data.preguntaSecreta);
      setPreguntaCargada(true);
      toast.info('Pregunta secreta encontrada. Por favor ingresa tu respuesta.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al obtener la pregunta secreta.');
      setPreguntaCargada(false);
      setPreguntaSecreta('');
    }
  };

  // 2. Enviar respuesta y nueva contraseña
  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo.trim()) {
      toast.error('El correo está vacío.');
      return;
    }
    if (!respuestaSecreta.trim()) {
      toast.error('La respuesta secreta está vacía.');
      return;
    }
    if (!nuevaContraseña) {
      toast.error('La nueva contraseña no puede estar vacía.');
      return;
    }
    if (!contraseñaRegex.test(nuevaContraseña)) {
      toast.error('La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, dígitos y un carácter especial.');
      return;
    }

    try {
      const resp = await api.post('/users/recover-password', {
        correo,
        preguntaSecreta,
        respuestaSecreta,
        nuevaContraseña,
      });
      toast.success(resp.data.message);
      setCorreo('');
      setPreguntaSecreta('');
      setRespuestaSecreta('');
      setNuevaContraseña('');
      setPreguntaCargada(false);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al recuperar contraseña.');
    }
  };

  return (
    <div className="container mt-4">
      {/* Centrar el formulario */}
      <div className="row justify-content-center">
        {/* Limitar el ancho del formulario */}
        <div
          className="col-md-6 col-lg-4"
          style={{ backgroundColor: '#D6E0F5', padding: '20px', borderRadius: '8px' }}
        >
          <h2 className="mb-3">Recuperar Contraseña</h2>

          {/* Campo de correo y botón para obtener la pregunta secreta */}
          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          {!preguntaCargada && (
            <button onClick={handleGetQuestion} className="btn btn-secondary mb-3 w-100">
              Mostrar pregunta secreta
            </button>
          )}

          {/* Si la pregunta ya fue cargada */}
          {preguntaCargada && (
            <form onSubmit={handleRecover}>
              <div className="mb-3">
                <label>Pregunta Secreta:</label>
                <input type="text" className="form-control" value={preguntaSecreta} readOnly />
              </div>
              <div className="mb-3">
                <label>Respuesta a la Pregunta Secreta:</label>
                <input
                  type="text"
                  className="form-control"
                  value={respuestaSecreta}
                  onChange={(e) => setRespuestaSecreta(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Nueva Contraseña</label>
                <div className="input-group">
                  <input
                    type={verContraseña ? 'text' : 'password'}
                    className="form-control"
                    value={nuevaContraseña}
                    onChange={(e) => setNuevaContraseña(e.target.value)}
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
              <button type="submit" className="btn btn-primary w-100">
                Cambiar Contraseña
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecuperarPassword;
