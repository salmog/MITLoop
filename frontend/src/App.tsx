import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #333' }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>HITL Breakout Trading System (MVP)</h1>
      </header>
      <main style={{ flex: 1, padding: '1rem' }}>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
