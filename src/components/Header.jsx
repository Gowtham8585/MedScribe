import React from 'react';
import { Stethoscope, Globe, HelpCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo-group">
          <img src="/logo.png" alt="MedScribe Logo" style={{ height: '32px', width: '32px', objectFit: 'contain' }} />
          <h1 className="header-title">MedScribe</h1>
        </div>
        <span className="header-tagline">Speak. Review. Prescribe.</span>
      </div>
      
      <div className="header-right">
        <button className="icon-btn" title="Language">
          <Globe size={20} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>EN/TA</span>
        </button>
        <button className="icon-btn" title="Help">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
}
