// Header.tsx

import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import SearchInput from "../SearchInput";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky-header">
      <div className="logo" onClick={()=> navigate("/")}>
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
