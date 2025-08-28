import { useEffect, useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'
import { setAuth } from '../services/api'

export default function Cart() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [address, setAddress] = useState('');
  const { user, token } = useAuth();

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  // Place order with product _id
  const placeOrder = async () => {
    if (!user) return alert('Login first');
    if (!address.trim()) return alert('Enter address');
    setAuth(token);
    try {
      const items = cart.map(({ product, qty }) => ({ product, qty })); // product is _id
      const { data } = await api.post('/orders', { items, address });
      alert('Order placed! id: ' + data._id);
      setCart([]);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  // Cart operations by product _id
  const inc = (id) => setCart(prev => prev.map(it => it.product === id ? { ...it, qty: it.qty + 1 } : it));
  const dec = (id) => setCart(prev => prev.map(it => it.product === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it));
  const del = (id) => setCart(prev => prev.filter(it => it.product !== id));

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map(it => (
        <div key={it.product} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {it.image && <img src={it.image} alt={it.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 12 }} />}
            <div>
              <b>{it.name}</b>
              <div>₹{it.price} × {it.qty} = ₹{it.price * it.qty}</div>
            </div>
          </div>
          <div className="row">
            <button className="btn" onClick={() => dec(it.product)}>-</button>
            <button className="btn" onClick={() => inc(it.product)}>+</button>
            <button className="btn" onClick={() => del(it.product)}>Remove</button>
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="card">
          <div className="row">
            <input className="input" style={{ flex: 1 }} placeholder="Delivery address" value={address} onChange={e => setAddress(e.target.value)} />
            <button className="btn" onClick={placeOrder}>Place Order (₹{total})</button>
          </div>
        </div>
      )}
    </div>
  );
}
