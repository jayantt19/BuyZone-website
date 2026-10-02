import React, { useContext } from "react";
import "./ProductCard.css";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  // ================= WISHLIST =================
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Not logged in → Login
    if (!user) {
      navigate("/login");
      return;
    }

    // Admin cannot use wishlist
    if (user.role === "admin") {
      return;
    }

    toggleWishlist(product);
  };

  // ================= ADD TO CART =================
  const handleAddToCart = (e) => {
       e.preventDefault();
    e.stopPropagation();
    // Not logged in → Login
    if (!user) {
      navigate("/login");
      return;
    }

    // Admin cannot add to cart
    if (user.role === "admin") {
      return;
    }

    addToCart(product);
  };

  return (
    <div className="product-card">

      {/* ================= WISHLIST ================= */}
      {user?.role !== "admin" && (
        <div
          className="wishlist-icon"
          onClick={handleWishlist}
        >
          {isInWishlist(product._id) ? (
            <FaHeart color="red" size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </div>
      )}

      {/* ================= PRODUCT ================= */}
      {/* Guests and logged-in users can view product */}
      <Link
        className="link"
        to={`/product/${product._id}`}
      >
        <img
          src={product.image}
          alt={product.title}
        />

        <h3>{product.title}</h3>

        <p className="price">
          ${product.price}
        </p>

        <p>{product.category}</p>
      </Link>

      {/* ================= CART ================= */}
      {user?.role !== "admin" && (
        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}

    </div>
  );
};

export default ProductCard;