import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ThumbsUp, 
  Phone, 
  Send, 
  Check, 
  Package, 
  Eye, 
  X, 
  Star, 
  Calendar, 
  MapPin, 
  Users, 
  Flame,
  Utensils
} from 'lucide-react';
import api from '../api';
import hero3dImg from '../assets/tastraa_original_hero.png';
import factoryBuildingImg from '../assets/factory_building.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selected3DProduct, setSelected3DProduct] = useState(null);

  // 3D Parallax Mouse Tracking State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        if (response.data?.success) {
          setProducts(response.data.products);
        } else {
          // Fallback mock products if API isn't live
          setProducts(defaultProducts);
        }
      } catch (err) {
        console.warn('API load fallback to default products:', err);
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const whatsappUrl = "https://wa.me/94779789223?text=Hi%20TASTRAA%20(PVT)%20LTD,%20I%20would%20like%20to%20inquire%20about%20your%203D%20quality%20food%20products.";

  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category?.toUpperCase().includes(activeCategory));

  return (
    <div style={{ overflowX: 'hidden', backgroundColor: '#FAF9F5' }}>
      {/* ============================================================ */}
      {/* 1. HERO SECTION - 3D INTERACTIVE UI MATCHING USER IMAGE    */}
      {/* ============================================================ */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #EBF5EE 0%, #FAF9F5 100%)',
          paddingTop: '30px',
          paddingBottom: '0px',
          overflow: 'hidden'
        }}
      >
        {/* Background Decorative Sunny Glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="hero-3d-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            
            {/* LEFT COLUMN: Main Typography & Badges matching image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Green Subheading Slogan */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#E8F5E9',
                border: '1px solid #A5D6A7',
                padding: '6px 14px',
                borderRadius: '9999px',
                marginBottom: '18px'
              }}>
                <Sparkles size={16} style={{ color: '#0F4A24' }} />
                <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  TRADITION & PREMIUM QUALITY FOODS
                </span>
              </div>

              {/* Headline matching image: "Pure Tradition. Perfect Taste." */}
              <h1 style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                fontWeight: '900',
                lineHeight: '1.08',
                color: '#0F4A24',
                fontFamily: "'Poppins', sans-serif",
                marginBottom: '16px',
                letterSpacing: '-1px'
              }}>
                Pure Tradition.<br />
                <span style={{ color: '#165B2E' }}>Perfect Taste.</span>
              </h1>

              {/* Subheading text */}
              <p style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: '1.5',
                color: '#334155',
                marginBottom: '32px',
                fontWeight: '600',
                maxWidth: '520px'
              }}>
                Premium Quality Products for Your Healthy Life
              </p>

              {/* 4 Feature Badges matching user reference image */}
              <div className="hero-badges-flex" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '36px',
                flexWrap: 'wrap'
              }}>
                {/* 1. PURE */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="badge-circle-3d">
                    <Leaf size={24} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F4A24', letterSpacing: '0.5px' }}>
                    PURE
                  </span>
                </div>

                {/* 2. QUALITY */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="badge-circle-3d">
                    <ShieldCheck size={24} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F4A24', letterSpacing: '0.5px' }}>
                    QUALITY
                  </span>
                </div>

                {/* 3. HYGIENIC */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="badge-circle-3d">
                    <Sparkles size={24} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F4A24', letterSpacing: '0.5px' }}>
                    HYGIENIC
                  </span>
                </div>

                {/* 4. TRADITION */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div className="badge-circle-3d">
                    <Utensils size={24} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F4A24', letterSpacing: '0.5px' }}>
                    TRADITION
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn-green-3d">
                  <span>SHOP NOW</span>
                  <ArrowRight size={18} />
                </Link>

                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F4A24',
                    padding: '14px 24px',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    border: '2px solid #A5D6A7',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Send size={16} style={{ color: '#25D366' }} />
                  <span>WHATSAPP ORDER</span>
                </a>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Clean Showcase of User's Exact Original Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Clean Image Frame - Unedited Photo Showcase */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '580px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px -10px rgba(15, 74, 36, 0.25), 0 10px 20px rgba(0,0,0,0.08)',
                  backgroundColor: '#FFFFFF',
                  border: '4px solid #FFFFFF'
                }}
              >
                <img 
                  src={hero3dImg} 
                  alt="TASTRAA Original Product Showcase - Red Rice Flour, Gingelly Oil, Roasted Chilli Powder, Mixture" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. BOTTOM CURVED DARK GREEN BAR MATCHING USER REFERENCE IMAGE */}
        {/* ============================================================ */}
        <div style={{ marginTop: '50px', position: 'relative', zIndex: 6 }}>
          <div className="container">
            <div style={{
              background: 'linear-gradient(180deg, #0F4A24 0%, #083117 100%)',
              borderRadius: '32px 32px 0 0',
              padding: '24px 32px',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.1)',
              borderTop: '2px solid rgba(255, 255, 255, 0.15)'
            }}>
              <div className="bottom-bar-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                alignItems: 'center'
              }}>
                {/* Item 1: Carefully Sourced */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1.5px solid #81C784',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    flexShrink: 0
                  }}>
                    <Leaf size={20} style={{ color: '#81C784' }} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.925rem', letterSpacing: '0.3px' }}>
                    Carefully Sourced
                  </span>
                </div>

                {/* Item 2: Premium Quality */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1.5px solid #81C784',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    flexShrink: 0
                  }}>
                    <Award size={20} style={{ color: '#81C784' }} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.925rem', letterSpacing: '0.3px' }}>
                    Premium Quality
                  </span>
                </div>

                {/* Item 3: Healthy Lifestyle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1.5px solid #81C784',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    flexShrink: 0
                  }}>
                    <Heart size={20} style={{ color: '#81C784' }} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.925rem', letterSpacing: '0.3px' }}>
                    Healthy Lifestyle
                  </span>
                </div>

                {/* Item 4: Trusted by Generations */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1.5px solid #81C784',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    flexShrink: 0
                  }}>
                    <ThumbsUp size={20} style={{ color: '#81C784' }} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.925rem', letterSpacing: '0.3px' }}>
                    Trusted by Generations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE 3D PRODUCT CATALOG SECTION                    */}
      {/* ============================================================ */}
      <section style={{ padding: '70px 0', backgroundColor: '#FAF9F5' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px' }}>
            <span style={{
              color: '#0F4A24',
              fontWeight: '800',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              TASTRAA PRODUCTS CATALOG
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
              fontWeight: '900',
              color: '#0F4A24',
              marginTop: '6px',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Authentic Local Food Essentials
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '10px' }}>
              Crafted in Jaffna with pure traditional methods, zero artificial additives, and utmost hygiene.
            </p>

            {/* Category Filter Pills */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '24px',
              flexWrap: 'wrap'
            }}>
              {['ALL', 'FLOUR', 'OIL', 'MIXTURE', 'SPICE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? '#0F4A24' : '#CBD5E1',
                    backgroundColor: activeCategory === cat ? '#0F4A24' : '#FFFFFF',
                    color: activeCategory === cat ? '#FFFFFF' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {cat === 'ALL' ? 'ALL PRODUCTS' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid with 3D Tilt Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px'
          }}>
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {/* 3D Badge Tag */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  zIndex: 2,
                  backgroundColor: '#0F4A24',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontWeight: '800',
                  fontSize: '0.7rem'
                }}>
                  {prod.category}
                </div>

                {/* Product Image */}
                <div style={{
                  height: '220px',
                  backgroundColor: '#F8FAFC',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px'
                }}>
                  <img 
                    src={prod.image_url} 
                    alt={prod.name} 
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    ))}
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700', marginLeft: '4px' }}>5.0</span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F4A24', marginBottom: '6px' }}>
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5', marginBottom: '16px', flex: 1 }}>
                    {prod.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', fontWeight: '600' }}>Unit Net Weight</span>
                      <span style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F4A24' }}>
                        {prod.unit_size || '05KG / Pack'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelected3DProduct(prod)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#E8F5E9',
                        color: '#0F4A24',
                        border: '1px solid #A5D6A7',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Eye size={14} />
                      <span>3D VIEW</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ORIGINAL PRODUCT PHOTO BANNER SHOWCASE                       */}
      {/* ============================================================ */}
      <section style={{ padding: '60px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 32px' }}>
            <span style={{
              color: '#0F4A24',
              fontWeight: '800',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              AUTHENTIC PRODUCT LINEUP
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: '900',
              color: '#0F4A24',
              marginTop: '6px',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Original Product Lineup
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '8px' }}>
              Explore TASTRAA's signature products — Red Rice Flour, Gingelly Oil, Roasted Chilli Powder, and Jaffna Mixture.
            </p>
          </div>

          <div style={{
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15, 74, 36, 0.15)',
            border: '2px solid #E8F5E9',
            backgroundColor: '#FFFFFF'
          }}>
            <img 
              src={hero3dImg} 
              alt="TASTRAA Original High-Res Product Showcase Banner" 
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. HERITAGE & MANUFACTURING FACILITY SECTION                */}
      {/* ============================================================ */}
      <section style={{ padding: '60px 0', backgroundColor: '#FAF9F5', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Image */}
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img 
                src={factoryBuildingImg} 
                alt="TASTRAA Manufacturing Facility in Kopay, Jaffna" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Right Story */}
            <div>
              <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                SINCE JUNE 2009
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px', marginBottom: '16px' }}>
                15+ Years of Unmatched Quality & Customer Trust
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Established in June 2009 in Kopay, Jaffna, TASTRAA (PVT) LTD produces dependable, high-grade food products. From our signature red rice flour and gingelly oil to crunchy mixtures and roasted spices, every batch undergoes thorough quality testing.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={18} style={{ color: '#0F4A24', flexShrink: 0 }} />
                  <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1E293B' }}>100% Locally Sourced</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={18} style={{ color: '#0F4A24', flexShrink: 0 }} />
                  <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1E293B' }}>ISO Quality Control</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={18} style={{ color: '#0F4A24', flexShrink: 0 }} />
                  <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1E293B' }}>Hygienic Packaging</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={18} style={{ color: '#0F4A24', flexShrink: 0 }} />
                  <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1E293B' }}>Island-wide Distribution</span>
                </div>
              </div>

              <Link to="/about" className="btn-green-3d" style={{ display: 'inline-flex' }}>
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. INTERACTIVE 3D PRODUCT INSPECTOR MODAL                    */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selected3DProduct && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                maxWidth: '680px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected3DProduct(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={20} style={{ color: '#475569' }} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {/* Left 3D View Box */}
                <div style={{
                  backgroundColor: '#EBF5EE',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    width: '100%',
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={selected3DProduct.image_url} 
                      alt={selected3DProduct.name} 
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0F4A24', marginTop: '14px' }}>
                    ✨ 3D PRODUCT INSPECTOR
                  </span>
                </div>

                {/* Right Info */}
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{
                      backgroundColor: '#E8F5E9',
                      color: '#0F4A24',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontWeight: '800',
                      fontSize: '0.7rem'
                    }}>
                      {selected3DProduct.category || 'TASTRAA ESSENTIAL'}
                    </span>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F4A24', marginTop: '8px', marginBottom: '10px' }}>
                      {selected3DProduct.name}
                    </h3>

                    <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '16px' }}>
                      {selected3DProduct.description}
                    </p>

                    <div style={{
                      backgroundColor: '#F8FAFC',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      border: '1px solid #E2E8F0'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>Package Net Size</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F4A24' }}>
                        {selected3DProduct.unit_size || 'Standard Pack'}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/94779789223?text=Hi%20TASTRAA,%20I%20want%20to%20order%20${encodeURIComponent(selected3DProduct.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green-3d"
                    style={{ textDecoration: 'none', justifyContent: 'center' }}
                  >
                    <Send size={16} />
                    <span>ORDER ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Fallback products list matching 3D image items
const defaultProducts = [
  {
    id: 1,
    name: 'Red Rice Flour (சிவப்பு அரிசி மா)',
    category: 'FLOUR',
    unit_size: '05KG / Sack',
    description: '100% natural locally grown red rice ground into fine flour. Perfect for string hoppers, pittu, and traditional cooking.',
    image_url: hero3dImg,
    slug: 'red-rice-flour'
  },
  {
    id: 2,
    name: 'Pure Gingelly Oil (நல்லெண்ணெய்)',
    category: 'OIL',
    unit_size: '750ml Bottle',
    description: 'Cold-pressed authentic gingelly oil milled from premium sesame seeds. Rich aroma, high smoke point, and traditional flavor.',
    image_url: hero3dImg,
    slug: 'gingelly-oil'
  },
  {
    id: 3,
    name: 'Roasted Chilli Powder (வறுத்த மிளகாய்த்தூள்)',
    category: 'SPICE',
    unit_size: '500g Pack',
    description: 'Slow-roasted sun-dried red chillies expertly ground for deep color, fiery aroma, and rich traditional curries.',
    image_url: hero3dImg,
    slug: 'roasted-chilli-powder'
  },
  {
    id: 4,
    name: 'Jaffna Mixture (மிக்ஸர்)',
    category: 'MIXTURE',
    unit_size: '400g Pack',
    description: 'Crispy savory snacks spiced with roasted curry leaves, peanuts, fried chickpeas, and authentic Jaffna spices.',
    image_url: hero3dImg,
    slug: 'jaffna-mixture'
  }
];

export default Home;
