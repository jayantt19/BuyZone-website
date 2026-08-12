import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Cart from "./Pages/Cart";
import AdminOrders from "./admin/AdminOrders";
import Login from './Pages/Login';
import Checkout from "./Components/Checkout";
import Notfound from './Pages/Notfound';
import ProductDetails from './Pages/ProductDetails';
import Register from './Pages/Register';
import Wishlist from './Pages/Wishlist';
import Orders from "./Components/Order";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./admin/AdminDashboard";
import ScrollToTop from "./Components/ScrollToTop";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
            <Route
      path="/"
      element={<Home searchTerm={searchTerm} />}
    />
    <Route
    path="/admin"
    element={<AdminDashboard />}
/>
          <Route path='/cart' element={<Cart />} />
          {/* <Route path='/product' element={<Products />} /> */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
    path="/admin/orders"
    element={<AdminOrders />}
/>
          <Route
    path="/orders/:id"
    element={<OrderDetails />}
/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
    </>
  );
}

export default App;
