import React from "react";
import { Link } from "react-router-dom";
import SearchOrdre from "../feature/order/SearchOrder";

function Header() {
  return (
    <div>
      <Link to="/">Fast React PizzaCo.. </Link>
      <SearchOrdre />
      <p>naven</p>
    </div>
  );
}

export default Header;
