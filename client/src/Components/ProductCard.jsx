import React, { useContext } from 'react';
import "./ProductCard.css";
import {Link} from 'react-router-dom';
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const ProductCard = ({ product }) => {
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
        <button className='cart-btn'>Add to cart</button>
      </div>
    </>
  );
}

export default ProductCard;
