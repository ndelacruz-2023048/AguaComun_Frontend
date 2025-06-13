import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../layout/Layout"
import { LoginPage } from "../pages/LoginPage"
import { ProtectedRoutes } from "../hooks/ProtectedRoutes"
import { RegisterPage } from "../pages/RegisterPage"
import { FundraisingCampaignsPage } from "../pages/FundraisingCampaignsPage"
import { HomePage } from "../pages/HomePage"
import { CommunityPage } from "../pages/CommunityPage"
import { HistorialPage } from "../pages/HistorialTransactionsPage.jsx"
import { FundraisingCampaignsDetailPage } from "../pages/FundraisingCampaignsDetailPage.jsx"

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
                    path:'',
                    element: <HomePage/>
                },
                {
                    path: '/community',
                    element: <CommunityPage/>
                },
                {
                    path: '/campaigns',
                    element: <FundraisingCampaignsPage/>
                },
                ,
                {
                    path: '/campaigns/detail',
                    element: <FundraisingCampaignsDetailPage/>
                },
                {
                    path: '/historialEconomyFundraising',
                    element: <HistorialPage />
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