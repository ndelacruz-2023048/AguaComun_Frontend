import React from 'react'
import { UserAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';

export const ProtectedRoutes = ({children,accesBy}) => {
    // const {user} = UserAuth(); 
    const user = '';
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
