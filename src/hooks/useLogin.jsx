import { useState } from "react"
import { loginRequest } from "../routers/services/Api"
import { UserAuth } from "../context/AuthContext"
import { toast } from "sonner"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom" 

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const { setAuthUser } = UserAuth()
    const navigate = useNavigate() 

    const login = async(data) => {
        setIsLoading(true)
        const user = {
            userLogin: data?.userLogin,
            password: data?.password
        }
        const response = await loginRequest(user)
        setIsLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                let arrayErrors = response?.e?.response?.data?.errors
                for(const error of arrayErrors) {
                    toast.error(error.message)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar iniciar seción. Usuario/Correo o contraseña invalidos'
            )
        }
        setError(false)
        const token = Cookies.get('access_token')
        setAuthUser(token)
        const userName = response.data.loggedUser.name
        toast.success(`Bienvenido ${userName}`)
        navigate('/')

    }
    return {
        login,
        isLoading,
        error,
        setError
    }
}
