import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Leaf, 
  Sparkles, 
  Truck, 
  HeartHandshake, 
  RefreshCw, 
  ChevronRight, 
  Flame, 
  Layers, 
  Check, 
  Zap, 
  Droplet, 
  Eye, 
  ArrowRight,
  FlaskConical,
  Scale,
  ShieldAlert,
  ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Quality = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeMetricTab, setActiveMetricTab] = useState('flour');

  const qualityPillars = [
    {
      id: 1,
      title: "CONSISTENT PRODUCTION",
      desc: "Repeatable, standardized milling and processing methods to minimize batch variability and guarantee uniform product texture every time.",
      icon: <RefreshCw size={30} style={{ color: '#0F4A24' }} />,
      bgColor: "#E8F5E9",
      borderColor: "#A5D6A7",
      highlight: "Uniform Granulation & Texture"
    },
    {
      id: 2,
      title: "CLEAN HANDLING PRACTICES",
      desc: "Hygienic processing environments, sterile stainless-steel equipment, and strict sanitation protocols for food safety across all production lines.",
      icon: <ShieldCheck size={30} style={{ color: '#D32F2F' }} />,
      bgColor: "#FEE2E2",
      borderColor: "#FCA5A5",
      highlight: "ISO-Aligned Hygiene Standards"
    },
    {
      id: 3,
      title: "LOCAL SOURCING INTEGRITY",
      desc: "Direct procurement of fresh agricultural harvests from local farmers and trusted district suppliers, empowering local communities.",
      icon: <Leaf size={30} style={{ color: '#B45309' }} />,
      bgColor: "#FEF3C7",
      borderColor: "#FCD34D",
      highlight: "100% Sri Lankan Harvests"
    },
    {
      id: 4,
      title: "UNCOMPROMISED PURITY",
      desc: "Zero artificial dyes, zero chemical preservatives, and zero synthetic fillers. Only 100% pure, natural whole-grain ingredients.",
      icon: <Award size={30} style={{ color: '#0F4A24' }} />,
      bgColor: "#E8F5E9",
      borderColor: "#A5D6A7",
      highlight: "0% Additives or Preservatives"
    },
    {
      id: 5,
      title: "RELIABLE DISTRICT SUPPLY",
      desc: "Structured inventory management and scheduled district distribution ensuring products reach retail shelves completely fresh.",
      icon: <Truck size={30} style={{ color: '#D32F2F' }} />,
      bgColor: "#FEE2E2",
      borderColor: "#FCA5A5",
      highlight: "Direct Fresh Logistics"
    },
    {
      id: 6,
      title: "RESPONSIVE CUSTOMER CARE",
      desc: "Attentive support, transparent product information, and straightforward resolution for all retail, household, and commercial inquiries.",
      icon: <HeartHandshake size={30} style={{ color: '#B45309' }} />,
      bgColor: "#FEF3C7",
      borderColor: "#FCD34D",
      highlight: "Dedicated Quality Hotline"
    }
  ];

  // 5-Step Production & Quality Pipeline
  const pipelineSteps = [
    {
      number: "01",
      title: "Farmer Procurement & Inspection",
      desc: "We work directly with certified local rice growers and sesame cultivators in Sri Lanka. Raw grains undergo moisture testing and purity verification upon arrival.",
      icon: <Leaf size={24} />,
      metrics: ["Moisture < 12%", "Hand-Picked Grain Selection", "Zero Pesticide Residue"]
    },
    {
      number: "02",
      title: "Traditional Stone Milling & Cold Pressing",
      desc: "Red rice is carefully milled using traditional low-temperature stone methods to preserve essential fiber and vitamins. Sesame seeds are wood-pressed slowly.",
      icon: <RefreshCw size={24} />,
      metrics: ["Low Heat Milling", "Nutrient Retention", "Authentic Texture"]
    },
    {
      number: "03",
      title: "Multi-Stage Sieving & Micro-Filtration",
      desc: "Milled flour passes through automated precision vibrating sieves for consistent granule size. Oils are triple-filtered naturally without chemical bleaching.",
      icon: <Layers size={24} />,
      metrics: ["Ultra-Fine Mesh Sieving", "Zero Chemical Bleaching", "Sediment Removal"]
    },
    {
      number: "04",
      title: "Laboratory Batch Testing",
      desc: "Every single production batch undergoes organoleptic aroma testing, gluten/purity checks, and strict microbial hygiene verification.",
      icon: <FlaskConical size={24} />,
      metrics: ["Organoleptic Smell Check", "Zero Chemical Fillers", "Batch Code Logging"]
    },
    {
      number: "05",
      title: "Hermetic Moisture-Proof Packaging",
      desc: "Products are sealed in heavy-duty food-grade woven sacks and multi-layer moisture barrier pouches to lock in natural aroma and freshness.",
      icon: <ShieldCheck size={24} />,
      metrics: ["Tamper-Evident Seals", "UV Moisture Protection", "Extended Natural Shelf-Life"]
    }
  ];

  // Product Quality Metrics Tabs
  const purityMetricsData = {
    flour: {
      title: "Red Rice Flour Quality Metrics",
      subtitle: "100% Traditional Whole Grain Stone Milled Flour",
      purityScore: "100%",
      specs: [
        { label: "Whole Grain Purity", value: 100, color: "#0F4A24" },
        { label: "Moisture Content", value: 11.2, color: "#B45309", unit: "%" },
        { label: "Granulation Fineness", value: 98, color: "#0F4A24" },
        { label: "Artificial Additives", value: 0, color: "#D32F2F" }
      ],
      highlights: [
        "Perfect for Jaffna String Hoppers (Idiyappam)",
        "Ideal for Steamed Pittu & Crisp Dosa",
        "Rich in Natural Fiber & Antioxidants"
      ]
    },
    oil: {
      title: "Pure Gingelly (Sesame) Oil Metrics",
      subtitle: "Cold Wood-Pressed 100% Unrefined Sesame Oil",
      purityScore: "100%",
      specs: [
        { label: "Sesame Seed Purity", value: 100, color: "#0F4A24" },
        { label: "Cold Press Temperature", value: 38, color: "#B45309", unit: "°C" },
        { label: "Natural Aroma Retention", value: 99, color: "#0F4A24" },
        { label: "Chemical Refining", value: 0, color: "#D32F2F" }
      ],
      highlights: [
        "Wood-pressed using traditional techniques",
        "Deep golden clarity with intense natural nut aroma",
        "Rich in Sesamol & Natural Antioxidants"
      ]
    },
    spices: {
      title: "Roasted Chilli Powder Metrics",
      subtitle: "Sun-Dried Fiery Jaffna Red Chillies",
      purityScore: "100%",
      specs: [
        { label: "Sun-Dried Red Chilli", value: 100, color: "#0F4A24" },
        { label: "Spiciness & Warmth", value: 95, color: "#D32F2F" },
        { label: "Aroma Richness", value: 98, color: "#B45309" },
        { label: "Synthetic Color Dyes", value: 0, color: "#D32F2F" }
      ],
      highlights: [
        "Slow-roasted for rich dark crimson color",
        "No artificial food colorings or fillers",
        "Authentic Jaffna curry heat & aroma"
      ]
    }
  };

  const activeData = purityMetricsData[activeMetricTab];

  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ============================================================ */}
      {/* 1. 3D IMMERSIVE HERO BANNER WITH DYNAMIC GLOW PARTICLES      */}
      {/* ============================================================ */}
      <section style={{
        background: 'linear-gradient(135deg, #083117 0%, #0F4A24 50%, #052210 100%)',
        color: '#FFFFFF',
        padding: '85px 0 75px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glowing Orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '-50px',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(129, 199, 132, 0.25) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Quality Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
              padding: '8px 22px',
              borderRadius: '9999px',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}>
              <Sparkles size={16} style={{ color: '#FFD700' }} />
              <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '0.825rem', letterSpacing: '1px' }}>
                HYGIENE & PURITY CERTIFIED • TASTRAA (PVT) LTD
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 style={{ 
              fontSize: 'clamp(2.4rem, 5vw, 4rem)', 
              fontWeight: '900', 
              marginBottom: '18px', 
              color: '#FFFFFF', 
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '-0.5px',
              lineHeight: '1.15'
            }}>
              QUALITY YOU CAN <span style={{ color: '#FFD700' }}>RELY ON</span>
            </h1>

            {/* Subtitle */}
            <p style={{ 
              maxWidth: '720px', 
              margin: '0 auto 36px', 
              color: '#E2E8F0', 
              fontSize: 'clamp(1rem, 2vw, 1.15rem)', 
              lineHeight: '1.65',
              fontWeight: '400'
            }}>
              Unwavering commitment to clean processing, direct local sourcing integrity, multi-stage testing, and batch consistency for Sri Lanka’s favorite everyday food staples.
            </p>

            {/* 4 Stat Metric Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '18px',
              maxWidth: '960px',
              margin: '0 auto'
            }}>
              {[
                { number: "100%", label: "Pure Ingredients", icon: <Leaf size={18} style={{ color: '#81C784' }} /> },
                { number: "0%", label: "Artificial Additives", icon: <ShieldAlert size={18} style={{ color: '#FCA5A5' }} /> },
                { number: "100%", label: "Local Sri Lankan Harvest", icon: <Award size={18} style={{ color: '#FCD34D' }} /> },
                { number: "24/7", label: "Quality Inspection", icon: <CheckCircle2 size={18} style={{ color: '#81C784' }} /> }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '18px',
                  padding: '16px 20px',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                    {stat.icon}
                    <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFFFFF' }}>{stat.number}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: '700', letterSpacing: '0.5px' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. QUALITY PILLARS 3D GRID                                   */}
      {/* ============================================================ */}
      <section style={{ padding: '85px 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span style={{ 
              color: '#D32F2F', 
              fontWeight: '800', 
              fontSize: '0.85rem', 
              letterSpacing: '1.2px', 
              textTransform: 'uppercase' 
            }}>
              OUR CORE STANDARDS
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', 
              fontWeight: '900', 
              color: '#0F4A24', 
              marginTop: '8px', 
              fontFamily: "'Poppins', sans-serif" 
            }}>
              The 6 Pillars of Tastraa Quality
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6' }}>
              Every product bearing the TASTRAA mark adheres to strict quality controls from agricultural procurement to final retail sealing.
            </p>
          </div>

          {/* Pillars Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {qualityPillars.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  border: `2px solid ${item.borderColor}`,
                  boxShadow: '0 12px 35px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Icon & Pill Badge */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '18px',
                      backgroundColor: item.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
                    }}>
                      {item.icon}
                    </div>

                    <span style={{
                      fontSize: '0.725rem',
                      fontWeight: '800',
                      backgroundColor: item.bgColor,
                      color: item.borderColor === '#FCA5A5' ? '#D32F2F' : item.borderColor === '#FCD34D' ? '#B45309' : '#0F4A24',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      letterSpacing: '0.5px'
                    }}>
                      PILLAR 0{item.id}
                    </span>
                  </div>

                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '900', 
                    color: '#0F4A24', 
                    marginBottom: '12px', 
                    letterSpacing: '0.3px',
                    fontFamily: "'Poppins', sans-serif" 
                  }}>
                    {item.title}
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '20px' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Highlight Tag at bottom */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px dashed #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={16} style={{ color: '#0F4A24' }} />
                  <span style={{ fontSize: '0.825rem', fontWeight: '800', color: '#0F4A24' }}>
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE 5-STEP QUALITY PIPELINE                       */}
      {/* ============================================================ */}
      <section style={{ padding: '80px 0', backgroundColor: '#EBF5EE' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 46px' }}>
            <span style={{ 
              color: '#0F4A24', 
              fontWeight: '800', 
              fontSize: '0.85rem', 
              letterSpacing: '1.2px', 
              textTransform: 'uppercase' 
            }}>
              FROM FARM TO TABLE
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', 
              fontWeight: '900', 
              color: '#0F4A24', 
              marginTop: '6px',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Our 5-Step Quality Assurance Pipeline
            </h2>
            <p style={{ color: '#475569', fontSize: '0.975rem', marginTop: '10px' }}>
              Click any step below to explore how we enforce strict testing parameters at every production phase.
            </p>
          </div>

          {/* Steps Navigation Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            {pipelineSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 22px',
                  borderRadius: '9999px',
                  border: '2px solid',
                  borderColor: activeStep === idx ? '#0F4A24' : '#CBD5E1',
                  backgroundColor: activeStep === idx ? '#0F4A24' : '#FFFFFF',
                  color: activeStep === idx ? '#FFFFFF' : '#334155',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: activeStep === idx ? '0 8px 22px rgba(15, 74, 36, 0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ 
                  backgroundColor: activeStep === idx ? '#FFD700' : '#E2E8F0', 
                  color: '#0F4A24',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '900'
                }}>
                  {step.number}
                </span>
                <span>STEP {idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '40px',
                border: '2px solid #C8E6C9',
                boxShadow: '0 20px 45px rgba(15, 74, 36, 0.08)',
                maxWidth: '900px',
                margin: '0 auto'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center' }} className="responsive-grid-2col">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <span style={{
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      fontWeight: '900',
                      fontSize: '0.85rem',
                      padding: '4px 14px',
                      borderRadius: '9999px'
                    }}>
                      PHASE {pipelineSteps[activeStep].number}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748B' }}>
                      QUALITY CHECKPOINT
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0F4A24', marginBottom: '14px', fontFamily: "'Poppins', sans-serif" }}>
                    {pipelineSteps[activeStep].title}
                  </h3>

                  <p style={{ color: '#475569', fontSize: '1.025rem', lineHeight: '1.7', marginBottom: '24px' }}>
                    {pipelineSteps[activeStep].desc}
                  </p>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {activeStep > 0 && (
                      <button
                        onClick={() => setActiveStep(prev => prev - 1)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '9999px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#334155',
                          fontWeight: '800',
                          fontSize: '0.825rem',
                          cursor: 'pointer'
                        }}
                      >
                        ← PREVIOUS STEP
                      </button>
                    )}
                    {activeStep < pipelineSteps.length - 1 && (
                      <button
                        onClick={() => setActiveStep(prev => prev + 1)}
                        className="btn-green-3d"
                        style={{ padding: '10px 22px', fontSize: '0.825rem' }}
                      >
                        <span>NEXT STEP</span>
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Side Key Verification Metrics */}
                <div style={{
                  backgroundColor: '#FAF9F5',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #E2E8F0'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F4A24', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} style={{ color: '#0F4A24' }} />
                    Key Phase Inspection Criteria:
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {pipelineSteps[activeStep].metrics.map((metric, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: '#FFFFFF',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        border: '1px solid #E8F5E9',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#E8F5E9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Check size={16} style={{ color: '#0F4A24' }} />
                        </div>
                        <span style={{ fontSize: '0.925rem', fontWeight: '800', color: '#1E293B' }}>
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PRODUCT PURITY METRICS TAB INSPECTOR                      */}
      {/* ============================================================ */}
      <section style={{ padding: '85px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 44px' }}>
            <span style={{ 
              color: '#B45309', 
              fontWeight: '800', 
              fontSize: '0.85rem', 
              letterSpacing: '1.2px', 
              textTransform: 'uppercase' 
            }}>
              LABORATORY STANDARDS
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', 
              fontWeight: '900', 
              color: '#0F4A24', 
              marginTop: '6px', 
              fontFamily: "'Poppins', sans-serif" 
            }}>
              Interactive Product Purity Inspector
            </h2>
            <p style={{ color: '#475569', fontSize: '0.975rem', marginTop: '10px' }}>
              Inspect quality indices across our core product lines.
            </p>

            {/* Metric Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
              {[
                { id: 'flour', label: 'RED RICE FLOUR' },
                { id: 'oil', label: 'GINGELLY OIL' },
                { id: 'spices', label: 'ROASTED CHILLI' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetricTab(tab.id)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.825rem',
                    border: '1px solid',
                    borderColor: activeMetricTab === tab.id ? '#0F4A24' : '#CBD5E1',
                    backgroundColor: activeMetricTab === tab.id ? '#0F4A24' : '#FFFFFF',
                    color: activeMetricTab === tab.id ? '#FFFFFF' : '#475569',
                    cursor: 'pointer',
                    boxShadow: activeMetricTab === tab.id ? '0 6px 18px rgba(15, 74, 36, 0.2)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Box */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '40px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 16px 40px rgba(0,0,0,0.05)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }} className="responsive-grid-2col">
              {/* Left Column: Progress Bars */}
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#B45309', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {activeData.subtitle}
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0F4A24', marginTop: '4px', marginBottom: '24px', fontFamily: "'Poppins', sans-serif" }}>
                  {activeData.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {activeData.specs.map((spec, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#334155' }}>
                          {spec.label}
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '900', color: spec.color }}>
                          {spec.value}{spec.unit || '%'}
                        </span>
                      </div>
                      <div style={{
                        height: '10px',
                        backgroundColor: '#F1F5F9',
                        borderRadius: '9999px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(spec.value, 100)}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          style={{
                            height: '100%',
                            backgroundColor: spec.color,
                            borderRadius: '9999px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Highlights & Seal */}
              <div style={{
                backgroundColor: '#FAF9F5',
                borderRadius: '24px',
                padding: '32px',
                border: '2px solid #E8F5E9',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#E8F5E9',
                  border: '3px solid #A5D6A7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 20px rgba(15, 74, 36, 0.12)'
                }}>
                  <Award size={36} style={{ color: '#0F4A24' }} />
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0F4A24', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  TASTRAA GUARANTEE
                </span>
                <h4 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F4A24', margin: '4px 0 16px' }}>
                  100% PURE & NATURAL
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                  {activeData.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} style={{ color: '#0F4A24', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#475569' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BRAND COMMITMENT & CTA CARD                               */}
      {/* ============================================================ */}
      <section style={{ padding: '0 0 85px' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #0F4A24 0%, #083117 100%)',
            borderRadius: '32px',
            padding: '50px 40px',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 25px 60px -10px rgba(15, 74, 36, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
              borderRadius: '50%'
            }} />

            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              OUR UNMATCHED BRAND PROMISE
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: '#FFFFFF', marginTop: '10px', marginBottom: '18px', fontFamily: "'Poppins', sans-serif" }}>
              Pure Ingredients. <span style={{ color: '#FFD700' }}>Dependable Execution.</span>
            </h2>

            <p style={{ maxWidth: '780px', margin: '0 auto 32px', color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.7' }}>
              At TASTRAA (PVT) LTD, quality is built directly into our daily routines. From receiving locally harvested rice to cold-pressing sesame seeds and packaging mixture snacks, we ensure every single product delivers authentic taste and peace of mind.
            </p>

            <div style={{ display: 'inline-flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/products" className="btn-gold-3d">
                <span>SHOP TESTED PRODUCTS</span>
                <ArrowRight size={18} />
              </Link>
              
              <Link to="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 30px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '0.9rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                <span>CONTACT QUALITY ASSURANCE</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Quality;

