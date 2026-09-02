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
import bengalGram100Img from '../assets/bengal_gram_100.jpg';
import gingellyOil750mlImg from '../assets/gingelly_oil_750ml.jpg';
import gingellyOil375mlImg from '../assets/gingelly_oil_375ml.jpg';
import bengalGramPackImg from '../assets/bengal_gram_pack.jpg';
import redRawRice25kgImg from '../assets/red_raw_rice_25kg.jpg';
import plateDumplingsImg from '../assets/plate_dumplings.jpg';
import bitesPackImg from '../assets/bites_pack.jpg';
import bengalGramYellowImg from '../assets/bengal_gram_yellow.jpg';
import masalaMurukkuImg from '../assets/masala_murukku.jpg';

const fallbackDetails = {
  'red-rice-flour-5kg': {
    id: 101,
    slug: 'red-rice-flour-5kg',
    name: 'Red Rice Flour 05KG  (சிவப்பு அரிசி மா)',
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
    name: 'Red Rice Flour 05KG  (சிவப்பு அரிசி மா)',
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
    name: 'Red Rice Flour 10KG  (சிவப்பு அரிசி மா)',
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
    name: 'Red Rice Flour 10KG (சிவப்பு அரிசி மா)',
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
    name: 'Red Rice Flour 25KG (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Commercial Sack',
    description: 'Wholesale commercial 25KG red woven for industrial food production, commercial caterers, and wholesale distributors.',
    features: ['25KG Bulk Sack', 'Commercial Milling', 'Wholesale Pricing', 'Heavy Duty Pack'],
    image_url: redRice25kgImg
  },
  '103': {
    id: 103,
    slug: 'red-rice-flour-25kg',
    name: 'Red Rice Flour 25KG  (சிவப்பு அரிசி மா)',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Commercial Sack',
    description: 'Wholesale commercial 25KG red woven for industrial food production, commercial caterers, and wholesale distributors.',
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
  'mikser-200g': {
    id: 159,
    slug: 'mikser-200g',
    name: 'Mikser 200g (மிக்சர்)',
    category: 'Mixture',
    price: '300.00',
    unit: '200g Pack',
    description: 'Authentic spicy and savory Mikser with curry leaves, roasted nuts & secret spices.',
    features: ['200g Pack', 'Traditional Spiced', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  '159': {
    id: 159,
    slug: 'mikser-200g',
    name: 'Mikser 200g (மிக்சர்)',
    category: 'Mixture',
    price: '300.00',
    unit: '200g Pack',
    description: 'Authentic spicy and savory Mikser with curry leaves, roasted nuts & secret spices.',
    features: ['200g Pack', 'Traditional Spiced', 'Wholesale Rate: LKR 180'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'mikser-400g': {
    id: 160,
    slug: 'mikser-400g',
    name: 'Mikser 400g (மிக்சர்)',
    category: 'Mixture',
    price: '600.00',
    unit: '400g Pack',
    description: 'Crispy savory spicy Mikser packed fresh for tea-time and celebrations.',
    features: ['400g Value Pack', 'Crunchy Fresh', 'Wholesale Rate: LKR 360'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  '160': {
    id: 160,
    slug: 'mikser-400g',
    name: 'Mikser 400g (மிக்சர்)',
    category: 'Mixture',
    price: '600.00',
    unit: '400g Pack',
    description: 'Crispy savory spicy Mikser packed fresh for tea-time and celebrations.',
    features: ['400g Value Pack', 'Crunchy Fresh', 'Wholesale Rate: LKR 360'],
    image_url: '/assets/tastraa_mixture.jpg'
  },
  'tastraa-bengal-gram-100': {
    id: 112,
    slug: 'tastraa-bengal-gram-100',
    name: 'TASTRAA Bengal Gram (மஞ்சள் கடலை)',
    category: 'Mixture',
    price: '500.00',
    unit: 'Rs 500 Pack',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) seasoned with salt. Crisp, delicious, healthy traditional roasted snack.',
    features: ['Roasted Yellow Gram', '100% Pure & Natural', 'Lightly Salted', 'High Protein Snack'],
    image_url: bengalGramYellowImg
  },
  'gingelly-oil': {
    id: 106,
    slug: 'gingelly-oil',
    name: 'Pure Cold-Pressed Gingelly Oil (750ml)',
    category: 'Gingelly Oil',
    price: '950.00',
    unit: '750ml Bottle',
    description: '100% Pure cold-pressed sesame oil extracted using traditional methods. Rich natural aroma and heart-healthy.',
    features: ['Cold Pressed', '100% Pure Sesame', 'Rich Aroma', 'Best for Cooking'],
    image_url: gingellyOil750mlImg
  },
  'gingelly-oil-375ml': {
    id: 113,
    slug: 'gingelly-oil-375ml',
    name: 'Pure Cold-Pressed Gingelly Oil (375ml)',
    category: 'Gingelly Oil',
    price: '500.00',
    unit: '375ml Bottle',
    description: 'Pure traditional sesame oil in a 375ml retail bottle. 100% natural, unrefined, and chemical-free.',
    features: ['375ml Bottle', 'Cold Pressed', 'Authentic Taste', 'Hygienic Sealed'],
    image_url: gingellyOil375mlImg
  },
  'red-raw-rice-25kg': {
    id: 114,
    slug: 'red-raw-rice-25kg',
    name: 'Red Raw Rice 25KG Sack (சிவப்பு பச்சை அரிசி)',
    category: 'Rice Flour',
    price: '7500.00',
    unit: '25KG Sack',
    description: 'Premium Quality Red Raw Rice (சிவப்பு பச்சை அரிசி) packaged in authentic 25kg yellow woven sack.',
    features: ['25KG Yellow Sack', '100% Red Raw Rice', 'Premium Quality', 'Wholesale Pack'],
    image_url: redRawRice25kgImg
  },
  'tastraa-plate-dumplings-100': {
    id: 115,
    slug: 'tastraa-plate-dumplings-100',
    name: 'TASTRAA Plate Dumplings (தட்டு வடை)',
    category: 'Mixture',
    price: '100.00',
    unit: 'Rs 100 Pack',
    description: 'Authentic traditional crunchy Plate Dumplings (தட்டு வடை) made from dhal, vegetable oil, salt, and spicy red chilli powder.',
    features: ['Authentic Plate Dumplings', '100% Pure & Natural', 'Dhal, Oil, Salt & Chilli', 'Crispy Tea-time Snack'],
    image_url: plateDumplingsImg
  },
  'tastraa-bites-50': {
    id: 116,
    slug: 'tastraa-bites-50',
    name: 'TASTRAA Bites (பைட்ஸ்)',
    category: 'Mixture',
    price: '50.00',
    unit: 'Rs 50 Pack',
    description: 'Crunchy savory snack Bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning.',
    features: ['Crispy Savory Bites', 'Wheat Flour & Urad Dal', 'Spicy Chilli Seasoning', 'Rs 50 Pocket Pack'],
    image_url: '/assets/tastraa_bites.jpg'
  },
  'tastraa-masala-murukku-50': {
    id: 117,
    slug: 'tastraa-masala-murukku-50',
    name: 'TASTRAA Masala Murukku (மசாலா முறுக்கு)',
    category: 'Mixture',
    price: '50.00',
    unit: 'Rs 50 Pack',
    description: 'Authentic spicy & crispy Masala Murukku (மசாலா முறுக்கு) made with rice flour, urad flour, gram flour, curry leaves, and traditional spices.',
    features: ['Authentic Masala Murukku', 'Crispy & Crunchy', 'Curry Leaves & Spices', '100% Veg Snack'],
    image_url: '/assets/tastraa_masala_murukku.jpg'
  }
};

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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

  const originalUnitPrice = parseFloat(product.price || 0);
  const wholesalePrice = product.wholesale_price ? parseFloat(product.wholesale_price) : null;
  const unitPrice = wholesalePrice || originalUnitPrice;
  const totalPrice = (unitPrice * quantity).toFixed(2);
  const originalTotalPrice = (originalUnitPrice * quantity).toFixed(2);
  const whatsappMessage = `Hi TASTRAA (PVT) LTD, I would like to order:
- Product: ${product.name} (${product.unit})
- Quantity: ${quantity} item(s)
- Total Price: LKR ${totalPrice}

Please let me know availability and delivery options.`;
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
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F4A24' }}>
                  LKR {unitPrice.toFixed(2)}
                </span>
                {/* Strikethrough removed as requested */}
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
                <div style={{ marginBottom: '28px' }}>
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

            {/* Quantity Selector Section */}
            <div style={{
              marginBottom: '24px',
              padding: '18px 24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '20px',
              border: '2px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Total Price
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F4A24' }}>
                    LKR {totalPrice}
                  </span>
                  {/* Strikethrough removed as requested */}
                  {quantity > 1 && (
                    <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '700' }}>
                      (LKR {unitPrice.toFixed(2)} each)
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFFFF', padding: '6px 12px', borderRadius: '14px', border: '2px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: quantity > 1 ? '#0F4A24' : '#F1F5F9',
                    color: quantity > 1 ? '#FFFFFF' : '#94A3B8',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '55px',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: '#0F4A24',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#0F4A24',
                    color: '#FFFFFF',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green-3d"
                style={{ width: '100%', padding: '16px 28px', fontSize: '1.05rem', justifyContent: 'center' }}
              >
                <Send size={18} />
                <span>ORDER NOW VIA WHATSAPP ({quantity} ITEM{quantity > 1 ? 'S' : ''})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
