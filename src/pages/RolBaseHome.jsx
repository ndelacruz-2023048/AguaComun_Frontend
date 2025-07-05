import { jwtDecode } from "jwt-decode";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { HomePage } from "./HomePage"
import { DashboardPage } from "./DashboardPage";


export const RolBaseHome = () => {
    const { user } = UserAuth();
    let userDecoded = null
    let rol = ''
        if(user) {
            try {
                userDecoded = jwtDecode(user)
                rol = userDecoded.type || null
            } catch (e) {
                console.error('Error al obtener el rol del usuario:', e)
            }
        }
    console.log('Rol del usuario:', rol) // ✅ Para depurar
    if (rol === 'ADMIN') {
        return <DashboardPage />
    } else if (rol === 'CLIENT' || rol === 'COORDINADOR') {
        return <HomePage />;
    }
}