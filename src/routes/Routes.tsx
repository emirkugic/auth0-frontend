import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { LoginForm } from "../components/LoginForm";

const Routes = () => {
  const routerConfig: RouteObject[] = [
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/",
      element: <h1>Home</h1>,
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
