import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './OrderDetails.css'
const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `https://buy-zone-website-76k7.vercel.app/api/orders/${id}`,
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

                setOrder(data);

            } catch (error) {
                console.error("Get order error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <h2>Loading order...</h2>;
    }

    if (!order) {
        return <h2>Order not found</h2>;
    }

    return (
        <div className="order-details">

            <h1>Order Details</h1>

          <div className="order-status">
    <h2>Order Status</h2>

    {order.status === "cancelled" ? (
        <div className="cancelled-status">
            ❌ Order Cancelled
        </div>
    ) : (
        <div className="status-tracker">

            <div
                className={
                    "status-step " +
                    (["pending", "confirmed", "shipped", "delivered"]
                        .includes(order.status)
                        ? "active"
                        : "")
                }
            >
                <div className="status-circle">✓</div>
                <span>Order Placed</span>
            </div>

            <div
                className={
                    "status-line " +
                    (["confirmed", "shipped", "delivered"]
                        .includes(order.status)
                        ? "active"
                        : "")
                }
            ></div>

            <div
                className={
                    "status-step " +
                    (["confirmed", "shipped", "delivered"]
                        .includes(order.status)
                        ? "active"
                        : "")
                }
            >
                <div className="status-circle">✓</div>
                <span>Confirmed</span>
            </div>

            <div
                className={
                    ["shipped", "delivered"].includes(order.status)
                        ? "status-line active"
                        : "status-line"
                }
            ></div>

            <div
                className={
                    ["shipped", "delivered"].includes(order.status)
                        ? "status-step active"
                        : "status-step"
                }
            >
                <div className="status-circle">✓</div>
                <span>Shipped</span>
            </div>

            <div
                className={
                    order.status === "delivered"
                        ? "status-line active"
                        : "status-line"
                }
            ></div>

            <div
                className={
                    order.status === "delivered"
                        ? "status-step active"
                        : "status-step"
                }
            >
                <div className="status-circle">✓</div>
                <span>Delivered</span>
            </div>

        </div>
    )}
</div>

            <div className="ordered-products">

                <h2>Products</h2>

                {order.items.map((item) => (
                    <div
                        className="order-product"
                        key={item.product._id}
                    >

                        <img
                            src={item.product.image}
                            alt={item.product.title}
                        />

                        <div>
                            <h3>{item.product.title}</h3>

                            <p>
                                ${item.price} × {item.quantity}
                            </p>

                            <p>
                                Quantity: {item.quantity}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

            <div className="shipping-address">

                <h2>Shipping Address</h2>

                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                </p>
                <p>{order.shippingAddress.pincode}</p>

            </div>

            <div className="order-total">

                <h2>
                    Total: ${order.totalAmount.toFixed(2)}
                </h2>

            </div>

        </div>
    );
};

export default OrderDetails;
