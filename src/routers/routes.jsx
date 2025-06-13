import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../layout/Layout"
import { LoginPage } from "../pages/LoginPage"
import { ProtectedRoutes } from "../hooks/ProtectedRoutes"
import { RegisterPage } from "../pages/RegisterPage"

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <ProtectedRoutes accesBy="authenticated">
                <Layout />
            </ProtectedRoutes> ,
            errorElement: <div>Error</div>,
            children: [
                {
                    index: true,
                    element: <div>Home</div>,
                    errorElement: <div>Error</div>
                },
                {
                    path: '/ejemplo',
                    element: <div>Ejemplo</div>
                }
            ]
        },
        {
            path: '/login',
            element:
            <ProtectedRoutes accesBy="non-authenticated">
                <LoginPage/>
            </ProtectedRoutes>
        },
        {
            path: '/register',
            element:
            <ProtectedRoutes accesBy="non-authenticated">
                <RegisterPage/>
            </ProtectedRoutes>
        },
        
    ]
)

const MyRouter = ()=> <RouterProvider router={router}/>
export default MyRouter