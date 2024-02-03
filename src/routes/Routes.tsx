import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { AuthenticationForm } from "../views/AuthenticationForm";
import { Dashboard } from "../views/Dashboard";

const Routes = () => {
  const routerConfig: RouteObject[] = [
    {
      path: "/login",
      element: <AuthenticationForm />,
    },
    {
      path: "/",
      element: <Dashboard />,
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
