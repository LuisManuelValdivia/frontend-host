import React from 'react';

export interface TarjetaControlCortinaProps {
  titulo: string;
  descripcion: string;
  imagenEstatica: string;
  imagenAnimada: string;
  estado: boolean;
  setEstado: (estado: boolean) => void;
  puntoDeApi: string;
}

const TarjetaControlCortina: React.FC<TarjetaControlCortinaProps> = ({
  titulo,
  descripcion,
  imagenEstatica,
  imagenAnimada,
  estado,
  setEstado,
  puntoDeApi,
}) => {
  const alternarSwitch = async () => {
    const nuevoEstado = !estado;
    console.log(`🔹 Cambiando estado de ${titulo}:`, nuevoEstado);
    try {
      // Llamada al backend para cambiar el estado de la cortina
      await fetch(`http://localhost:4000${puntoDeApi}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      setEstado(nuevoEstado);
    } catch (error) {
      console.error(`Error cambiando el estado de ${titulo}:`, error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center w-80 h-80 transition-transform transform hover:scale-105 hover:shadow-2xl mt-6">
      <h2 className="text-2xl font-semibold text-gray-800">{titulo}</h2>
      <p className="text-sm text-gray-600 mb-3">{descripcion}</p>
      <img 
        src={estado ? imagenAnimada : imagenEstatica} 
        alt={titulo} 
        className="w-24 h-24 object-cover mb-4 rounded-lg"
      />
      <div className="relative w-16 h-9">
        <input
          type="checkbox"
          checked={estado}
          onChange={alternarSwitch}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer peer"
        />
        <div className="w-16 h-9 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-green-400"></div>
        <div className="absolute left-1 top-1 w-7 h-7 bg-white rounded-full shadow-md transform transition duration-300 peer-checked:translate-x-7"></div>
      </div>
      <p className={`text-lg font-semibold mt-3 ${estado ? 'text-green-600' : 'text-red-600'}`}>
        {estado ? 'Abierta' : 'Cerrada'}
      </p>
    </div>
  );
};

export default TarjetaControlCortina;
