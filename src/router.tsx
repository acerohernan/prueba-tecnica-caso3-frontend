import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/auth/login"));

const DashboardLayout = lazy(() => import("./layout/dashboard"));
const DashboardHomePage = lazy(() => import("./pages/dashboard/home"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardLayout />,
		children: [
			{
				path: "",
				element: <DashboardHomePage />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "*",
		element: <Navigate to="/login" />,
	},
]);
