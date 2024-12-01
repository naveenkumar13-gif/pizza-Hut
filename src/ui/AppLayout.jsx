import React from "react";
import Header from "./Header";
import CartOverview from "../feature/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../ui/Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
