import React from 'react';
import { FaHeadset, FaLock, FaShoppingCart, FaUndoAlt } from "react-icons/fa";

import "./WhyChoose.css"
const WhyChoose = () => {
  return (
    <section className='whychoose'>
      <h1>Why choose BuyZone</h1>
      <div className="features">
        <div className="feature-card">
            <FaShoppingCart className='feature-icon'/>
            <h2>Free Shipping</h2>
            <p>Enjoy free delievery on all orders with no hidden charges. </p>
        </div>

        <div className="feature-card">
             <FaLock className="feature-icon" />
            <h2>Secure Payment</h2>
            <p>Shop confidently with safe and encrypted transactions. </p>
        </div>

      <div className="feature-card">
               <FaHeadset className="feature-icon" />
            <h2>24/7 Support</h2>
            <p>Our support team is available whenever you need help.</p>
        </div>

        <div className="feature-card">
          <FaUndoAlt className="feature-icon" /> 
            <h2>Easy Return</h2>
            <p>Not Satisfied?return it easily</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
