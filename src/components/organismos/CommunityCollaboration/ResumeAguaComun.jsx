import React from 'react';
import { Icon } from '@iconify/react';
import { Avatar, Progress } from 'antd';

export const ResumeAguaComun = () => {
  // Datos de ejemplo
  const teamMembers = [
    { name: 'Ana', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Luis', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'María', src: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Carlos', src: 'https://randomuser.me/api/portraits/men/76.jpg' },
  ];
  return (
    <div className="w-full mx-auto bg-white rounded-2xl shadow-lg flex flex-col p-6 gap-2 ">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:clipboard-text-outline" className="text-xl text-[#7b7b93]" />
          <span className="font-semibold text-[#7b7b93] text-[30px]"> Resumen de Comunidad</span>
        </div>
        <div className='flex flex-row gap-2 grow'>
          <div className="flex flex-col gap-4 w-[70%] ">
            <div className="flex flex-row gap-4 h-[80%]">
              <div className="bg-black text-white rounded-xl flex flex-col items-center justify-center px-6 py-3 grow gap-2">
                <div className='flex flex-row border-1 border-white rounded-full p-[10px_12px] justify-center items-center'>
                   <Icon icon="mdi:folder-outline" className="text-3xl mb-1 " />
                </div>
                <span className="text-lg">Projects</span>
                <span className="text-4xl font-bold">23</span>
              </div>
              <div className="bg-blue-500 text-white rounded-xl flex flex-col items-center justify-center px-6 py-3 grow gap-2">
                <div className='flex flex-row border-1 border-white rounded-full p-[10px_12px] justify-center items-center'>
                   <Icon icon="mdi:account-multiple-outline" className="text-3xl mb-1 " />
                </div>
                <span className="text-lg">Assigned</span>
                <span className="text-4xl font-bold">72</span>
              </div>
              <div className="bg-white border border-[#c9c9c9] text-[#7b7b93] rounded-xl flex flex-col items-center justify-center px-6 py-3 grow gap-2">
                <div className='flex flex-row border-1 border-[#c9c9c9] rounded-full p-[10px_12px] justify-center items-center'>
                   <Icon icon="mdi:check-circle-outline" className="text-4xl mb-1 " />
                </div>
                <span className="text-lg">Completed</span>
                <span className="text-4xl font-bold text-[#7b7b93]">40</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 h-[20%]">
              <span className="text-2xl font-bold text-[#7b7b93]">On time completion rate:</span>
              <span className="text-3xl font-bold text-[#18181b]">94%</span>
              <span className="bg-[#6c47ff] text-white text-xs rounded-lg px-2 py-0.5 ml-2 flex items-center gap-1">
                <Icon icon="mdi:arrow-up" className="text-xs" />2.3%
              </span>
            </div>
          </div>
          {/* Separador vertical */}
          <div className="w-[2px] h-full bg-gray-100 mx-4 " />
          {/* Sección derecha: Our team */}
          <div className="flex flex-col gap-4 h-full min-w-[180px] w-[30%]">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:account-group-outline" className="text-4xl text-[#7b7b93]" />
              <span className="font-semibold text-[#7b7b93] text-2xl">Comunidad</span>
            </div>
            <span className="text-xs text-[#7b7b93] mb-1">Miembros</span>
            <Avatar.Group maxCount={3} maxStyle={{ color: '#fff', backgroundColor: '#6c47ff' }}>
              {teamMembers.map((member, idx) => (
                <Avatar key={idx} src={member.src} size={60} className='border-2 border-white' />
              ))}
            </Avatar.Group>
            <div className="flex flex-col items-center mt-2 border-1 border-[#c9c9c9] rounded-2xl p-2">
              <span className="text-xl font-bold text-[#7b7b93] mb-1">Hours</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-[#18181b]">82</span>
                <Progress type="circle" percent={85} width={36} strokeColor="#6c47ff" format={() => ''} />
              </div>
            </div>
          </div>
        </div>
      {/* Sección izquierda: Project estimate */}
    </div>
  );
};
