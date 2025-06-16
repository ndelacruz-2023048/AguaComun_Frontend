import { useEffect, useState } from 'react'
import { getCommunitysRequest } from '../routers/services/Api'
import { toast } from "sonner"

export const useCommunity = () => {
    const [community, setCommunity] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const getCommunity = async() => {
        setIsLoading(true)
        const response = await getCommunitysRequest()
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
        setCommunity(response?.data?.community || [])
    }

    useEffect(()=> {
        getCommunity()
    }, [])

    return {
        community,
        error,
        isLoading,
        setCommunity
    }
}