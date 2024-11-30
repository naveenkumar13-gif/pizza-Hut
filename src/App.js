import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/ui/Home";
import Menu, { Loader as menuLoader } from "../src/feature/menu/Menu";
import Cart from "../src/feature/cart/Cart";
import CreateOrder from "./feature/order/CreateOrder";
import Order from "./feature/order/Order";
import AppLayout from "./ui/AppLayout";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
    ],
  },
]);
export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
