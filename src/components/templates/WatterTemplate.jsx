import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import ModalReport from '../modal/ReportWater/ModalReport'

export const WatterTemplate = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <div className='flex flex-col gap-2 w-full h-full ml-50 mt-10'>
                <div>
                    <h1 className='text-[#338826] text-2xl font-bold'>Report a Water Issue</h1>
                    <span className='text-[#61788A]'>
                        Help us address water problems in your community. Your reports are crucial for effective water management.
                    </span>
                </div>
                <div className='mt-8'>
                    <button onClick={() => setIsModalOpen(true)} id='OpenReport' className='bg-[#75BF3B] rounded-full px-8 py-3 text-white font-semibold hover:bg-green-700'>Create New Report</button>
                </div>
                <div className='mt-8'>
                    <h2 className='text-black font-bold text-xl'>Recent Reports</h2>
                    <div className='flex gap-2 mt-5'>
                        <div className='bg-[#F4EFB3] rounded px-2 py-2 h-11'>
                            <Icon icon="ph:waves" width="256" height="256" className='text-black w-7 h-7'/>
                        </div>
                        <div className='flex flex-col w-full '>
                            <label htmlFor="" className='text-[#D7AD2C]'>Pipe Burst</label>
                            <span className='text-[#61788A]'>2 people confirmed this issue</span>
                            <span className='text-[#61788A]'>Pipe burst near the main plaza, causing significant water loss.</span>
                        </div>
                        <div className='w-2 h-2 mt-5 bg-green-500 rounded-full'></div>
                    </div>
                </div>
            </div>
            <ModalReport isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
