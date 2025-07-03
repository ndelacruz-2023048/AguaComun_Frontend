import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import { Icon } from '@iconify/react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3662');

const FundraisingCampaingsCard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Solicitar campañas al conectar
    socket.emit('get-list-campaigns');

    // Escuchar respuesta
    socket.on('list-campaigns', (data) => {
      setCampaigns(data);
    });

    // Limpieza
    return () => {
      socket.off('list-campaigns');
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {campaigns
        .slice() // Hacemos una copia para no mutar el estado
        .sort((a, b) => a.amountRaised - b.amountRaised) // Orden ascendente por recaudación
        .slice(0, 5) // Solo las primeras 5
        .map((camp) => {
          const percent = Math.round((camp.amountRaised / camp.goalAmount) * 100);
          return (
            <div
              key={camp._id}
              className="flex items-center bg-[#e9f7df] rounded-2xl shadow px-6 py-4 w-[95%] gap-6"
            >
              {/* Start from */}
              <div className="flex flex-col items-center min-w-[90px]">
                <button className="bg-[#75BF3B]/10 text-[#75BF3B] rounded-full p-2 mb-2">
                  <Icon icon="solar:tag-linear" width="28" height="28" />
                </button>
                <span className="text-xs text-gray-400">Start from</span>
                <span className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
                  <Icon icon="mdi:clock-outline" width="16" height="16" />
                  {new Date(camp.startDate).toLocaleDateString()}
                </span>
              </div>

              {/* Main info */}
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-base font-semibold text-gray-800">{camp.name}</span>
                <div className="flex items-center gap-4 mt-1">
                  <a
                    href={camp.imageUrl || 'https://example.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#75BF3B] underline flex items-center gap-1"
                  >
                    <Icon icon="mdi:link-variant" width="16" height="16" />
                    {camp.imageUrl ? 'Ver imagen' : 'Sin enlace'}
                  </a>
                </div>
              </div>

              {/* Progress */}
              <div className="flex flex-col items-center w-[20%]">
                <span className="text-xs text-gray-800 mb-1">{percent}% completo</span>
                <Progress
                  percent={percent}
                  showInfo={false}
                  strokeColor="#75BF3B"
                  trailColor="#E5E7EB"
                  className="w-24"
                />
              </div>

              {/* Botón de acción */}
              <button
                onClick={() => alert(`Ver más de: ${camp.name}`)}
                className="flex items-center gap-2 bg-[#75BF3B] text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#66a62f] transition"
              >
                <Icon icon="lets-icons:view-alt-duotone" width="20" height="20" />
                Ver más
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default FundraisingCampaingsCard;
