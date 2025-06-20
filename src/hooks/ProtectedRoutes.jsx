import { Navigate } from "react-router"
import { UserAuth } from "../context/AuthContext";

export const ProtectedRoutes =({children,accesBy})=>{
    const { user, isAuthenticated, loading } = UserAuth();
    
    console.log('ProtectedRoutes - Estado actual:', { user, isAuthenticated, loading })

    if (loading) {
        // Muestra el mismo indicador de carga que en AuthContextAdd commentMore actions
        // return <div>Cargando...</div>; // O un componente de carga consistente
    }

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
