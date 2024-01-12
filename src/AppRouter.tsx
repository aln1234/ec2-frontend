import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SingleProduct from "./pages/SingleProduct";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./Router";
import Dashboard from "./pages/admin/Dashboard";
import Order from "./pages/Order";
import SingleOrder from "./pages/SingleOrder";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "order",
          children: [
            {
              index: true,
              element: <Order />,
            },
            {
              path: ":id",
              element: <SingleOrder />,
            },
          ],
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dashboard",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              ),
            },
            {
              path: "",
            },
          ],
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <Products />,
            },
            {
              path: ":id",
              element: <SingleProduct />,
            },
          ],
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
