// Header.tsx

import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import SearchInput from "../SearchInput";
const Header: React.FC = () => {
  return (
    <header className="sticky-header">
      <div className="logo">
        <img src={logo} alt="shoemate" />
      </div>
      <div className="d-flex">
        <SearchInput />
        <nav>
          <ul>
            <li>Account</li>
            <li>Cart</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
