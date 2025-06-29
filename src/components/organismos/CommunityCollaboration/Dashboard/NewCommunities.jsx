import React from 'react';
import { Icon } from '@iconify/react';

const communities = [
  {
    name: 'Comunidad Agua Viva',
    available: 148,
    icon: 'mdi:account-group',
    color: 'bg-green-200',
    iconColor: 'text-green-500',
  },
  {
    name: 'Comunidad Esperanza',
    available: 107,
    icon: 'mdi:account-group',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    name: 'Comunidad Sonrisa',
    available: 91,
    icon: 'mdi:account-group',
    color: 'bg-blue-100',
    iconColor: 'text-blue-400',
  },
  {
    name: 'Comunidad Corazón',
    available: 54,
    icon: 'mdi:account-group',
    color: 'bg-red-100',
    iconColor: 'text-red-400',
  },
  {
    name: 'Comunidad Saludable',
    available: 54,
    icon: 'mdi:account-group',
    color: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    name: 'Comunidad Saludable',
    available: 54,
    icon: 'mdi:account-group',
    color: 'bg-gray-100',
    iconColor: 'text-gray-400',
  },
];

export const NewCommunities = () => {
  // Limitar a máximo 6 comunidades
  const displayCommunities = communities.slice(0, 6);

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-full h-[50%] ">
      <h2 className="text-2xl font-semibold mb-6">Nuevas Comunidades</h2>
      <div className="flex flex-wrap flex-grow gap-4 h-[80%] w-[100%]">
        {displayCommunities.map((com, idx) => (
          <div
            key={com.name}
            className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition border border-gray-100 w-[45%]"
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
