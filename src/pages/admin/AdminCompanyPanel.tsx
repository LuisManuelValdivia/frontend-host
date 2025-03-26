// src/pages/admin/AdminCompanyPanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminCompanyPanel() {
  return (
    <div className="container mt-4">
      <h3>Administrar Información de la Empresa</h3>
      <div className="row mt-4">
        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card p-3 h-100">
            <h5>Información general</h5>
            <Link to="/admin/company/info" className="btn btn-primary mt-2">
              Editar
            </Link>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card p-3 h-100">
            <h5>Preguntas frecuentes</h5>
            <Link to="/admin/company/preguntas" className="btn btn-primary mt-2">
              Editar
            </Link>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card p-3 h-100">
            <h5>Términos y condiciones</h5>
            <Link to="/admin/company/terminos" className="btn btn-primary mt-2">
              Editar
            </Link>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card p-3 h-100">
            <h5>Políticas de privacidad</h5>
            <Link to="/admin/company/politicas" className="btn btn-primary mt-2">
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCompanyPanel;
