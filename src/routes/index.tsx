import { lazy, Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route
            path="/"
            key="login-page"
            element={
                <Suspense fallback={"Loading..."}>
                    <LoginPage />
                </Suspense>
            }
        />,
        <Route
            path="/dashboard"
            key="dashboard-page"
            element={
                <Suspense fallback={"Loading..."}>
                    <DashboardPage />
                </Suspense>
            }
        />
    ])
);

export default router;