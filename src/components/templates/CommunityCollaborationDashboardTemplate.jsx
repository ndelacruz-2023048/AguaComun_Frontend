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
    <div className='flex flex-col h-full w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-5'>
      <div className="p-8 bg-[#f8fafc] min-h-screen">
        {/* Título */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Gestión de Actividades y Turnos</h1>

        




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
                  <td className="py-3 px-4 text-[#338826] border-b border-gray-100"><a href={a.activityName}>{a.community.name}</a></td>
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
                {/* <th className="py-3 px-6 font-semibold">Acciones</th> */}
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
                    <td className="py-3 px-6">{d?.assignedTo?.name}</td>
                    
                    {/*<td className="py-3 px-6">
                      {d?.assignedTo=== null && (
                        <button className="text-[#338826] underline font-medium hover:text-[#25661a]">Asignar</button>
                      )}
                      {d?.assignedTo && (
                        <button className="text-blue-600 underline font-medium hover:text-blue-800">Editar</button>
                      )}
                    </td>*/}
                    
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
    </div>
  );
};
