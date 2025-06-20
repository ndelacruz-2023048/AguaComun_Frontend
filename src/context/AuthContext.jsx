import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Función para actualizar el usuario y el estado de autenticación
    const setAuthUser = (userData) => {
        console.log('usuario: ', userData)
        if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
        setLoading(false)
    };

    const clearAuthUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove('access_token');
        setLoading(false)
    };

    // Cargar sesión desde cookies al iniciar
       useEffect(() => {
       const token = Cookies.get('access_token');
       if (token) {
           setAuthUser (token);
       }
       setLoading(false);
   }, []);
   

    // 👇 Nueva función para forzar la actualización del contexto
    const refreshAuthContext = () => {
        const token = Cookies.get('access_token');
        if (token) {
            setUser(token);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            loading,
            setAuthUser, 
            clearAuthUser,
            refreshAuthContext // 👈 Agregamos esta función
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
