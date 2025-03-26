// src/pages/admin/UsersManagement.tsx
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../config/axios';

function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  // Cargar usuarios al montar
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener usuarios con un posible "search" (por nombre)
  const fetchUsers = async (query = '') => {
    try {
      // Suponiendo que tu backend tiene un endpoint GET /api/users que acepta ?search=
      const resp = await api.get(`/users?search=${query}`);
      setUsers(resp.data); // Debería ser un array de usuarios
    } catch (error: any) {
      toast.error('Error al cargar usuarios');
    }
  };

  // Manejo de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };

  // Eliminar usuario
  const handleDelete = async (userId: string) => {
    const confirmDel = window.confirm('¿Desea eliminar el usuario?');
    if (confirmDel) {
      try {
        // Suponiendo que tu backend maneja DELETE /api/users/:id
        await api.delete(`/users/${userId}`);
        toast.success('Usuario eliminado');
        fetchUsers(searchTerm); // recargar la lista con el mismo searchTerm
      } catch (error: any) {
        toast.error('Error al eliminar usuario');
      }
    }
  };

  return (
    <div className="container">
      <h3>Administrar Usuarios</h3>
      <div className="d-flex justify-content-between mb-3">
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar usuario por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-primary">Buscar</button>
        </form>

        {/* Botón para agregar usuario */}
        <Link to="/admin/users/add" className="btn btn-primary">
          Agregar usuario
        </Link>
      </div>

      {/* Tabla con la lista de usuarios */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{user.telefono}</td>
              <td>{user.rol}</td>
              <td>
                {/* Botón para editar */}
                <Link
                  to={`/admin/users/edit/${user._id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Editar
                </Link>
                {/* Botón para eliminar */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersManagement;
