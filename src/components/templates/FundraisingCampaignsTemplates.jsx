import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router';

export const FundraisingCampaignsTemplates = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      {/* Título y botón */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestión de Campañas de Recaudación</h1>
        <button
          onClick={() => navigate('/campaigns/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear nueva campaña
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Resumen titulo="Recaudado Mensual" valor="$12,500" />
        <Resumen titulo="Campañas Activas" valor="15" />
        <Resumen titulo="Campañas Próximas a Finalizar" valor="3" />
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          type="text"
          placeholder="Buscar campañas por nombre"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <div className="flex flex-wrap gap-4">
          <select className="p-2 border rounded w-full md:w-auto">
            <option>Categoría</option>
            <option>Emergencia</option>
            <option>Educación</option>
            <option>Salud</option>
          </select>
          <select className="p-2 border rounded w-full md:w-auto">
            <option>Estado</option>
            <option>Activa</option>
            <option>Pausada</option>
            <option>Finalizada</option>
          </select>
          <select className="p-2 border rounded w-full md:w-auto">
            <option>Fechas</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Fechas</th>
              <th className="p-4">Montos</th>
              <th className="p-4">Progreso</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFalsos.map((c, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4">{c.nombre}</td>
                <td className="p-4 text-blue-600">{c.categoria}</td>
                <td className="p-4">{c.fechas}</td>
                <td className="p-4">{c.monto}</td>
                <td className="p-4 w-40">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${c.progreso}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      c.estado === 'Activa'
                        ? 'bg-green-500'
                        : c.estado === 'Finalizada'
                        ? 'bg-gray-600'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {c.estado}
                  </span>
                </td>
                <td className="p-4 space-y-1 text-blue-600">
                  <div
                    onClick={() => navigate('/campaigns/edit/:id')}
                    className="hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Icon icon="mdi:pencil" className="text-lg" />
                    Editar
                  </div>
                  <div className="hover:underline cursor-pointer flex items-center gap-1 text-gray-700">
                    <Icon icon="mdi:check-circle-outline" className="text-lg" />
                    Finalizar
                  </div>
                  <div className="hover:underline cursor-pointer flex items-center gap-1 text-yellow-600">
                    <Icon icon="mdi:pause-circle-outline" className="text-lg" />
                    Pausar
                  </div>
                  <div
                    onClick={() => navigate('/campaigns/delete/:id')}
                    className="hover:underline cursor-pointer flex items-center gap-1 text-red-600"
                  >
                    <Icon icon="mdi:delete-outline" className="text-lg" />
                    Eliminar
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function Resumen({ titulo, valor }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500 text-sm">{titulo}</p>
      <p className="text-xl font-semibold">{valor}</p>
    </div>
  );
}

// Datos estáticos
const datosFalsos = [
  {
    nombre: 'Campaña de Ayuda a Familias',
    categoria: 'Emergencia',
    fechas: '2024-01-15 – 2024-03-15',
    monto: '$5,000 / $10,000',
    progreso: 50,
    estado: 'Activa',
  },
  {
    nombre: 'Apoyo a la Educación Infantil',
    categoria: 'Educación',
    fechas: '2024-02-01 – 2024-04-01',
    monto: '$7,500 / $15,000',
    progreso: 50,
    estado: 'Activa',
  },
  {
    nombre: 'Fondos para la Salud Comunitaria',
    categoria: 'Salud',
    fechas: '2024-01-15 – 2024-03-15',
    monto: '$2,000 / $8,000',
    progreso: 25,
    estado: 'Activa',
  },
  {
    nombre: 'Asistencia para Desastres Naturales',
    categoria: 'Emergencia',
    fechas: '2024-01-10 – 2024-02-05',
    monto: '$10,000 / $10,000',
    progreso: 100,
    estado: 'Finalizada',
  },
  {
    nombre: 'Becas para Estudiantes',
    categoria: 'Educación',
    fechas: '2024-03-01 – 2024-05-15',
    monto: '$3,000 / $12,000',
    progreso: 25,
    estado: 'Pausada',
  },
];
