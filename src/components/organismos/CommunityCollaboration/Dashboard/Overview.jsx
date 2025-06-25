import React from 'react'
import alerts from '../../../../assets/alerts.webp'
import collaboration from '../../../../assets/collaboration.webp'
import community from '../../../../assets/community.webp'
import fundraising from '../../../../assets/fundraising.webp'

export const Overview = () => {
  return (
    <div className="flex flex-col items-center justify-evenly h-[50%] w-[100%] flex-grow">
      {/* Authority Score */}
      <div className='flex flex-row h-[47%] justify-evenly'>
        <div className="bg-orange-100 rounded-xl flex justify-between items-center shadow-md w-[47%] ">
            <div>
            <div className="text-sm text-gray-700 font-semibold">Authority Score</div>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-bold text-orange-600">29</span>
                <span className="text-xs bg-white text-red-500 rounded px-2 py-0.5">-2.4%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Orelly SEO Rank <span className="text-orange-600 font-semibold">+18.2%</span></div>
            </div>
            <img src={alerts} alt="Authority Score" className="w-[30%] h-[80%] object-contain ml-4" />
        </div>

        {/* Organic Traffic */}
        <div className="bg-blue-100 rounded-xl flex justify-between items-center shadow-md w-[47%] ">
            <div>
            <div className="text-sm text-gray-700 font-semibold">Organic Traffic</div>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-bold text-blue-600">13M</span>
                <span className="text-xs bg-white text-red-500 rounded px-2 py-0.5">-2.4%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Keywords 1.8K</div>
            </div>
            <img src={collaboration} alt="Organic Traffic" className="w-[30%] h-[80%] object-contain ml-4" />
        </div>
      </div>
        <div className='flex flex-row h-[47%] justify-evenly'>
            <div className="bg-green-100 rounded-xl flex justify-between items-center shadow-md  w-[47%]  ">
                <div>
                <div className="text-sm text-gray-700 font-semibold">Paid Search</div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-bold text-green-600">392K</span>
                    <span className="text-xs bg-white text-green-600 rounded px-2 py-0.5">+10.4%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Keywords 1.8K</div>
                </div>
                <img src={community} alt="Paid Search" className="w-[30%] h-[80%] object-contain ml-4" />
            </div>

            {/* Backlinks */}
            <div className="bg-gray-100 rounded-xl flex justify-between items-center shadow-md  w-[47%]  ">
                <div>
                <div className="text-sm text-gray-700 font-semibold">Backlinks</div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-bold text-gray-700">12M</span>
                    <span className="text-xs bg-white text-green-600 rounded px-2 py-0.5">+2.4%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Domains 129.3K</div>
                </div>
                <img src={fundraising} alt="Backlinks" className="w-[30%] h-[80%] object-contain ml-4" />
            </div>
        </div>
      {/* Paid Search */}
    </div>
  )
}
