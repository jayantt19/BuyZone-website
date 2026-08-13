import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider from "./context/AuthContext";
import CartProvider from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <WishlistProvider>
  <CartProvider>
    <App />
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </BrowserRouter>,
)
