import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./ProductDetails.css";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  // ================= BUY NOW =================

  const handleBuyNow = () => {
    // Guest user → Login
    if (!user) {
      navigate("/login");
      return;
    }

    // Admin cannot buy
    if (user.role === "admin") {
      return;
    }

    navigate("/checkout", {
      state: {
        product: {
          ...product,
          quantity,
        },
      },
    });
  };

  // ================= FETCH ALL PRODUCTS =================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  // ================= FETCH SINGLE PRODUCT =================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= LOADING =================

  if (!product) {
    return <h2>Loading...</h2>;
  }

  // ================= RELATED PRODUCTS =================

  const relatedProducts = products.filter((item) => {
    return (
      item.category === product.category &&
      item._id !== product._id
    );
  });

  // ================= ADD TO CART =================

  const handleAddToCart = () => {
    // Guest user → Login
    if (!user) {
      navigate("/login");
      return;
    }

    // Admin cannot add to cart
    if (user.role === "admin") {
      return;
    }

    addToCart({
      ...product,
      quantity,
    });
  };

  return (
    <>
      <div className="product-details">

        {/* ================= PRODUCT IMAGE ================= */}

        <div className="product-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* ================= PRODUCT INFO ================= */}

        <div className="product-info">

          <h1>{product.title}</h1>

          <p className="category">
            {product.category}
          </p>

          <h2>
            ${product.price}
          </h2>

          <p className="description">
            {product.description}
          </p>

          {/* ================= QUANTITY ================= */}

          <div className="quan">

            <button
              onClick={() => {
                if (quantity !== 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>

          </div>

          {/* ================= ADD TO CART ================= */}

          <button
            className="cartbtn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* ================= BUY NOW ================= */}

          <button
            className="buy-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}

      <div className="related-products">

        <h2>Related Products</h2>

        <div className="related-products-grid">

          {relatedProducts
            .slice(0, 4)
            .map((item) => (
              <ProductCard
                key={item._id}
                product={item}
              />
            ))}

        </div>

      </div>
    </>
  );
};

export default ProductDetails;