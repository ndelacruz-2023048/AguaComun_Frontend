import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../layout/Layout"
import { LoginPage } from "../pages/LoginPage"
import { ProtectedRoutes } from "../hooks/ProtectedRoutes"
import { RegisterPage } from "../pages/RegisterPage"
import { FundraisingCampaignsPage } from "../pages/FundraisingCampaignsPage"
import { HomePage } from "../pages/HomePage"
import { CommunityPage } from "../pages/CommunityPage"
import { CreateCampaignPage } from "../pages/CreateCampaignPage"
import { EditCampaignPage } from "../pages/EditCampaignPage"
import { DeleteCampaignPage } from "../pages/DeleteCampaignPage"
import { CommunityCollaborationPage } from "../pages/CommunityCollaborationPage"
import { ManageCommunityPage as C } from "../pages/ManageCommunitiesPage"
import { ManagerUsersPage as M } from "../pages/ManagerUsersPage"

import {CashPayment} from "../components/templates/CashPayment"
import { WatterPage } from "../pages/WatterPage"
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
                    path: '/watter',
                    element: <WatterPage/>
                },
                {
                    path: '/community/manager',
                    element: <C/>
                },
                {
                    path: '/community/manager/users',
                    element: <M/>
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
                },
                {
                    path: '/community-collaboration',
                    element: <CommunityCollaborationPage/>
                },
                {
                    path: '/cashpayment',
                    element: <CashPayment/>
                },
                {
                    path: '/campaigns/new',
                    element: <CreateCampaignPage />
                },
                {
                    path: '/campaigns/edit/:id',
                    element: <EditCampaignPage />
                },
                {
                    path: '/campaigns/delete/:id',
                    element: <DeleteCampaignPage />
                },
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