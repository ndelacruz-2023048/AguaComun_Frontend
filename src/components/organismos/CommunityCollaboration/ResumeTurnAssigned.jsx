import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../../../context/AuthContext';
import { useSocket } from '../../../hooks/useSocket';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)
dayjs.locale('es')


export const ResumeTurnAssigned = () => {
  // Datos de ejemplo, reemplazar por props o store según integración real

  const {user} = UserAuth()
  const socket = useSocket()
  const [turnByUser,setTurnByUser] = useState()
  const turnos = [
    {
      fecha: '15 de Julio, 2024',
      hora: '10:00 AM',
      cupo: 5,
      inscritos: 3,
    },
  ];



  useEffect(()=>{
    try {
        const decodedToken = jwtDecode(user);
        socket.emit("get-list-community-collaboration-turn",decodedToken.uid)
        socket.on("list-community-collaboration-turn",(data)=>{
            setTurnByUser(data)
        })
    } catch (error) {
        console.log(error);
    }
  },[])

  console.log(turnByUser);


  return (
    <div className="bg-[#f8fafc] min-h-screen w-full">
      
      {/* Contenido principal */}
      <div className="flex flex-col items-center w-full mt-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Turnos de Actividades Comunitarias</h1>
          <p className="text-center text-[#5C7D8A] mb-6">Aqui puedes ver todos los turnos a los que te has inscrito</p>
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-[#5C7D8A] text-sm border-b border-gray-100">
                  <th className="py-4 px-6 font-semibold text-left">Fecha</th>
                  <th className="py-4 px-6 font-semibold text-left">Hora Inicio</th>
                  <th className="py-4 px-6 font-semibold text-left">Hora Fin</th>
                  <th className="py-4 px-6 font-semibold text-left">Actividad</th>
                </tr>
              </thead>
              <tbody>
                {turnByUser?.map((turno, idx) => (
                  <tr key={idx} className="border-b last:border-b-0 border-gray-100 hover:bg-[#f4f7fa] transition-colors">
                    <td className="py-4 px-6 text-[#338826] cursor-pointer flex items-center gap-2">
                      <Icon icon="mdi:calendar-month" className="text-xl mr-1" />
                      {dayjs(turno.dateAssigned).format("DD MMMM, YYYY")}
                    </td>
                    <td className="py-4 px-6">{dayjs(turno?.startTime,"HH:mm:ss").format("h:mm A")}</td>
                    <td className="py-4 px-6">{dayjs(turno?.endTime,"HH:mm:ss").format("h:mm A")}</td>
                    <td className="py-4 px-6">{turno?.activityId?.activityName
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
