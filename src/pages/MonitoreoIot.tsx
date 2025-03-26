// src/pages/MonitoreoIoT.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { toast } from 'react-toastify';

interface IoTData {
  modoAutomatico: boolean;
  cortinaAbierta: boolean;
  ldrValue: number;
  soundValue: number;
}

interface HistoryEvent {
  _id: string;
  modo: string;
  estado: string;
  metodo: string;
  fecha: string;
}

// Función pura: se define fuera del componente para que su referencia sea estable.
function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function MonitoreoIot() {
  const navigate = useNavigate();

  // Estados para datos en tiempo real
  const [modo, setModo] = useState('Manual'); // 'Manual' o 'Automático'
  const [estadoCortina, setEstadoCortina] = useState('Cerrado'); // 'Abierto' o 'Cerrado'
  const [porcentajeLuz, setPorcentajeLuz] = useState(0);

  // Estados para historial
  const [historial, setHistorial] = useState<HistoryEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estado para mostrar/ocultar el modal del historial
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // 1. Obtener datos en tiempo real (se envuelve en useCallback para que sea estable)
  const fetchRealtimeData = useCallback(async () => {
    try {
      const { data } = await api.get<IoTData>('/cortina/data');
      setModo(data.modoAutomatico ? 'Automático' : 'Manual');
      setEstadoCortina(data.cortinaAbierta ? 'Abierto' : 'Cerrado');

      const valorCrudo = data.ldrValue || 0;
      const valorMapeado = mapRange(valorCrudo, 0, 4095, 0, 100);
      setPorcentajeLuz(Math.round(valorMapeado));
    } catch (error) {
      console.error('Error al obtener datos en tiempo real:', error);
    }
  }, []); // No hay dependencias porque mapRange se definió fuera y las funciones setState son estables

  useEffect(() => {
    fetchRealtimeData();
    const interval = setInterval(fetchRealtimeData, 2000); // Actualiza cada 2s
    return () => clearInterval(interval);
  }, [fetchRealtimeData]); // Se incluye fetchRealtimeData en las dependencias

  // 2. Obtener historial paginado (10 registros por página)
  const fetchHistory = async (page: number) => {
    try {
      const { data } = await api.get('/cortina/historial', {
        params: { page, limit: 10 },
      });
      // Se asume que el backend retorna { docs, page, totalPages }
      setHistorial(data.docs || []);
      setCurrentPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error al obtener historial:', error);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchHistory(page);
  };

  // 3. Funciones para controlar la cortina
  const handleCambiarModo = async () => {
    try {
      if (modo === 'Manual') {
        await api.post('/cortina/modoAutomatico');
        setModo('Automático');
        toast.success('Modo cambiado a Automático');
      } else {
        await api.post('/cortina/modoManual');
        setModo('Manual');
        toast.success('Modo cambiado a Manual');
      }
    } catch (error) {
      toast.error('Error cambiando el modo');
      console.error(error);
    }
  };

  const handleAbrirCortina = async () => {
    try {
      await api.post('/cortina/abrir');
      setEstadoCortina('Abierto');
      toast.success('Cortina abierta');
    } catch (error) {
      toast.error('Error al abrir la cortina');
      console.error(error);
    }
  };

  const handleCerrarCortina = async () => {
    try {
      await api.post('/cortina/cerrar');
      setEstadoCortina('Cerrado');
      toast.success('Cortina cerrada');
    } catch (error) {
      toast.error('Error al cerrar la cortina');
      console.error(error);
    }
  };

  const handleAgregarOtro = () => {
    navigate('/agregar-dispositivo');
  };

  // --- GIFs dinámicos según el estado ---
  const modoGif =
    modo === 'Automático'
      ? '/images/mode-auto.gif'
      : '/images/mode-manual.gif';

  const cortinaGif =
    estadoCortina === 'Abierto'
      ? '/images/cortina-abierta.gif'
      : '/images/cortina-cerrada.gif';

  // Ejemplo: usando un GIF para la luz (puedes ajustar la lógica si necesitas distintos GIFs)
  const luzGif = '/images/luz.gif';

  return (
    <div
      className="container py-3 mt-3"
      style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
    >
      {/* Botón para agregar otro dispositivo */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-secondary" onClick={handleAgregarOtro}>
          Agregar otro dispositivo
        </button>
      </div>

      <h2 className="text-center mb-3">Manejo de Cortina</h2>

      {/* Contenedor de 3 paneles */}
      <div className="row justify-content-center text-center mb-4">
        {/* Panel 1: Modo */}
        <div className="col-md-4 border rounded p-4 mx-3 mb-3">
          <div className="mb-2">
            <img
              src={modoGif}
              alt={modo}
              style={{ maxHeight: '70px', objectFit: 'contain' }}
            />
          </div>
          <button className="btn btn-primary mb-2" onClick={handleCambiarModo}>
            Cambiar modo
          </button>
          <p className="mb-0">
            <strong>Modo:</strong> {modo}
          </p>
        </div>

        {/* Panel 2: Cortina */}
        <div className="col-md-4 border rounded p-4 mx-3 mb-3">
          <div className="mb-2">
            <img
              src={cortinaGif}
              alt={estadoCortina}
              style={{ maxHeight: '70px', objectFit: 'contain' }}
            />
          </div>
          <div className="mb-2">
            <button className="btn btn-success me-1" onClick={handleAbrirCortina}>
              Abrir cortina
            </button>
            <button className="btn btn-danger" onClick={handleCerrarCortina}>
              Cerrar cortina
            </button>
          </div>
          <p className="mb-0">
            <strong>Estado:</strong> {estadoCortina}
          </p>
        </div>

        {/* Panel 3: Luz (LDR) */}
        <div className="col-md-4 border rounded p-4 mx-3 mb-3">
          <h6 className="mb-1">Cantidad de luz</h6>
          <div className="mb-2">
            <img
              src={luzGif}
              alt="Imagen alusiva a la luz"
              style={{ maxHeight: '60px', objectFit: 'contain' }}
            />
          </div>
          <p className="mb-0">
            <strong>{porcentajeLuz}%</strong>
          </p>
        </div>
      </div>

      {/* Botón para abrir el modal del historial */}
      <div className="text-center mb-3">
        <button className="btn btn-info" onClick={() => setShowHistoryModal(true)}>
          Ver Historial de Eventos
        </button>
      </div>

      {/* Modal para el historial de eventos */}
      {showHistoryModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Historial de Eventos</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowHistoryModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Modo</th>
                        <th>Estado</th>
                        <th>Método</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.map((evt) => (
                        <tr key={evt._id}>
                          <td>{evt.modo}</td>
                          <td>{evt.estado}</td>
                          <td>{evt.metodo}</td>
                          <td>{new Date(evt.fecha).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <nav>
                    <ul className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MonitoreoIot;
