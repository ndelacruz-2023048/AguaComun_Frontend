import React from 'react';
import { Icon } from '@iconify/react';
import { useResume } from '../../../hooks/useResume';
import { Avatar, Progress } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../../../context/AuthContext';
import { GenerateInitialsAvatar } from '../../../utils/Avatar';

export const ResumeAguaComun = () => {
  const { resume } = useResume();
  const { user } = UserAuth();

  let userDecoded = null
  let community = 'null'
  if(user) {
    try {
      userDecoded = jwtDecode(user)
      community = userDecoded.community || null
    } catch (e) {
      console.error('Error al obtener la comunidad del usuario:', e)
    }
  }

  const comunidad = community.name

  const dineroRecaudado = resume?.dineroRecaudado || '0'
  const actividades = resume?.actividades || 0
  const reportes = resume?.reportes || 0
  const tasaNuevosUsuarios = resume?.tasaNuevosUsuarios || '0%'
  const miembros = resume?.miembros || []
  const usuarios = resume?.usuarios || 0

  console.log('miembros', miembros);
  console.log('usuarios', usuarios);

  
  return (
    <div className="w-full mx-auto bg-white rounded-2xl shadow-lg flex flex-col p-6 gap-2 ">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:clipboard-text-outline" className="text-xl text-[#000]" />
          <span className="text-[#000] text-[30px] font-bold"> Resumen de Comunidad</span>
        </div>
        <div className='flex flex-row gap-2 grow'>
          <div className="flex flex-col gap-4 w-[70%] ">
            <div className="flex flex-row gap-4 h-[80%]">
              <div className="bg-[#338826] text-white rounded-xl flex flex-col items-center justify-center px-6 py-3 grow gap-2">
                <div className='flex flex-row border-1 border-white rounded-full p-[10px_12px] justify-center items-center'>
                   <Icon icon="mdi:cash-multiple" className="text-3xl mb-1 " />
                </div>
                <span className="text-lg">Dinero recaudado</span>
                <span className="text-lg">De que?</span>
                <span className="text-4xl font-bold">Q {dineroRecaudado}.00</span>
              </div>
              <div className="bg-[#D7AD2C] text-white rounded-xl flex flex-col items-center justify-center px-6 py-3 grow gap-2">
                <div className='flex flex-row border-1 border-white rounded-full p-[10px_12px] justify-center items-center'>
                   <Icon icon="mdi:account-multiple-outline" className="text-3xl mb-1 " />
                </div>
                <span className="text-lg">Actividades</span>
                <span className="text-4xl font-bold">{actividades}</span>
              </div>
              <div className="bg-white border border-[#338826] text-[#338826] rounded-xl flex flex-col items-center justify-center px-6 py-3 grow gap-2">
                <div className='flex flex-row border-1 border-[#338826] rounded-full p-[10px_12px] justify-center items-center'>
                   <Icon icon="mdi:water" className="text-4xl mb-1 text-[#338826]" />
                   
                </div>
                <span className="text-lg">Reportes</span>
                <span className="text-4xl font-bold text-[#338826]">{reportes}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 h-[20%]">
              <span className="text-[20px] font-bold text-[#7b7b93]">Tasa de nuevos usuarios ultimos 2 dias:</span>
              <span className="text-[30px] font-bold text-[#18181b]">{tasaNuevosUsuarios}</span>
            </div>
          </div>
          {/* Separador vertical */}
          <div className="w-[2px] h-full bg-gray-100 mx-4 " />
          {/* Sección derecha: Our team */}
          <div className="flex flex-col gap-4 h-full min-w-[180px] w-[30%]">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:account-group-outline" className="text-4xl text-[#338826]" />
              <span className="font-semibold text-[#338826] text-2xl">{comunidad}</span>
            </div>
            <span className="text-xs text-[#338826] mb-1">Miembros {usuarios}</span>
            <Avatar.Group maxCount={3} maxStyle={{ color: '#fff', backgroundColor: '#338826' }}>
              {miembros.map((member, idx) => (
                        <div key={idx}>
                            {member.profilePicture ? (
                                <Avatar src={member.profilePicture} size={60} className='border-2 border-white' />
                            ) : (
                                <GenerateInitialsAvatar name={member.name} surname={member.surname} />
                            )}
                        </div>
                    ))}
            </Avatar.Group>
            <div className="flex flex-col items-center mt-2 border-1 border-[#338826] rounded-2xl p-2">
              <span className="text-xl font-bold text-[#338826] mb-1">Reportes de problemas</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-[#264a20]">{reportes}</span>
                <Progress type="circle" percent={85} width={36} strokeColor="#338826" format={() => ''} />
              </div>
            </div>
          </div>
        </div>
      {/* Sección izquierda: Project estimate */}
    </div>
  );
};
