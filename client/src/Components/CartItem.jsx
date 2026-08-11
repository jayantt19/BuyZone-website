import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useContext(CartContext);

    return (
        <div className="cart-item">

            <div className="cart-details">

                <h3>{item.product.title}</h3>

                <p className="category">
                    {item.product.category}
                </p>

                <h2>
                    ${item.product.price}
                </h2>

                <div className="quantity-box">

                    <button
                        onClick={() =>
                            decreaseQuantity(item.product._id)
                        }
                    >
                        -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() =>
                            increaseQuantity(item.product._id)
                        }
                    >
                        +
                    </button>

                </div>

                <button
                    className="remove-btn"
                    onClick={() =>
                        removeFromCart(item.product._id)
                    }
                >
                    Remove
                </button>

            </div>

        </div>
    );
};

export default CartItem;