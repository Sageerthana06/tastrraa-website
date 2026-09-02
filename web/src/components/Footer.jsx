import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#111827',
      color: '#9CA3AF',
      paddingTop: '60px',
      paddingBottom: '30px',
      borderTop: '4px solid #D32F2F',
      position: 'relative'
    }}>
      <div className="container">
        <div className="footer-col-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <img
                src={logoImg}
                alt="TASTRAA Logo"
                style={{
                  height: '50px',
                  backgroundColor: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}
              />
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', color: '#D1D5DB' }}>
              TASTRAA (PVT) LTD is a trusted Sri Lankan manufacturer established in June 2008. We specialize in producing premium Rice Flour, traditional Jaffna Mixture, and pure Gingelly Oil.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#FEF3C7' }}>
              <div><strong>Registration No:</strong> PV 00242273</div>
              <div><strong>Established:</strong> June 2008</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', borderLeft: '3px solid #F59E0B', paddingLeft: '10px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#D1D5DB', textDecoration: 'none' }}>HOME</Link></li>
              <li><Link to="/about" style={{ color: '#D1D5DB', textDecoration: 'none' }}>ABOUT US</Link></li>
              <li><Link to="/products" style={{ color: '#D1D5DB', textDecoration: 'none' }}>PRODUCTS</Link></li>
              <li><Link to="/services" style={{ color: '#D1D5DB', textDecoration: 'none' }}>SERVICES</Link></li>
              <li><Link to="/contact" style={{ color: '#D1D5DB', textDecoration: 'none' }}>CONTACT US</Link></li>
              <li><Link to="/admin/login" style={{ color: '#F59E0B', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}><ShieldCheck size={14} /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', borderLeft: '3px solid #D32F2F', paddingLeft: '10px' }}>
              Our Product Lines
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={15} style={{ color: '#F59E0B' }} />
                <span>Rice Flour (Super Fine Texture)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={15} style={{ color: '#F59E0B' }} />
                <span>Traditional Jaffna Mixture</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={15} style={{ color: '#F59E0B' }} />
                <span>Pure Cold-Pressed Gingelly Oil</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={15} style={{ color: '#F59E0B' }} />
                <span>Bulk Commercial Packaging</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', borderLeft: '3px solid #F59E0B', paddingLeft: '10px' }}>
              Official Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: '#D32F2F', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#E5E7EB' }}>
                  No. 41, Kalasalai Road,<br />
                  Thirunelvely, Kopay,<br />
                  Jaffna, Sri Lanka
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />
                <span style={{ color: '#E5E7EB' }}>0779789223 / 0212052200</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />
                <span style={{ color: '#E5E7EB' }}>manivannann1980@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1F2937',
          paddingTop: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.85rem',
          color: '#6B7280'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>TASTRAA (PVT) LTD</strong>. All rights reserved.
          </div>
          <div>
            Quality Food Essentials, Locally Produced in Sri Lanka.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
