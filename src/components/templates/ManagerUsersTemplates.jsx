import React from 'react';
import { Icon } from '@iconify/react';

export const ManagerUsersTemplate = () => {

    const users = [
    { name: 'Sophia Clark', email: 'sophia.clark@email.com', role: 'Member', status: 'Active' },
    { name: 'Ethan Carter', email: 'ethan.carter@email.com', role: 'Coordinator', status: 'Active' },
    { name: 'Olivia Bennett', email: 'olivia.bennett@email.com', role: 'Member', status: 'Inactive' },
    { name: 'Liam Foster', email: 'liam.foster@email.com', role: 'Member', status: 'Active' },
    { name: 'Ava Harper', email: 'ava.harper@email.com', role: 'Member', status: 'Active' }
    ];

    return(
        <div className="flex flex-col min-h-screen w-3/3 bg-[#F7FAFC] px-4 sm:px-6 lg:px-8 py-5">
            {/* Título de la página y subtitulo */}
            <h1 className="md:text-4xl lg:text-[40px] font-bold mb-6 md:mb-8 lg:mb-10 text-[#338826]">Manage User</h1>
            <p className="md:text-4xl lg:text-[25px] mb-6 md:mb-8 lg:mb-10 text-[#338826]">View and manage user roles within the community.</p>

            {/* Barra de búsqueda */}
            <div className="relative w-full lg:w-2/3 mb-10 md:mb-16 lg:mb-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon 
                    icon="material-symbols-light:search" 
                    className="text-[#4D8599] text-4xl md:text-5xl lg:text-[60px] h-8 w-8 md:h-10 md:w-10" 
                />
                </div>
                <input
                type="text"
                placeholder="Search communities..."
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
                                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Status</th>
                                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tr-[5px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="text-base md:text-lg lg:text-xl">
                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">{user.name}</td>
                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#5C7D8A]">{user.email}</td>

                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                                        <span className={`inline-block rounded-full px-3 py-1 text-sm md:text-base lg:text-lg ${
                                            user.role === 'Coordinator' 
                                            ? 'bg-transparent text-[#D7AD2C] border border-[#D7AD2C]' 
                                            : 'bg-transparent text-[#75BF3B] border border-[#75BF3B]' 
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                                        <span className={`inline-block rounded-full px-3 py-1 text-sm md:text-base lg:text-lg ${
                                        user.status === 'Active' 
                                            ? 'bg-[#75BF3B] text-white border border-[#75BF3B] ' 
                                            : 'bg-[#D7AD2C] text-white border border-[#D7AD2C]'
                                        }`}>
                                        {user.status}
                                        </span>
                                    </td>

                                    <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                                        <span className="text-[#4D8599] font-semibold flex items-center">
                                            Assign
                                        </span>
                                        <span className="text-[#4D8599] font-semibold flex items-center">
                                            Coordinator
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}