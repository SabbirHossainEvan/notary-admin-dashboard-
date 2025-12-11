;


import { createBrowserRouter } from "react-router-dom";
import Login from "../layouts/Login";
import ForgotPasswordForm from "../pages/ForgotPasswordForm";
import CheckEmailConfirmation from "../pages/CheckEmailConfirmation";
import Users from "../pages/Users";
import DashboardContent from "../pages/DashboardContent";
import DashboardLayout from "../layouts/DashboardLayouts";
import Jobs from "../pages/Jobs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordForm />
    },
    {
        path: "/email-confirmation",
        element: <CheckEmailConfirmation />
    },
    {
        path: "/dashboard", 
        element: <DashboardLayout />,
        children: [
            {
                index: true, 
                element: <DashboardContent /> 
            },
            {
               
                path: "users", 
                element: <Users />
            },
            {
               
                path: "jobs", 
                element: <Jobs />
            },
           
        ]
    },
]);

export default router;