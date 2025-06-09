import React from 'react'

export const ProtectedRoutesx = ({children,accesBy}) => {
    const { user, loading } = UserAuth(); // Obtén 'loading' del contexto

    if (loading) {
        // Muestra el mismo indicador de carga que en AuthContext
        // return <div>Cargando...</div>; // O un componente de carga consistente
    }

    if (accesBy === "non-authenticated") {
        if (!user) {
            return children;
        } else {
            return <Navigate to="/" />;
        }
    } else if (accesBy === "authenticated") {
        if (user) {
            return children;
        }
    }
    return <Navigate to="/login"/>
}
