import React, { useEffect, useState } from 'react'
import alerts from '../../../../assets/alerts.webp'
import collaboration from '../../../../assets/collaboration.webp'
import community from '../../../../assets/community.webp'
import fundraising from '../../../../assets/fundraising.webp'
import { getReportsRequest, getAllCollaborationsRequest } from '../../../../routers/services/Api.jsx'
import { useSocket } from '../../../../hooks/useSocket'

export const Overview = () => {
  const [reportCount, setReportCount] = useState(0)
const [activityCount, setActivityCount] = useState(0)
const socket = useSocket()

useEffect(() => {
  const fetchReports = async () => {
    const res = await getReportsRequest()
    if (!res.error) {
      setReportCount(res.data.reports.length)
    }
  }

  const fetchActivities = async () => {
    const res = await getAllCollaborationsRequest()
    if (!res.error) {
      setActivityCount(res.data.collaborations.length)
    }
  }

  fetchReports()
  fetchActivities()

  socket.on('report-count', (count) => {
    setReportCount(count)
  })

  socket.on('activity-count', (count) => {
    setActivityCount(count)
  })

  return () => {
    socket.off('report-count')
    socket.off('activity-count')
  }
}, [socket])

  return (
    <div className="flex flex-col items-center justify-evenly h-[50%] w-[100%] flex-grow">
      <p className='text-2xl font-bold justify-evenly w-[95%]'>Resumen de datos</p>

      {/* Authority Score */}
      <div className='flex flex-row h-[40%] justify-evenly w-[100%]'>
        <div className="bg-orange-100 rounded-xl flex justify-around items-center shadow-md w-[47%] ">
          <div>
            <div className="text-sm text-gray-700 font-semibold">Reportes de agua</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold text-orange-600">{reportCount}</span>
              <span className="text-xs bg-white text-green-600 rounded px-2 py-0.5">+1</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Actualizado en tiempo real</div>
          </div>
          <img src={alerts} alt="Authority Score" className="w-[30%] h-[80%] object-contain ml-4" />
        </div>

        {/* Organic Traffic */}
        <div className="bg-blue-100 rounded-xl flex justify-around items-center shadow-md w-[47%] ">
          <div>
            <div className="text-sm text-gray-700 font-semibold">Actividades de las comunidades</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold text-blue-600">{activityCount}</span>
              <span className="text-xs bg-white text-green-600 rounded px-2 py-0.5">+1</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Actualizado en tiempo real</div>
          </div>
          <img src={collaboration} alt="Organic Traffic" className="w-[30%] h-[80%] object-contain ml-4" />
        </div>
      </div>

      <div className='flex flex-row h-[40%] justify-evenly w-[100%]'>
        <div className="bg-green-100 rounded-xl flex justify-around items-center shadow-md  w-[47%]  ">
          <div>
            <div className="text-sm text-gray-700 font-semibold">Comunidades</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold text-green-600">392K</span>
              <span className="text-xs bg-white text-green-600 rounded px-2 py-0.5">+10.4%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Keywords 1.8K</div>
          </div>
          <img src={community} alt="Paid Search" className="w-[30%] h-[80%] object-contain ml-4" />
        </div>

        {/* Backlinks */}
        <div className="bg-gray-100 rounded-xl flex justify-around items-center shadow-md  w-[47%]  ">
          <div>
            <div className="text-sm text-gray-700 font-semibold">Recaudaciones</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold text-gray-700">12M</span>
              <span className="text-xs bg-white text-green-600 rounded px-2 py-0.5">+2.4%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Domains 129.3K</div>
          </div>
          <img src={fundraising} alt="Backlinks" className="w-[30%] h-[80%] object-contain ml-4" />
        </div>
      </div>
    </div>
  )
}
