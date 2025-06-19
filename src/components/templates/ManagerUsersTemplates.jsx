import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import useManagerCommunityStore from '../../hooks/useManagerCommunity';
import { socketConnection } from '../../socket/socket';
import { useLogout } from '../../hooks/useLogout';

export const ManagerUsersTemplate = () => {
    const { logout } = useLogout()
    
        const handleLogoutClick  = ()=> {
            logout()
        }
    const { selectedCommunity, managers, fetchManagersByCommunity } = useManagerCommunityStore();
    const [searchAddress, setSearchAddress] = useState('');

    useEffect(() => {
        if (selectedCommunity && selectedCommunity._id) {
            fetchManagersByCommunity(selectedCommunity._id);
        }
    }, [selectedCommunity, fetchManagersByCommunity]);

    useEffect(() => {
        // Escuchar cambios de rol en tiempo real
        socketConnection.on('user-role-updated', ({ userId, newRole }) => {
            fetchManagersByCommunity(selectedCommunity?._id);
        });
        return () => {
            socketConnection.off('user-role-updated');
        };
    }, [selectedCommunity, fetchManagersByCommunity]);

    const communityName = selectedCommunity ? selectedCommunity.name : '';
    // Filtra los usuarios por dirección (zona, municipio o departamento)
    const filteredManagers = managers.filter(user => {
        if (!searchAddress) return true;
        const address = user.address || {};
        const search = searchAddress.toLowerCase();
        return (
            (address.zone && address.zone.toLowerCase().includes(search)) ||
            (address.municipality && address.municipality.toLowerCase().includes(search)) ||
            (address.department && address.department.toLowerCase().includes(search))
        );
    });

    // Acción para cambiar el rol y emitir evento en tiempo real
    const handleToggleRole = async (user) => {
        let newRole;
        if (user.rol === 'COORDINADOR') {
            newRole = 'CLIENT';
        } else if (user.rol === 'CLIENT' || user.rol === 'client') {
            newRole = 'COORDINADOR';
            handleLogoutClick()
        } else {
            // Si es ADMIN, no permitir cambio
            return;
        }
        // Asegura que el rol se envía en mayúsculas
        socketConnection.emit('update-user-role', {
            userId: user._id,
            newRole: newRole.toUpperCase()
        });
    };

    return (
        <div className="flex flex-col min-h-screen w-6/7 bg-[#F7FAFC] px-4 sm:px-6 lg:px-8 py-5">
            {/* Título de la página y subtitulo */}
            <h1 className="md:text-4xl lg:text-[40px] font-bold mb-6 md:mb-8 lg:mb-5 text-[#338826]">Manage {communityName}</h1>
            <p className="md:text-4xl lg:text-[25px] mb-6 md:mb-8 lg:mb-5 text-[#338826]">View and manage manager roles within the community.</p>

            {/* Barra de búsqueda por dirección */}
            <div className="relative w-full lg:w-2/3 mb-5 md:mb-8 lg:mb-5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon 
                        icon="material-symbols-light:search" 
                        className="text-[#4D8599] text-4xl md:text-5xl lg:text-[60px] h-8 w-8 md:h-10 md:w-10" 
                    />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por dirección..."
                    value={searchAddress}
                    onChange={e => setSearchAddress(e.target.value)}
                    className="border-[#4D8599] bg-[#E8F0F2] rounded-[5px] p-2 pl-12 md:pl-14 lg:pl-16 w-full h-12 md:h-14 text-lg md:text-xl lg:text-2xl text-[#4D8599] focus:outline-none focus:ring-2 focus:ring-[#4D8599] transition-all"
                />
            </div>

            {/* Tabla de comunidades - Contenedor responsive */}
            <div className="overflow-x-auto w-full mb-8">
                <div className="box-border border-[#CFE0E8] bg-transparent rounded-[10px] border-2 border-solid shadow-lg min-w-max">
                    <table className="min-w-full bg-transparent">
                        <thead>
                            <tr className="text-black text-xl md:text-2xl">
                                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tl-[5px]">Nombre</th>
                                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Email</th>
                                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Role</th>
                                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tr-[5px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredManagers.map((manager, index) => (
                                <tr key={index} className="text-base md:text-lg lg:text-xl">
                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">{manager.name} {manager.surname}</td>
                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#5C7D8A]">{manager.email}</td>
                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                                        <span className={`inline-block rounded-full px-4 py-1 text-sm md:text-base lg:text-lg font-semibold border transition-all
                                            ${manager.rol === 'COORDINADOR' ? 'border-[#D7AD2C] text-[#D7AD2C] bg-white' : 'border-[#75BF3B] text-[#75BF3B] bg-white'}`}
                                        >
                                            {manager.rol}
                                        </span>
                                    </td>
                                    
                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                                        <button
                                            className="text-[#4D8599] font-semibold flex items-center cursor-pointer"
                                            onClick={() => handleToggleRole(manager)}
                                        >
                                            {manager.rol === 'COORDINADOR' ? 'Asignar como CLIENT' : 'Asignar como COORDINADOR'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};