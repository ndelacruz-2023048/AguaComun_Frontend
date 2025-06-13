import React from 'react'
import { UserAuth } from '../../context/AuthContext';

export const FundraisingCampaignsTemplates = () => {
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
    <div className="bg-gray-100 min-h-screen px-6 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Campañas de recaudación</h1>
        <p className="text-sm text-gray-500 mb-8">
          Explora las iniciativas de recaudación de fondos en curso y apoya a tu comunidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded shadow">
            <p className="text-sm text-gray-500">Total recaudado</p>
            <p className="text-2xl font-bold">$25,000</p>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <p className="text-sm text-gray-500">Campañas activas</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
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
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">${c.goal.toLocaleString()}</td>
                  <td className="px-4 py-3">${c.raised.toLocaleString()}</td>
                  <td className="px-4 py-3 w-48">
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">
                    {c.action}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold ${
                        c.status === 'Activo' ? 'text-green-600' : 'text-gray-500'
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
