import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', phone: '', email: '', message: '' });
  };

  const whatsappUrl = "https://wa.me/94779789223?text=Hi%20TASTRAA%20(PVT)%20LTD,%20I%20am%20reaching%20out%20via%20your%20website%20contact%20page.";

  return (
    <div>
      {/* Banner */}
      <section style={{
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '70px 0',
        textAlign: 'center',
        borderBottom: '4px solid #D32F2F'
      }}>
        <div className="container">
          <span className="badge-red" style={{ marginBottom: '14px' }}>Get In Touch</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', color: '#FFFFFF' }}>
            Contact TASTRAA (PVT) LTD
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#9CA3AF', fontSize: '1.1rem' }}>
            We look forward to hearing from retail clients, commercial partners, and households.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px'
          }}>
            {/* Left Column: Official Contact Card & Buttons */}
            <div>
              <span className="badge-yellow" style={{ marginBottom: '12px' }}>Direct Communication</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', marginBottom: '24px' }}>
                Head Office & Production Plant
              </h2>

              <div style={{
                backgroundColor: '#FAFAFA',
                padding: '36px',
                borderRadius: '24px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
                  TASTRAA (PVT) LTD
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FFEBEE', color: '#D32F2F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#111827', fontSize: '0.95rem' }}>Address:</strong>
                      <span style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        No. 41, Kalasalai Road,<br />
                        Thirunelvely, Kopay,<br />
                        Jaffna, Sri Lanka
                      </span>
                    </div>
                  </div>

                  {/* Telephones */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#111827', fontSize: '0.95rem' }}>Telephones:</strong>
                      <span style={{ color: '#4B5563', fontSize: '0.95rem' }}>
                        0779789223 / 0212052200
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#111827', fontSize: '0.95rem' }}>Email:</strong>
                      <span style={{ color: '#4B5563', fontSize: '0.95rem' }}>
                        manivannann1980@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <a href="tel:0779789223" className="btn-primary" style={{ padding: '12px 16px', fontSize: '0.9rem', width: '100%' }}>
                  <Phone size={16} />
                  <span>Call Now</span>
                </a>
                <a href="mailto:manivannann1980@gmail.com" className="btn-secondary" style={{ padding: '12px 16px', fontSize: '0.9rem', width: '100%' }}>
                  <Mail size={16} />
                  <span>Send Email</span>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ padding: '12px 16px', fontSize: '0.9rem', width: '100%' }}>
                  <Send size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div style={{
              backgroundColor: '#FAFAFA',
              padding: '40px',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                Send Us a Message
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.925rem', marginBottom: '24px' }}>
                Fill in the form below and our management team will respond promptly.
              </p>

              {submitted ? (
                <div style={{
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  padding: '24px',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={40} style={{ margin: '0 auto 12px', color: '#059669' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Message Received!</h4>
                  <p style={{ fontSize: '0.9rem' }}>Thank you for reaching out to TASTRAA (PVT) LTD. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. K. Vimalan"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Telephone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. 0771234567"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. vimalan@example.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Your Inquiry / Message *</label>
                    <textarea 
                      required 
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please specify product inquiry, order quantity, or partnership details..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                    <Send size={18} />
                    <span>Submit Inquiry</span>
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
