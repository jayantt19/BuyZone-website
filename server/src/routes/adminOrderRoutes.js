const express = require("express");
const Order = require("../models/Order");

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const router = express.Router();

// Get all orders
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {
        console.error("Get all orders error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.patch("/:id", protect, admin, async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        )
        .populate("user", "name email")
        .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Update order status error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;