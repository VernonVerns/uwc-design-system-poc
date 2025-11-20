import { lazy, Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import UWCLoader from "../components/UWCLoader";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route
            path="/"
            key="login-page"
            element={
                <Suspense fallback={<UWCLoader glassy kind="primary" />}>
                    <LoginPage />
                </Suspense>
            }
        />,
        <Route
            path="/dashboard"
            key="dashboard-page"
            element={
                <Suspense fallback={<UWCLoader glassy kind="primary" />}>
                    <DashboardPage />
                </Suspense>
            }
        />
    ])
);

export default router;