import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/ui/Home";
import Menu, { Loader as menuLoader } from "../src/feature/menu/Menu";
import Cart from "../src/feature/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./feature/order/CreateOrder";
import Order, { loader as orderloader } from "./feature/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderloader,
        errorElement: <Error />,
      },
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
