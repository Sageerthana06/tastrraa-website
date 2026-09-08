import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

// Official Facebook Glyph SVG
const FacebookIcon = ({ size = 20, color = "currentColor", style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Official WhatsApp Glyph SVG
const WhatsAppIcon = ({ size = 20, color = "#FFFFFF", style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.633-.929-2.235-.245-.587-.494-.507-.678-.517-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376-.276.3-1.054 1.03-1.054 2.512 0 1.482 1.079 2.913 1.23 3.114.15.2 2.123 3.242 5.143 4.547.718.311 1.279.497 1.716.636.721.23 1.377.197 1.896.12.577-.087 1.78-.728 2.03-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.352z" />
    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.986.58 3.834 1.583 5.402L2 22l4.757-1.547A9.957 9.957 0 0 0 12.004 22c5.523 0 10.004-4.48 10.004-9.996C22.008 6.48 17.527 2 12.004 2zm0 18.286c-1.776 0-3.435-.502-4.847-1.373l-.348-.216-3.23.847.863-3.149-.226-.36A8.258 8.258 0 0 1 3.718 12.004C3.718 7.435 7.435 3.718 12.004 3.718c4.57 0 8.286 3.717 8.286 8.286 0 4.568-3.717 8.282-8.286 8.282z" />
  </svg>
);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

  const facebookUrl = "https://www.facebook.com/share/1EsYXLyLYH/";
  const whatsappDirectUrl = "https://wa.me/94779789223?text=Hi%20TASTRAA%20(PVT)%20LTD,%20I%20am%20reaching%20out%20via%20your%20website%20contact%20page.";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct formatted message for WhatsApp
    const text = `*New Enquiry - TASTRAA Website*%0A%0A*Name:* ${encodeURIComponent(formState.name)}%0A*Email:* ${encodeURIComponent(formState.email)}%0A*Phone:* ${encodeURIComponent(formState.phone)}%0A*Subject:* ${encodeURIComponent(formState.subject)}%0A*Message:* ${encodeURIComponent(formState.message)}`;

    const targetWhatsappUrl = `https://wa.me/94779789223?text=${text}`;
    setLastWhatsappUrl(targetWhatsappUrl);

    // Open WhatsApp in new tab
    window.open(targetWhatsappUrl, "_blank");

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0F4A24 0%, #083117 100%)',
        color: '#FFFFFF',
        padding: '75px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '6px 18px',
            borderRadius: '9999px',
            marginBottom: '16px'
          }}>
            <Sparkles size={16} style={{ color: '#FFD700' }} />
            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '0.825rem', letterSpacing: '1px' }}>
              GET IN TOUCH • TASTRAA (PVT) LTD
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
            CONTACT <span style={{ color: '#FFD700' }}>TASTRAA</span>
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.6' }}>
            We are ready to assist with product enquiries, supply requirements and business partnerships.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '50px',
            alignItems: 'start'
          }}>
            {/* Left Column: Official Contact Info */}
            <div>
              <span style={{ color: '#D32F2F', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                DIRECT COMMUNICATION
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px', marginBottom: '24px' }}>
                Head Office & Plant
              </h2>

              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '36px',
                borderRadius: '24px',
                border: '2px solid #E8F5E9',
                boxShadow: '0 10px 30px rgba(15, 74, 36, 0.05)',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F4A24', marginBottom: '20px' }}>
                  TASTRAA (PVT) LTD
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#E8F5E9', color: '#0F4A24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#0F4A24', fontSize: '0.95rem' }}>Factory & Office Address:</strong>
                      <span style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        No. 41, Kalasalai Road,<br />
                        Thirunelvely, Kopay,<br />
                        Jaffna, Sri Lanka
                      </span>
                    </div>
                  </div>

                  {/* Telephones */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#0F4A24', fontSize: '0.95rem' }}>Phone Numbers:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        <a href="tel:0764400816" style={{ color: '#475569', fontSize: '0.95rem', fontWeight: '700', textDecoration: 'none' }}>076 4400816</a>
                        <span style={{ color: '#CBD5E1' }}>/</span>
                        <a href="tel:0779789223" style={{ color: '#475569', fontSize: '0.95rem', fontWeight: '700', textDecoration: 'none' }}>077 978 9223</a>


                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FEE2E2', color: '#D32F2F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={22} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#0F4A24', fontSize: '0.95rem' }}>Email Address:</strong>
                      <a href="mailto:tastraa2008@gmail.com" style={{ color: '#475569', fontSize: '0.95rem', fontWeight: '600', textDecoration: 'none' }}>
                        tastraa2008@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Facebook Page */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FacebookIcon size={22} color="#1877F2" />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#0F4A24', fontSize: '0.95rem' }}>Official Facebook Page:</strong>
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#1877F2',
                          fontSize: '0.95rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          textDecoration: 'none'
                        }}
                      >
                        <span>facebook.com/TASTRAA</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                <a href="tel:0764400816" className="btn-green-3d" style={{ padding: '12px 16px', fontSize: '0.8rem', width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                  <Phone size={14} />
                  <span>Call Us Now</span>
                </a>
                <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#25D366', color: '#FFFFFF', padding: '12px 16px', borderRadius: '9999px', fontWeight: '800', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)' }}>
                  <WhatsAppIcon size={16} color="#FFFFFF" />
                  <span>WhatsApp</span>
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#1877F2', color: '#FFFFFF', padding: '12px 16px', borderRadius: '9999px', fontWeight: '800', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(24, 119, 242, 0.3)' }}>
                  <FacebookIcon size={16} color="#FFFFFF" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '24px',
              border: '2px solid #E8F5E9',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F4A24', marginBottom: '8px' }}>
                Send an Enquiry
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.925rem', marginBottom: '24px', lineHeight: '1.5' }}>
                We are ready to assist with product enquiries, supply requirements and business partnerships.
              </p>

              {submitted ? (
                <div style={{
                  backgroundColor: '#E8F5E9',
                  border: '2px solid #A5D6A7',
                  color: '#0F4A24',
                  padding: '32px 24px',
                  borderRadius: '18px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={46} style={{ margin: '0 auto 12px', color: '#16A34A' }} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px' }}>Enquiry Opened in WhatsApp!</h4>
                  <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: '1.6', marginBottom: '20px' }}>
                    Thank you for reaching out to TASTRAA (PVT) LTD. Your enquiry details have been sent via WhatsApp to <strong>+94 77 978 9223</strong>.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {lastWhatsappUrl && (
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          padding: '10px 20px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <WhatsAppIcon size={16} color="#FFFFFF" />
                        <span>Open WhatsApp Again</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-green-3d"
                      style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                    >
                      <span>Send Another Enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Your Name"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. yourname@gmail.com"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. 077 123 4567"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Subject *</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Product Wholesale Enquiry"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your enquiry details here..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', resize: 'vertical', backgroundColor: '#FAF9F5', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      marginTop: '6px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '14px 24px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '1rem',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#20BD5A';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#25D366';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.35)';
                    }}
                  >
                    <WhatsAppIcon size={20} color="#FFFFFF" />
                    <span>SEND VIA WHATSAPP</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
