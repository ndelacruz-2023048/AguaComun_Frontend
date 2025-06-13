import React from 'react'
import { Icon } from '@iconify/react';

export const ManagerCommunityTemplate = () => {
  return (
    <div className="flex flex-col  h-screen  w-3/3 bg-[#F7FAFC]" >
      <div className="flex-grow p-5 ">
        
        {/* Título de la página */}
        <h1 className="text-[50px] font-bold mb-10">Manage Communities</h1>
        
        {/* Barra de búsqueda */}
        <div className="relative w-2/3 mb-20">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon 
              icon="material-symbols-light:search" 
              className="text-[#4D8599] text-[60px] h-10 w-10" 
            />
          </div>
          <input
            type="text"
            placeholder="Search communities..."
            className=" border-[#4D8599] bg-[#E8F0F2] rounded-[5px] p-2 pl-15 w-full h-15 text-2xl text-[#4D8599] focus:outline-none focus:ring-2 focus:ring-[#4D8599] transition-all"
          />
        </div>

        {/* Tabla de comunidades */}
        <div className="overflow-x-auto box-border border-[#CFE0E8] bg-transparent rounded-[10px] border-2 border-solid shadow-lg">
          <table className="min-w-full  bg-transparent">
            <thead>
              <tr className=" text-balck text-2xl">
                <th className="p-4 border-b border-[#E5E8EB] text-left rounded-tl-[5px]">Nombre</th>
                <th className="p-4 border-b border-[#E5E8EB] text-left">Descripción</th>
                <th className="p-4 border-b border-[#E5E8EB] text-left">Miembros</th>
                <th className="p-4 border-b border-[#E5E8EB] text-left">Coordinador</th>
                <th className="p-4 border-b border-[#E5E8EB] text-left rounded-tr-[5px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Fila 1 */}
              <tr className="text-xl">
                <td className="p-4 border-b border-[#E5E8EB]">Comunidad de Lectura</td>
                <td className="p-4 border-b border-[#E5E8EB]">Un grupo para amantes de la lectura</td>
                <td className="p-4 border-b border-[#E5E8EB]">150</td>
                <td className="p-4 border-b border-[#E5E8EB]">Ana García</td>
                <td className="p-4 border-b border-[#E5E8EB]">
                  <span className="text-[#4D8599] font-semibold flex items-center">
                    <Icon icon="material-symbols-light:edit" className="mr-2 text-[28px]"/>
                    Editar
                  </span>
                </td>
              </tr>
              
              {/* Fila 2 */}
              <tr className="text-xl">
                <td className="p-4 border-b border-[#E5E8EB]">Comunidad de Deportes</td>
                <td className="p-4 border-b border-[#E5E8EB]">Para los entusiastas del deporte</td>
                <td className="p-4 border-b border-[#E5E8EB]">200</td>
                <td className="p-4 border-b border-[#E5E8EB]">Carlos López</td>
                <td className="p-4 border-b border-[#E5E8EB]">
                  <span className="text-[#4D8599] font-semibold flex items-center">
                    <Icon icon="material-symbols-light:edit" className="mr-2 text-[28px]"/>
                    Editar
                  </span>
                </td>
              </tr>
              
              {/* Fila 3 */}
              <tr className="text-xl">
                <td className="p-4 border-b border-[#E5E8EB]">Comunidad de Arte</td>
                <td className="p-4 border-b border-[#E5E8EB]">Un espacio para artistas y creativos</td>
                <td className="p-4 border-b border-[#E5E8EB]">100</td>
                <td className="p-4 border-b border-[#E5E8EB]">Sofía Martínez</td>
                <td className="p-4 border-b border-[#E5E8EB]">
                  <span className="text-[#4D8599] font-semibold flex items-center">
                    <Icon icon="material-symbols-light:edit" className="mr-2 text-[28px]"/>
                    Editar
                  </span>
                </td>
              </tr>
              
              {/* Fila 4 */}
              <tr className="text-xl">
                <td className="p-4 border-b border-[#E5E8EB]">Comunidad de Tecnología</td>
                <td className="p-4 border-b border-[#E5E8EB]">Para discutir sobre tecnología y gadgets</td>
                <td className="p-4 border-b border-[#E5E8EB]">250</td>
                <td className="p-4 border-b border-[#E5E8EB]">Javier Fernández</td>
                <td className="p-4 border-b border-[#E5E8EB]">
                  <span className="text-[#4D8599] font-semibold flex items-center">
                    <Icon icon="material-symbols-light:edit" className="mr-2 text-[28px]"/>
                    Editar
                  </span>
                </td>
              </tr>
              
              {/* Fila 5 */}
              <tr className="text-xl">
                <td className="p-4 border-b border-[#E5E8EB]">Comunidad de Cocina</td>
                <td className="p-4 border-b border-[#E5E8EB]">Compartiendo recetas y consejos de cocina</td>
                <td className="p-4 border-b border-[#E5E8EB]">180</td>
                <td className="p-4 border-b border-[#E5E8EB]">Elena Ruiz</td>
                <td className="p-4 border-b border-[#E5E8EB]">
                  <span className="text-[#4D8599] font-semibold flex items-center">
                    <Icon icon="material-symbols-light:edit" className="mr-2 text-[28px]"/>
                    Editar
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="bg-[#12B0EB] hover:bg-[#12b1ebda] transition-all rounded-[10px] p-3 w-1/9 ml-374 mt-10 flex items-center justify-center">
          <span className="text-black font-semibold flex items-center justify-center text-[20px]">
            Add Community
          </span>
        </button>
      </div>
    </div>
  )
}
