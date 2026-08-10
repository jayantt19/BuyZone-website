import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
useEffect(() => {
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setCart([]);
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/cart",
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

            setCart(data.items);

        } catch (error) {
            console.error("Get cart error:", error);
        }
    };

    fetchCart();
}, []);
 const addToCart = async (product) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: product._id,
                quantity: product.quantity
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            return;
        }

        setCart(data.cart.items);

        console.log("Product added to cart");
    } catch (error) {
        console.error("Add to cart error:", error);
    }
};
const increaseQuantity = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const item = cart.find(
            (item) => item.product._id === id
        );

        if (!item) return;

        const response = await fetch(
            `http://localhost:5000/api/cart/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    quantity: item.quantity + 1
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            return;
        }

        setCart(data.cart.items);

    } catch (error) {
        console.error("Increase quantity error:", error);
    }
};

const decreaseQuantity = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const item = cart.find(
            (item) => item.product._id === id
        );

        if (!item || item.quantity <= 1) return;

        const response = await fetch(
            `http://localhost:5000/api/cart/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    quantity: item.quantity - 1
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            return;
        }

        setCart(data.cart.items);

    } catch (error) {
        console.error("Decrease quantity error:", error);
    }
};

const removeFromCart = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/cart/${id}`,
            {
                method: "DELETE",
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

        setCart(data.cart.items);

    } catch (error) {
        console.error("Remove from cart error:", error);
    }
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
         increaseQuantity,
         decreaseQuantity,
         removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;