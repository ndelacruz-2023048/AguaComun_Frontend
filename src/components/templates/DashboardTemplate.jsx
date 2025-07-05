import React from 'react'
import banner from '../../assets/banner.webp'
import { Overview } from '../organismos/CommunityCollaboration/Dashboard/Overview'

import { Graphic } from '../organismos/CommunityCollaboration/Dashboard/Graphic'
import { NewUsers } from '../organismos/CommunityCollaboration/Dashboard/NewUsers'
import { NewCommunities } from '../organismos/CommunityCollaboration/Dashboard/NewCommunities'
export const DashboardTemplate = () => {
  return (
    <div className='flex flex-col flex-grow h-screen p-4'>
        <div className='w-full h-[25%] flex justify-end items-center bg-[#b4ecfce9] relative'>
            <img src={banner} alt="banner" className='w-[65%] h-[100%] object-cover object-[50%_54%]' />
            <div className='flex flex-col h-100% absolute top-[30%] left-[2%]  w-[50%]'>
                <p className='text-[#00873c] text-[60px] font-bold '>AguaComun</p>
                <button className='bg-[#00873c] text-white px-4 py-2 rounded-md w-[20%]'>
                <p className='text-white text-[16px] font-bold '>Bienvenido</p>
                </button>
            </div>
        </div>
        <div className='flex h-[75%] gap-5'>
          <div className='flex flex-col gap-4 w-[50%] h-[100%]'>
            <Overview />
            <NewUsers />
          </div>
          <div className='flex flex-col gap-4 w-[50%] h-[100%]'>
            <NewCommunities />
            <Graphic />
          </div>
        </div>
    </div>
  )
}
