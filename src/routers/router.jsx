// import { createBrowserRouter } from "react-router-dom";
// import Login from "../layouts/Login";
// import ForgotPasswordForm from "../pages/ForgotPasswordForm";
// import CheckEmailConfirmation from "../pages/CheckEmailConfirmation";
// import DashboardLayout from "../layouts/DashboardLayouts";
// import Users from "../pages/Users";
// import Dashboard from "../pages/Dashboard";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Login />,

//     },
//     {
//         path: "/forgot-password",
//         element: <ForgotPasswordForm />
//     },
//     {
//         path: "/email-confirmation",
//         element: <CheckEmailConfirmation />
//     },
//     {
//         path: "/dashboard",
//         element: <DashboardLayout />,
//         children: [
//             {
//                 index: true,
//                 element: <Dashboard />
//             },
//             {
//                 path: "/users",
//                 element: <Users />
//             }
//         ]
//     },
// ]);

// export default router;


import { createBrowserRouter } from "react-router-dom";
import Login from "../layouts/Login";
import ForgotPasswordForm from "../pages/ForgotPasswordForm";
import CheckEmailConfirmation from "../pages/CheckEmailConfirmation";
// import DashboardLayout from "../layouts/DashboardLayout"; 
// import DashboardContent from "../pages/DashboardContent"; 
import Users from "../pages/Users";
import DashboardContent from "../pages/DashboardContent";
import DashboardLayout from "../layouts/DashboardLayouts";

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
        path: "/dashboard", // Base path for the layout
        element: <DashboardLayout />,
        children: [
            {
                // Index route: Renders when the path is exactly /dashboard
                index: true, 
                element: <DashboardContent /> // Default content for /dashboard
            },
            {
                // Child path: The full path will be /dashboard/users
                path: "users", 
                element: <Users />
            },
            // Add other dashboard links here: /jobs, /affiliates, etc.
            // { path: "jobs", element: <Jobs /> },
        ]
    },
]);

export default router;