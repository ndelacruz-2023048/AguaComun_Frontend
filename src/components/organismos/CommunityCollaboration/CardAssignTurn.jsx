import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

export const CardAssignTurn = () => {
  return (
    <div className='flex gap-5 w-full items-center'>
        <div className='flex items-center justify-center rounded-2xl w-[10%] bg-[#E8F0F2] h-[100%]'>
            <Icon icon="mdi:calendar-month" className='text-2xl'/>
        </div>
        <div className='flex flex-col gap-1 w-[70%]'>
            <p className=' font-semibold text-xl '>Distribute water</p>
            <span className=' text-sm text-[#5C7D8A]'>Sabado 14 de Junio 10:00 AM-12:00 PM</span>
        </div>
        <div className='flex items-center justify-center rounded-2xl w-[10%] bg-[#E8F0F2] h-[75%]'>
            <button className='text-md text-[#000000] font-bold'>Assign</button>
        </div>
    </div>
  )
}
