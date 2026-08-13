import React, { useEffect, useState } from "react";
import "./AdminOrders.css";
const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "https://shopsy-website-backend.onrender.com/api/admin/orders",
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
            console.error("Get admin orders error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://shopsy-website-backend.onrender.com/api/admin/orders/${orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                return;
            }

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? data.order
                        : order
                )
            );

        } catch (error) {
            console.error("Update status error:", error);
        }
    };

    if (loading) {
        return <h2>Loading orders...</h2>;
    }

    return (
        <div className="admin-orders">

            <h1>Admin Orders</h1>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (

                orders.map((order) => (

                    <div
                        className="admin-order-card"
                        key={order._id}
                    >

                        {/* User Information */}

                        <div className="admin-order-header">

                            <div>

                                <h3>
                                    {order.user?.name || "Unknown User"}
                                </h3>

                                <p>
                                    {order.user?.email || "No email"}
                                </p>

                                <small>
                                    Ordered on{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </small>

                            </div>

                            <div>

                                <strong>
                                    ₹{Number(order.totalAmount).toFixed(2)}
                                </strong>

                            </div>

                        </div>


                        {/* Products */}

                        <div className="admin-order-products">

                            {order.items.map((item, index) => {

                                // Product doesn't exist anymore
                                if (!item.product) {

                                    return (
                                        <div
                                            className="admin-order-product"
                                            key={index}
                                        >

                                            <div>

                                                <h4>
                                                    Product no longer available
                                                </h4>

                                                <p>
                                                    ₹{item.price} ×{" "}
                                                    {item.quantity}
                                                </p>

                                            </div>

                                        </div>
                                    );
                                }


                                // Product exists
                                return (
                                    <div
                                        className="admin-order-product"
                                        key={item.product._id}
                                    >

                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                        />

                                        <div>

                                            <h4>
                                                {item.product.title}
                                            </h4>

                                            <p>
                                                ₹{item.price} ×{" "}
                                                {item.quantity}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>


                        {/* Order Status */}

                        <div className="admin-order-footer">

                            <span>
                                Status:
                            </span>

                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                            >

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="confirmed">
                                    Confirmed
                                </option>

                                <option value="shipped">
                                    Shipped
                                </option>

                                <option value="delivered">
                                    Delivered
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                    </div>

                ))
            )}

        </div>
    );
};

export default AdminOrders;
