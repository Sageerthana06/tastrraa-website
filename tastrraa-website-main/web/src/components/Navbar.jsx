import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'SERVICES', path: '/services' },
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
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(250, 249, 245, 0.98)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: scrolled ? '0 10px 30px rgba(15, 74, 36, 0.08)' : '0 2px 15px rgba(0, 0, 0, 0.04)',
      borderBottom: '1px solid rgba(15, 74, 36, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: scrolled ? '68px' : '78px',
          padding: '8px 0',
          transition: 'all 0.3s ease'
        }}>
          {/* Brand Logo - English Branding */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img
              src={logoImg}
              alt="TASTRAA Logo"
              style={{ height: scrolled ? '44px' : '52px', width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="logo-text-gradient" style={{ fontWeight: '900', fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', letterSpacing: '0.5px', lineHeight: '1.1', fontFamily: "'Poppins', sans-serif" }}>
                TASTRAA <span style={{ fontSize: '0.7rem', fontWeight: '800' }}>(PVT) LTD</span>
              </span>
              <span style={{ color: '#B45309', fontWeight: '700', fontSize: '0.675rem', letterSpacing: '0.3px', marginTop: '2px' }}>
                Dependable Local Food Essentials
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    letterSpacing: '0.6px',
                    color: active ? '#0F4A24' : '#334155',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'color 0.2s ease',
                    textDecoration: 'none'
                  }}
                >
                  {link.name}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0',
                      right: '0',
                      height: '3px',
                      backgroundColor: '#0F4A24',
                      borderRadius: '3px',
                      boxShadow: '0 2px 8px rgba(15, 74, 36, 0.3)'
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="tel:0764400816"
              className="btn-green-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0F4A24',
                color: '#FFFFFF',
                padding: '9px 18px',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '0.8rem',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(15, 74, 36, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid #165B2E'
              }}
            >
              <Phone size={15} style={{ color: '#FFD700' }} />
              <span>CALL US: 076 4400816</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                backgroundColor: '#E8F5E9',
                border: '1px solid #A5D6A7',
                color: '#0F4A24',
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
              aria-label="Toggle Navigation Menu"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    color: active ? '#0F4A24' : '#374151',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: active ? '#E8F5E9' : '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: active ? '1px solid #A5D6A7' : '1px solid #E2E8F0',
                    textDecoration: 'none'
                  }}
                >
                  <span>{link.name}</span>
                  {active && <span style={{ color: '#0F4A24', fontWeight: '900' }}>●</span>}
                </Link>
              );
            })}

            <a
              href="tel:0764400816"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '0.875rem',
                fontWeight: '800',
                color: '#FFFFFF',
                backgroundColor: '#D32F2F',
                padding: '12px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
                textDecoration: 'none'
              }}
            >
              <Phone size={16} />
              <span>CALL US: 076 4400816</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

