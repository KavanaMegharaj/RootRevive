import React from 'react';

export default function About() {
  return (
  <div style={{ minHeight: '100vh', width: '100vw', background: '#f7fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '48px', overflow: 'hidden' }}>

      <img src="https://etedge-insights.com/wp-content/uploads/2023/12/shutterstock_2335558143.jpg" alt="Natural Ingredients" style={{ width: '480px', maxWidth: '90vw', borderRadius: '18px', boxShadow: '0 2px 16px rgba(0,0,0,0.12)', marginBottom: '32px' }} />
      <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: 12, color: '#008080', textShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>About Us</h2>
      <p style={{ fontSize: '1.1rem', color: '#222', maxWidth: 700, margin: '0 auto', textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        At Wave Wonders, we believe that every strand of hair is unique and deserves the best care. Our mission is to create products tailored to your hair's individual needs, ensuring your hair stays healthy, beautiful, and full of life. Whether you're embracing curls, waves, or straight styles, our product line is crafted to empower you to express yourself confidently. Thank you for choosing Wave Wonders — where every day is a good hair day.
      </p>
    </div>
  );
}
