import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router"
import { Layout } from "../layout/Layout"

const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: Layout,
            errorElement: <div>Error</div>,
            children: [
                {
                    index: true,
                    Component: () => <div>Home</div>,
                    errorElement: <div>Error</div>
                }
            ],
            loader: async () => {
                // Simulate a data fetch
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({ message: "Data loaded" });
                    }, 1000);
                });
            }
        },
        {
            path: '*',
            Component: () => <div>404 Not Found</div>
        }
    ]
)

const MyRouter = ()=> <RouterProvider router={router}/>
export default MyRouter