const express = require("express");
const Product = require("../models/Product");
 const admin = require("../middlewares/adminMiddleware");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();
// Get Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
});
//Create Products
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        const product = await Product.create({
            title,
            description,
            price,
            image,
            category,
            stock
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
    console.error("Create product error:", error);

    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            errors: Object.values(error.errors).map(
                (err) => err.message
            )
        });
    }

    res.status(500).json({
        message: "Server error"
    });
}
});

//Get Product By ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        console.error("Get product error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// UPDATE PRODUCT DETAILS 
router.put("/:id", protect, admin, async (req, res)=> {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
    console.error("Create product error:", error);

    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            errors: Object.values(error.errors).map(
                (err) => err.message
            )
        });
    }

    res.status(500).json({
        message: "Server error"
    });
}
});

//DELETE PRODUCT
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
    console.error("Create product error:", error);

    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            errors: Object.values(error.errors).map(
                (err) => err.message
            )
        });
    }

    res.status(500).json({
        message: "Server error"
    });
}
});

module.exports = router;