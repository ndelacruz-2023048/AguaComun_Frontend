import React, { useEffect, useState }from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL
export const FundraisingCampaignsTemplate = () => {

  const handleClick = (id) => {
    navigate('/campaigns/detail', { state: { campaignId: id } })
  }

  const [campaigns, setcampaigns] = useState([])

  const getCampaigns = async() =>{
    try{
      const res = await fetch(`${API_URL}/v1/aguacomun/campaign`)
      const data = await res.json()
      setcampaigns(data)
    }catch(e){
      console.error('Error al obtener campañas', e)
    }
  }

  useEffect(()=>{
    getCampaigns()
  },[])

  const navigate = useNavigate()

  return (
    <div className="flex w-[100%] px-6 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1 text-[#338826]">Campañas de recaudación</h1>
        <p className="text-sm mb-8 text-[#338826]">
          Explora las iniciativas de recaudación de fondos en curso y apoya a tu comunidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#fffddf] p-5 rounded shadow">
            <p className="text-sm text-gray-500">Total recaudado</p>
            <p className="text-2xl font-bold">${campaigns.reduce((acc, c) => acc + (c.amountRaised || 0), 0).toLocaleString()}</p>
          </div>
          <div className="bg-[#fffddf] p-5 rounded shadow">
            <p className="text-sm text-gray-500">Campañas activas</p>
            <p className="text-2xl font-bold">{campaigns.filter(c=>c.status==='Activa').length}</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow border-[0.5px] border-[#e4e4e4]">
          <table className="min-w-full text-sm text-left">
            <thead className="text-[#589e4f]">
              <tr>
                <th className="px-4 py-3">Proyecto</th>
                <th className="px-4 py-3">Recaudado</th>
                <th className="px-4 py-3">Objetivo</th>
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
                  <td className="px-4 py-3 text-[#4f8096]">${c.amountRaised}</td>
                  <td className="px-4 py-3 text-[#4f8096]">${c.goalAmount}</td>
                  <td className="px-4 py-6 w-48">
                    <div className="h-2 w-full bg-gray-200 rounded-full flex">
                      <div
                        className="h-2 bg-[#d7ad2c] rounded-full"
                        style={{ width: `${(c.amountRaised / c.goalAmount) * 100}%`}}
                      />
                    </div>
                      {c.progress}
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
};
