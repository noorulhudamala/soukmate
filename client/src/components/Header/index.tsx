// Header.tsx

import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import SearchInput from "../SearchInput";
import { useNavigate } from "react-router-dom";
import account from "../../assets/images/account.svg";
import heartOutline from "../../assets/images/heart_outline.svg";
import Cart from "../Cart";
const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky-header">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="shoemate" />
      </div>
      <div className="d-flex">
        <SearchInput />
        <nav className="d-flex align-items-center">
          <ul>
            <li className="d-flex">
              <img className="px-2" src={account} alt="account-icon" />
            </li>
            <li className="d-flex">
              <img className="px-2" src={heartOutline} alt="account-icon" />
            </li>
            <li>
              <Cart fill="#6A35B8"/>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
