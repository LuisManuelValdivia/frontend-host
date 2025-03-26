import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../src/App.css'; 


function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname;

  // 1. /vista-detalle/... => "Inicio > Catálogo > Vista detalle"
  if (path.startsWith('/vista-detalle')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos">Catálogo</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Vista detalle
          </li>
        </ol>
      </nav>
    );
  }

  // 2. /productos => "Inicio > Catálogo"
  if (path.startsWith('/productos')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Catálogo
          </li>
        </ol>
      </nav>
    );
  }

  // 3. /monitoreo-iot => "Inicio > Monitoreo IoT"
  if (path.startsWith('/monitoreo-iot')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Monitoreo IoT
          </li>
        </ol>
      </nav>
    );
  }

  // 4. /admin-perfil => "Inicio > Editar Perfil"
  if (path.startsWith('/admin-perfil')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Editar Perfil
          </li>
        </ol>
      </nav>
    );
  }

  // 5. /quienes-somos => "Inicio > ¿Quiénes somos?"
  if (path.startsWith('/quienes-somos')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            ¿Quiénes somos?
          </li>
        </ol>
      </nav>
    );
  }

  // 6. /preguntas-frecuentes => "Inicio > Preguntas Frecuentes"
  if (path.startsWith('/preguntas-frecuentes')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Preguntas Frecuentes
          </li>
        </ol>
      </nav>
    );
  }

  // 7. /terminos-condiciones => "Inicio > Términos y Condiciones"
  if (path.startsWith('/terminos-condiciones')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Términos y Condiciones
          </li>
        </ol>
      </nav>
    );
  }

  // 8. /politicas-privacidad => "Inicio > Políticas de Privacidad"
  if (path.startsWith('/politicas-privacidad')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Políticas de Privacidad
          </li>
        </ol>
      </nav>
    );
  }

  // 9. /login => "Inicio > Login"
  if (path.startsWith('/login')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Login
          </li>
        </ol>
      </nav>
    );
  }

  // 10. /registro => "Inicio > Registro"
  if (path.startsWith('/registro')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registro
          </li>
        </ol>
      </nav>
    );
  }

  // 11. Ruta raíz: / => "Inicio"
  if (path === '/') {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Inicio
          </li>
        </ol>
      </nav>
    );
  }

  //Otras rutas no definidas
  // 12. /admin/dashboard => "Inicio > Panel de Administración"
  if (path === '/admin/dashboard') {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Panel de Administración
          </li>
        </ol>
      </nav>
    );
  }

  // 13. /admin/products
  //   - /admin/products => "Inicio > Panel de Administración > Administrar productos"
  //   - /admin/products/add => "Inicio > Panel de Administración > Administrar productos > Agregar producto"
  //   - /admin/products/edit/... => "Inicio > Panel de Administración > Administrar productos > Editar producto"
  if (path.startsWith('/admin/products')) {
    if (path === '/admin/products') {
      return (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Panel de Administración</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Administrar productos
            </li>
          </ol>
        </nav>
      );
    } else if (path.startsWith('/admin/products/add')) {
      return (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Panel de Administración</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/products">Administrar productos</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Agregar producto
            </li>
          </ol>
        </nav>
      );
    } else if (path.startsWith('/admin/products/edit')) {
      return (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Panel de Administración</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/products">Administrar productos</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Editar producto
            </li>
          </ol>
        </nav>
      );
    }
  }

  // 14. /admin/users
  //   - /admin/users => "Inicio > Panel de Administración > Administrar usuarios"
  //   - /admin/users/add => "Inicio > Panel de Administración > Administrar usuarios > Agregar usuario"
  //   - /admin/users/edit/... => "Inicio > Panel de Administración > Administrar usuarios > Editar usuario"
  if (path.startsWith('/admin/users')) {
    if (path === '/admin/users') {
      return (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Panel de Administración</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Administrar usuarios
            </li>
          </ol>
        </nav>
      );
    } else if (path.startsWith('/admin/users/add')) {
      return (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Panel de Administración</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/users">Administrar usuarios</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Agregar usuario
            </li>
          </ol>
        </nav>
      );
    } else if (path.startsWith('/admin/users/edit')) {
      return (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Panel de Administración</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/users">Administrar usuarios</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Editar usuario
            </li>
          </ol>
        </nav>
      );
    }
  }

  // Admin Company Panel
  if (path === '/admin/company') {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Panel de Administración</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Administrar información de empresa</li>
        </ol>
      </nav>
    );
  }

  // Info general
  if (path.startsWith('/admin/company/info')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Panel de Administración</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/company">Administrar información de empresa</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Información general</li>
        </ol>
      </nav>
    );
  }

  // Preguntas
  if (path.startsWith('/admin/company/preguntas')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Panel de Administración</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/company">Administrar información de empresa</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Preguntas</li>
        </ol>
      </nav>
    );
  }

  // Términos
  if (path.startsWith('/admin/company/terminos')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Panel de Administración</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/company">Administrar información de empresa</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Términos</li>
        </ol>
      </nav>
    );
  }

  // Políticas
  if (path.startsWith('/admin/company/politicas')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Panel de Administración</Link></li>
          <li className="breadcrumb-item"><Link to="/admin/company">Administrar información de empresa</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Políticas</li>
        </ol>
      </nav>
    );
  }

  // /agregar-dispositivo => "Inicio > Producto Estrella > Agregar Dispositivo"
  if (path.startsWith('/agregar-dispositivo')) {
    return (
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item">Producto Estrella</li>
          <li className="breadcrumb-item active" aria-current="page">
            Agregar Dispositivo
          </li>
        </ol>
      </nav>
    );
  }

  return null;
}

export default Breadcrumbs;
