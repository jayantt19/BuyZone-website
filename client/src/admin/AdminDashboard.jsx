import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">

            <h1>Admin Dashboard</h1>

            <div className="admin-dashboard-grid">

                <Link
                    to="/admin/products"
                    className="admin-dashboard-card"
                >
                    <h2>Products</h2>
                    <p>
                        Add, edit and delete products
                    </p>
                </Link>

                <Link
                    to="/admin/orders"
                    className="admin-dashboard-card"
                >
                    <h2>Orders</h2>
                    <p>
                        Manage customer orders and shipping
                    </p>
                </Link>

            </div>

        </div>
    );
};

export default AdminDashboard;