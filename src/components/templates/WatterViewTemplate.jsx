
import { NavLink, useParams } from 'react-router'
import { Icon } from '@iconify/react'
import { useReports } from '../../hooks/useReports'
import { SiderImage } from '../molecules/SiderImage'

export const WatterViewTemplate = () => {
    const { id } = useParams()
    const { reports: report, isLoading, error } = useReports(id)
    console.log(report);
    

    if (isLoading) return <p>Cargando reporte...</p>;
    if (error) return <p>Error al cargar el reporte</p>;
    if (!report) return <p>No se encontró el reporte</p>;


  return (
    <div className='w-full'>
        <div className='xl:mt-3 2xl:mt-6 w-full'>
            <div className='flex items-center'>
                <NavLink to={'/watter'}>
                    <Icon icon="iconamoon:arrow-left-2-light" width="24" height="24" />
                </NavLink>
                <span className='text-[#38c024] font-semibold'>Reportes / <span className='text-[#338826]'> Reporte #{'RPT-' + id.slice(0, 5)}</span></span>
            </div>
            <div className='xl:pl-9.5 2xl:pl-26'>
                <h1 className='text-4xl font-bold mt-3 2xl:mt-8 '>Reporte #{'RPT-' + id.slice(0, 5)}: {report.issueTitle}</h1>
                <div class="flex gap-4 xl:mt-4 2xl:mt-6  ">
                    <span class="bg-[#e9f2ec] text-green-800 rounded-2xl px-4 py-2">Urgencia: {report.urgencyLevel}</span>
                    <span class="bg-[#e9f2ec] text-green-800 rounded-2xl px-4 py-2">Categoria: {report.issueCategory}</span>
                </div>
                <div className='xl:mt-4 2xl:mt-6  '>
                    <h2 className='text-2xl font-bold '>Detalles del reporte</h2>
                    <div className='flex gap-10 xl:mt-1 2xl:mt-5   '>
                        <div className='flex gap-20 items-center'>
                            <label className='text-[#338826] '>Tipo de problema</label>
                            <span className='text-black'>{report.issueTitle}</span>
                        </div>
                        <div className='border-r border-green-200'/>
                        <div className='flex gap-20 items-center'>
                            <label className='text-[#338826]'>Comunidad afectada</label>
                            <span className='text-black'>{report.community?.name}</span>
                        </div>
                        <div className='border-r border-green-200'/>
                        <div className='flex gap-20 items-center'>
                            <label className='text-[#338826]'>Descripción</label>
                            <span className='text-black text-wrap w-150 '>{report.description}</span>
                        </div>
                    </div>
                    <div className="xl:mt-2 2xl:mt-8  ">
                        <label className="text-[#338826]">Imágenes</label>
                        {
                            report.reportPhoto && report.reportPhoto.length > 0 ? (
                                <SiderImage images={report.reportPhoto} />
                            ) : (
                                <span>No hay imágenes disponibles.</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
