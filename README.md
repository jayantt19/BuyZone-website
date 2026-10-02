# 🛒 Shopsy — MERN E-Commerce Website

A full-stack **MERN e-commerce application** built with React.js, Node.js, Express.js, and MongoDB. The project provides a complete shopping experience including product browsing, authentication, cart management, wishlist functionality, product details, checkout, and user-specific features.

## 🚀 Live Demo

* **Frontend:https://shopsy-website.onrender.com
* **Backend API:https://shopsy-website-backend.onrender.com

## 📌 Features

### 👤 User Features

* User registration and login
* User authentication
* Protected user functionality
* Browse products
* Search products
* View product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Wishlist functionality
* Buy Now functionality
* Checkout page
* User-specific cart and wishlist data
* Responsive design
* Light/Dark mode

### 🛍️ Product Features

* Product listing
* Product details page
* Product images
* Product pricing
* Product categories
* Product search and filtering
* Add to Cart
* Buy Now

### 🔐 Authentication

The application provides authentication so that user-specific features are available only to logged-in users.

Authentication is handled through the backend using:

* Node.js
* Express.js
* MongoDB
* Authentication middleware

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router DOM
* Context API
* React Toastify
* React Icons
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* Authentication middleware

### Deployment

* **Frontend:** Render
* **Backend:** Render
* **Database:** MongoDB Atlas

## 📂 Project Structure

```text
Shopsy/
│
├── frontend/
│   ├── public/
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ProductCard.jsx
│       │   ├── LoadingSkeleton.jsx
│       │   └── ...
│       │
│       ├── Context/
│       │   ├── CartContext.jsx
│       │   ├── WishlistContext.jsx
│       │   └── ...
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── Cart.jsx
│       │   ├── Wishlist.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Checkout.jsx
│       │   └── ...
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> Folder names may differ slightly depending on your final project structure.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/jayantt19/Shopsy-website.git
```

### 2. Navigate into the project

```bash
cd Shopsy-website
```

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## 🖥️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

Or, if you use node server.js:

```bash
npm run server
```

The backend will normally run at:

```text
http://localhost:5000
```

## 🔑 Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Never commit `.env` files to GitHub.**

## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  ├── Product Browsing
  ├── Search
  ├── Product Details
  ├── Cart
  ├── Wishlist
  ├── Login/Register
  └── Checkout
          │
          ▼
     Express REST API
          │
          ▼
       MongoDB
```

## 🛒 Cart Functionality

The cart is managed using React Context API.

When a user adds a product:

```javascript
addToCart(product)
```

The cart keeps track of:

* Product information
* Quantity
* Price
* Total items
* Total cart value

The navbar dynamically displays the number of products in the cart.

## ❤️ Wishlist

Users can add products to their wishlist and manage them separately from their shopping cart.

Wishlist functionality includes:

* Add product
* Remove product
* View wishlist
* Wishlist item count

## 🔍 Product Search

Users can search products directly from the navbar.

The search term is passed to the relevant product section and used to filter the displayed products.

## 🛍️ Buy Now

The **Buy Now** button allows a user to directly proceed toward checkout instead of adding the product to the cart first.

The flow is:

```text
Product Details
      ↓
   Buy Now
      ↓
   Checkout
      ↓
 Order / Payment
```

## 🔐 Protected Features

Some functionality is available only to authenticated users.

Example:

```text
Guest User
   ↓
Can browse products
Can view product details
Can search products
   ↓
Login/Register
   ↓
Authenticated User
   ↓
Cart / Wishlist / Checkout
```

## 🌐 API Structure

Example backend API structure:

```text
/api/auth
/api/products
/api/cart
/api/wishlist
/api/orders
```

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

The exact endpoints may vary according to the final backend implementation.

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop

## 🧪 Development

Run frontend and backend separately during development:

```bash
# Frontend
cd frontend
npm run dev
```

```bash
# Backend
cd backend
npm run server
```

## 🚀 Deployment

### Backend — Render

1. Push the project to GitHub.
2. Create a new Web Service on Render.
3. Connect your GitHub repository.
4. Select the backend directory if using a monorepo.
5. Configure the build command:

```bash
npm install
```

6. Configure the start command:

```bash
npm start
```

7. Add your environment variables.
8. Deploy the backend.
9. Copy the deployed backend URL.

Example:

```text
https://your-backend.onrender.com
```

### Frontend — Render

1. Create a new Static Site on Render.
2. Connect the GitHub repository.
3. Select the frontend directory.
4. Set the build command:

```bash
npm install && npm run build
```

5. Set the publish directory:

```text
dist
```

6. Add the backend API URL to the frontend environment variables.
7. Deploy.

## 🔒 Security

The project follows basic security practices such as:

* Environment variables for sensitive configuration
* Password authentication
* Protected backend routes
* Authentication middleware
* MongoDB Atlas for database hosting
* `.env` excluded from Git

## 📈 Future Improvements

Possible improvements for the project:

* 💳 Payment gateway integration
* 📦 Complete order management
* 👨‍💼 Admin dashboard
* 📊 Admin analytics
* 🏷️ Product reviews and ratings
* 🔔 Order notifications
* 📧 Email confirmation
* 🖼️ Cloudinary product image uploads
* 🔎 Advanced filtering and sorting
* 📄 Pagination
* ⚡ Redis caching
* 🚀 Performance optimization
* 🛡️ Rate limiting and additional security
* 📱 Progressive Web App support

## 🎯 What I Learned

While building this project, I worked with:

* React component architecture
* React Router
* Context API
* State management
* REST APIs
* Node.js and Express
* MongoDB and Mongoose
* Authentication
* Protected routes
* CRUD operations
* Git and GitHub
* Environment variables
* Frontend/backend integration
* Deployment using Render
* Debugging production build errors

## 👨‍💻 Author

**Jayant Kumar Sharma**

B.Tech — Computer Science & Engineering

### Skills

```text
React.js | JavaScript | Node.js | Express.js |
MongoDB | Mongoose | HTML | CSS | REST API | Git
```

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for **learning and portfolio purposes**.
