import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, ShieldCheck, RefreshCw, Phone, Wheat, Award } from 'lucide-react';
import api from '../api';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products/slug/${slug}`);
        if (response.data?.success) {
          setProduct(response.data.product);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error loading product details:', err);
        setError('Product details could not be retrieved.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0', minHeight: '60vh' }}>
        <RefreshCw size={36} className="spin" style={{ animation: 'spin 1s linear infinite', color: '#D32F2F', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.2rem', color: '#4B5563' }}>Loading product details...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', color: '#111827', fontWeight: '800', marginBottom: '16px' }}>Product Not Found</h2>
        <p style={{ color: '#6B7280', marginBottom: '24px' }}>The product you are looking for might have been moved or updated.</p>
        <Link to="/products" className="btn-primary">
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hi TASTRAA (PVT) LTD, I am interested in ordering ${product.name} (${product.unit}). Please let me know the availability and delivery details.`;
  const whatsappUrl = `https://wa.me/94779789223?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#FAFAFA', minHeight: '80vh' }}>
      <div className="container">
        {/* Back Link */}
        <Link to="/products" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#4B5563',
          fontWeight: '600',
          fontSize: '0.95rem',
          marginBottom: '30px',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#D32F2F'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
        >
          <ArrowLeft size={18} />
          <span>Back to Products Catalog</span>
        </Link>

        {/* Product Details Layout */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px'
        }}>
          {/* Left Column: Product Image */}
          <div style={{
            position: 'relative',
            backgroundColor: '#F9FAFB',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <img 
              src={product.image_url} 
              alt={product.name} 
              style={{
                maxWidth: '100%',
                maxHeight: '420px',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
              }}
            />
            <span style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: '700',
              padding: '6px 14px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              {product.category}
            </span>
          </div>

          {/* Right Column: Information & Actions */}
          <div style={{ padding: '40px 40px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="badge-red" style={{ marginBottom: '12px' }}>
                <Award size={14} />
                <span>100% Quality Guaranteed</span>
              </div>

              <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', marginBottom: '16px', lineHeight: '1.2' }}>
                {product.name}
              </h1>

              {/* Price & Unit */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#D32F2F' }}>
                  LKR {parseFloat(product.price).toFixed(2)}
                </span>
                <span style={{ fontSize: '1rem', color: '#6B7280', fontWeight: '600' }}>
                  / {product.unit}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Product Overview</h4>
                <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: '1.65' }}>
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Key Highlights</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {product.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1F2937', fontWeight: '600', fontSize: '0.925rem' }}>
                        <CheckCircle2 size={16} style={{ color: '#D32F2F', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp" 
                style={{ width: '100%', padding: '14px 28px', fontSize: '1.05rem', justifyContent: 'center' }}
              >
                <Send size={20} />
                <span>Order Now via WhatsApp</span>
              </a>

              <a 
                href="tel:0779789223" 
                className="btn-secondary" 
                style={{ width: '100%', padding: '12px 28px', fontSize: '0.95rem', justifyContent: 'center' }}
              >
                <Phone size={18} style={{ color: '#D32F2F' }} />
                <span>Call Sales: 0779789223 / 0212052200</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
