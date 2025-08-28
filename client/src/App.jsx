import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Products from './pages/Products.jsx'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Customize from './pages/Customize.jsx';
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Orders from './pages/Orders.jsx'
import AdminProducts from './pages/AdminProducts.jsx'
import AdminOrders from './pages/AdminOrders.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <nav className="nav">
        <div className="nav-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Left: Logo */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
            <NavLink to="/" end style={{ fontWeight: 'bold', fontSize: '2rem', color: '#008080', letterSpacing: '2px', textShadow: '0 2px 8px rgba(0,128,128,0.15)' }}>
              WaveWonders
            </NavLink>
          </div>
          {/* Center: Main Links */}
          <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            {user && <NavLink to="/orders">My Orders</NavLink>}
            {user?.role === 'admin' && <NavLink to="/admin/products">Admin Products</NavLink>}
            {user?.role === 'admin' && <NavLink to="/admin/orders">Admin Orders</NavLink>}
          </div>
          {/* Right: Auth Links */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            {!user && <NavLink to="/login">Login</NavLink>}
            {!user && <NavLink to="/signup">Signup</NavLink>}
            {user && <span className="badge">Hi {user.name} ({user.role})</span>}
            {user && <button className="btn" onClick={()=>{ logout(); navigate('/'); }}>Logout</button>}
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </>
  )
}
