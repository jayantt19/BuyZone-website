import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        return savedWishlist
            ? JSON.parse(savedWishlist)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
    }, [wishlist]);

    const toggleWishlist = (product) => {

        const exists = wishlist.some(
            (item) => item._id === product._id
        );

        if (exists) {

            setWishlist((prev) =>
                prev.filter(
                    (item) => item._id !== product._id
                )
            );

        } else {

            setWishlist((prev) => [
                ...prev,
                product
            ]);

        }
    };

    const isInWishlist = (id) => {

        return wishlist.some(
            (item) => item._id === id
        );

    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                isInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;