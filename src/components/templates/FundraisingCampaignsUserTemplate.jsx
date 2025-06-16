import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const FundraisingCampaignsTemplate = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate('/campaigns/detail', { state: { campaignId: id } })
  }

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3662/v1/aguacomun/campaign/');
        if (!response.ok) throw new Error('Error al obtener campañas');
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <p className="text-center mt-10 text-[#338826]">Cargando campañas...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="flex w-[100%] min-h-screen px-6 py-10 text-gray-800">
      <div className="max-w-6xl w-[65%] mx-auto">
        <h1 className="text-3xl font-bold mb-1 text-[#338826]">Campañas de recaudación</h1>
        <p className="text-sm mb-8 text-[#338826]">
          Explora las iniciativas de recaudación de fondos en curso y apoya a tu comunidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#fffddf] p-5 rounded shadow">
            <p className="text-sm text-gray-500">Total recaudado</p>
            <p className="text-2xl font-bold">
              ${campaigns.reduce((acc, c) => acc + (c.amountRaised || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-[#fffddf] p-5 rounded shadow">
            <p className="text-sm text-gray-500">Campañas activas</p>
            <p className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'Activa').length}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow border-[0.5px] border-[#e4e4e4]">
          <table className="min-w-full text-sm text-left">
            <thead className="text-[#589e4f]">
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
              {campaigns.map((c, i) => {
                const progress = Math.min(100, Math.round((c.amountRaised / c.goalAmount) * 100));
                return (
                  <tr key={c._id} className="border-[0.5px] border-[#e4e4e4] hover:bg-gray-50">
                    <td className="px-4 py-3 text-[#a48647]">{c.name}</td>
                    <td className="px-4 py-3 text-[#4f8096]">${c.goalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-[#4f8096]">${c.amountRaised.toLocaleString()}</td>
                    <td className="px-4 py-6 w-48">
                      <div className="h-2 w-full bg-gray-200 rounded-full flex">
                        <div
                          className="h-2 bg-[#d7ad2c] rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      {progress}%
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-[#d7ad2c] text-[#ffffff] px-4 py-2 rounded-xl text-xs font-medium flex justify-center border-[#d7ad2c] border-[1px] hover:bg-gray-50 hover:text-[#d7ad2c]">
                        {c.category}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-blue-600 hover:underline cursor-pointer"
                      onClick={() => handleClick(c._id)}
                    >
                      <div className="flex justify-center">
                        {c.status === 'Activa' ? 'Donar' : 'Ver más'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold flex justify-center ${
                          c.status === 'Activa' ? 'text-[#338826]' : 'text-[#d7ad2c]'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
