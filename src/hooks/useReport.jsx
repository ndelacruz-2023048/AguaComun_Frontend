import { useState } from "react"
import { newReportRequest } from '../routers/services/Api'
import { toast } from 'sonner'

export const useReport = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const createReport = async (data, socket) => {
        setIsLoading(true)
        setError(null)

        const report = {
            issueTitle: data?.issueTitle || '',
            issueCategory: data?.issueCategory || '',
            description: data?.description || '',
            reportPhoto: data?.uploadPhoto,
            urgencyLevel: data?.urgencyLevel,
            solutions: data?.solutions || '',
            community: data?.community,
        }

        try {
            const response = await newReportRequest(report)
            setIsLoading(false)

            if (response?.error) {
                const backendErrors = response.e?.response?.data?.errors
                const backendMessage = response.e?.response?.data?.msg

                if (backendErrors && Array.isArray(backendErrors)) {
                    backendErrors.forEach(err => toast.error(err.msg))
                } else if (backendMessage) {
                    toast.error(backendMessage)
                } else {
                    toast.error('Error desconocido al intentar crear el reporte')
                }

                setError(backendMessage || 'Error al crear el reporte')
                return false
            }

            toast.success('Reporte creado exitosamente')
            if(socket) {
                socket.emit('watterReport', report)
            }
            return true

        } catch (e) {
            setIsLoading(false)
            setError('Hubo un problema al conectar con el servidor')
            toast.error('Hubo un error al procesar tu solicitud')
            console.error(e)
            return false
        }
    }

    return { 
        isLoading, 
        error, 
        setError,
        createReport 
    }
}