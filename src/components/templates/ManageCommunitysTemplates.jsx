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
    <div className="flex flex-col w-6/7 bg-[#F7FAFC] px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 md:mb-8 lg:mb-5 text-[#338826]">Manage Communities</h1>
      <div className="relative w-full lg:w-2/3 mb-10 md:mb-8 lg:mb-8">
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
      <div className="overflow-x-auto w-full mb-[-20px]">
        <div className="box-border border-[#CFE0E8] bg-transparent rounded-[10px] border-2 border-solid shadow-lg min-w-max">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr className="text-black text-xl md:text-2xl">
                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tl-[5px]">Nombre</th>
                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Descripción</th>
                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Miembros</th>
                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left">Coordinador</th>
                <th className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#338826] text-left rounded-tr-[5px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {communities.map((community, idx) => (
                <tr key={community._id || idx} className="text-base md:text-lg lg:text-xl">
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#A48647]">{community.name}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{community.description}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{community.members?.length || 0}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{community.coordinator || '-'}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                    <NavLink
                      to="/community/manager/users"
                      className="text-[#D7AD2C] font-semibold flex items-center box-border justify-center border-1 rounded-[5px] px-3 py-1 cursor-pointer hover:bg-[#D7AD2C] hover:text-white transition-all"
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