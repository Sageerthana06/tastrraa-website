import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, ShieldCheck, RefreshCw, Phone, Wheat, Award, Star, Sparkles } from 'lucide-react';
import api from '../api';
import hero3dImg from '../assets/tastraa_original_hero.png';
import redRice5kgImg from '../assets/red_rice_flour_5kg.jpg';
import redRice10kgImg from '../assets/red_rice_flour_10kg.jpg';
import redRice25kgImg from '../assets/red_rice_flour_25kg.png';
import redRice2kgImg from '../assets/red_rice_flour_2kg.jpg';
import roastedChilli50gImg from '../assets/roasted_chilli_powder_50g.jpg';

const fallbackDetails = {
  'red-rice-flour-5kg': {
    id: 101,
    slug: 'red-rice-flour-5kg',
    name: 'Red Rice Flour 05KG Sack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '1430.00',
    unit: '05KG Sack',
    description: '100% natural locally grown red rice ground into fine flour. Packaged in authentic 05KG green woven sack. MRP LKR 1,430.00.',
    features: ['05KG Woven Sack', '100% Sri Lankan Red Paddy', 'Preservative & Bleach Free', 'Super Fine Texture'],
    image_url: redRice5kgImg
  },
  '101': {
    id: 101,
    slug: 'red-rice-flour-5kg',
    name: 'Red Rice Flour 05KG Sack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '1430.00',
    unit: '05KG Sack',
    description: '100% natural locally grown red rice ground into fine flour. Packaged in authentic 05KG green woven sack. MRP LKR 1,430.00.',
    features: ['05KG Woven Sack', '100% Sri Lankan Red Paddy', 'Preservative & Bleach Free', 'Super Fine Texture'],
    image_url: redRice5kgImg
  },
  'red-rice-flour-10kg': {
    id: 102,
    slug: 'red-rice-flour-10kg',
    name: 'Red Rice Flour 10KG Sack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '3000.00',
    unit: '10KG Sack',
    description: 'Heavy-duty 10KG blue woven bag of 100% pure Red Rice Flour. Ideal for family gatherings and high volume home cooking. MRP LKR 3,000.00.',
    features: ['10KG Blue Sack', 'High Dietary Fiber', 'Purity Certified', 'Stone Milled'],
    image_url: redRice10kgImg
  },
  '102': {
    id: 102,
    slug: 'red-rice-flour-10kg',
    name: 'Red Rice Flour 10KG Sack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '3000.00',
    unit: '10KG Sack',
    description: 'Heavy-duty 10KG blue woven bag of 100% pure Red Rice Flour. Ideal for family gatherings and high volume home cooking. MRP LKR 3,000.00.',
    features: ['10KG Blue Sack', 'High Dietary Fiber', 'Purity Certified', 'Stone Milled'],
    image_url: redRice10kgImg
  },
  'red-rice-flour-25kg': {
    id: 103,
    slug: 'red-rice-flour-25kg',
    name: 'Red Rice Flour 25KG Sack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Commercial Sack',
    description: 'Wholesale commercial 25KG red woven sack for industrial food production, commercial caterers, and wholesale distributors.',
    features: ['25KG Bulk Sack', 'Commercial Milling', 'Wholesale Pricing', 'Heavy Duty Pack'],
    image_url: redRice25kgImg
  },
  '103': {
    id: 103,
    slug: 'red-rice-flour-25kg',
    name: 'Red Rice Flour 25KG Sack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Commercial Sack',
    description: 'Wholesale commercial 25KG red woven sack for industrial food production, commercial caterers, and wholesale distributors.',
    features: ['25KG Bulk Sack', 'Commercial Milling', 'Wholesale Pricing', 'Heavy Duty Pack'],
    image_url: redRice25kgImg
  },
  'red-rice-flour-2kg': {
    id: 104,
    slug: 'red-rice-flour-2kg',
    name: 'Red Rice Flour 02KG Pack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '800.00',
    unit: '2KG Pack',
    description: 'Fresh sealed 2KG transparent retail package of 100% natural Red Rice Flour for everyday household cooking. MRP LKR 800.00.',
    features: ['2KG Sealed Pack', '100% Natural Red Rice', 'Daily Household Size'],
    image_url: redRice2kgImg
  },
  '104': {
    id: 104,
    slug: 'red-rice-flour-2kg',
    name: 'Red Rice Flour 02KG Pack (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '800.00',
    unit: '2KG Pack',
    description: 'Fresh sealed 2KG transparent retail package of 100% natural Red Rice Flour for everyday household cooking. MRP LKR 800.00.',
    features: ['2KG Sealed Pack', '100% Natural Red Rice', 'Daily Household Size'],
    image_url: redRice2kgImg
  },
  'roasted-chilli-powder-50g': {
    id: 107,
    slug: 'roasted-chilli-powder-50g',
    name: 'Roasted Chilli Powder 50g+5g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '140.00',
    unit: '50g + 5g Free',
    description: 'Authentic slow-roasted sun-dried red chilli powder with 5g bonus extra weight. Deep color and rich fiery aroma.',
    features: ['50g + 5g Extra Free', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors'],
    image_url: roastedChilli50gImg
  },
  '107': {
    id: 107,
    slug: 'roasted-chilli-powder-50g',
    name: 'Roasted Chilli Powder 50g+5g (வறுத்த மிளகாய்த்தூள்)',
    category: 'Spices',
    price: '140.00',
    unit: '50g + 5g Free',
    description: 'Authentic slow-roasted sun-dried red chilli powder with 5g bonus extra weight. Deep color and rich fiery aroma.',
    features: ['50g + 5g Extra Free', 'Sun-Dried Jaffna Chillies', 'No Artificial Colors'],
    image_url: roastedChilli50gImg
  },
  'gingelly-oil': {
    id: 106,
    slug: 'gingelly-oil',
    name: 'Pure Gingelly Oil (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '950.00',
    unit: '750ml Bottle',
    description: 'Cold-pressed authentic gingelly oil milled from premium sesame seeds. Rich aroma, high smoke point, and traditional flavor for healthy home cooking.',
    features: ['Cold-Pressed Unrefined Extraction', 'High Thermal Smoke Point', 'Rich Natural Sesame Aroma', 'Heart-Healthy Antioxidants'],
    image_url: hero3dImg
  },
  '106': {
    id: 106,
    slug: 'gingelly-oil',
    name: 'Pure Gingelly Oil (நல்லெண்ணெய்)',
    category: 'Gingelly Oil',
    price: '950.00',
    unit: '750ml Bottle',
    description: 'Cold-pressed authentic gingelly oil milled from premium sesame seeds. Rich aroma, high smoke point, and traditional flavor for healthy home cooking.',
    features: ['Cold-Pressed Unrefined Extraction', 'High Thermal Smoke Point', 'Rich Natural Sesame Aroma', 'Heart-Healthy Antioxidants'],
    image_url: hero3dImg
  },
  'jaffna-mixture': {
    id: 105,
    slug: 'jaffna-mixture',
    name: 'Jaffna Mixture (யாழ்ப்பாண மிக்சர்)',
    category: 'Mixture',
    price: '380.00',
    unit: '400g Pack',
    description: 'Crispy savory snacks spiced with roasted curry leaves, peanuts, fried chickpeas, and authentic Jaffna spices.',
    features: ['Authentic Jaffna Recipe', 'Crispy Snack Texture', 'Roasted Curry Leaf & Peanuts', 'Hygienic Sealed Pack'],
    image_url: hero3dImg
  },
  '105': {
    id: 105,
    slug: 'jaffna-mixture',
    name: 'Jaffna Mixture (யாழ்ப்பாண மிக்சர்)',
    category: 'Mixture',
    price: '380.00',
    unit: '400g Pack',
    description: 'Crispy savory snacks spiced with roasted curry leaves, peanuts, fried chickpeas, and authentic Jaffna spices.',
    features: ['Authentic Jaffna Recipe', 'Crispy Snack Texture', 'Roasted Curry Leaf & Peanuts', 'Hygienic Sealed Pack'],
    image_url: hero3dImg
  }
};

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/slug/${slug}`);
        if (response.data?.success && response.data.product) {
          setProduct(response.data.product);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Fallback product details used:', err);
      }

      const found = fallbackDetails[slug] || 
                    Object.values(fallbackDetails).find(p => String(p.id) === String(slug) || p.slug === slug) || 
                    fallbackDetails['red-rice-flour-5kg'];
      setProduct(found);
      setLoading(false);
    };
    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0', minHeight: '60vh', backgroundColor: '#FAF9F5' }}>
        <RefreshCw size={36} className="spin" style={{ animation: 'spin 1s linear infinite', color: '#0F4A24', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.2rem', color: '#0F4A24', fontWeight: '800' }}>Loading TASTRAA Product...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', backgroundColor: '#FAF9F5' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#0F4A24', fontWeight: '900', marginBottom: '16px' }}>Product Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '24px' }}>The product you requested could not be located in our catalog.</p>
        <Link to="/products" className="btn-green-3d" style={{ display: 'inline-flex', padding: '12px 24px', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
          <span>Back to Products Catalog</span>
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hi TASTRAA (PVT) LTD, I am interested in ordering ${product.name} (${product.unit}). Please let me know availability and delivery options.`;
  const whatsappUrl = `https://wa.me/94779789223?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#FAF9F5', minHeight: '85vh' }}>
      <div className="container">
        {/* Back Link */}
        <Link to="/products" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#0F4A24',
          fontWeight: '800',
          fontSize: '0.95rem',
          marginBottom: '30px',
          transition: 'color 0.2s',
          textDecoration: 'none'
        }}>
          <ArrowLeft size={18} />
          <span>Back to Products Catalog</span>
        </Link>

        {/* Product Details Layout */}
        <div className="product-details-grid" style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          boxShadow: '0 15px 40px rgba(15, 74, 36, 0.08)',
          border: '2px solid #E8F5E9',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px'
        }}>
          {/* Left Column: Product Image */}
          <div style={{
            position: 'relative',
            backgroundColor: '#F8FAFC',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <img 
              src={product.image_url || hero3dImg} 
              alt={product.name} 
              style={{
                maxWidth: '100%',
                maxHeight: '420px',
                objectFit: 'contain',
                borderRadius: '16px'
              }}
            />
            <span style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              backgroundColor: '#0F4A24',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: '800',
              padding: '6px 16px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              {product.category}
            </span>
          </div>

          {/* Right Column: Information & Actions */}
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#E8F5E9',
                color: '#0F4A24',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '0.75rem',
                marginBottom: '14px'
              }}>
                <Award size={14} />
                <span>100% PURE QUALITY GUARANTEED</span>
              </div>

              <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24', marginBottom: '16px', lineHeight: '1.2' }}>
                {product.name}
              </h1>

              {/* Price & Unit */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24' }}>
                  LKR {parseFloat(product.price || 0).toFixed(2)}
                </span>
                <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: '700', backgroundColor: '#E8F5E9', padding: '4px 12px', borderRadius: '6px' }}>
                  {product.unit}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F4A24', marginBottom: '8px' }}>Product Overview</h4>
                <p style={{ color: '#475569', fontSize: '1.025rem', lineHeight: '1.65' }}>
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F4A24', marginBottom: '12px' }}>Key Highlights</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {product.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E293B', fontWeight: '700', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} style={{ color: '#0F4A24', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-red-3d" 
                style={{ width: '100%', padding: '14px 28px', fontSize: '1.05rem', justifyContent: 'center' }}
              >
                <Send size={18} />
                <span>ORDER NOW VIA WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
