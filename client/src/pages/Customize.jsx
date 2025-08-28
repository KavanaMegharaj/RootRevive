import React, { useState } from 'react';
import { products } from '../data/products.js';

const hairTypes = ['Wavy', 'Curly', 'Straight', 'Coily'];
const scalpTypes = ['Dry', 'Oily', 'Normal', 'Sensitive'];
const porosityTypes = ['Low', 'Medium', 'High'];
const hairGoals = ['Strengthen', 'Hydrate', 'Increase Volume', 'Repair Damage', 'Enhance Shine'];


function getProductSuggestions(form) {
  // Mapping based on hair/scalp type
  const map = {
    'Curly': ['SOS Custom Repair Shampoo', 'Wave Defining Hair Conditioner'],
    'Dry': ['Anti-Dry Hair Shampoo', 'Deep Hydration Hair Oil'],
    'Wavy': ['Wave Defining Hair Conditioner', 'Smoothening Hair Serum'],
    'Oily': ['Anti-Dandruff Hair Shampoo', 'Wave Defining Hair Conditioner'],
    'Straight': ['Shine Hair Shampoo', 'Deep-Shine Hair Oil'],
    'Coily': ['Damage Repair Hair Serum', 'Deep Nourishing Hair Serum'],
  };
  let selected = [];
  if (form.hairType && map[form.hairType]) {
    selected = map[form.hairType];
  } else if (form.scalpType && map[form.scalpType]) {
    selected = map[form.scalpType];
  }
  // Find products by name from products.js
  return products.filter(p => selected.includes(p.name));
}

export default function Customize() {
  const [form, setForm] = useState({
    hairType: '',
    scalpType: '',
    porosity: '',
    goals: [],
    name: '',
    email: '',
  });
  const [showProducts, setShowProducts] = useState(false);
  const [proceed, setProceed] = useState(false);
  const navigate = window.location ? (path) => window.location.assign(path) : () => {};
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions).map(opt => opt.value);
      setForm(f => ({ ...f, [name]: values.slice(0, 3) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestedProducts(getProductSuggestions(form));
    setShowProducts(true);
  };
  const handleProceed = () => {
    setProceed(true);
    navigate('/cart');
  };

  return (
  <div style={{ minHeight: '100vh', width: '100vw', position: 'fixed', left: 0, top: 0, background: 'url(https://etedge-insights.com/wp-content/uploads/2023/12/shutterstock_2335558143.jpg) center center / cover no-repeat', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', zIndex: 1, overflowX: 'hidden' }}>
    <button onClick={handleSubmit} style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#6b3e26', color: '#fffbe6', fontSize: '1.2rem', border: 'none', borderRadius: '12px', padding: '14px 38px', cursor: 'pointer', fontWeight: 600, letterSpacing: '1px', boxShadow: '0 2px 8px rgba(107,62,38,0.15)', zIndex: 10 }}>
      Get Submit
    </button>
  <div style={{ maxWidth: 540, minHeight: '80vh', margin: '80px auto 32px auto', background: 'rgba(255,255,255,0.96)', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '32px', position: 'relative', zIndex: 2, color: '#111', overflowY: 'visible', overflowX: 'hidden' }}>
        <form onSubmit={handleSubmit}>
          <label style={{ color: '#111' }}>Hair Type:</label>
          <select name="hairType" value={form.hairType} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, minHeight: 48, fontSize: '1.1rem', color: '#222', background: '#fff', border: '1px solid #bbb', borderRadius: 8 }}>
            <option value="">Select</option>
            {hairTypes.map(ht => <option key={ht} value={ht}>{ht}</option>)}
          </select>
          <label style={{ color: '#111' }}>Scalp Type:</label>
          <select name="scalpType" value={form.scalpType} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, minHeight: 48, fontSize: '1.1rem', color: '#222', background: '#fff', border: '1px solid #bbb', borderRadius: 8 }}>
            <option value="">Select</option>
            {scalpTypes.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
          <label style={{ color: '#111' }}>What is your hair porosity?</label>
          <select name="porosity" value={form.porosity} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, minHeight: 48, fontSize: '1.1rem', color: '#222', background: '#fff', border: '1px solid #bbb', borderRadius: 8 }}>
            <option value="">Select</option>
            {porosityTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
          </select>
          <label style={{ color: '#111' }}>Hair Goals (Select up to 3):</label>
          <select name="goals" multiple value={form.goals} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, minHeight: 80, fontSize: '1.1rem', color: '#222', background: '#fff', border: '1px solid #bbb', borderRadius: 8 }}>
            {hairGoals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <label style={{ color: '#111' }}>Your Name:</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, minHeight: 48, fontSize: '1.1rem', color: '#222', background: '#fff', border: '1px solid #bbb', borderRadius: 8 }} />
          <label style={{ color: '#111' }}>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 18, minHeight: 48, fontSize: '1.1rem', color: '#222', background: '#fff', border: '1px solid #bbb', borderRadius: 8 }} />
          <button type="submit" style={{ background: '#6b3e26', color: '#fffbe6', fontSize: '1.1rem', border: 'none', borderRadius: '10px', padding: '10px 24px', cursor: 'pointer', fontWeight: 600, width: '100%', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(107,62,38,0.15)' }}>
            Suggest My Formula
          </button>
        </form>
      </div>
      {showProducts && !proceed && (
        <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '32px', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {suggestedProducts.length > 0 ? suggestedProducts.map(p => (
            <div key={p.name} style={{ width: 300, textAlign: 'center', background: '#e0f7f4', borderRadius: 14, padding: 18, boxShadow: '0 2px 8px rgba(20,184,166,0.08)' }}>
              <img src={p.image} alt={p.name} style={{ width: '100%', borderRadius: 12, marginBottom: 12 }} />
              <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>{p.name}</h3>
              <p style={{ marginBottom: 8 }}>{p.description}</p>
              <div style={{ fontWeight: 'bold', marginBottom: 8 }}>${p.price}</div>
              <div style={{ fontSize: '0.95rem', marginBottom: 12 }}>Stock: {p.stock}</div>
            </div>
          )) : <div style={{ color: '#b91c1c', fontWeight: 500 }}>No matching products found for your selection.</div>}
          <button onClick={handleProceed} style={{ background: '#6b3e26', color: '#fffbe6', fontSize: '1.2rem', border: 'none', borderRadius: '12px', padding: '14px 38px', cursor: 'pointer', fontWeight: 600, letterSpacing: '1px', boxShadow: '0 2px 8px rgba(107,62,38,0.15)', marginTop: 24, width: '100%' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
