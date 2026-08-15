import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, RefreshCw, Send, CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);

  const categories = ['All', 'Rice Flour', 'Mixture', 'Gingelly Oil'];

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products', {
        params: {
          category: selectedCategory,
          search: search
        }
      });
      if (response.data?.success) {
        setProducts(response.data.products);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Products error:', err);
      setError('Unable to connect to product server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, search]);

  return (
    <div>
      {/* Banner */}
      <section style={{
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '60px 0',
        textAlign: 'center',
        borderBottom: '4px solid #D32F2F'
      }}>
        <div className="container">
          <span className="badge-red" style={{ marginBottom: '12px' }}>Locally Produced Essentials</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', color: '#FFFFFF' }}>
            TASTRAA Products Catalog
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#9CA3AF', fontSize: '1.05rem' }}>
            Browse our range of pure Rice Flour, authentic Jaffna Mixture, and cold-pressed Gingelly Oil.
          </p>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#FAFAFA', minHeight: '60vh' }}>
        <div className="container">
          {/* Controls Bar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            border: '1px solid #E5E7EB',
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
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    transition: 'all 0.2s',
                    backgroundColor: selectedCategory === cat ? '#D32F2F' : '#F3F4F6',
                    color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                    border: 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 42px',
                  borderRadius: '9999px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#6B7280' }}>
              <RefreshCw size={32} className="spin" style={{ animation: 'spin 1s linear infinite', marginBottom: '12px', color: '#D32F2F' }} />
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>Fetching TASTRAA products from database...</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#FEF2F2', borderRadius: '16px', border: '1px solid #FCA5A5' }}>
              <p style={{ color: '#DC2626', fontWeight: '700', fontSize: '1.1rem', marginBottom: '12px' }}>{error}</p>
              <button onClick={fetchProducts} className="btn-primary">Try Again</button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
              <ShoppingBag size={48} style={{ color: '#9CA3AF', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#111827', fontWeight: '700', marginBottom: '8px' }}>No Products Found</h3>
              <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Try clearing your search query or selecting a different category.</p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && products.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Card Image */}
                    <div style={{ position: 'relative', height: '240px', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        backgroundColor: '#111827',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase'
                      }}>
                        {product.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                          {product.name}
                        </h3>

                        <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.description}
                        </p>

                        {/* Features chips */}
                        {product.features && product.features.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                            {product.features.slice(0, 3).map((feat, fidx) => (
                              <span key={fidx} style={{
                                backgroundColor: '#FFFBEB',
                                color: '#D97706',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                border: '1px solid #FEF3C7',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <CheckCircle2 size={11} />
                                {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
                          <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#D32F2F' }}>
                            LKR {parseFloat(product.price).toFixed(2)}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600', backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '4px' }}>
                            Unit: {product.unit}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <Link 
                            to={`/products/${product.slug}`} 
                            className="btn-secondary" 
                            style={{ padding: '9px 12px', fontSize: '0.85rem', width: '100%' }}
                          >
                            View Details
                          </Link>
                          <a 
                            href={`https://wa.me/94779789223?text=Hi%20TASTRAA,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-whatsapp" 
                            style={{ padding: '9px 12px', fontSize: '0.85rem', width: '100%' }}
                          >
                            <Send size={14} />
                            <span>Order Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Products;
