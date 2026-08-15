import React from 'react';
import { ShieldCheck, Award, CheckCircle2, MapPin, Users, Sparkles, Leaf, ShoppingBag, Factory, HeartHandshake, Compass, Target, Package } from 'lucide-react';
import logoImg from '../assets/logo.png';
import gmpCertifiedImg from '../assets/gmp_certified.png';

const About = () => {
  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh' }}>
      {/* Hero Banner with Red, Green, Gold accents */}
      <section style={{
        background: 'linear-gradient(135deg, #0F4A24 0%, #083117 100%)',
        color: '#FFFFFF',
        padding: '75px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
              ESTABLISHED 2009 • TASTRAA (PVT) LTD
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
            ABOUT <span style={{ color: '#FFD700' }}>TASTRAA (PVT) LTD</span>
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto', color: '#E2E8F0', fontSize: '1.1rem', fontWeight: '600', lineHeight: '1.6' }}>
            Trusted Rice Flour, Mixture, and Gingelly Oil Using Local Raw Materials & Local Expertise
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">

          {/* Section: COMPANY OVERVIEW */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '32px'
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
                  Founded in 2009, TASTRAA (PVT) LTD is a food production company focused on consistent, safe, and practical pantry staples. We operate at district level, supporting local sourcing and local employment throughout our production process. Our aim is to deliver products customers can rely on, backed by responsive customer care.
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
                  <span>District level operations</span>
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

          {/* Section: VISION & MISSION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
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
                <span style={{ color: '#B45309' }}>Established in 2009</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#334155', fontSize: '1.025rem', lineHeight: '1.75' }}>
                <p>
                  <strong style={{ color: '#0F4A24' }}>TASTRAA (PVT) LTD</strong> was established in 2009 to provide dependable, locally produced food essentials for households and growing businesses. Our work centers on three core categories—<span style={{ color: '#D32F2F', fontWeight: '700' }}>rice flour production</span>, <span style={{ color: '#B45309', fontWeight: '700' }}>mixture production</span>, and <span style={{ color: '#0F4A24', fontWeight: '700' }}>gingelly oil production</span>—delivered with an emphasis on product consistency and clear handling practices.
                </p>
                <p>
                  By sourcing ingredients locally and building our production team locally, we help strengthen the district supply chain while maintaining close control over freshness and availability. We value long-term relationships with customers and startups alike, supported by straightforward communication and attentive customer care.
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
                <div><strong style={{ color: '#0F4A24' }}>Established:</strong> June 2009</div>
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
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#0F4A24',
                  color: '#FFD700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontWeight: '900',
                  fontSize: '0.75rem',
                  border: '2px solid #FFD700',
                  textAlign: 'center'
                }}>
                  GMP
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: '#0F4A24' }}>
                    Good Manufacturing Practice
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
                  District-Level Supply
                </h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Supply products at district level for retail and small business needs.
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
                  District-Level Retailers & Resellers
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
              {/* 1 */}
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
                  Production supported by people from the district community.
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
                "TASTRAA (PVT) LTD produces trusted rice flour, mixture, and gingelly oil using local raw materials and local expertise—made for everyday cooking needs at the district level."
              </h3>

              <div style={{ height: '2px', backgroundColor: 'rgba(255, 215, 0, 0.3)', width: '120px', margin: '0 auto 24px' }}></div>

              <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                Founded in 2009, TASTRAA (PVT) LTD is a food production company focused on consistent, safe, and practical pantry staples. We operate at district level, supporting local sourcing and local employment throughout our production process. Our aim is to deliver products customers can rely on, backed by responsive customer care.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
