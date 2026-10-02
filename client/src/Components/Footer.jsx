import React from 'react';
import "./Footer.css"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='footer'>
        < div className="footer-container">
            <div className="footer-section">
          <h2>BuyZone</h2>
          <p>
            Your one-stop destination for quality products
            at the best prices.
          </p>
            </div>

            <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>


        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>FAQ</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>


        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
    </div>
     <div className="footer-bottom">
        <p>© 2026 BuyZone. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
