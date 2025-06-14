import React from 'react'
import { UserAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router';

export const FundraisingCampaignsTemplate = () => {
const campaigns = [
    {
      name: 'Renovación del parque infantil',
      goal: 5000,
      raised: 3500,
      progress: 70,
      category: 'Comunidad',
      action: 'Ver más',
      status: 'Finalizado',
    },
    {
      name: 'Apoyo a familias necesitadas',
      goal: 10000,
      raised: 8000,
      progress: 80,
      category: 'Social',
      action: 'Donar',
      status: 'Activo',
    },
    {
      name: 'Equipamiento para el centro comunitario',
      goal: 7500,
      raised: 4500,
      progress: 60,
      category: 'Comunidad',
      action: 'Ver más',
      status: 'Finalizado',
    },
    {
      name: 'Becas para estudiantes locales',
      goal: 12000,
      raised: 9000,
      progress: 75,
      category: 'Educación',
      action: 'Donar',
      status: 'Activo',
    },
    {
      name: 'Mejora de la biblioteca pública',
      goal: 4000,
      raised: 4000,
      progress: 67,
      category: 'Comunidad',
      action: 'Ver más',
      status: 'Finalizado',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1 text-[#338826]">Campañas de recaudación</h1>
        <p className="text-sm mb-8 text-[#338826]">
          Explora las iniciativas de recaudación de fondos en curso y apoya a tu comunidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#fffddf] p-5 rounded shadow ">
            <p className="text-sm text-gray-500">Total recaudado</p>
            <p className="text-2xl font-bold">$25,000</p>
          </div>
          <div className="bg-[#fffddf] p-5 rounded shadow">
            <p className="text-sm text-gray-500">Campañas activas</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow border-[0.5px] border-[#e4e4e4]">
          <table className="min-w-full text-sm text-left">
            <thead className=" text-[#589e4f]">
              <tr>
                <th className="px-4 py-3">Proyecto</th>
                <th className="px-4 py-3">Objetivo</th>
                <th className="px-4 py-3">Recaudado</th>
                <th className="px-4 py-3">Progreso</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Acción</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="border-[0.5px] border-[#e4e4e4] border-x-[0px] hover:bg-gray-50">
                  <td className="px-4 py-3 text-[#a48647]">{c.name}</td>
                  <td className="px-4 py-3 text-[#4f8096]">${c.goal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#4f8096]">${c.raised.toLocaleString()}</td>
                  <td className="px-4 py-6 w-48">
                    <div className="h-2 w-full bg-gray-200 rounded-full flex">
                      <div
                        className="h-2 bg-[#d7ad2c] rounded-full"
                        style={{ width: `${c.progress}%`}}
                      />
                    </div>
                      {c.progress}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#d7ad2c] text-[#ffffff] px-4 py-2 rounded-xl text-xs font-medium flex justify-center border-[#d7ad2c] border-[1px] hover:bg-gray-50 hover:text-[#d7ad2c]">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">
                    <NavLink className='flex justify-center' to={`/campaigns/detail`}>
                      {c.action}
                    </NavLink>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold flex justify-center ${
                        c.status === 'Activo' ? 'text-[#338826]' : 'text-[#d7ad2c]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}