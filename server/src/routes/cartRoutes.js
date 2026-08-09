const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user
        }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                items: []
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        console.error("Get cart error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Add products
router.post("/", protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
         const finalQuantity = Number(quantity) || 1;

if (finalQuantity < 1) {
    return res.status(400).json({
        message: "Quantity must be at least 1"
    });
}
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({
            user: req.user
        });

        if (!cart) {
            cart = await Cart.create({
                user: req.user,
                items: [
                    {
                        product: productId,
                     quantity: finalQuantity
                    }
                ]
            });
        } else {
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += finalQuantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: finalQuantity
                });
            }

            await cart.save();
        }

        const updatedCart = await Cart.findOne({
            user: req.user
        }).populate("items.product");

        res.status(200).json({
            message: "Product added to cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Add to cart error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

//UPDATE CART Quatity
router.put("/:productId", protect, async (req, res) => {
    try {
        const finalQuantity = Number(quantity);

if (!Number.isInteger(finalQuantity) || finalQuantity < 1) {
    return res.status(400).json({
        message: "Quantity must be a positive integer"
    });
}

        const cart = await Cart.findOne({
            user: req.user
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === req.params.productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

      item.quantity = finalQuantity;

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: req.user
        }).populate("items.product");

        res.status(200).json({
            message: "Cart updated successfully",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Update cart error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

//Delete Product
router.delete("/:productId", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const itemExists = cart.items.some(
            item => item.product.toString() === req.params.productId
        );

        if (!itemExists) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: req.user
        }).populate("items.product");

        res.status(200).json({
            message: "Product removed from cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Remove from cart error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;