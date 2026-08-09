import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck, Home as HomeIcon, Info, Award, ShoppingBag, Mail } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'QUALITY', path: '/services' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#FAFAF7',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #E2E8F0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Brand Logo matching reference image */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src={logoImg} 
              alt="TASTRAA Logo" 
              style={{ height: '56px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#D32F2F', fontWeight: '900', fontSize: '1.05rem', lineHeight: '1', fontFamily: "'Poppins', sans-serif" }}>
                ரேஸ்ரா
              </span>
              <span style={{ color: '#1B5E20', fontWeight: '800', fontSize: '1rem', tracking: '1px', lineHeight: '1.2' }}>
                TASTRAA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    letterSpacing: '0.6px',
                    color: active ? '#1B5E20' : '#2D3748',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none'
                  }}
                >
                  {link.name}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '24px',
                      height: '3px',
                      backgroundColor: '#1B5E20',
                      borderRadius: '3px'
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons - Dark Green Pill Call Button matching image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a 
              href="tel:0212222227" 
              className="btn-green-pill" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0F4A24',
                color: '#FFFFFF',
                padding: '10px 22px',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(15, 74, 36, 0.35)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Phone size={16} style={{ color: '#81C784' }} />
              <span>021 222 2227</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                backgroundColor: '#E8F5E9',
                border: '1px solid #A5D6A7',
                color: '#0F4A24',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={22} style={{ color: '#D32F2F' }} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '16px 20px 24px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    color: active ? '#0F4A24' : '#374151',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: active ? '#E8F5E9' : '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: active ? '1px solid #A5D6A7' : '1px solid #E5E7EB',
                    textDecoration: 'none'
                  }}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <Link
              to="/admin/login"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#6B7280',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '6px',
                textDecoration: 'none'
              }}
            >
              <ShieldCheck size={18} style={{ color: '#0F4A24' }} />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

