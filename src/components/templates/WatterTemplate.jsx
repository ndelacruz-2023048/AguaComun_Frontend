import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import ModalReport from '../modal/ReportWater/ModalReport'
import { useSocket } from '../../hooks/useSocket'
import { useReports } from '../../hooks/useReports'
import { toast } from 'sonner'

export const WatterTemplate = () => {
    const { reports: initReports, isLoading, error } = useReports()
    const [isReport, setIsReport] = useState([])
    const socket = useSocket()
    useEffect(() => {
        if (initReports && initReports.length > 0) {
        setIsReport(initReports); // ✅ Aquí sincronizas el estado local
        }
    }, [initReports]);
    useEffect(()=>{
        if(!socket) return;

        socket.on("watterReport", (watterReport) => {
            setIsReport((prev) => [...prev, watterReport])
            toast.success(`!Nuevo reporte: ${watterReport.issueTitle}`, {
                position: 'top-right'
            })
        });
        return () => {
            socket.off("watterReport");
        }
    },[socket])
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col gap-2 w-full h-full ml-50 mt-10 '>
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
                    <div className='overflow-y-auto h-90'>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : isReport.length === 0 ? (
                            <span>No hay reportes</span>
                        ) : error ? (
                            <span>Error al cargar los reportes</span>
                        ) : (
                            isReport.map(report => (
                                <div className='flex gap-2 mt-5' key={report._id}>
                                    <div className='bg-[#F4EFB3] rounded px-2 py-2 h-11'>
                                        <Icon icon="ph:waves" width="256" height="256" className='text-black w-7 h-7'/>
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <label htmlFor="" className='text-[#D7AD2C]'>{report.issueTitle}</label>
                                        <span className='text-[#61788A]'>{report.description}</span>
                                        <span className='text-[#61788A]'>{[report.reportedBy?.name, report.reportedBy?.surname]}</span>
                                    </div>
                                    <div className='w-2 h-2 mt-5 bg-green-500 rounded-full'></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <ModalReport isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
