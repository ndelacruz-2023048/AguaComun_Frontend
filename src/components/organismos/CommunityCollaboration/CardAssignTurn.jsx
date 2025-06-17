import { Icon } from '@iconify/react/dist/iconify.js'
import dayjs from 'dayjs'
import React from 'react'
import 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useCommunityCollaboration } from '../../../stores/communityCollaborationStore'
import { ModalCommunityTurnConfirmation } from '../../modal/CommunityTurn/ModalCommunityTurnConfirmation'
import { useCommunityCollaborationTurn } from '../../../stores/communityCollaborationTurnStore'
dayjs.extend(customParseFormat)
dayjs.locale('es')
export const CardAssignTurn = ({activityName,dateAssigned,endTime,startTime,id}) => {
  const {isModalCommunityTurnConfirmationOpen,setIsModalCommunityTurnConfirmationOpen} = useCommunityCollaboration()
  const {setSelectedCommunityCollaborationTurn} = useCommunityCollaborationTurn()

  const formatDateAssigned = dayjs(dateAssigned).locale("es").format("dddd D [de] MMMM ")
  const formatEndTime = dayjs(endTime,"HH:mm:ss").format("h:mm A")
  const formatStartTime = dayjs(startTime,"HH:mm:ss").format("h:mm A")

  const handleClickAssignTurn = (id)=>{
    const turn = {
      id,
      activityName,
      dateAssigned,
      endTime,
      startTime
    }
    setSelectedCommunityCollaborationTurn(turn)
  }
  return (
    <div className='flex gap-5 w-full items-center'>
      {isModalCommunityTurnConfirmationOpen && <ModalCommunityTurnConfirmation/>}
        <div className='flex items-center justify-center rounded-2xl w-[10%] bg-[#d9edcb] h-[100%]'>
            <Icon icon="mdi:calendar-month" className='text-2xl'/>
        </div>
        <div className='flex flex-col gap-1 w-[70%]'>
            <p className=' font-semibold text-xl '>{activityName?.activityName}</p>
            <span className=' text-sm text-[#5C7D8A]'>{formatDateAssigned} {formatStartTime}-{formatEndTime}</span>
        </div>
        <div onClick={setIsModalCommunityTurnConfirmationOpen} className='flex items-center justify-center rounded-2xl w-[10%] bg-[#75BF3B] h-[75%]'>
            <button onClick={()=>handleClickAssignTurn(id)} className='text-md text-[#ffffff] font-bold '>Assign</button>
        </div>
    </div>
  )
}
