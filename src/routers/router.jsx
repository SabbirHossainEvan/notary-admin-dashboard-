;


import { createBrowserRouter } from "react-router-dom";
import Login from "../layouts/Login";
import ForgotPasswordForm from "../pages/ForgotPasswordForm";
import CheckEmailConfirmation from "../pages/CheckEmailConfirmation";
import Users from "../pages/Users";
import DashboardContent from "../pages/DashboardContent";
import DashboardLayout from "../layouts/DashboardLayouts";
import Jobs from "../pages/Jobs";
import Affiliates from "../pages/Affiliates";
import Payments from "../pages/Payments";
import Profile from "../pages/Profile";

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
           
            {
               
                path: "affiliates", 
                element: <Affiliates />
            },
            {
                path: "payments", 
                element: <Payments />
            },
            {
                path: "profile", 
                element: <Profile />
            },
           
        ]
    },
]);

export default router;