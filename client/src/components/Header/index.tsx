// Header.tsx

import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import SearchInput from "../SearchInput";
import { useNavigate } from "react-router-dom";
import account from "../../assets/images/account.svg";
import Favourites from "../Shared/Favourites";
import Cart from "../Shared/Cart";
import { useStore } from "../../store";
import { SHOW_CART } from "../../store/actions";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { showCart, cartItems } = state;
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
              <Favourites outline="#6A35B8"/>
            </li>
            <li onClick={() => dispatch({ type: SHOW_CART, payload: !showCart })}>
              <Cart fill="#6A35B8" />
              {!!cartItems?.length && <span className={'cart-count'}>{cartItems?.length}</span>}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
