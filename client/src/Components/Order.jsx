import React, { useEffect, useState } from "react";
import "./Order.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.log(data);
                    return;
                }

                setOrders(data);

            } catch (error) {
                console.error("Get orders error:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="orders-page">

            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <h2>No orders yet</h2>
                    <p>Your placed orders will appear here.</p>
                </div>
            ) : (

                orders.map((order) => (

                    <div className="order-card" key={order._id}>

                        {/* Order Header */}

                        <div className="order-header">

                            <div>
                                <span>Ordered on</span>

                                <strong>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </strong>
                            </div>

                            <span
                                className={`order-status ${order.status}`}
                            >
                                {order.status}
                            </span>

                        </div>

                        {/* Products */}

                        <div className="order-products">

                            {order.items.map((item) => (

                                <div
                                    className="order-product"
                                    key={item.product._id}
                                >

                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                    />

                                    <div className="product-info">

                                        <h3>
                                            {item.product.title}
                                        </h3>

                                        <p>
                                            ${item.price.toFixed(2)}
                                        </p>

                                        <p>
                                            Quantity: {item.quantity}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* Order Bottom */}

                        <div className="order-bottom">

                            <strong>
                                Total: $
                                {order.totalAmount.toFixed(2)}
                            </strong>

                            <button onClick={() => navigate(`/orders/${order._id}`)}>
                                View Order
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
};

export default Orders;
