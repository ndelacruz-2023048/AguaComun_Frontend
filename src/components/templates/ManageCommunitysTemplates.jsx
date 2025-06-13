import React from 'react';
import { Icon } from '@iconify/react';

export const ManagerCommunityTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen w-6/7 bg-[#F7FAFC] px-4 sm:px-6 lg:px-8 py-5">
      {/* Título de la página */}
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 md:mb-8 lg:mb-5 text-[#338826]" >Manage Communities</h1>
      
      {/* Barra de búsqueda */}
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

      {/* Tabla de comunidades - Contenedor responsive */}
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
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="text-base md:text-lg lg:text-xl">
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#A48647]">Comunidad {['Lectura', 'Deportes', 'Arte', 'Tecnología', 'Cocina'][item-1]}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">Descripción de la comunidad</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{[150, 200, 100, 250, 180][item-1]}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB] text-[#4D8599]">{[ 'Ana García', 'Carlos López', 'Sofía Martínez', 'Javier Fernández', 'Elena Ruiz'][item-1]}</td>
                  <td className="p-3 md:p-4 border-b border-[#E5E8EB]">
                    <span className="text-[#D7AD2C] font-semibold flex items-center box-border border-1 rounded-[5px] px-3 py-1 cursor-pointer hover:bg-[#D7AD2C] hover:text-white transition-all">
                      Editar
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón Add Community - Responsive */}
      <div className="flex justify-center lg:justify-start">
        <button className="bg-[#338826] hover:bg-[#338826c7] transition-all rounded-[10px] px-4 py-2 md:px-6 md:py-3 w-full sm:w-auto mt-6 md:mt-8 lg:mt-10 lg:ml-274 flex items-center justify-center">
          <span className="text-white font-semibold flex items-center justify-center text-lg md:text-xl">
            Add Community
          </span>
        </button>
      </div>
    </div>
  )
}