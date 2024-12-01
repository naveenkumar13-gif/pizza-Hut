import React from "react";
import { Link } from "react-router-dom";
import SearchOrdre from "../feature/order/SearchOrder";
import UserName from "../feature/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      <SearchOrdre />
      <UserName />
    </header>
  );
}

export default Header;
