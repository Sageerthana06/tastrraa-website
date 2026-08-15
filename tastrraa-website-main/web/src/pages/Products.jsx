import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, CheckCircle2, ShoppingBag, Star, Sparkles, Eye, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api';
import hero3dImg from '../assets/tastraa_original_hero.png';
import redRice5kgImg from '../assets/red_rice_flour_5kg.jpg';
import redRice10kgImg from '../assets/red_rice_flour_10kg.jpg';
import redRice25kgImg from '../assets/red_rice_flour_25kg.png';
import redRice2kgImg from '../assets/red_rice_flour_2kg.jpg';
import roastedChilli50gImg from '../assets/roasted_chilli_powder_50g.jpg';

const fallbackProducts = [
  {
    id: 101,
    name: 'Red Rice Flour 05KG Sack',
    category: 'Rice Flour',
    price: '1430.00',
    unit: '05KG Sack',
    description: 'Locally produced red rice flour with a focus on consistent texture and everyday usability.',
    features: ['05KG Woven Sack', '100% Pure Red Rice', 'Uniform Texture'],
    image_url: redRice5kgImg,
    slug: 'red-rice-flour-5kg'
  },
  {
    id: 102,
    name: 'Red Rice Flour 10KG Sack',
    category: 'Rice Flour',
    price: '3000.00',
    unit: '10KG Sack',
    description: 'Locally produced red rice flour with a focus on consistent texture and everyday usability.',
    features: ['10KG Blue Sack', 'High Dietary Fiber', 'Purity Certified'],
    image_url: redRice10kgImg,
    slug: 'red-rice-flour-10kg'
  },
  {
    id: 103,
    name: 'Red Rice Flour 25KG Sack',
    category: 'Rice Flour',
    price: '7250.00',
    unit: '25KG Sack',
    description: 'Locally produced red rice flour with a focus on consistent texture and everyday usability.',
    features: ['25KG Bulk Bag', 'Commercial Milling', 'Wholesale Rate'],
    image_url: redRice25kgImg,
    slug: 'red-rice-flour-25kg'
  },
  {
    id: 104,
    name: 'Red Rice Flour 02KG Pack',
    category: 'Rice Flour',
    price: '800.00',
    unit: '2KG Pack',
    description: 'Locally produced red rice flour with a focus on consistent texture and everyday usability.',
    features: ['2KG Retail Pack', 'Hygienic Sealed', 'Preservative Free'],
    image_url: redRice2kgImg,
    slug: 'red-rice-flour-2kg'
  },
  {
    id: 105,
    name: 'Jaffna Mixture Snack Pack',
    category: 'Mixture',
    price: '380.00',
    unit: '400g Pack',
    description: 'A practical snack product produced for everyday consumption.',
    features: ['Crunchy Texture', 'Roasted Curry Leaf', 'Jaffna Spiced'],
    image_url: hero3dImg,
    slug: 'jaffna-mixture'
  },
  {
    id: 106,
    name: 'Cold-Pressed Gingelly Oil',
    category: 'Gingelly Oil',
    price: '950.00',
    unit: '750ml Bottle',
    description: 'Quality gingelly oil produced with attention to cleanliness and batch consistency.',
    features: ['Cold Pressed', 'Pure Sesame', 'Rich Aroma'],
    image_url: hero3dImg,
    slug: 'gingelly-oil'
  },
  {
    id: 107,
    name: 'Roasted Chilli Powder 50g+5g',
    category: 'Spices',
    price: '140.00',
    unit: '50g + 5g Free',
    description: 'Slow-roasted sun-dried red chillies expertly ground for deep color and rich traditional flavor.',
    features: ['50g + 5g Free', 'Sun-Dried Chillies', 'Fiery Rich Aroma'],
    image_url: roastedChilli50gImg,
    slug: 'roasted-chilli-powder-50g'
  }
];

const Products = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Rice Flour', 'Mixture', 'Gingelly Oil', 'Spices'];

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', { timeout: 3000 });
        if (isMounted && response.data?.success && Array.isArray(response.data.products) && response.data.products.length > 0) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.warn('API connection offline or error, using fallback products:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  const filteredProducts = (products || []).filter((item) => {
    if (!item) return false;
    const name = item.name ? String(item.name).toLowerCase() : '';
    const desc = item.description ? String(item.description).toLowerCase() : '';
    const cat = item.category || '';
    const searchTerm = (search || '').toLowerCase();

    const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || cat === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#FAF9F5', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0de94cff 0%, #e7130bff 100%)',
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
            backgroundColor: 'rgba(16, 237, 71, 0.8)',
            border: '1px solid rgba(27, 198, 11, 0.9)',
            padding: '6px 18px',
            borderRadius: '9999px',
            marginBottom: '16px'
          }}>
            <Sparkles size={16} style={{ color: '#FFD700' }} />
            <span style={{ color: '#FFD700', fontWeight: '800', fontSize: '0.825rem', letterSpacing: '1px' }}>
              OUR PRODUCT LINEUP • TASTRAA (PVT) LTD
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif" }}>
            PRODUCT <span style={{ color: '#FFD700' }}>CATALOG</span>
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#E2E8F0', fontSize: '1.1rem', fontWeight: '600', lineHeight: '1.6' }}>
            Dependable Food Essentials for Households, Retailers & Food Startups
          </p>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {/* Controls Bar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: '24px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
            border: '1px solid #E2E8F0',
            marginBottom: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    transition: 'all 0.25s',
                    backgroundColor: selectedCategory === cat ? '#0F4A24' : '#F1F5F9',
                    color: selectedCategory === cat ? '#FFFFFF' : '#860f78ff',
                    border: selectedCategory === cat ? '1px solid #0F4A24' : '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search food products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 18px 11px 44px',
                  borderRadius: '9999px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#FAF9F5'
                }}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="responsive-grid-auto" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredProducts.map((product) => {
              const formattedPrice = product.price ? parseFloat(product.price).toFixed(2) : '0.00';
              const productSlug = product.slug || product.id;

              return (
                <motion.div
                  key={product.id || product.slug}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '2px solid #E8F5E9',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image Box */}
                  <div style={{ position: 'relative', height: '230px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <img
                      src={product.image_url || hero3dImg}
                      alt={product.name || 'TASTRAA Product'}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: '#0F4A24',
                      color: '#FFFFFF',
                      fontSize: '0.725rem',
                      fontWeight: '800',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase'
                    }}>
                      {product.category || 'Food Essential'}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: '#0F4A24',
                        marginBottom: '10px',
                        textDecoration: 'underline',
                        textDecorationColor: '#0F4A24',
                        textUnderlineOffset: '5px',
                        textDecorationThickness: '2px'
                      }}>
                        {product.name || 'TASTRAA Product'}
                      </h3>

                      <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '16px' }}>
                        {product.description || ''}
                      </p>

                      {/* Features */}
                      {product.features && Array.isArray(product.features) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                          {product.features.map((feat, fidx) => (
                            <span key={fidx} style={{
                              backgroundColor: '#E8F5E9',
                              color: '#0F4A24',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              padding: '3px 10px',
                              borderRadius: '6px',
                              border: '1px solid #A5D6A7'
                            }}>
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F4A24' }}>
                          LKR {formattedPrice}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: '800', backgroundColor: '#FEF3C7', padding: '4px 12px', borderRadius: '6px' }}>
                          {product.unit || 'Pack'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '10px', alignItems: 'center' }}>
                        <Link
                          to={`/products/${productSlug}`}
                          style={{
                            backgroundColor: '#FAF9F5',
                            color: '#0F4A24',
                            border: '2px solid #0F4A24',
                            borderRadius: '9999px',
                            padding: '11px 14px',
                            fontWeight: '800',
                            fontSize: '0.8rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Eye size={14} />
                          <span>VIEW DETAILS</span>
                        </Link>

                        <a
                          href={`https://wa.me/94779789223?text=Hi%20TASTRAA,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-red-3d"
                          style={{
                            padding: '12px 28px',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            justifyContent: 'center',
                            borderRadius: '9999px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Send size={15} />
                          <span>ORDER NOW</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
