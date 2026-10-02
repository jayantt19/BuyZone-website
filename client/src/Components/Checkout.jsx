import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const totalAmount = cart.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        shippingAddress: formData
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to place order");
                return;
            }

            setMessage("Order placed successfully!");

console.log("Order:", data.order);

clearCart();

setTimeout(() => {
    navigate("/orders");
}, 1000);

        } catch (error) {
            console.error("Place order error:", error);
            setMessage("Server error");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div>
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate("/")}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="checkout">

            <h1>Checkout</h1>

            {message && (
                <div className="checkout-message">
                    {message}
                </div>
            )}

            <div className="checkout-container">

                {/* Shipping Address */}
                <div className="shipping-section">

                    <h2>Shipping Address</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                    </form>

                </div>

                {/* Order Summary */}
                <div className="order-summary">

                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div
                            className="checkout-item"
                            key={item.product._id}
                        >
                            <span>
                                {item.product.title}
                            </span>

                            <span>
                                ${item.product.price} × {item.quantity}
                            </span>
                        </div>
                    ))}

                    <hr />

                    <h3>
                        Total: ${totalAmount.toFixed(2)}
                    </h3>

                </div>

            </div>

        </div>
    );
};

export default Checkout;
