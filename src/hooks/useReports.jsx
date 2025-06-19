import {useState, useEffect} from 'react'
import { getReportByIdRequest, getReportsRequest } from '../routers/services/Api'
import { toast } from 'sonner'

export const useReports = (id) => {
    const [reports, setReports] = useState(id ? null : [])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getReports = async() => {
        setIsLoading(true);
        setError(null);
        try {
            let response;
            if (id) {
                response = await getReportByIdRequest(id);
                setReports(response?.data?.report || null);
            } else {
                response = await getReportsRequest();
                setReports(response?.data?.reports || []);
            }
        } catch (err) {
            setError(err);
            const errorMessage =
                err?.response?.data?.msg ||
                err?.data?.msg ||
                'Error al obtener los datos';

            if (err?.response?.data?.errors?.length > 0) {
                err.response.data.errors.forEach((error) =>
                    toast.error(error.msg)
                );
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    }

    

    useEffect(() => {
        getReports()
    }, [id])

    return {
        isLoading,
        error,
        setReports,
        reports
    }
}