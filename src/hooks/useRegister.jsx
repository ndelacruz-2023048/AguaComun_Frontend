import React, { useState } from 'react';
import { registerRequest } from '../routers/services/Api';
import { toast } from 'sonner';
import { useSocket } from './useSocket';

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Cambiamos a null para tener mejor control
    const socket = useSocket()
    const register = async (data) => {
        setIsLoading(true);
        setError(null);

        const user = {
        name: data?.name || '',
        surname: data?.surname || '',
        username: data?.username || '',
        address: {
            zone: data?.zone || '',
            municipality: data?.municipality || '',
            department: data?.department || ''
        },
        mobilePhone: data?.mobilePhone || '',
        country: data?.countryCode || 'GT',
        email: data?.email || '',
        password: data?.password || ''
        };

        try {
        const response = await registerRequest(user);
        setIsLoading(false);

        if (response?.error) {
            const backendErrors = response.e?.response?.data?.errors;
            const backendMessage = response.e?.response?.data?.msg;

            if (backendErrors && Array.isArray(backendErrors)) {
            backendErrors.forEach(err => toast.error(err.msg));
            } else if (backendMessage) {
            toast.error(backendMessage);
            } else {
            toast.error('Error desconocido al intentar registrarte');
            }

            setError(backendMessage || 'Error al registrar');
            return false; // ❗ Importante: retorna false si falla
        }

        toast.success(`${user.name}, ¡Has sido registrado exitosamente!`);
        socket.emit("new-user",user)
        return true; // ✅ Retorna true si todo fue correcto

        } catch (e) {
        setIsLoading(false);
        setError('Hubo un problema al conectar con el servidor');
        toast.error('Hubo un error al procesar tu solicitud');
        console.error(e);
        return false; // ❌ Error general
        }
    };

    return {
        register,
        isLoading,
        error,
        setError
    };
};