import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axios';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [verContraseña, setVerContraseña] = useState(false);

  const navigate = useNavigate();
  const { checkSession } = useContext(AuthContext);

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo.trim()) {
      toast.error('Por favor ingresa tu correo.');
      return;
    }
    if (!correoRegex.test(correo)) {
      toast.error('El formato del correo no es válido.');
      return;
    }
    if (!contraseña) {
      toast.error('Por favor ingresa tu contraseña.');
      return;
    }

    try {
      await api.post(
        '/users/login',
        { correo, contraseña },
        { withCredentials: true }
      );
      toast.success('Login exitoso!');
      await checkSession();
      navigate('/');
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Error al iniciar sesión.';
      toast.error(errMsg);
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
          <h2 className="mb-3">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>
            <div className="mt-3">
              <Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
