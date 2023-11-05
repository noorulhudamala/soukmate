// Footer.tsx

import React from 'react';
import './Footer.scss';
import logo from '../../assets/images/logo_white.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top row">
        <div className="col-4 footer-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="col-4 footer-links">
          <a href="/about">About Us</a>
          <a href="/products">Products</a>
        </div>
        <div className="col-4 justify-content-end footer-social">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-conditions">Terms & Conditions</a>
      </div>
    </footer>
  );
};

export default Footer;
