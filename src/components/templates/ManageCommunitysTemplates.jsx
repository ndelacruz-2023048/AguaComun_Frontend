import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router';
import useManagerCommunityStore from '../../hooks/useManagerCommunity';
import { useCommunitySocketListener } from '../../hooks/useManagerCommunity';

export const ManagerCommunityTemplate = () => {
  useCommunitySocketListener();
  const { communities, fetchCommunities, setSelectedCommunity,  } = useManagerCommunityStore();

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const handleViewClick = (communityId) => {
    const community = communities.find(c => c._id === communityId);
    setSelectedCommunity(community);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto bg-[#F7FAFC] px-2 sm:px-4 md:px-6 lg:px-8 py-5 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-5 text-[#338826] text-center md:text-left">Gestionar comunidades</h1>
      <div className="relative w-full max-w-full md:max-w-3xl lg:max-w-5xl mx-auto mb-6 md:mb-8 lg:mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon
            icon="material-symbols-light:search"
            className="text-[#4D8599] text-2xl sm:text-3xl md:text-4xl lg:text-[60px] h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
        </div>
        <input
          type="text"
          placeholder="Search communities..."
          className="border-[#4D8599] bg-[#E8F0F2] rounded-[5px] p-2 pl-10 sm:pl-12 md:pl-14 lg:pl-16 w-full h-10 sm:h-12 md:h-14 text-base sm:text-lg md:text-xl lg:text-2xl text-[#4D8599] focus:outline-none focus:ring-2 focus:ring-[#4D8599] transition-all"
        />
      </div>
      <div className="overflow-x-auto w-full max-w-full md:max-w-3xl lg:max-w-5xl mx-auto">
        <div className="box-border border-[#CFE0E8] bg-white rounded-[10px] border-2 border-solid shadow-lg min-w-[320px]">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr className="text-black text-base sm:text-lg md:text-xl lg:text-2xl">
                <th className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tl-[5px]">Nombre</th>
                <th className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Descripción</th>
                <th className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Miembros</th>
                <th className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Coordinador</th>
                <th className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tr-[5px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {communities.map((community, idx) => (
                <tr key={community._id || idx} className="text-sm sm:text-base md:text-lg lg:text-xl">
                  <td className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#A48647]">{community.name}</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{community.description}</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{community.members?.length || 0}</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{community.coordinator || '-'}</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b border-[#E5E8EB]">
                    <NavLink
                      to="/community/manager/users"
                      className="text-[#D7AD2C] font-semibold flex items-center box-border justify-center border-1 rounded-[5px] px-2 sm:px-3 py-1 cursor-pointer hover:bg-[#D7AD2C] hover:text-white transition-all text-xs sm:text-sm md:text-base"
                      onClick={() => handleViewClick(community._id)}
                    >
                      View
                    </NavLink>
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