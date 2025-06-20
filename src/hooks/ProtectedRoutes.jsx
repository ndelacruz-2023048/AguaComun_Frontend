import { Navigate } from "react-router"
import { UserAuth } from "../context/AuthContext";

export const ProtectedRoutes =({children,accesBy})=>{
    const { user, isAuthenticated, loading } = UserAuth();
    
    console.log('ProtectedRoutes - Estado actual:', { user, isAuthenticated, loading })

    /*if (loading) {
        return <div>Cargando...</div>; // Muestra algo mientras se valida
    }*/

    if (accesBy === "non-authenticated") {
        if (!isAuthenticated) {
            return children;
        } else {
            return <Navigate to="/" />;
        }
    } else if (accesBy === "authenticated") {
        if (isAuthenticated) {
            return children;
        }
    }
    return <Navigate to="/login"/>
}
