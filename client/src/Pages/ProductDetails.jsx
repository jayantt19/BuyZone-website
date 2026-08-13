import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { FaStar,FaRegStar } from "react-icons/fa";
import './ProductDetails.css'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from '../context/CartContext';
import ProductCard from '../Components/ProductCard';
const ProductDetails = () => {
  const [product, setproduct] = useState(null);
  const [products, setproducts] = useState([]);
  const [quantity, setquantity] = useState(1);
  const navigate = useNavigate();
  const handleBuyNow = () => {
    if (user?.role === "admin") {
        return;
    }

    navigate("/checkout", {
        state: {
            product: {
                ...product,
                quantity
            }
        }
    });
};
  const { user } = useContext(AuthContext);
   const {id}=useParams();
const { addToCart } = useContext(CartContext);
   useEffect(() => {
     const fetchProducts=async()=>{
      const res = await fetch("http://localhost:5000/api/products");
      const data=await res.json();
      setproducts(data);
     }
     fetchProducts();
   }, [])



   useEffect(() => {
    const fetchProduct=async()=>{
try{
      const response = await fetch(
    `http://localhost:5000/api/products/${id}`
);
      const data=await response.json();
      setproduct(data);
     }
     catch(err){
      console.log(err);
     }
    }
     fetchProduct();
   }, [id])
   
   if (!product) {
  return <h2>Loading...</h2>;
}

const relatedProducts=products.filter((item)=>{
      return(
        item.category===product.category && item._id!==product._id
      );
    })
  // const filledstars= Math.round(product.rating.rate);
  return (
    <>
        <div className='product-details'>
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>

        {/* { <div className="ratings">
           <span className='rate'>{product.rating?.rate}</span>
          {[...Array(5)].map((_,index)=>index<filledstars?(<FaStar className='star' key={index}/>):(
      <FaRegStar className='empstar' key={index} />
       ))}
          <span className='count'>({product.rating?.count} reviews)</span>
        </div> } */}

        <p className='category'>{product.category}</p>
        <h2>${product.price}</h2>
        <p className='description'>{product.description}</p>
        <div className="quan">
          <button onClick={()=>{
            if(quantity!=1){
            setquantity(quantity-1);
            }
          }}>-</button>
          <span>{quantity}</span>
          <button onClick={()=>{
            setquantity(quantity+1);
          }}>+</button>
        </div>
       <button
    className="cartbtn"
    onClick={() => {
        if (user?.role === "admin") {
            return;
        }

        addToCart({
            ...product,
            quantity,
        });
    }}
>
    Add to Cart
</button>
        <button
    className="buy-btn"
    onClick={handleBuyNow}
>
    Buy Now
</button>
      </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.slice(0,4).map((item)=>(
            <ProductCard key={item._id} product={item}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
