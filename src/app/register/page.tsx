'use client';

import dynamic from 'next/dynamic';

const RegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false,
  loading: () => (
    <div
      className="section container"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: '2rem' }}>⚡</div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Loading Registration...</h2>
      <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Preparing secure payment environment...</p>
    </div>
  ),
});

export default function RegisterPage() {
  return <RegisterForm />;
}
