// src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const handleAgregarOtro = () => {
    navigate('/agregar-dispositivo');
  };

  return (
    <div className="container-fluid p-0">

      {/* Sección Hero */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '60vh',
          background: 'linear-gradient(90deg,rgb(103, 95, 218) 0%,rgb(178, 170, 238) 100%)',
          color: '#ffffff',
          textAlign: 'center',
          borderRadius: '0 0 50px 50px', // bordes redondeados en la parte inferior
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="mb-3 fw-bold" style={{ fontSize: '3rem' }}>
                Bienvenido a Smart Drape's
              </h1>
              <p className="fs-4">
                Lo mejor en cortinas automatizadas
              </p>
              <div className="mt-4">
                <Link to="/productos" className="btn btn-light btn-lg">
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Producto Estrella */}
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-md-8">
          <div
            className="card shadow-sm featured-product"
            style={{
              border: 'none',
              borderRadius: '10px',
              background: 'linear-gradient(145deg,rgb(201, 223, 236),rgb(186, 197, 223))', 
              transition: 'transform 0.2s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
            }}
            // Efecto hover sutil
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            }}
          >
            {/* Ribbon (cinta) en la esquina superior izquierda */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: '-25px',
                backgroundColor: '#7E76F4',
                color: '#ffffff',
                padding: '6px 25px',
                transform: 'rotate(-45deg)',
                boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderRadius: '4px',
              }}
            >
              Estrella
            </div>

            <div className="card-body p-4">
              <h3 className="text-center mb-4">Producto estrella</h3>
              <div className="row align-items-center">
                {/* Imagen del producto */}
                <div className="col-md-6 d-flex justify-content-center mb-3 mb-md-0">
                  <img
                    src="/images/cortinaiot.jpg"
                    alt="Cortina IoT"
                    className="img-fluid"
                    style={{ maxHeight: '300px', borderRadius: '8px' }}
                  />
                </div>

                {/* Descripción y botón */}
                <div className="col-md-6">
                  <h4 className="fw-bold">Cortina IoT</h4>
                  <p className="mb-1">
                    <strong>Precio:</strong> $697
                  </p>
                  <p className="mb-3">
                    Cortina IoT automatizada para controlarla desde la página web y la aplicación móvil.
                  </p>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: '#7E76F4',
                      color: '#ffffff',
                      width: 'auto',
                    }}
                    onClick={handleAgregarOtro}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;
