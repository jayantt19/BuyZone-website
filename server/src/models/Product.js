const mongoose=require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
    required: [true, "Product title is required"],
    trim: true,
    minlength: [2, "Title must contain at least 2 characters"]
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        stock: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;