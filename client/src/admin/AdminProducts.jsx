import React, { useEffect, useState } from "react";
import "./AdminProducts.css";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    // =========================
    // GET PRODUCTS
    // =========================

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "https://shopsy-website-backend.onrender.com/api/products"
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                return;
            }

            setProducts(data);

        } catch (error) {
            console.error("Get products error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // =========================
    // ADD / UPDATE PRODUCT
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const url = editingId
                ? `http://localhost:5000/api/products/${editingId}`
                : "http://localhost:5000/api/products";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Something went wrong");
                return;
            }

            if (editingId) {

                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingId
                            ? data.product
                            : product
                    )
                );

                setMessage("Product updated successfully");

            } else {

                setProducts((prevProducts) => [
                    data.product,
                    ...prevProducts
                ]);

                setMessage("Product added successfully");
            }

            resetForm();

        } catch (error) {
            console.error("Product save error:", error);
            setMessage("Server error");
        }
    };


    // =========================
    // EDIT PRODUCT
    // =========================

    const handleEdit = (product) => {

        setEditingId(product._id);

        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // DELETE PRODUCT
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Delete failed");
                return;
            }

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product._id !== id
                )
            );

            setMessage("Product deleted successfully");

        } catch (error) {
            console.error("Delete product error:", error);
            setMessage("Server error");
        }
    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setFormData({
            title: "",
            description: "",
            price: "",
            image: "",
            category: "",
            stock: ""
        });

        setEditingId(null);
    };


    if (loading) {
        return <h2>Loading products...</h2>;
    }


    return (
        <div className="admin-products">

            <h1>Manage Products</h1>


            {/* MESSAGE */}

            {message && (
                <div className="admin-message">
                    {message}
                </div>
            )}


            {/* ADD / EDIT FORM */}

            <div className="admin-product-form">

                <h2>
                    {editingId
                        ? "Edit Product"
                        : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                    <div className="form-buttons">

                        <button type="submit">
                            {editingId
                                ? "Update Product"
                                : "Add Product"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>


            {/* PRODUCTS */}

            <h2 className="product-list-title">
                All Products
            </h2>


            <div className="admin-product-grid">

                {products.map((product) => (

                    <div
                        className="admin-product-card"
                        key={product._id}
                    >

                        <img
                            src={product.image}
                            alt={product.title}
                        />

                        <div className="admin-product-info">

                            <h3>
                                {product.title}
                            </h3>

                            <p className="category">
                                {product.category}
                            </p>

                            <p className="description">
                                {product.description}
                            </p>

                            <strong>
                                ₹{product.price}
                            </strong>

                            <p>
                                Stock: {product.stock}
                            </p>

                        </div>


                        <div className="admin-product-actions">

                            <button
                                onClick={() =>
                                    handleEdit(product)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(product._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AdminProducts;
