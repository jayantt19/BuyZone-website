import React, { useEffect, useContext, useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Navbar.css";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <div className="navbar">

          {/* LOGO - ALWAYS GOES HOME */}
          <Link to="/" className="navbar-logo">
            <h1>BuyZone</h1>
          </Link>

          {/* SEARCH */}
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a product..."
              className="search"
            />

            <Link
              to={user ? "/" : "/login"}
              className="submit"
            >
              <FaSearch className="search-icon" />
            </Link>
          </div>

          {/* USER */}
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

          {/* ADMIN */}
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
              {/* WISHLIST */}
              <Link
                to={user ? "/wishlist" : "/login"}
                className="wishlist"
              >
                <FaHeart />

                <span className="wishlist-text">
                  Wishlist
                </span>

                {user && wishlistCount > 0 && (
                  <span className="wishlist-count">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* ORDERS */}
              <Link
                to={user ? "/orders" : "/login"}
                className="orders-link"
              >
                Orders
              </Link>

              {/* CART */}
              <Link
                to={user ? "/cart" : "/login"}
                className="cart"
              >
                <div className="cart-icon">
                  <FaShoppingCart />

                  {user && cartCount > 0 && (
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

          {/* MENU BUTTON */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">

            {!user && (
              <Link
                to="/login"
                className="mobile-link"
              >
                Login
              </Link>
            )}

            <Link
              to={user ? "/wishlist" : "/login"}
              className="mobile-link"
            >
              Wishlist
            </Link>

            <Link
              to={user ? "/orders" : "/login"}
              className="mobile-link"
            >
              Orders
            </Link>

            <Link
              to={user ? "/cart" : "/login"}
              className="mobile-link"
            >
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
};

export default Navbar;