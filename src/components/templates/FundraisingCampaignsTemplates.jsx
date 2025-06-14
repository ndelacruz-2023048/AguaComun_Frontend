import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

export const FundraisingCampaignsTemplates = () => {
  const [campaigns, setcampaigns] = useState([])
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const getCampaigns = async() =>{
    try{
      const res = await fetch('http://localhost:3662/v1/aguacomun/campaign')
      const data = await res.json()
      setcampaigns(data)
    }catch(e){
      console.error('Error al obtener campañas', e)
    }
  }

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? c.category === categoryFilter : true;
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesName && matchesCategory && matchesStatus;
  });


  

  useEffect(()=>{
    getCampaigns()
  },[])
  
const actualizarEstado = async (id, nuevoEstado) => {
  try {
    await fetch(`http://localhost:3662/v1/aguacomun/campaign/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nuevoEstado }),
    });
    getCampaigns()
    console.log('Si funciona el boton')
  } catch (error) {
    console.error('Error al cambiar estado:', error);
  }
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans w-[80vw]">
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-4">
          <select className="p-2 border rounded w-full md:w-auto"
          value={categoryFilter}
          onChange={(e)=>setCategoryFilter(e.target.value)}
          >
            <option value="">Categoría</option>
            <option value="Emergencia">Emergencia</option>
            <option value="Educación">Educación</option>
            <option value="Salud">Salud</option>
          </select>
          <select
            className="p-2 border rounded w-full md:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Estado</option>
            <option value="Activa">Activa</option>
            <option value="Pausada">Pausada</option>
            <option value="Finalizada">Finalizada</option>
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
            {filteredCampaigns.map((c, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4">{c.name}</td>
                  <td className="p-4 text-blue-600">{c.category}</td>
                  <td className="p-4">
                    {new Date(c.startDate).toLocaleDateString()} - {new Date(c.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    ${c.amountRaised} / ${c.goalAmount}
                  </td>
                  <td className="p-4 w-40">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(c.amountRaised / c.goalAmount) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      c.status === 'Activa'
                        ? 'bg-green-500'
                        : c.status === 'Finalizada'
                        ? 'bg-gray-600'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4 space-y-1 text-sm">
                  <div
                    onClick={() => navigate(`/campaigns/edit/${c._id}`)}
                    className="hover:underline cursor-pointer flex items-center gap-1 text-blue-600"
                  >
                    <Icon icon="mdi:pencil" className="text-lg" />
                    Editar
                  </div>

                  <button
                    disabled={c.estado === 'Finalizada'}
                    onClick={() => actualizarEstado(c._id, 'Finalizada')}
                    className="flex items-center gap-1 text-gray-700 disabled:opacity-40"
                  >
                    <Icon icon="mdi:check-circle-outline" className="text-lg" />
                    Finalizar
                  </button>

                  <button
                    disabled={c.estado === 'Pausada'}
                    onClick={() => actualizarEstado(c._id, 'Pausada')}
                    className="flex items-center gap-1 text-yellow-600 disabled:opacity-40"
                  >
                    <Icon icon="mdi:pause-circle-outline" className="text-lg" />
                    Pausar
                  </button>

                  <button
                    disabled={c.estado === 'Activa'}
                    onClick={() => actualizarEstado(c._id, 'Activa')}
                    className="flex items-center gap-1 text-green-600 disabled:opacity-40"
                  >
                    <Icon icon="mdi:play-circle-outline" className="text-lg" />
                    Activar
                  </button>

                  <div
                    onClick={() => navigate(`/campaigns/delete/${c._id}`)}
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
    <div>
      FundraisingCampaignsTemplates
      {/* You can add more components or content here as needed */}
    </div>
  );
}