import { memo, use, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { useSocket } from '../../hooks/useSocket';
import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { ResumeAguaComun } from '../organismos/CommunityCollaboration/ResumeAguaComun';
import FundraisingCampaingsCard from '../organismos/CommunityCollaboration/HomeDashboard/FundraisingCampaingsCard';
import { CommunityCollaborationCalendar } from '../organismos/CommunityCollaboration/HomeDashboard/CommunityCollaborationCalendar';

export const HomeTemplate = memo(() => {

  const { user } = UserAuth();
  const socket = useSocket()
  const navigate = useNavigate()

  let name = '', surname = '';
  if(user) {
    name = user.name || '';
    surname = user.surname || '';
  }

  useEffect(()=>{
    socket.emit("evento-servidor","Hola desde el cliente");
  },[])

   const handleCardClick = (link) => {
   
      navigate(link)
    
  }

  return (
    <div className="flex flex-row h-[100%] w-full px-4 sm:px-6 lg:px-8 py-5 gap-4">
      <div className='flex flex-col gap-4 w-[70%] h-full'>
        <div className='flex flex-row h-[40%] '>
          <ResumeAguaComun/>  
        </div>
        <div className='flex flex-col h-[42%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 gap-4  bg-white rounded-2xl shadow-lg'>
          <div className='flex flex-row items-center gap-2 ml-8 '>
             <Icon icon="tdesign:money" className='text-[#000] text-2xl' />
             <h1 className='text-2xl font-bold'>Campañas de recaudación de fondos</h1>
          </div>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <FundraisingCampaingsCard/>
          </div>
        </div>
      </div>
      <div className='h-full w-[30%]'>
        <CommunityCollaborationCalendar/>
      </div>
    </div>
  );
});

const CardItem = memo(({ title, icon, onClick  }) => (
  <div onClick={onClick} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md w-[200px] box-border border-1 border-[#A48647] transition-shadow">
    <Icon icon={icon} width="40" height="40" className="text-[#A48647] mb-2" />
    <h3 className="text-lg font-medium text-center">{title}</h3>
  </div>
));