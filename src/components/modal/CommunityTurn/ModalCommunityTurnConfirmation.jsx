import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { useCommunityCollaboration } from '../../../stores/communityCollaborationStore'
import { useCommunityCollaborationTurn } from '../../../stores/communityCollaborationTurnStore';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSocket } from '../../../hooks/useSocket';
import { UserAuth } from '../../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

dayjs.extend(customParseFormat)
dayjs.locale('es')
export const ModalCommunityTurnConfirmation = () => {
  const {setIsModalCommunityTurnConfirmationOpen } = useCommunityCollaboration();
  const {selectedCommunityCollaborationTurn} = useCommunityCollaborationTurn()

  const socket = useSocket()
  const [userId,setUserId] = useState()
  console.log(selectedCommunityCollaborationTurn);

  const totalHours = dayjs(selectedCommunityCollaborationTurn?.endTime,"HH:mm:ss").diff(dayjs(selectedCommunityCollaborationTurn?.startTime,"HH:mm:ss"),"hours")
  const formatDateAssigned = dayjs(selectedCommunityCollaborationTurn?.dateAssigned).locale("es").format("D [de] MMM YYYY")
  const formatEndTime = dayjs(selectedCommunityCollaborationTurn?.endTime,"HH:mm:ss").format("h:mm A")
  const formatStartTime = dayjs(selectedCommunityCollaborationTurn?.startTime,"HH:mm:ss").format("h:mm A")

  
  const {user} = UserAuth() 
  
  
  const handleConfirmTurn = ()=>{
       try {
           const decodedToken = jwtDecode(user);
           const dataToUpdate={
               activityId:selectedCommunityCollaborationTurn.activityName._id,
               communityTurnId:selectedCommunityCollaborationTurn.id,
               idUser:decodedToken.uid
           }
           
           socket.emit("update-turn",dataToUpdate)
           setIsModalCommunityTurnConfirmationOpen()
       } catch (error) {
           console.log(error);
           
       }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-100 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center w-[40%] h-[40%] justify-center">
        {/* Círculo con check */}
        <div className="bg-green-100 rounded-full p-4 mb-4 flex items-center justify-center">
          <Icon icon="mdi:check" className="text-green-600" width={40} height={40} />
        </div>
        {/* Mensaje de confirmación */}
        <h2 className="text-2xl font-bold text-center mb-2">Confirmar turno 🎉</h2>
        <p className="text-gray-500 text-center mb-6">Estos son los datos del turno que te vas a asignar</p>
        {/* Resumen */}
        <div className="flex w-full justify-between text-center mb-2">
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">{totalHours}</p>
            <p className="text-xs text-gray-400">Total Horas</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">{formatStartTime} - {formatEndTime}</p>
            <p className="text-xs text-gray-400">Turnos</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">{formatDateAssigned}</p>
            <p className="text-xs text-gray-400">Fecha</p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-5'>
            <button
            onClick={setIsModalCommunityTurnConfirmationOpen}
            className=" bg-[#338826] text-white px-6 py-2 rounded-lg hover:bg-[#338826]/80  transition-colors"
            >
            Cerrar
            </button>
            <button onClick={handleConfirmTurn} className='bg-[#D7AD2C] text-white px-6 py-2 rounded-lg hover:bg-[#D7AD2C]/80 transition-colors'>
                Confirmar
            </button>
        </div>
        {/* Botón de cerrar */}
      </div>
    </div>
  );
}
