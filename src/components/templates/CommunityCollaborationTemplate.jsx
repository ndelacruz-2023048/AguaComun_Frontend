import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { CardCommunityCollaboration } from '../organismos/CommunityCollaboration/CardCommunityCollaboration'

export const CommunityCollaborationTemplate = () => {
  return (
    <div className='w-full'>
        <div className='flex flex-col gap-2'>
            <h1 className='text-[#338826] font-bold text-3xl'>Community Collaboration</h1>
            <p className='text-[#338826] text-[16px]'>Explore and sign up for community activities</p>
        </div>
        <div>
            <div className='flex bg-[#EBF0F2] relative rounded-2xl'>
                <input type="text" placeholder='Search activities' className='p-[10px_40px] w-full focus:outline-none '/>
                <Icon icon="circum:search" className='absolute top-[20%] left-[1%] text-[#5C7D8A] text-2xl'/>
            </div>
        </div>
        <div>
            <h2>Upcoming Activities</h2>
            <CardCommunityCollaboration/>
        </div>
    </div>
  )
}
