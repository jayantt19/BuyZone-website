import React, { useContext } from 'react';
import "./ProductCard.css";
import { CartContext } from "../context/CartContext";
import {Link} from 'react-router-dom';
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  return (
    <>
      <div className="product-card">
        <div
  className="wishlist-icon"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }}
>
  {isInWishlist(product._id) ? (
    <FaHeart color="red" size={20} />
  ) : (
    <FaRegHeart size={20} />
  )}
</div>
        <Link className='link' to={`/product/${product._id}`}>
          <img src={product.image} alt={product.title}/>
          <h3>{product.title}</h3>
          <p className='price'>${product.price}</p>
          <p>{product.category}</p>
        </Link>
        {user?.role !== "admin" && (
   <button
    className="cart-btn"
    onClick={() => {
        if (user?.role === "admin") {
            return;
        }

        addToCart(product);
    }}
>
    Add to Cart
</button>
)}
      </div>
    </>
  );
}

export default ProductCard;
