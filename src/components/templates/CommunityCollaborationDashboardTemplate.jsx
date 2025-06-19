import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useSocket } from '../../hooks/useSocket';
import dayjs from 'dayjs';
import { FieldTableTd } from '../molecules/CommunityCollaboration/FieldTableTd';
import { FieldTableTd2 } from '../molecules/CommunityCollaboration/FieldTableTd2';
import { UserAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export const CommunityCollaborationDashboardTemplate = () => {
  // Datos de ejemplo para la tabla principal
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [communityCollaboration,setCommunityCollaboration] = useState()
  const socket = useSocket()
  const {user} = UserAuth()

  const activities = [
    {
      activity: 'Riego de la parcela principal',
      community: 'Comunidad Los Olivos',
      communityLink: '#',
      date: '15/07/2024',
      totalTurns: 12,
      unassigned: 2,
      expired: 1,
      details: [
        { date: '15/07/2024 08:00', status: 'Pendiente', person: '', action: 'Asignar' },
        { date: '15/07/2024 10:00', status: 'Completado', person: 'Sofía Rodríguez', action: 'Editar' },
        { date: '15/07/2024 12:00', status: 'Vencido', person: '', action: 'Asignar' },
      ],
    },
    {
      activity: 'Mantenimiento del canal secundario',
      community: 'Comunidad El Manantial',
      communityLink: '#',
      date: '22/07/2024',
      totalTurns: 8,
      unassigned: 1,
      expired: 0,
      details: [],
    },
    {
      activity: 'Limpieza del estanque',
      community: 'Comunidad La Esperanza',
      communityLink: '#',
      date: '29/07/2024',
      totalTurns: 5,
      unassigned: 0,
      expired: 0,
      details: [],
    },
  ];

  const activity = communityCollaboration?.[selectedActivity];
  useEffect(()=>{
    try {
      const decodedToken = jwtDecode(user);
      socket.emit("get-list-community-collaboration",decodedToken.uid)
      socket.on("list-community-collaboration",(data)=>{
        setCommunityCollaboration(data)
      })
    } catch (error) {
      console.log(error);
      
    }
  },[])

  console.log("communityCollaboration",communityCollaboration);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Gestión de Actividades y Turnos</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar actividad o persona..."
            className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#338826] bg-[#f4f7fa] text-gray-700 placeholder:text-gray-400"
          />
          <Icon icon="circum:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-[#f4f7fa] text-gray-700 text-sm font-medium">
            Comunidad <Icon icon="simple-line-icons:arrow-down" className="text-base" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-[#f4f7fa] text-gray-700 text-sm font-medium">
            Fecha <Icon icon="simple-line-icons:arrow-down" className="text-base" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-[#f4f7fa] text-gray-700 text-sm font-medium">
            Estado <Icon icon="simple-line-icons:arrow-down" className="text-base" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="px-6 py-2 rounded-xl bg-white border border-gray-200 text-[#338826] font-semibold shadow-sm">Ver todos</button>
        <button className="px-6 py-2 rounded-xl bg-[#f4f7fa] border border-gray-200 text-gray-500 font-semibold shadow-sm">Ver solo sin asignar</button>
      </div>

      {/* Tabla de actividades */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-0 mb-8 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-200">
              <th className="py-3 px-4 font-semibold">Actividad</th>
              <th className="py-3 px-4 font-semibold">Comunidad</th>
              <th className="py-3 px-4 font-semibold">Fecha</th>
              <th className="py-3 px-4 font-semibold">Total Turnos</th>
              <th className="py-3 px-4 font-semibold">asignados</th>
              <th className="py-3 px-4 font-semibold">sin asignar</th>
            </tr>
          </thead>
          <tbody>
            {communityCollaboration?.map((a, idx) => (
              <tr
                key={a._id}
                className={`cursor-pointer transition-colors  items-center  ${selectedActivity === idx ? 'bg-[#f4f7fa]' : 'hover:bg-[#f4f7fa]'}`}
                onClick={() => setSelectedActivity(idx)}
              >
                <td className="py-3 px-4 font-medium text-gray-800 border-b border-gray-100">{a.activityName}</td>
                <td className="py-3 px-4 text-[#338826] underline border-b border-gray-100"><a href={a.activityName}>{a.community.name}</a></td>
                <td className="py-3 px-4 border-b border-gray-100">{dayjs(a.endDate).format("DD/MM/YYYY")}</td>
                <td className="py-3 px-4 border-b border-gray-100">{a.turns.length}</td>
                <td>
                  <FieldTableTd data={a.turns}/>
                </td>
                <td>
                  <FieldTableTd2 data={a.turns}/>
                </td>
                
                {/* <td className="py-3 px-4 border-b border-gray-100">{a.activityName}/{a.expired}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalles de la actividad seleccionada */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-0">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 px-6 pt-6 pb-2">Detalles de la Actividad: {activity?.activityName}</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-200">
              <th className="py-3 px-6 font-semibold">Fecha/Hora</th>
              <th className="py-3 px-6 font-semibold">Estado</th>
              <th className="py-3 px-6 font-semibold">Persona Asignada</th>
              <th className="py-3 px-6 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {activity?.turns.length > 0 ? (
              activity?.turns.map((d, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-b-0">
                  <td className="py-3 px-6 text-[#338826] underline cursor-pointer">{dayjs(d.dateAssigned).format("DD/MM/YYYY")}</td>
                  <td className="py-3 px-6">
                    {d.status === "occupied" && (
                      <span className="border-[#338826] border-1 text-[#338826] px-4 py-1 rounded-full text-xs font-semibold">Ocupado</span>
                    )}
                    {d.status === "pending" && (
                    <span className="border-[#D7AD2C] border-1 text-[#D7AD2C] px-4 py-1 rounded-full text-xs font-semibold">Pendiente</span>
                    )}
                  </td>
                  <td className="py-3 px-6">{d?.assignedTo?.name || '-'}</td>
                  
                  <td className="py-3 px-6">
                    {d?.assignedTo=== null && (
                      <button className="text-[#338826] underline font-medium hover:text-[#25661a]">Asignar</button>
                    )}
                    {d?.assignedTo && (
                      <button className="text-blue-600 underline font-medium hover:text-blue-800">Editar</button>
                    )}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-6">No hay detalles para esta actividad.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
