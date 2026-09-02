import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const whatsappUrl = "https://wa.me/94779789223?text=Hi%20TASTRAA%20(PVT)%20LTD,%20I%20am%20reaching%20out%20via%20your%20website%20contact%20page.";

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
            gap: '50px'
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
                      <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: '600' }}>
                        076 4400816 / 077 978 9223
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FEE2E2', color: '#D32F2F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={22} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#0F4A24', fontSize: '0.95rem' }}>Email Address:</strong>
                      <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: '600' }}>
                        manivannann1980@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <a href="tel:0764400816" className="btn-green-3d" style={{ padding: '12px 16px', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}>
                  <Phone size={16} />
                  <span>Call Us Now</span>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#25D366', color: '#FFFFFF', padding: '12px 16px', borderRadius: '9999px', fontWeight: '800', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={16} />
                  <span>WhatsApp</span>
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
              <p style={{ color: '#64748B', fontSize: '0.925rem', marginBottom: '24px' }}>
                We are ready to assist with product enquiries, supply requirements and business partnerships.
              </p>

              {submitted ? (
                <div style={{
                  backgroundColor: '#E8F5E9',
                  border: '1px solid #A5D6A7',
                  color: '#0F4A24',
                  padding: '24px',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={40} style={{ margin: '0 auto 12px', color: '#0F4A24' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '6px' }}>Enquiry Submitted!</h4>
                  <p style={{ fontSize: '0.9rem' }}>Thank you for reaching out to TASTRAA (PVT) LTD. We will respond to your message shortly.</p>
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
                      placeholder="e.g. K. Vimalan"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. vimalan@example.com"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. 0771234567"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5' }}
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
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FAF9F5' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your enquiry details..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', resize: 'vertical', backgroundColor: '#FAF9F5' }}
                    />
                  </div>

                  <button type="submit" className="btn-green-3d" style={{ width: '100%', marginTop: '6px' }}>
                    <Send size={18} />
                    <span>Submit Enquiry</span>
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
