import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2, MapPin, Users, Sparkles, Leaf, ShoppingBag, Factory, HeartHandshake, Compass, Target, Package } from 'lucide-react';
import logoImg from '../assets/logo.png';
import gmpCertifiedImg from '../assets/gmp_certified.png';

const About = () => {
  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh' }}>
      {/* Hero Banner with Red, Green, Gold accents & 3D Ambient Orbs */}
      <section style={{
        background: 'linear-gradient(135deg, #083117 0%, #0F4A24 50%, #052210 100%)',
        color: '#FFFFFF',
        padding: '85px 0 75px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glowing Orbs - Red & Yellow */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-120px',
            left: '35%',
            transform: 'translateX(-50%)',
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
            borderRadius: '50%'
          }}
        />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '25%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.35) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
            borderRadius: '50%'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid rgba(255, 215, 0, 0.5)',
              padding: '8px 22px',
              borderRadius: '9999px',
              marginBottom: '20px',
              boxShadow: '0 4px 25px rgba(239, 68, 68, 0.25)',
              backdropFilter: 'blur(10px)',
              maxWidth: '95%'
            }}
          >
            <Sparkles size={16} style={{ color: '#FFD700', flexShrink: 0 }} />
            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: 'clamp(0.7rem, 2.5vw, 0.825rem)', letterSpacing: '1px' }}>
              ESTABLISHED 2008 • TASTRAA (PVT) LTD
            </span>
          </motion.div>

          {/* TASTRAA Main Animated Red & Yellow Shimmer Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.75, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 },
              scale: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
              backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' }
            }}
            style={{
              fontSize: 'clamp(2.8rem, 9.5vw, 5.5rem)',
              fontWeight: '900',
              marginBottom: '4px',
              backgroundImage: 'linear-gradient(90deg, #FFD700 0%, #FF3333 30%, #FFD700 60%, #FF3333 85%, #FFD700 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Poppins', sans-serif",
              lineHeight: '1.05',
              letterSpacing: '4px',
              filter: 'drop-shadow(0 8px 25px rgba(220, 38, 38, 0.45))'
            }}
          >
            TASTRAA
          </motion.h1>

          {/* (PVT) LTD Animated Subtitle with Red & Gold highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1.1rem, 3.8vw, 1.7rem)',
              fontWeight: '900',
              letterSpacing: '6px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.4))'
            }}
          >
            <span style={{ color: '#FF3333' }}>(PVT)</span> <span style={{ color: '#FFD700' }}>LTD</span>
          </motion.div>

          {/* Paragraph Animated text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '780px', margin: '0 auto', color: '#E2E8F0', fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)', fontWeight: '600', lineHeight: '1.65' }}
          >
            Trusted Rice Flour, Mixture, and Gingelly Oil Using Local Raw Materials & Local Expertise
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">

          {/* Section 1: VISION & MISSION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {/* VISION CARD */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1.5px solid #FDE68A',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.05)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#F59E0B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#111827', margin: '0 0 10px 0' }}>
                Vision
              </h3>
              <p style={{ margin: '0 0 6px 0', color: '#4B5563', fontSize: '1.05rem', fontWeight: '600' }}>
                Genuineness, Hard Work, and Elevation
              </p>
              <p style={{ margin: 0, color: '#D32F2F', fontSize: '0.9rem', fontWeight: '800' }}>
                உண்மை • உழைப்பு • உயர்வு
              </p>
            </div>

            {/* MISSION CARD */}
            <div style={{
              backgroundColor: '#F0FDF4',
              border: '1.5px solid #DCFCE7',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.05)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#047857',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#111827', margin: '0 0 10px 0' }}>
                Mission
              </h3>
              <p style={{ margin: 0, color: '#4B5563', fontSize: '1.05rem', fontWeight: '600', lineHeight: '1.6' }}>
                Manufacture and supply/distribute quality products for mankind.
              </p>
            </div>
          </div>

          {/* Section 2: COMPANY OVERVIEW */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '60px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ECFDF5',
                  color: '#047857',
                  border: '1px solid #A7F3D0',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}>
                  <ShieldCheck size={14} />
                  <span>COMPANY OVERVIEW</span>
                </div>

                <p style={{
                  color: '#4B5563',
                  fontSize: '1.05rem',
                  lineHeight: '1.75',
                  margin: 0
                }}>
                  Founded in 2008, TASTRAA (PVT) LTD is a food production company focused on consistent, safe, and practical pantry staples. We operate at Island level, supporting local sourcing and local employment throughout our production process. Our aim is to deliver products customers can rely on, backed by responsive customer care.
                </p>
              </div>

              <div style={{
                backgroundColor: '#F4FBF7',
                borderRadius: '20px',
                padding: '24px 28px',
                border: '1px solid #E6F4ED',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1F2937', fontWeight: '700', fontSize: '0.975rem' }}>
                  <MapPin size={18} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>Island level operations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1F2937', fontWeight: '700', fontSize: '0.975rem' }}>
                  <Leaf size={18} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>Local sourcing and local expertise</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1F2937', fontWeight: '700', fontSize: '0.975rem' }}>
                  <Package size={18} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>Everyday cooking essentials</span>
                </div>
              </div>
            </div>
          </div>
          {/* Section: OUR STORY & CORPORATE PROFILE */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ backgroundColor: '#FEE2E2', color: '#D32F2F', padding: '4px 12px', borderRadius: '9999px', fontWeight: '800', fontSize: '0.75rem', letterSpacing: '1px' }}>
                  OUR STORY & HERITAGE
                </span>
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24', marginBottom: '20px', lineHeight: '1.2' }}>
                Dependable Food Manufacturing <br />
                <span style={{ color: '#B45309' }}>Established in 2008</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#334155', fontSize: '1.025rem', lineHeight: '1.75' }}>
                <p>
                  <strong style={{ color: '#0F4A24' }}>TASTRAA (PVT) LTD</strong> was established in 2008 to provide dependable, locally produced food essentials for households and growing businesses. Our work centers on core categories—<span style={{ color: '#D32F2F', fontWeight: '700' }}>Raw Red Rice</span>, <span style={{ color: '#D32F2F', fontWeight: '700' }}>Raw Red Rice Flour</span>, <span style={{ color: '#D32F2F', fontWeight: '700' }}>Roasted Red Rice Flour</span>, <span style={{ color: '#B45309', fontWeight: '700' }}>mixture production</span>, and <span style={{ color: '#0F4A24', fontWeight: '700' }}>gingelly oil production</span>—delivered with an emphasis on product consistency and clear handling practices.
                </p>
                <p>
                  By sourcing ingredients locally and building our production team locally, we help strengthen the Island supply chain while maintaining close control over freshness and availability. We value long-term relationships with customers and startups alike, supported by straightforward communication and attentive customer care.
                </p>
              </div>
            </div>

            {/* Corporate Profile Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '36px',
              borderRadius: '28px',
              border: '2px solid #E8F5E9',
              boxShadow: '0 16px 40px rgba(15, 74, 36, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
                <img src={logoImg} alt="TASTRAA Logo" style={{ height: '54px', objectFit: 'contain' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', color: '#0F4A24' }}>
                    TASTRAA <span style={{ color: '#D32F2F' }}>(PVT) LTD</span>
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: '800' }}>Official Sri Lankan Entity</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem', color: '#334155' }}>
                <div><strong style={{ color: '#0F4A24' }}>Entity Name:</strong> TASTRAA (PVT) LTD</div>
                <div><strong style={{ color: '#0F4A24' }}>Established:</strong> June 2008</div>
                <div><strong style={{ color: '#0F4A24' }}>Registration No:</strong> PV 00242273</div>
                <div><strong style={{ color: '#0F4A24' }}>Factory & Office Address:</strong></div>
                <div style={{ color: '#475569', paddingLeft: '14px', borderLeft: '3px solid #D32F2F', fontWeight: '600' }}>
                  No. 41, Kalasalai Road, Thirunelvely,<br />
                  Kopay, Jaffna, Sri Lanka
                </div>
                <div><strong style={{ color: '#0F4A24' }}>Contact Phone:</strong> 076 4400816 / 077 978 9223</div>
              </div>

              {/* GMP Certification Badge */}
              <div style={{
                marginTop: '24px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FCD34D',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <img
                  src={gmpCertifiedImg}
                  alt="GMP Certified Practice"
                  style={{
                    height: '52px',
                    width: 'auto',
                    objectFit: 'contain',
                    flexShrink: 0,
                    borderRadius: '6px'
                  }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: '#0F4A24' }}>
                    Good Manufacturing Practice (GMP)
                  </h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#B45309', fontWeight: '600' }}>
                    Strict hygiene & quality handling standards
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: CORE PRODUCTS / SERVICES */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: '#D32F2F', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                OFFERINGS
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px' }}>
                CORE PRODUCTS & SERVICES
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {/* Product 1 */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '22px', border: '2px solid #E8F5E9', textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: '#E8F5E9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={26} style={{ color: '#0F4A24' }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F4A24', marginBottom: '10px' }}>
                  RED RICE FLOUR
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Produced with a focus on uniform texture and everyday cooking usability.
                </p>
              </div>

              {/* Product 2 */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '22px', border: '2px solid #FEF3C7', textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: '#FEF3C7', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={26} style={{ color: '#B45309' }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#B45309', marginBottom: '10px' }}>
                  MIXTURE
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Manufactured mixture products specially suited for everyday snack consumption.
                </p>
              </div>

              {/* Product 3 */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '22px', border: '2px solid #FEE2E2', textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: '#FEE2E2', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={26} style={{ color: '#D32F2F' }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#D32F2F', marginBottom: '10px' }}>
                  GINGELLY OIL
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Produced with strict attention to cleanliness, purity, and batch consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Section: WHAT WE DO (Capabilities Summary) */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: '#B45309', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                CAPABILITIES SUMMARY
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px' }}>
                WHAT WE DO
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '20px', border: '2px solid #E8F5E9' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F4A24', marginBottom: '10px' }}>
                  Customer Loyalty & Order Commitment
                </h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Our company shows loyalty to customer orders by fulfilling commitments accurately, communicating openly, and prioritizing customer satisfaction at every step.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '20px', border: '2px solid #E8F5E9' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#D32F2F', marginBottom: '10px' }}>
                  Red Rice Flour Production
                </h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Produce red rice flour with a focus on uniform texture and usability.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '20px', border: '2px solid #FEF3C7' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#B45309', marginBottom: '10px' }}>
                  Mixture Production
                </h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Manufacture mixture products suited to everyday consumption.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '20px', border: '2px solid #E8F5E9' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F4A24', marginBottom: '10px' }}>
                  Gingelly Oil Production
                </h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Produce gingelly oil with attention to cleanliness and batch consistency.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '20px', border: '2px solid #FEE2E2' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F4A24', marginBottom: '10px' }}>
                  Island-Level Supply
                </h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Supply products at Island level for retail and small business needs.
                </p>
              </div>
            </div>
          </div>

          {/* Section: WHO WE SERVE (Target Audience / Industries) */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: '#D32F2F', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                TARGET AUDIENCE / INDUSTRIES
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px' }}>
                WHO WE SERVE
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '26px'
            }}>
              {/* Startups & Small Businesses */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '22px', border: '2px solid #FEE2E2', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEE2E2', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Factory size={24} style={{ color: '#D32F2F' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#D32F2F', marginBottom: '10px' }}>
                  Startups & Small Food Businesses
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Seeking reliable, consistent supply for production and food service operations.
                </p>
              </div>

              {/* Households */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '22px', border: '2px solid #E8F5E9', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#E8F5E9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} style={{ color: '#0F4A24' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0F4A24', marginBottom: '10px' }}>
                  Local Customers & Households
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Purchasing staple food products for daily kitchen and household cooking.
                </p>
              </div>

              {/* Retailers */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '22px', border: '2px solid #FEF3C7', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEF3C7', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={24} style={{ color: '#B45309' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#B45309', marginBottom: '10px' }}>
                  Island-Level Retailers & Resellers
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Distributing quality pantry staples across regional store networks.
                </p>
              </div>
            </div>
          </div>

          {/* Section: WHY CHOOSE US */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '40px',
            borderRadius: '28px',
            border: '2px solid #E8F5E9',
            boxShadow: '0 12px 36px rgba(15, 74, 36, 0.05)',
            marginBottom: '60px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span style={{ color: '#D32F2F', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                OUR ADVANTAGES
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px' }}>
                WHY CHOOSE US
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {/* 1: Genuineness, Hard Work, and Elevation */}
              <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#FAF9F5', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Sparkles size={20} style={{ color: '#B45309' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#B45309' }}>Genuineness, Hard Work & Elevation</h4>
                </div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.925rem', lineHeight: '1.6' }}>
                  Built on genuine values, dedicated hard work, and elevating food quality and community trust at every level.
                </p>
              </div>

              {/* 2 */}
              <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#FAF9F5', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Leaf size={20} style={{ color: '#0F4A24' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#0F4A24' }}>Local Sourcing</h4>
                </div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.925rem', lineHeight: '1.6' }}>
                  Raw materials selected from local suppliers where available.
                </p>
              </div>

              {/* 2 */}
              <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#FAF9F5', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Users size={20} style={{ color: '#D32F2F' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#D32F2F' }}>Local Workforce</h4>
                </div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.925rem', lineHeight: '1.6' }}>
                  Production supported by people from the Island community.
                </p>
              </div>

              {/* 3 */}
              <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#FAF9F5', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Award size={20} style={{ color: '#B45309' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#B45309' }}>Consistency-First Approach</h4>
                </div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.925rem', lineHeight: '1.6' }}>
                  Repeatable production practices to reduce variability.
                </p>
              </div>

              {/* 4 */}
              <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#FAF9F5', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <HeartHandshake size={20} style={{ color: '#0F4A24' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#0F4A24' }}>Practical Service</h4>
                </div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.925rem', lineHeight: '1.6' }}>
                  Clear coordination on orders and availability, with customer care as a priority.
                </p>
              </div>
            </div>
          </div>

          {/* Positioning Statement & Company Overview Block */}
          <div style={{
            backgroundColor: '#0F4A24',
            color: '#FFFFFF',
            borderRadius: '28px',
            padding: '48px 36px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(15, 74, 36, 0.2)'
          }}>
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                POSITIONING STATEMENT & COMPANY OVERVIEW
              </span>

              <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: '800', color: '#FFFFFF', marginTop: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
                "TASTRAA (PVT) LTD produces trusted rice flour, mixture, and gingelly oil using local raw materials and local expertise—made for everyday cooking needs at the Island level."
              </h3>

              <div style={{ height: '2px', backgroundColor: 'rgba(255, 215, 0, 0.3)', width: '120px', margin: '0 auto 24px' }}></div>

              <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                Founded in 2008, TASTRAA (PVT) LTD is a food production company focused on consistent, safe, and practical pantry staples. We operate at Island level, supporting local sourcing and local employment throughout our production process. Our aim is to deliver products customers can rely on, backed by responsive customer care.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
