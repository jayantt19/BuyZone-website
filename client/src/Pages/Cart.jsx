import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const subtotal = cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your Cart is Empty 🛒</h2>
                <p>Add some products to continue shopping.</p>
            </div>
        );
    }

    return (
        <div className="cart-container">

            {/* Left Section */}
            <div className="cart-items-section">
                <h1>Shopping Cart</h1>

                {cart.map((item) => (
                    <CartItem
                        key={item.product._id}
                        item={item}
                    />
                ))}
            </div>

            {/* Right Section */}
            <div className="order-summary">

                <h2>Order Summary</h2>

                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>

                <hr />

                <div className="summary-row total">
                    <strong>Total</strong>
                    <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <button
                    className="checkout-btn"
                    onClick={() => navigate("/checkout")}
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>
    );
};

export default Cart;