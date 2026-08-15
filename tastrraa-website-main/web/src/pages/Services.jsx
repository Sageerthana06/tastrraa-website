import React from 'react';
import { Factory, Truck, Handshake, Leaf, HeartHandshake, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceCards = [
    {
      title: "FOOD PRODUCTION",
      desc: "Reliable production of everyday food essentials.",
      icon: <Factory size={30} style={{ color: '#D32F2F' }} />,
      bgColor: "#FEE2E2",
      borderColor: "#FCA5A5"
    },
    {
      title: "PRODUCT SUPPLY",
      desc: "District-level supply for households, retailers and small businesses.",
      icon: <Truck size={30} style={{ color: '#0F4A24' }} />,
      bgColor: "#E8F5E9",
      borderColor: "#A5D6A7"
    },
    {
      title: "BUSINESS SUPPLY SUPPORT",
      desc: "Practical coordination for startups and growing food businesses.",
      icon: <Handshake size={30} style={{ color: '#B45309' }} />,
      bgColor: "#FEF3C7",
      borderColor: "#FCD34D"
    },
    {
      title: "LOCAL SOURCING",
      desc: "Use of locally sourced raw materials where available.",
      icon: <Leaf size={30} style={{ color: '#0F4A24' }} />,
      bgColor: "#E8F5E9",
      borderColor: "#A5D6A7"
    },
    {
      title: "CUSTOMER SUPPORT",
      desc: "Clear communication and responsive assistance for product and order enquiries.",
      icon: <HeartHandshake size={30} style={{ color: '#D32F2F' }} />,
      bgColor: "#FEE2E2",
      borderColor: "#FCA5A5"
    }
  ];

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
              WHAT WE OFFER • TASTRAA (PVT) LTD
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
            OUR <span style={{ color: '#FFD700' }}>SERVICES</span>
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Professional Food Production & Distribution Services centered on Red Rice Flour, Mixture, and Gingelly Oil.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {serviceCards.map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '34px',
                  border: `2px solid ${service.borderColor}`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '16px',
                  backgroundColor: service.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0F4A24', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', margin: 0 }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div style={{
            background: 'linear-gradient(135deg, #0F4A24 0%, #083117 100%)',
            color: '#FFFFFF',
            borderRadius: '28px',
            padding: '50px 30px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(15, 74, 36, 0.25)'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '14px', color: '#FFFFFF' }}>
              Need Reliable Food Product Supply?
            </h2>
            <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1.025rem', lineHeight: '1.6' }}>
              Contact TASTRAA (PVT) LTD to discuss supply coordination, wholesale orders, or startup partnerships.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-green-3d" style={{ backgroundColor: '#FFFFFF', color: '#0F4A24' }}>
                <span>CONTACT US</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/94779789223?text=Hi%20TASTRAA,%20I%20am%20reaching%20out%20for%20a%20service%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#0F4A24',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>WHATSAPP DIRECT</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Services;
