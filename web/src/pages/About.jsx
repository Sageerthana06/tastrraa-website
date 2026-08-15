import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, MapPin, Users, Sparkles, Wheat } from 'lucide-react';
import logoImg from '../assets/logo.png';

const About = () => {
  return (
    <div>
      {/* Banner */}
      <section style={{
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '70px 0',
        textAlign: 'center',
        borderBottom: '4px solid #D32F2F',
        position: 'relative'
      }}>
        <div className="container">
          <span className="badge-red" style={{ marginBottom: '14px' }}>Established June 2009</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', color: '#FFFFFF' }}>
            About TASTRAA (PVT) LTD
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#9CA3AF', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Registration No: PV 00242273 • Dependable Sri Lankan Food Manufacturer Based in Jaffna.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          {/* Story & Heritage */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <div>
              <span className="badge-yellow" style={{ marginBottom: '12px' }}>Our Story</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
                A Journey of Quality & Local Dedication
              </h2>
              <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '16px' }}>
                TASTRAA (PVT) LTD was established in <strong>June 2009</strong> with a clear vision: to produce premium-grade food essentials locally in Sri Lanka while upholding uncompromising quality standards.
              </p>
              <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Operating from our main processing facility at No. 41, Kalasalai Road, Thirunelvely, Kopay, Jaffna, we specialize in three core food production sectors: <strong>Rice Flour</strong>, <strong>Jaffna Mixture</strong>, and <strong>Pure Gingelly Oil</strong>.
              </p>
              <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Over the past decade and a half, TASTRAA has earned the trust of Sri Lankan households, grocery distributors, and culinary establishments by remaining committed to fresh ingredients, local farmers, and traditional recipes.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FAFAFA',
              padding: '40px',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
                <img src={logoImg} alt="TASTRAA Logo" style={{ height: '56px', objectFit: 'contain' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#111827' }}>TASTRAA (PVT) LTD</h3>
                  <span style={{ fontSize: '0.85rem', color: '#D32F2F', fontWeight: '700' }}>Official Corporate Entity</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
                <div><strong>Company Name:</strong> TASTRAA (PVT) LTD</div>
                <div><strong>Established:</strong> June 2009</div>
                <div><strong>Registration No:</strong> PV 00242273</div>
                <div><strong>Head Office & Processing Plant:</strong></div>
                <div style={{ color: '#4B5563', paddingLeft: '12px', borderLeft: '3px solid #F59E0B' }}>
                  No. 41, Kalasalai Road,<br />
                  Thirunelvely, Kopay,<br />
                  Jaffna, Sri Lanka
                </div>
                <div><strong>Key Products:</strong> Rice Flour, Mixture, Gingelly Oil</div>
              </div>
            </div>
          </div>

          {/* Mission, Vision & Values */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {/* Mission */}
            <div style={{
              backgroundColor: '#FFFBEB',
              padding: '36px',
              borderRadius: '20px',
              border: '2px solid #FDE68A'
            }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#F59E0B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '20px' }}>
                <Award size={26} style={{ margin: 'auto' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
                Our Mission
              </h3>
              <p style={{ color: '#4B5563', fontSize: '0.975rem', lineHeight: '1.65' }}>
                To manufacture and distribute pure, hygienic, and authentic food essentials locally produced from Sri Lankan agricultural harvests, nourishing families and empowering local communities.
              </p>
            </div>

            {/* Vision */}
            <div style={{
              backgroundColor: '#FFEBEE',
              padding: '36px',
              borderRadius: '20px',
              border: '2px solid #FFCDD2'
            }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#D32F2F', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '20px' }}>
                <Sparkles size={26} style={{ margin: 'auto' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
                Our Vision
              </h3>
              <p style={{ color: '#4B5563', fontSize: '0.975rem', lineHeight: '1.65' }}>
                To be Sri Lanka’s most trusted household food brand for Rice Flour, Mixture, and Gingelly Oil, recognized for unwavering quality, local sourcing integrity, and customer satisfaction.
              </p>
            </div>

            {/* Values */}
            <div style={{
              backgroundColor: '#FAFAFA',
              padding: '36px',
              borderRadius: '20px',
              border: '2px solid #E5E7EB'
            }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#111827', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={26} style={{ margin: 'auto' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
                Our Core Values
              </h3>
              <p style={{ color: '#4B5563', fontSize: '0.975rem', lineHeight: '1.65' }}>
                Integrity in sourcing, hygiene in processing, transparency in pricing, consistency in flavor, and absolute commitment to our customer partnerships.
              </p>
            </div>
          </div>

          {/* Commitments Section */}
          <div style={{ backgroundColor: '#FAFAFA', padding: '50px', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827' }}>
                Our Promises to You
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle2 size={24} style={{ color: '#D32F2F', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>Local Sourcing Guarantee</h4>
                  <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: '1.5' }}>We prioritize purchasing high-grade raw paddy and sesame directly from local farmers in Sri Lanka.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle2 size={24} style={{ color: '#D32F2F', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>Quality Commitment</h4>
                  <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: '1.5' }}>Every batch undergoes rigorous moisture, texture, and aroma verification before packaging.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle2 size={24} style={{ color: '#D32F2F', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>Customer Commitment</h4>
                  <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: '1.5' }}>Prompt delivery, reliable bulk supplies, and transparent communication for all business clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
