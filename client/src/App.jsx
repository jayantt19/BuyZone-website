import React, { useState } from "react";
import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Wishlist from "./Pages/Wishlist";
import Notfound from "./Pages/Notfound";
import ProductDetails from "./Pages/ProductDetails";

import Checkout from "./Components/Checkout";
import Orders from "./Components/Order";
import OrderDetails from "./Pages/OrderDetails";

import AdminRoute from "./admin/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";

import ScrollToTop from "./Components/ScrollToTop";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

const App = () => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <ScrollToTop />

            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <Routes>

                {/* ================= USER ROUTES ================= */}

                <Route
                    path="/"
                    element={
                        <Home searchTerm={searchTerm} />
                    }
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/orders/:id"
                    element={<OrderDetails />}
                />


                {/* ================= ADMIN ROUTES ================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <AdminRoute>
                            <AdminProducts />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <AdminOrders />
                        </AdminRoute>
                    }
                />


                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={<Notfound />}
                />

            </Routes>
        </>
    );
};

export default App;