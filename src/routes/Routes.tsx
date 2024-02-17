import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { AuthenticationForm } from "../views/AuthenticationForm";
import { selectIsAuthenticated } from "../store";
import { Dashboard } from "../views/Dashboard";
import { ProtectedRouteProps } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import { ReduxHooks } from "../hooks";

const Routes = () => {
  const isAuthenticated = ReduxHooks.useAppSelector(selectIsAuthenticated);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated,
    authenticationPath: '/login',
  };

  const routerConfig: RouteObject[] = [
    {
      path: "/login",
      element: !isAuthenticated ? <AuthenticationForm /> : <Navigate to="/" />,
    },
    {
      path: "/",
      element: <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Dashboard />} />,
    },
    {
      path: "/forgot-password",
      element: <h1>Forgot Password</h1>,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ];

  const router = createBrowserRouter(routerConfig);

  return <RouterProvider router={router} />;
};

export default Routes;
