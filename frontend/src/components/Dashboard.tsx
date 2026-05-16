import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [healthStatus, setHealthStatus] = useState<string>('Checking backend...');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/health`)
      .then(res => res.json())
      .then(data => setHealthStatus(`Backend Status: ${data.status} (v${data.version})`))
      .catch(() => setHealthStatus('Backend Status: DISCONNECTED'));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1rem', height: '100%' }}>
      <div style={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#666' }}>[ TradingView Lightweight Charts Placeholder ]</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ backgroundColor: '#1e1e1e', padding: '1rem', border: '1px solid #333', borderRadius: '4px' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>System Health</h3>
          <p style={{ margin: 0, color: healthStatus.includes('healthy') ? '#4ade80' : '#f87171' }}>
            {healthStatus}
          </p>
        </div>
        <div style={{ backgroundColor: '#1e1e1e', padding: '1rem', border: '1px solid #333', borderRadius: '4px', flex: 1 }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Regime & Risk</h3>
          <p style={{ color: '#666' }}>[ Breadth Score Placeholder ]</p>
          <p style={{ color: '#666' }}>[ Risk Multiplier Placeholder ]</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
