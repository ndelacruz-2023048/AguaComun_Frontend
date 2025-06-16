import React from 'react'
import { CardAssignTurn } from '../organismos/CommunityCollaboration/CardAssignTurn'

export const AsignTurnTemplate = () => {
  return (
    <div className='flex justify-center  w-full'>
        <div className='flex flex-col gap-5 w-[80%]'>
            <h2 className='text-[#338826] font-bold text-4xl'>Asign Turn</h2>
            <p className='text-[#000000] text-xl font-bold'>Available turns</p>
            <div className='flex flex-col gap-5 w-full'>
                <CardAssignTurn/>
            </div>
        </div>
    </div>
  )
}
