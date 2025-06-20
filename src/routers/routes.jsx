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
import { ProfilePage } from "../pages/ProfilePage"
import {CashPayment} from "../components/templates/CashPayment"
import { WatterPage } from "../pages/WatterPage"
import { HistorialPage } from "../pages/HistorialTransactionsPage.jsx"
import { FundraisingCampaignsDetailPage } from "../pages/FundraisingCampaignsDetailPage.jsx"
import { FundraisingCampaignsUserPage } from "../pages/FundraisingCampaignsUserPage.jsx"
import { AsignTurnPage } from "../pages/AsignTurnPage.jsx"
import { CommunityCollaborationDashboardPage } from "../pages/CommunityCollaborationDashboardPage.jsx"
import { WatterReportViewPage } from "../pages/WatterReportViewPage.jsx"

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <ProtectedRoutes accesBy="non-authenticated">
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
                    path: '/watter/:id',
                    element: <WatterReportViewPage/>
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
                    path: '/community-collaboration/assign-turn',
                    element: <AsignTurnPage/>
                },
                {
                    path: '/community-collaboration/dashboard',
                    element: <CommunityCollaborationDashboardPage/>
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
                {
                    path: '/campaigns/user',
                    element: <FundraisingCampaignsUserPage/>
                },
                {
                    path: '/profile',
                    element: <ProfilePage/>
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
        {
            path: '/*',
            element: <div>404 not found</div>
        }
    ]
)

const MyRouter = ()=> <RouterProvider router={router}/>
export default MyRouter