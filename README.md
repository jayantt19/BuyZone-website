# 🛒 BuyZone — MERN E-Commerce Website

A full-stack **MERN e-commerce application** built with React.js, Node.js, Express.js, and MongoDB.

BuyZone provides a complete shopping experience with product browsing, search, authentication, cart management, wishlist functionality, product details, Buy Now, checkout, and user-specific shopping features.

## 🚀 Live Demo

- **Frontend:** https://buy-zone-website.vercel.app
- **Backend API:** https://buy-zone-website-76k7.vercel.app

---

## 📌 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Protected user functionality
- Browse products without login
- Search products
- View product details
- Add products to cart
- Update cart quantities
- Remove products from cart
- Wishlist functionality
- Buy Now functionality
- Checkout page
- User-specific cart and wishlist data
- Responsive design
- Light/Dark mode

### 🛍️ Product Features

- Product listing
- Product details
- Product images
- Product pricing
- Product categories
- Product search
- Product filtering
- Add to Cart
- Buy Now
- Product CRUD operations for administrators

### 👨‍💼 Admin Features

- Admin authentication
- Add products
- Update products
- Delete products
- Manage product information
- Protected admin routes

Regular users can shop normally, while administrators have access to product management functionality.

---

## 🔐 Authentication

BuyZone uses backend authentication to protect user-specific functionality.

Authentication includes:

- User registration
- User login
- JWT authentication
- Authentication middleware
- Role-based access control
- Protected API routes
- Admin authorization

The application separates **customer** and **admin** functionality.

```text
Guest
  │
  ├── Browse Products
  ├── Search Products
  └── View Product Details
          │
          ▼
       Login
          │
          ▼
     Customer
          │
          ├── Cart
          ├── Wishlist
          ├── Buy Now
          └── Checkout

Admin
  │
  └── Product Management
      ├── Add Product
      ├── Update Product
      └── Delete Product
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Context API
- React Toastify
- React Icons
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- JWT Authentication
- Authentication Middleware
- Role-based Authorization

### Database

- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Vercel — Backend
- MongoDB Atlas — Database

---

## 📂 Project Structure

```text
BuyZone/
│
├── client/
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
│       ├── context/
│       │   ├── AuthContext.jsx
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
├── server/
│   ├── src/
│   │   ├── configs/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── ...
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jayantt19/Shopsy-website.git
```

### 2. Navigate into the Project

```bash
cd Shopsy-website
```

---

## 💻 Frontend Setup

Navigate to the client directory:

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

---

## 🖥️ Backend Setup

Open another terminal and navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

Or:

```bash
npm run server
```

The backend will normally run at:

```text
http://localhost:5000
```

---

## 🔑 Environment Variables

### Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

If running the backend locally with a fixed port, you can also use:

```env
PORT=5000
```

**Never commit `.env` files or secret keys to GitHub.**

---

## 🔄 Application Flow

```text
                 BuyZone
                    │
                    ▼
              React Frontend
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   Products       Search       Auth
       │                         │
       ▼                         ▼
 Product Details          Login / Register
       │                         │
       ├─────────────┐           ▼
       ▼             ▼       Authenticated
     Cart         Wishlist       User
       │             │            │
       └─────────────┴────────────┤
                                  ▼
                               Checkout
                                  │
                                  ▼
                           Express REST API
                                  │
                                  ▼
                              MongoDB
```

---

## 🛒 Cart Functionality

The shopping cart is managed using the **React Context API**.

Users can:

- Add products to the cart
- Increase product quantity
- Decrease product quantity
- Remove products
- View total items
- View total cart value

Example:

```javascript
addToCart(product)
```

The navbar dynamically displays the cart item count.

Cart data is associated with the authenticated user.

---

## ❤️ Wishlist

Authenticated users can manage their own wishlist.

Wishlist functionality includes:

- Add product
- Remove product
- View wishlist
- Wishlist item state
- User-specific wishlist data

---

## 🔍 Product Search

Users can search for products directly from the application.

The search functionality allows users to quickly find products based on their search query.

---

## 🛍️ Buy Now

The **Buy Now** feature allows users to proceed directly from a product details page toward checkout.

```text
Product Details
      │
      ▼
   Buy Now
      │
      ▼
   Checkout
      │
      ▼
 Order Processing
```

---

## 🔐 Protected Features

BuyZone separates public browsing from authenticated shopping functionality.

### Guest Users

Guests can:

- Browse products
- Search products
- View product details

User-specific actions require authentication.

### Authenticated Customers

Customers can:

- Add products to cart
- Manage cart
- Add products to wishlist
- Manage wishlist
- Buy products
- Access checkout

### Admin

Administrators can:

- Manage products
- Add products
- Update products
- Delete products

---

## 🌐 API Structure

The backend follows a REST API architecture.

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

### Cart

```text
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

### Wishlist

```text
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:id
```

### Orders

```text
POST   /api/orders
GET    /api/orders
```

> Exact endpoints may vary depending on the final backend implementation.

---

## 📱 Responsive Design

BuyZone is designed to provide a responsive shopping experience across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile devices
- 📲 Tablets

---

## 🚀 Deployment

### Frontend — Vercel

The React frontend is deployed using Vercel.

Typical deployment process:

```bash
npm install
npm run build
```

Vercel serves the generated:

```text
dist/
```

directory.

The frontend communicates with the deployed backend API.

### Backend — Vercel

The Express backend is deployed separately from the frontend.

Environment variables such as:

```env
MONGO_URI
JWT_SECRET
```

are configured in the Vercel project settings.

### Database — MongoDB Atlas

MongoDB Atlas is used as the production database.

---

## 🔒 Security

The project follows basic security practices including:

- JWT-based authentication
- Protected backend routes
- Authentication middleware
- Role-based authorization
- Environment variables for sensitive configuration
- Password authentication
- MongoDB Atlas
- `.env` excluded from Git
- Separate admin and customer permissions

---

## 📈 Future Improvements

Potential future improvements include:

- 💳 Payment gateway integration
- 📦 Complete order management
- 📊 Admin analytics dashboard
- 🏷️ Product reviews and ratings
- 🔔 Order notifications
- 📧 Email confirmation
- 🖼️ Cloudinary image uploads
- 🔎 Advanced filtering and sorting
- 📄 Pagination
- ⚡ Redis caching
- 🚀 Performance optimization
- 🛡️ Rate limiting
- 📱 Progressive Web App support

---

## 🎯 What I Learned

While building BuyZone, I gained practical experience with:

- React component architecture
- React Router
- Context API
- State management
- REST API development
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Authentication middleware
- Role-based authorization
- CRUD operations
- Frontend/backend integration
- Environment variables
- Git and GitHub
- Vercel deployment
- MongoDB Atlas
- Debugging production deployment issues

---

## 👨‍💻 Author

**Jayant Kumar Sharma**

B.Tech — Computer Science & Engineering

### Skills

```text
React.js | JavaScript | Node.js | Express.js |
MongoDB | Mongoose | HTML | CSS | REST API |
JWT | Git | GitHub
```

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for **learning and portfolio purposes**.
