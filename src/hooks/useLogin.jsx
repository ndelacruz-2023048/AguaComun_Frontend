import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { loginRequest } from '../routers/services/Api'; 
import Cookies from 'js-cookie';
import {toast} from 'sonner'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { setAuthUser, refreshAuthContext } = UserAuth(); // 👈 Usa refreshAuthContext
    const navigate = useNavigate();

    const login = async (data) => {
        setIsLoading(true);
        const user = {
            userLogin: data?.userLogin,
            password: data?.password
        };
        const response = await loginRequest(user);
        setIsLoading(false);

        if (response.error) {
            setError(true);
            if (response?.e?.response?.data?.errors) {
                let arrayErrors = response.e.response.data.errors;
                for (const error of arrayErrors) {
                    toast.error(error.message);
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar iniciar sesión. Usuario/Correo o contraseña inválidos'
            );
        }

        setError(false);
        const token = Cookies.get('access_token');
        setAuthUser(token); // Actualiza el contexto
        const userName = response.data.loggedUser.name;
        toast.success(`Bienvenido ${userName}`);

        // 👇 Llama refreshAuthContext() para forzar la actualización
        refreshAuthContext();
        console.log('Estado del contexto tras login:', UserAuth())
        // Redirige al usuario a la página principal
        navigate('/');
    };

    return {
        login,
        isLoading,
        error,
        setError
    };
};
