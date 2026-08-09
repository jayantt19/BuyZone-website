require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product");

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const products = await response.json();

        const formattedProducts = products.map((product) => ({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: 20
        }));

        await Product.deleteMany();

        await Product.insertMany(formattedProducts);

        console.log("Products seeded successfully");

        process.exit(0);

    } catch (error) {
        console.error("Seed error:", error.message);
        process.exit(1);
    }
};

seedProducts();