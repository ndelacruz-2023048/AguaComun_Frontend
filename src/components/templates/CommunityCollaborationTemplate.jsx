import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { CardCommunityCollaboration } from '../organismos/CommunityCollaboration/CardCommunityCollaboration'

export const CommunityCollaborationTemplate = () => {
  return (
    <div className='flex justify-center w-full'>
        <div className='flex flex-col gap-5 w-[95%]'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-[#338826] font-bold text-3xl'>Community Collaboration</h1>
                    <p className='text-[#338826] text-[16px]'>Explore and sign up for community activities</p>
                </div>
                <div>
                    <button className='bg-[#D7AD2C] text-white p-[5px_25px] rounded-2xl'>Crear Actividad</button>
                </div>
            </div>
            <div>
                <div className='flex bg-[#EBF0F2] relative rounded-2xl'>
                    <input type="text" placeholder='Search activities' className='p-[10px_40px] w-full focus:outline-none '/>
                    <Icon icon="circum:search" className='absolute top-[20%] left-[1%] text-[#5C7D8A] text-2xl'/>
                </div>
            </div>
            <div className='flex gap-2'>
                <button className='flex items-center justify-center gap-2 border-1 border-[#D7AD2C] rounded-2xl p-[3px_20px]'> <p className='text-[#D7AD2C]'>Type</p> <Icon icon="simple-line-icons:arrow-down" className='text-[10px] text-[#D7AD2C]'/></button>
                <button className='flex items-center justify-center gap-2 border-1 border-[#D7AD2C] rounded-2xl p-[3px_20px]'> <p className='text-[#D7AD2C]'>Date</p> <Icon icon="simple-line-icons:arrow-down" className='text-[10px] text-[#D7AD2C]'/></button>
                <button className='flex items-center justify-center gap-2 border-1 border-[#D7AD2C] rounded-2xl p-[3px_20px]'> <p className='text-[#D7AD2C]'>Status</p> <Icon icon="simple-line-icons:arrow-down" className='text-[10px] text-[#D7AD2C]'/></button>
            </div>
            <div className='flex flex-col gap-5 '>
                <h2 className='text-[#D7AD2C] font-bold text-xl'>Upcoming Activities</h2>
                <CardCommunityCollaboration/>
                <CardCommunityCollaboration/>
                <CardCommunityCollaboration/>
            </div>
        </div>

    </div>
  )
}
