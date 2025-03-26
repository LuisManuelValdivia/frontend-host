// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2>Panel de administración</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h4>Administrar productos</h4>
            <Link to="/admin/products" className="btn btn-primary mt-2">
              Ir a productos
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h4>Administrar usuarios</h4>
            <Link to="/admin/users" className="btn btn-primary mt-2">
              Ir a usuarios
            </Link>
          </div>
        </div>

        {/* En lugar de ir directo a EditCompany, apuntamos a /admin/company */}
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h4>Administrar información de empresa</h4>
            <Link to="/admin/company" className="btn btn-primary mt-2">
              Ir a la información de la empresa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
