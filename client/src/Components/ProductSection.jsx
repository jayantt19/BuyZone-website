import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductSection.css";
import LoadingSkeleton from "./LoadingSkeleton";
const ProductSection = ({ searchTerm }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [sortOption, setSortOption] = useState("default");
  useEffect(() => {
    const fetchProducts = async () => {
  try {
    setLoading(true);

    const response = await fetch("https://buy-zone-website-76k7.vercel.app/api/products");
    const data = await response.json();

    setProducts(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase())
);
  const sortedProducts = [...filteredProducts];

switch (sortOption) {
  case "low-high":
    sortedProducts.sort((a, b) => a.price - b.price);
    break;

  case "high-low":
    sortedProducts.sort((a, b) => b.price - a.price);
    break;

  case "a-z":
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    break;

  case "z-a":
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    break;

  default:
    break;
}
  return (
    <div className="product-section">
      <h1>Featured Products</h1>
     <div className="sort-container">
  <label>Sort By: </label>

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="default">Default</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
    <option value="a-z">Name: A-Z</option>
    <option value="z-a">Name: Z-A</option>
  </select>
</div>

      <div className="product-grid">
  {loading ? (
    Array.from({ length: 8 }).map((_, index) => (
      <LoadingSkeleton key={index} />
    ))
  ) : filteredProducts.length > 0 ? (
    sortedProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  ) : (
    <h2 className="no-product">No products found</h2>
  )}
</div>
    </div>
  );
};

export default ProductSection;
