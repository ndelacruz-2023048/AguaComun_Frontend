import React from 'react'
import { UserAuth } from '../context/AuthContext';

export const ProtectedRoutes = ({children,accesBy}) => {
    // const {user} = UserAuth(); 
    const user = 'fdfd';
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
