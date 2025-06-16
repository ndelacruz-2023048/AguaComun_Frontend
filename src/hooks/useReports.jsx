import {useState, useEffect} from 'react'
import { getReportsRequest } from '../routers/services/Api'
import { toast } from 'sonner'

export const useReports = () => {
    const [reports, setReports] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const getReports = async() => {
        setIsLoading(true)
        const response = await getReportsRequest()
        setIsLoading(false)

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
        setReports(response?.data?.reports || [])
    }

    useEffect(() => {
        getReports()
    }, [])

    return {
        isLoading,
        error,
        setReports,
        reports
    }
}