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
  Flame,
  Utensils,
  RotateCw,
  Zap,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import api from '../api';
import hero3dImg from '../assets/tastraa_original_hero.png';
import gmpCertifiedImg from '../assets/gmp_certified.png';
import factoryBuildingImg from '../assets/factory_building.png';
import redRice5kgImg from '../assets/red_rice_flour_5kg.jpg';
import redRice10kgImg from '../assets/red_rice_flour_10kg.jpg';
import redRice25kgImg from '../assets/red_rice_flour_25kg.png';
import redRice2kgImg from '../assets/red_rice_flour_2kg.jpg';
import roastedChilli50gImg from '../assets/roasted_chilli_powder_50g.jpg';
import bengalGram100Img from '../assets/bengal_gram_100.jpg';
import gingellyOil750mlImg from '../assets/gingelly_oil_750ml.jpg';
import gingellyOil375mlImg from '../assets/gingelly_oil_375ml.jpg';
import bengalGramPackImg from '../assets/bengal_gram_pack.jpg';
import redRawRice25kgImg from '../assets/red_raw_rice_25kg.jpg';
import plateDumplingsImg from '../assets/plate_dumplings.jpg';
import bitesPackImg from '../assets/bites_pack.jpg';
import bengalGramYellowImg from '../assets/bengal_gram_yellow.jpg';
import masalaMurukkuImg from '../assets/masala_murukku.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selected3DProduct, setSelected3DProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  // Interactive 3D Hero Mode: 'PHOTO' or 'STAGE_3D'
  const [heroViewMode, setHeroViewMode] = useState('PHOTO');
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Package Weight Selector state for Inspector Modal
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  // 3D Mouse Tracking Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        if (response.data?.success && Array.isArray(response.data.products) && response.data.products.length > 0) {
          const apiProducts = response.data.products;
          const combined = [...apiProducts];
          defaultProducts.forEach((defItem) => {
            const exists = combined.some((p) =>
              (p.id && defItem.id && p.id === defItem.id) ||
              (p.slug && defItem.slug && p.slug === defItem.slug) ||
              (p.name && defItem.name && p.name.toLowerCase() === defItem.name.toLowerCase())
            );
            if (!exists) {
              combined.push(defItem);
            }
          });
          setProducts(combined);
        } else {
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

  // Mouse Parallax Calculation
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

  // Signature 3D Stage Showcase Items
  const stageShowcaseItems = [
    {
      title: "Red Rice Flour 05KG (சிவப்பு அரிசி மா)",
      sub: "100% Traditional Whole Grain Flour - 05KG Sack",
      desc: "Pure naturally cultivated local red rice carefully stone-milled to soft perfection. Packaged in 05KG green woven sack.",
      badge: "⭐ Bestseller for String Hoppers & Pittu",
      spiciness: 0,
      aroma: 95,
      purity: 100,
      crunch: 80,
      recipe: "Jaffna Idiyappam & Steam Pittu",
      weights: ['02KG', '05KG SACK', '10KG SACK', '25KG SACK'],
      priceBase: 1430,
      img: redRice5kgImg
    },
    {
      title: "Roasted Chilli Powder 50g+5g (வறுத்த மிளகாய்த்தூள்)",
      sub: "Sun-Dried Fiery Jaffna Red Chillies",
      desc: "Slow-roasted whole red chillies blended for unmatched fragrance, deep fiery red color, and bold spicy warmth. Includes 5g extra free!",
      badge: "🔥 100% Sun-Dried Jaffna Chillies",
      spiciness: 95,
      aroma: 98,
      purity: 100,
      crunch: 0,
      recipe: "Jaffna Fish Curry & Mutton Gravy",
      weights: ['50g+5g Free', '250g', '500g'],
      priceBase: 140,
      img: roastedChilli50gImg
    },
    {
      title: "Red Rice Flour 10KG (சிவப்பு அரிசி மா)",
      sub: "Heavy-Duty Blue  for Large Families",
      desc: "10KG bulk packaging of pure Sri Lankan Red Rice Flour milled under strict hygiene standards. Value pack for high volume cooking.",
      badge: "🌾 Premium 10KG Family Saver Pack",
      spiciness: 0,
      aroma: 95,
      purity: 100,
      crunch: 80,
      recipe: "Dosa, Idiyappam & Traditional Sweets",
      weights: ['10KG SACK'],
      priceBase: 3000,
      img: redRice10kgImg
    },
    {
      title: "Pure Gingelly Oil (நல்லெண்ணெய்)",
      sub: "Authentic Cold-Pressed Sesame Oil",
      desc: "Wood-pressed from hand-selected sesame seeds. Delivers rich authentic aroma, high antioxidant content, and classic traditional cooking flavor.",
      badge: "🌿 Wood-Pressed & Chemical Free",
      spiciness: 0,
      aroma: 100,
      purity: 100,
      crunch: 0,
      recipe: "Traditional Curries & Healthy Cooking",
      weights: ['375ml', '750ml', '5L Can'],
      priceBase: 950,
      img: hero3dImg
    }
  ];

  const currentStageItem = stageShowcaseItems[activeStageIndex];

  return (
    <div style={{ overflowX: 'hidden', backgroundColor: '#FAF9F5' }}>

      {/* ============================================================ */}
      {/* 1. 3D IMMERSIVE FULL-COVER HERO SECTION WITH PARALLAX & TILT */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          background: 'linear-gradient(160deg, #FFFBEB 0%, #FEF3C7 45%, #FAF9F5 100%)',
          paddingTop: '36px',
          paddingBottom: '20px',
          overflow: 'hidden',
          perspective: '1200px'
        }}
      >
        {/* Floating 3D Ambient Background Particles (Golden & Red Glow) */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.65) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0)`
        }} />

        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-80px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(211, 47, 47, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="hero-3d-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>

            {/* LEFT COLUMN: Main Typography & Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Official Brand Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #D32F2F',
                padding: '7px 20px',
                borderRadius: '9999px',
                marginBottom: '20px',
                boxShadow: '0 4px 15px rgba(211, 47, 47, 0.15)'
              }}>
                <Sparkles size={16} style={{ color: '#D32F2F' }} />
                <span style={{ color: '#D32F2F', fontWeight: '900', fontSize: '0.825rem', letterSpacing: '1px' }}>
                  உண்மை • உழைப்பு • உயர்வு | TRADITION & PURITY
                </span>
              </div>

              {/* Dynamic Headline */}
              <style>{`
    @keyframes pureReveal {
      0% {
        opacity: 0;
        transform: translateX(-25px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes tasteReveal {
      0% {
        opacity: 0;
        transform: translateX(25px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes gradientMove {
      0% {
        background-position: 0% center;
      }
      50% {
        background-position: 100% center;
      }
      100% {
        background-position: 0% center;
      }
    }

    .hero-heading {
      margin: 0 !important;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      gap: clamp(4px, 1.5vw, 12px);
    }

    .hero-heading-line {
      display: block;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(2.5rem, 4.8vw, 4.4rem);
      font-weight: 900;
      letter-spacing: 0.035em;
      line-height: 0.95;
      margin: 0 !important;
      padding: 0 !important;
      text-transform: uppercase;
      background: linear-gradient(
        90deg,
        #0F4A24,
        #199504,
        #0F4A24
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow:
        0 3px 10px rgba(25, 149, 4, 0.15);
    }

    .pure-line {
      opacity: 0;
      animation:
        pureReveal 0.8s ease-out 0.1s forwards,
        gradientMove 4s ease-in-out 0.9s infinite;
    }

    .taste-line {
      opacity: 0;
      animation:
        tasteReveal 0.8s ease-out 0.7s forwards,
        gradientMove 4s ease-in-out 1.5s infinite;
    }

    @media (max-width: 768px) {
      .hero-heading-line {
        font-size: clamp(1.8rem, 6vw, 2.5rem);
        letter-spacing: 0.025em;
      }
    }
  `}</style>
              <h1 className="hero-heading" style={{ marginBottom: '18px' }}>
                <span className="hero-heading-line pure-line">
                  PURE TRADITION.
                </span>
                <span className="hero-heading-line taste-line">
                  PERFECT TASTE.
                </span>
              </h1>

              {/* Subheading text */}
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: '1.6',
                color: '#1E293B',
                marginBottom: '32px',
                fontWeight: '700',
                maxWidth: '560px'
              }}>
                TASTRAA (PVT) LTD produces trusted food essentials with a focus on consistency, local sourcing, practical production and responsive customer care.
              </p>

              {/* 4 Feature Badges */}
              <div className="hero-badges-flex" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '36px',
                flexWrap: 'wrap'
              }}>
                {/* 1. PURE */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #0F4A24',
                    boxShadow: '0 6px 18px rgba(245, 158, 11, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Leaf size={26} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#d30707ff', letterSpacing: '0.5px' }}>
                    PURE
                  </span>
                </div>

                {/* 2. QUALITY */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #0F4A24',
                    boxShadow: '0 6px 18px rgba(211, 47, 47, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={26} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#de0c0cff', letterSpacing: '0.5px' }}>
                    QUALITY
                  </span>
                </div>

                {/* 3. HYGIENIC */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #0F4A24',
                    boxShadow: '0 6px 18px rgba(245, 158, 11, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={26} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#fa0505ff', letterSpacing: '0.5px' }}>
                    HYGIENIC
                  </span>
                </div>

                {/* 4. TRADITION */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #0F4A24',
                    boxShadow: '0 6px 18px rgba(15, 74, 36, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Utensils size={26} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#f00808d9', letterSpacing: '0.5px' }}>
                    TRADITION
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/products"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#0F4A24',
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 15px rgba(15, 74, 36, 0.3)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>SHOP PRODUCTS</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F4A24',
                    padding: '14px 26px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    border: '2px solid #D32F2F',
                    boxShadow: '0 4px 14px rgba(211, 47, 47, 0.12)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                >
                  <span>CONTACT US</span>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: 3D Animated Showcase Photo Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -12}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '580px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px -10px rgba(211, 47, 47, 0.25), 0 10px 30px rgba(245, 158, 11, 0.25)',
                  backgroundColor: '#FFFFFF',
                  border: '4px solid #FFFFFF'
                }}
              >
                <img
                  src={hero3dImg}
                  alt="TASTRAA Original Product Lineup - Red Rice Flour, Gingelly Oil, Roasted Chilli Powder, Mixture"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
                {/* GMP Certified Badge Overlay in Corner */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 10,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))'
                }}>
                  <img
                    src={gmpCertifiedImg}
                    alt="GMP Certified Practice"
                    style={{
                      width: '85px',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. BOTTOM CURVED DARK GREEN BAR MATCHING USER REFERENCE IMAGE */}
        {/* ============================================================ */}
        <div style={{ marginTop: '60px', position: 'relative', zIndex: 6 }}>
          <div className="container">
            <div style={{
              background: 'linear-gradient(180deg, #f1e60cff 0%, #e2ab07ff 100%)',
              borderRadius: '32px 32px 0 0',
              padding: '28px 36px',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.12)',
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
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #0F4A24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(221, 35, 3, 0.1)',
                    flexShrink: 0
                  }}>
                    <Leaf size={22} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.95rem', letterSpacing: '0.3px' }}>
                    Carefully Sourced
                  </span>
                </div>

                {/* Item 2: Premium Quality */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #e70c0cff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    flexShrink: 0
                  }}>
                    <Award size={22} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.95rem', letterSpacing: '0.3px' }}>
                    Premium Quality
                  </span>
                </div>

                {/* Item 3: Healthy Lifestyle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #0F4A24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    flexShrink: 0
                  }}>
                    <Heart size={22} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.95rem', letterSpacing: '0.3px' }}>
                    Healthy Lifestyle
                  </span>
                </div>

                {/* Item 4: Trusted by Generations */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #0F4A24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    flexShrink: 0
                  }}>
                    <ThumbsUp size={22} style={{ color: '#0F4A24' }} />
                  </div>
                  <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.95rem', letterSpacing: '0.3px' }}>
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
      <section style={{ padding: '80px 0', backgroundColor: '#FAF9F5' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 44px' }}>
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
              fontSize: 'clamp(2.1rem, 3.8vw, 2.8rem)',
              fontWeight: '900',
              color: '#0F4A24',
              marginTop: '6px',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Authentic Local Food Essentials
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.975rem', marginTop: '10px' }}>
              Crafted in Jaffna with pure traditional methods, zero artificial additives, and utmost ISO quality hygiene standards.
            </p>

            {/* Category Filter Pills */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '26px',
              flexWrap: 'wrap'
            }}>
              {['ALL', 'FLOUR', 'OIL', 'MIXTURE', 'SPICE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '9px 22px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? '#0F4A24' : '#CBD5E1',
                    backgroundColor: activeCategory === cat ? '#0F4A24' : '#FFFFFF',
                    color: activeCategory === cat ? '#FFFFFF' : '#475569',
                    cursor: 'pointer',
                    boxShadow: activeCategory === cat ? '0 8px 20px rgba(15, 74, 36, 0.25)' : '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {cat === 'ALL' ? 'ALL PRODUCTS' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid with 3D Animated Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredProducts.map((prod) => {
              const getProductImage = (p) => {
                if (!p) return hero3dImg;
                const url = p.image_url || '';
                if (url === '/assets/gingelly_oil_750ml.jpg' || p.slug === 'gingelly-oil') return gingellyOil750mlImg;
                if (url === '/assets/gingelly_oil_375ml.jpg' || p.slug === 'gingelly-oil-375ml') return gingellyOil375mlImg;
                if (url === '/assets/bengal_gram_pack.jpg' || url === '/assets/bengal_gram_100.jpg' || p.slug === 'tastraa-bengal-gram-100') return bengalGramPackImg;
                if (url === '/assets/red_raw_rice_25kg.jpg' || p.slug === 'red-raw-rice-25kg') return redRawRice25kgImg;
                if (url === '/assets/red_rice_flour_5kg.jpg' || p.slug === 'red-rice-flour-5kg') return redRice5kgImg;
                if (url === '/assets/red_rice_flour_10kg.jpg' || p.slug === 'red-rice-flour-10kg') return redRice10kgImg;
                if (url === '/assets/red_rice_flour_25kg.png' || p.slug === 'red-rice-flour-25kg') return redRice25kgImg;
                if (url === '/assets/red_rice_flour_2kg.jpg' || p.slug === 'red-rice-flour-2kg') return redRice2kgImg;
                if (url === '/assets/roasted_chilli_powder_50g.jpg' || p.slug === 'roasted-chilli-powder-50g') return roastedChilli50gImg;
                if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) return url;
                return p.image_url || hero3dImg;
              };

              return (
                <motion.div
                  key={prod.id || prod.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  {/* 3D Category Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    zIndex: 2,
                    backgroundColor: '#0F4A24',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.7rem',
                    letterSpacing: '0.5px'
                  }}>
                    {prod.category}
                  </div>

                  {/* Product Image Stage */}
                  <div style={{
                    height: '230px',
                    backgroundColor: '#F8FAFC',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}>
                    <img
                      src={getProductImage(prod)}
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
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    ))}
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700', marginLeft: '4px' }}>5.0 (Fresh)</span>
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: '800',
                    color: '#0F4A24',
                    marginBottom: '8px',
                    textDecoration: 'underline',
                    textDecorationColor: '#0F4A24',
                    textUnderlineOffset: '5px',
                    textDecorationThickness: '2px'
                  }}>
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5', marginBottom: '18px', flex: 1 }}>
                    {prod.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', fontWeight: '700' }}>NET WEIGHT</span>
                      <span style={{ fontSize: '1rem', fontWeight: '900', color: '#0F4A24' }}>
                        {prod.unit_size || 'Standard Pack'}
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
                      <span> VIEW</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. 3D INTERACTIVE FLAVOR & NUTRITION MATRIX SHOWCASE         */}
      {/* ============================================================ */}
      <section style={{ padding: '70px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <span style={{ color: '#0F4A24', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              TASTRAA CULINARY MATRIX
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', fontWeight: '900', color: '#0F4A24', marginTop: '6px' }}>
              Purity & Nutritional Standard
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '8px' }}>
              Every product is tested for zero chemical residue, high dietary fiber, and traditional taste integrity.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {/* Box 1 */}
            <div style={{
              backgroundColor: '#FAF9F5',
              borderRadius: '20px',
              padding: '26px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Leaf size={24} style={{ color: '#0F4A24' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F4A24', marginBottom: '8px' }}>
                100% Sun-Dried Chillies
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.5' }}>
                Sun-dried under natural Jaffna sunlight before slow-roasting to extract intense aromatic oils.
              </p>
            </div>

            {/* Box 2 */}
            <div style={{
              backgroundColor: '#FAF9F5',
              borderRadius: '20px',
              padding: '26px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Flame size={24} style={{ color: '#D97706' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F4A24', marginBottom: '8px' }}>
                Wood-Pressed Oil
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.5' }}>
                Extracted at low temperatures without heat destruction to preserve natural vitamins & antioxidants.
              </p>
            </div>

            {/* Box 3 */}
            <div style={{
              backgroundColor: '#FAF9F5',
              borderRadius: '20px',
              padding: '26px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={24} style={{ color: '#0F4A24' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F4A24', marginBottom: '8px' }}>
                Zero Preservatives
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.5' }}>
                No artificial food colorings, no added MSG, and no artificial flavor enhancers ever added.
              </p>
            </div>

            {/* Box 4 */}
            <div style={{
              backgroundColor: '#FAF9F5',
              borderRadius: '20px',
              padding: '26px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Package size={24} style={{ color: '#B45309' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F4A24', marginBottom: '8px' }}>
                Hygienic 3D Pack
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.5' }}>
                Sealed under automated food-grade vacuum standards to retain aroma and crunchiness for months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. HERITAGE & MANUFACTURING FACILITY SECTION                */}
      {/* ============================================================ */}
      <section style={{ padding: '70px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
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
                SINCE JUNE 2008 • 18+ YEARS HERITAGE
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24', marginTop: '6px', marginBottom: '16px' }}>
                18+ Years of Unmatched Quality & Customer Trust
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Established in June 2008 in Kopay, Jaffna, TASTRAA (PVT) LTD produces dependable, high-grade food products. From our signature red rice flour and gingelly oil to crunchy mixtures and roasted spices, every batch undergoes thorough quality testing.
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
      {/* 7. INTERACTIVE 3D PRODUCT INSPECTOR MODAL                    */}
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
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className="modal-3d-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                maxWidth: '720px',
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

              <div className="modal-3d-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr' }}>
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
                    height: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={selected3DProduct.image_url || selected3DProduct.img || hero3dImg}
                      alt={selected3DProduct.name || selected3DProduct.title}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        transform: `rotateY(${rotationDeg}deg)`,
                        transition: 'transform 0.4s ease'
                      }}
                    />
                  </div>

                  <button
                    onClick={() => setRotationDeg(prev => prev + 90)}
                    style={{
                      marginTop: '16px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #A5D6A7',
                      color: '#0F4A24',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontWeight: '800',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCw size={14} />
                    <span>ROTATE 3D INSPECTION</span>
                  </button>
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
                      marginBottom: '16px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>Package Net Weight</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F4A24' }}>
                          {selected3DProduct.unit_size || 'Standard Pack'}
                        </div>
                      </div>
                      {selected3DProduct.price && (
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>Price</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F4A24' }}>
                            LKR {parseFloat(selected3DProduct.price).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Modal Quantity Selector */}
                    <div style={{
                      backgroundColor: '#E8F5E9',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      marginBottom: '20px',
                      border: '1px solid #A5D6A7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F4A24' }}>
                        Quantity:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: modalQuantity > 1 ? '#0F4A24' : '#C8E6C9',
                            color: modalQuantity > 1 ? '#FFFFFF' : '#81C784',
                            fontWeight: '900',
                            fontSize: '1.1rem',
                            cursor: modalQuantity > 1 ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          disabled={modalQuantity <= 1}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: '900', fontSize: '1.1rem', color: '#0F4A24' }}>
                          {modalQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setModalQuantity(prev => prev + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#0F4A24',
                            color: '#FFFFFF',
                            fontWeight: '900',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/94779789223?text=${encodeURIComponent(
                      `Hi TASTRAA, I want to order ${modalQuantity} x ${selected3DProduct.name} (${selected3DProduct.unit_size || 'Pack'}). Total Price: LKR ${(
                        parseFloat(selected3DProduct.price || 0) * modalQuantity
                      ).toFixed(2)}. Please confirm order.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green-3d"
                    style={{ textDecoration: 'none', justifyContent: 'center' }}
                  >
                    <Send size={16} />
                    <span>ORDER ON WHATSAPP ({modalQuantity})</span>
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

// Fallback products list with real photos and exact printed packaging weights & prices
const defaultProducts = [
  {
    id: 1,
    name: 'Red Rice Flour 05KG  (சிவப்பு அரிசி மா)',
    category: 'FLOUR',
    unit_size: '05KG Sack',
    price: '1430.00',
    description: '100% natural Sri Lankan red rice milled into fine flour. Packaged in authentic 05KG green woven sack. MRP LKR 1,430.00.',
    image_url: redRice5kgImg,
    slug: 'red-rice-flour-5kg'
  },
  {
    id: 2,
    name: 'Red Rice Flour 10KG  (சிவப்பு அரிசி மா)',
    category: 'FLOUR',
    unit_size: '10KG Sack',
    price: '3000.00',
    description: 'Heavy-duty 10KG blue woven of pure Red Rice Flour. Perfect for family gatherings and restaurant kitchens. MRP LKR 3,000.00.',
    image_url: redRice10kgImg,
    slug: 'red-rice-flour-10kg'
  },
  {
    id: 3,
    name: 'Red Rice Flour 25KG  (சிவப்பு அரிசி மா)',
    category: 'FLOUR',
    unit_size: '25KG Commercial Sack',
    price: '7250.00',
    description: 'Wholesale commercial 25KG red woven  for industrial food production, commercial caterers, and wholesale distributors.',
    image_url: redRice25kgImg,
    slug: 'red-rice-flour-25kg'
  },
  {
    id: 4,
    name: 'Red Rice Flour 02KG Pack (சிவப்பு அரிசி மா)',
    category: 'FLOUR',
    unit_size: '2KG Pack',
    price: '800.00',
    description: 'Sealed 2KG transparent retail package of 100% natural Red Rice Flour for everyday household cooking. MRP LKR 800.00.',
    image_url: redRice2kgImg,
    slug: 'red-rice-flour-2kg'
  },
  {
    id: 5,
    name: 'Roasted Chilli Powder 50g+5g (வறுத்த மிளகாய்த்தூள்)',
    category: 'SPICE',
    unit_size: '50g + 5g Free',
    price: '140.00',
    description: 'Authentic slow-roasted sun-dried red chilli powder with 5g bonus weight. Deep color and rich spicy aroma.',
    image_url: roastedChilli50gImg,
    slug: 'roasted-chilli-powder-50g'
  },
  {
    id: 6,
    name: 'Pure Gingelly Oil 750ml (நல்லெண்ணெய்)',
    category: 'OIL',
    unit_size: '750ml Bottle',
    price: '950.00',
    description: 'Cold-pressed authentic gingelly oil milled from premium sesame seeds. Rich aroma, high smoke point, and traditional flavor.',
    image_url: gingellyOil750mlImg,
    slug: 'gingelly-oil'
  },
  {
    id: 7,
    name: 'Pure Gingelly Oil 375ml (நல்லெண்ணெய்)',
    category: 'OIL',
    unit_size: '375ml Bottle',
    price: '500.00',
    description: '100% pure cold-pressed sesame oil with authentic Jaffna aroma. Hygienic sealed bottle.',
    image_url: gingellyOil375mlImg,
    slug: 'gingelly-oil-375ml'
  },
  {
    id: 8,
    name: 'TASTRAA Bengal Gram (மஞ்சள் கடலை)',
    category: 'MIXTURE',
    unit_size: 'Rs 500 Pack',
    price: '500.00',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) seasoned with salt. Crisp, delicious, healthy traditional roasted snack.',
    image_url: bengalGramYellowImg,
    slug: 'tastraa-bengal-gram-100'
  },
  {
    id: 9,
    name: 'Red Raw Rice 25KG Sack (சிவப்பு பச்சை அரிசி)',
    category: 'RICE',
    unit_size: '25KG Sack',
    price: '7500.00',
    description: 'Premium Quality Red Raw Rice (சிவப்பு பச்சை அரிசி) packaged in authentic 25kg yellow woven sack.',
    image_url: redRawRice25kgImg,
    slug: 'red-raw-rice-25kg'
  },
  {
    id: 10,
    name: 'TASTRAA Plate Dumplings (தட்டு வடை)',
    category: 'MIXTURE',
    unit_size: 'Rs 100 Pack',
    price: '100.00',
    description: 'Authentic traditional crunchy Plate Dumplings (தட்டு வடை) made from dhal, vegetable oil, salt, and spicy red chilli powder.',
    image_url: plateDumplingsImg,
    slug: 'tastraa-plate-dumplings-100'
  },
  {
    id: 11,
    name: 'TASTRAA Bites (பைட்ஸ்)',
    category: 'MIXTURE',
    unit_size: 'Rs 50 Pack',
    price: '50.00',
    description: 'Crunchy savory snack Bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning.',
    image_url: bitesPackImg,
    slug: 'tastraa-bites-50'
  },
  {
    id: 12,
    name: 'TASTRAA Masala Murukku (மசாலா முறுக்கு)',
    category: 'MIXTURE',
    unit_size: 'Rs 50 Pack',
    price: '50.00',
    description: 'Authentic spicy & crispy Masala Murukku (மசாலா முறுக்கு) made with rice flour, urad flour, gram flour, curry leaves, and traditional spices.',
    image_url: masalaMurukkuImg,
    slug: 'tastraa-masala-murukku-50'
  }
];

export default Home;
