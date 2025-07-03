import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { socketConnection } from '../../../../socket/socket'; // ajusta la ruta según tu proyecto

export const NewCommunities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {

    if (!socketConnection.connected) {
      socketConnection.connect();
    }


    const handleLatest = (data) => {
       console.log("🎯 Datos recibidos:", data);
       console.log("📦 Hola Hola:", data);
      const formatted = data.map((com) => ({
        name: com.name,
        available: com.members?.length || 0,
        icon: 'mdi:account-group',
        color: 'bg-blue-100',
        iconColor: 'text-blue-500',
      }));
      setCommunities(formatted);
    };

    // Escuchar evento personalizado
    socketConnection.on('latest-communities', handleLatest);

    // Emitir petición de las más recientes
    socketConnection.emit('get-latest-communities');

    return () => {
      socketConnection.off('latest-communities', handleLatest);
    };
  }, []);

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-full h-[50%]">
      <h2 className="text-2xl font-semibold mb-6">Nuevas Comunidades</h2>
      <div className="flex flex-wrap flex-grow gap-4 h-[80%] w-[100%]">
        {communities.map((com, idx) => (
          <div
            key={idx}
            className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition border border-gray-100 w-[48%]"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg mr-3 ${com.color}`}>
              <Icon icon={com.icon} className={`w-5 h-5 ${com.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm text-gray-800 truncate">{com.name}</div>
              <div className="text-gray-400 text-xs">{com.available} Miembros</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};