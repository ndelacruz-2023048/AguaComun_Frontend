import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../layout/Layout"
import { LoginPage } from "../pages/LoginPage"

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
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
            path: '*',
            element: <div >404 Not Found</div>
        },
        {
            path: '/login',
            element: <LoginPage/>
        }
    ]
)

const MyRouter = ()=> <RouterProvider router={router}/>
export default MyRouter