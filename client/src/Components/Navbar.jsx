import React, { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import './Navbar.css';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa"; 
import { WishlistContext } from "../context/WishlistContext"
const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, logout } = useContext(AuthContext);
 const { cart } = useContext(CartContext);
 const { wishlist } = useContext(WishlistContext);
const [menuOpen, setMenuOpen] = useState(false);
useEffect(() => {
    setMenuOpen(false);
}, [user]);
const wishlistCount = wishlist.length;
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <>
    <header>
      <div className='navbar'>
        <Link to='/' className='navbar-logo'>
            <h1>Shopsy</h1>
             <svg className="smile" viewBox="0 0 220 50">
        <path
            d="M20 15 Q110 45 200 15"
            stroke="#FBF040"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
        />
        <path
            d="M188 10 L205 15 L190 25"
            fill="none"
            stroke="#ff9900"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
        </Link>
        <div className='search-bar'>
         <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search for a product..."
  className='search'
/>
          <button className='submit'><FaSearch className='search-icon' /></button> 
        </div>
       {user ? (
    <div className="user-container">

        <div
            className="user-profile"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            <FaUser />
            <span>{user.name}</span>
        </div>

        {menuOpen && (
            <div className="logout-box">
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        )}

    </div>
) : (
    <Link to="/login" className="login-link">
        <FaUser />
        <span>Login</span>
    </Link>
)}
      {user?.role === "admin" ? (
    <div className="admin-nav-links">
        <Link to="/admin">
            Admin Dashboard
        </Link>

        <Link to="/admin/products">
            Products
        </Link>

        <Link to="/admin/orders">
            Orders
        </Link>
    </div>
) : (
    <>
        <Link to="/wishlist" className="wishlist">
            <FaHeart />

            <span className="wishlist-text">
                Wishlist
            </span>

            {wishlistCount > 0 && (
                <span className="wishlist-count">
                    {wishlistCount}
                </span>
            )}
        </Link>

        <Link to="/orders" className="orders-link">
            Orders
        </Link>

        <Link to="/cart" className="cart">
            <div className="cart-icon">
                <FaShoppingCart />

                {cartCount > 0 && (
                    <span className="cart-count">
                        {cartCount}
                    </span>
                )}
            </div>

            <span className="cart-text">
                Cart
            </span>
        </Link>
    </>
)}
        <button
  className="menu-btn"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <FaBars />
</button>
      </div>
      {menuOpen && (
  <div className="mobile-menu">

    <Link to="/login" className="mobile-link">
      Login
    </Link>

    <Link to="/wishlist" className="mobile-link">
      Wishlist
    </Link>

    <Link to="/cart" className="mobile-link">
      Cart
    </Link>

    <div className="mobile-location">
      📍 Mathura 281006
    </div>

  </div>
)}
      </header>
    </>
  );
}

export default Navbar;
