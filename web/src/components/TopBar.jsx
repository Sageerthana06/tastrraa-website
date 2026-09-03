import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const TopBar = () => {
  return (
    <div style={{
      backgroundColor: '#D32F2F',
      color: '#FFFFFF',
      fontSize: '0.8rem',
      fontWeight: '600',
      padding: '8px 0',
      borderBottom: '1px solid rgba(255,255,255,0.15)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Left welcome text (hidden on small mobile to avoid clutter) */}
        <div className="top-bar-welcome" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={13} style={{ color: '#FFD54F', flexShrink: 0 }} />
          <span>Welcome to TASTRAA (PVT) LTD – Quality Food Essentials, Locally Produced!</span>
        </div>

        {/* Right contact details */}
        <div className="top-bar-contact" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="tel:0779789223" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            <Phone size={12} style={{ color: '#FFD54F' }} />
            <span>077 978 9223</span>
          </a>
          <a href="tel:0212052200" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            <Phone size={12} style={{ color: '#FFD54F' }} />
            <span>021 205 2200</span>
          </a>
          <a href="mailto:tastraa2008@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            <Mail size={12} style={{ color: '#FFD54F' }} />
            <span>tastraa2008@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
