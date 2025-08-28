
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    api.get('/products').then(res => {
      setProducts(res.data.items);
    });
  }, []);

  const add = (p) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product === p._id);
      if (idx >= 0) {
        const next = [...prev]; next[idx].qty += 1; return next;
      }
      return [...prev, { product: p._id, name: p.name, price: p.price, qty: 1, image: p.image }];
    });
  };

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  return (
    <div>
      <h2 style={{textAlign:'center', fontWeight:'bold', margin:'32px 0'}}>Products</h2>
      <div style={{maxHeight:'70vh', overflowY:'auto', paddingRight: '8px'}}>
        <div className="grid">
          {products.map(p => (
            <div key={p._id} className="card" style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'18px'}}>
              <img src={p.image} alt={p.name} style={{width:'100%', maxWidth:180, borderRadius:12, marginBottom:12}} />
              <b style={{fontSize:'1.1rem', marginBottom:6}}>{p.name}</b>
              <div style={{marginBottom:6}}>{p.description}</div>
              <div style={{fontWeight:'bold', marginBottom:6}}>₹{p.price}</div>
              <div style={{fontSize:'0.95rem', marginBottom:12}}>Stock: {p.stock}</div>
              <button className="btn" onClick={()=>add(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
