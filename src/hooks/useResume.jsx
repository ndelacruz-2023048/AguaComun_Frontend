import { useEffect, useState } from 'react'
import { getResumeRequest } from '../routers/services/Api' 
import { toast } from 'sonner'
import { useSocket } from './useSocket'

export const useResume = () => {
    const [resume, setResume] = useState({}) // ✅ Objeto vacío
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const socket = useSocket()

    const getResume = async () => {
        setLoading(true)
        const response = await getResumeRequest()
        setLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                let arrayErrors = response?.e?.response?.data?.errors
                for(const error of arrayErrors){
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar obtener los datos'
            )
        }

        setError(false)
        setResume(response?.data?.data || {})
    }

    useEffect(() => {
        getResume()

        if (socket) {
            socket.on('resumeUpdate', (newData) => {
                console.log('Evento recibido:', newData); // ✅ Para depurar
                setResume(newData)
            })
        }

        return () => {
            if (socket) socket.off('resumeUpdate')
        }
    }, [socket])

    return {
        resume,
        loading,
        error
    }
}