

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'url(https://img.freepik.com/premium-photo/side-profile-portrait-young-girl-her-hair-blowing-wind-as-she-looks-into_891336-67951.jpg) center/cover no-repeat', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.35)' }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
        <h1 style={{ color: '#fff', fontWeight: 'bold', fontSize: '3rem', textAlign: 'center', marginBottom: '1rem', letterSpacing: '2px' }}>
          REVOLUTIONIZE YOUR HAIR ROUTINE
        </h1>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem', fontWeight: 400 }}>
          Custom haircare for every hair type
        </h2>
        <button style={{ background: '#f6c453', color: '#222', fontSize: '1.3rem', border: 'none', borderRadius: '20px', padding: '16px 32px', cursor: 'pointer', fontWeight: 500, boxShadow: '0 2px 8px rgba(246,196,83,0.15)' }}
          onClick={() => navigate('/customize')}
        >
          Customize My Formula
        </button>
      </div>
      <footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', background: 'linear-gradient(90deg,#f6c453 0%,#e0f7f4 100%)', color: '#008080', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '28px 0', fontWeight: 'bold', fontSize: '1.3rem', opacity: 0.98, zIndex: 10 }}>
        <span>100% Cruelty-Free</span>
        <span>100% Sulfate-Free</span>
        <span>Paraben-Free</span>
        <span>Vegan and Dermatologist Approved</span>
      </footer>
    </div>
  );
}
