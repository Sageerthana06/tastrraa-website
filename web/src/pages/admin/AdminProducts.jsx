import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Search, 
  RefreshCw, 
  Upload, 
  X, 
  AlertCircle, 
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import api from '../../api';

const defaultAdminProducts = [
  {
    id: 1,
    name: 'TASTRAA Premium Rice Flour (1kg)',
    slug: 'tastraa-premium-rice-flour-1kg',
    description: 'Finely ground from 100% locally sourced premium Sri Lankan rice. Ideal for String Hoppers (Idiyappam), Pittu, Dosa, and crispy Sri Lankan snacks.',
    category: 'Rice Flour',
    price: 380.00,
    unit: '1kg',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    features: ['100% Pure & Natural', 'Super Fine Texture', 'No Preservatives'],
    is_active: true
  },
  {
    id: 2,
    name: 'TASTRAA Traditional Jaffna Mixture (500g)',
    slug: 'tastraa-traditional-jaffna-mixture-500g',
    description: 'Authentic spicy and savory Jaffna mixture made with premium peanuts, fried gram, curry leaves, and secret family spice blends.',
    category: 'Mixture',
    price: 650.00,
    unit: '500g',
    image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    features: ['Authentic Jaffna Recipe', 'Crunchy & Fresh', 'Zero Trans Fat'],
    is_active: true
  },
  {
    id: 3,
    name: 'TASTRAA Pure Cold-Pressed Gingelly Oil (500ml)',
    slug: 'tastraa-pure-cold-pressed-gingelly-oil-500ml',
    description: 'Pure cold-pressed sesame / gingelly oil extracted from selected sesame seeds using traditional expeller methods.',
    category: 'Gingelly Oil',
    price: 1250.00,
    unit: '500ml',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    features: ['Cold-Pressed Extraction', '100% Pure Sesame', 'Rich Natural Aroma'],
    is_active: true
  },
  {
    id: 4,
    name: 'TASTRAA Special Rice Flour (500g)',
    slug: 'tastraa-special-rice-flour-500g',
    description: 'Convenient 500g pack of high-grade rice flour for everyday family cooking and baking. Silky smooth texture.',
    category: 'Rice Flour',
    price: 200.00,
    unit: '500g',
    image_url: 'https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&w=800&q=80',
    features: ['Easy-to-use Pack', 'Silky Smooth Grain'],
    is_active: true
  },
  {
    id: 5,
    name: 'TASTRAA Spicy Mixture Delight (250g)',
    slug: 'tastraa-spicy-mixture-delight-250g',
    description: 'Extra spicy Jaffna mixture for snack lovers. Packed with roasted cashews, fried lentils, and aromatic herbs.',
    category: 'Mixture',
    price: 350.00,
    unit: '250g',
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80',
    features: ['Extra Crunchy', 'Spicy Chili Blast'],
    is_active: true
  },
  {
    id: 6,
    name: 'TASTRAA Pure Gingelly Oil (1 Litre)',
    slug: 'tastraa-pure-cold-pressed-gingelly-oil-1l',
    description: 'Bulk 1L bottle of 100% pure cold-pressed Gingelly Oil for commercial kitchens, catering, and food enthusiasts.',
    category: 'Gingelly Oil',
    price: 2400.00,
    unit: '1 Litre',
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    features: ['Economical Pack', 'Unrefined & Chemical-Free'],
    is_active: true
  },
  {
    id: 7,
    name: 'TASTRAA Pakoda Hot & Crispy (250g)',
    slug: 'tastraa-pakoda-250g',
    description: 'Authentic spicy & crispy Pakoda snack (பகோடா) made with gram flour, sesame, omam, garlic, curry leaves, and traditional spice blends.',
    category: 'Mixture',
    price: 530.00,
    unit: '250g Pack',
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80',
    features: ['100% Veg', 'Hot & Crispy'],
    is_active: true
  },
  {
    id: 8,
    name: 'TASTRAA Special Curry Powder (250g)',
    slug: 'tastraa-curry-powder-250g',
    description: 'Traditional Sri Lankan Curry Powder (கரித்தூள்) ground from red dry chilli, coriander, fennel, cumin, turmeric, curry leaves, cinnamon, cardamom, and black pepper.',
    category: 'Spices',
    price: 250.00,
    unit: '250g Pack',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    features: ['100% Pure Spices', 'Authentic Recipe'],
    is_active: true
  },
  {
    id: 9,
    name: 'TASTRAA Bengal Gram (மஞ்சள் கடலை)',
    slug: 'tastraa-bengal-gram-100',
    description: 'Authentic roasted yellow Bengal Gram (மஞ்சள் கடலை) seasoned with salt. Crisp, delicious, healthy traditional roasted snack.',
    category: 'Mixture',
    price: 500.00,
    unit: 'Rs 500 Pack',
    image_url: '/assets/bengal_gram_yellow.jpg',
    features: ['Roasted Yellow Gram', '100% Pure & Natural'],
    is_active: true
  },
  {
    id: 10,
    name: 'TASTRAA Plate Dumplings (தட்டு வடை)',
    slug: 'tastraa-plate-dumplings-100',
    description: 'Authentic traditional crunchy Plate Dumplings (தட்டு வடை) made from dhal, vegetable oil, salt, and spicy red chilli powder.',
    category: 'Mixture',
    price: 100.00,
    unit: 'Rs 100 Pack',
    image_url: '/assets/plate_dumplings.jpg',
    features: ['Authentic Plate Dumplings', 'Crispy Tea-time Snack'],
    is_active: true
  },
  {
    id: 11,
    name: 'TASTRAA Bites (பைட்ஸ்)',
    slug: 'tastraa-bites-50',
    description: 'Crunchy savory snack Bites (பைட்ஸ்) made with wheat flour, urad dal, vegetable oil, and spicy red chilli seasoning.',
    category: 'Mixture',
    price: 50.00,
    unit: 'Rs 50 Pack',
    image_url: '/assets/bites_pack.jpg',
    features: ['Crispy Savory Bites', 'Rs 50 Pocket Pack'],
    is_active: true
  },
  {
    id: 12,
    name: 'TASTRAA Masala Murukku (மசாலா முறுக்கு)',
    slug: 'tastraa-masala-murukku-50',
    description: 'Authentic spicy & crispy Masala Murukku (மசாலா முறுக்கு) made with rice flour, urad flour, gram flour, curry leaves, and traditional spices.',
    category: 'Mixture',
    price: 50.00,
    unit: 'Rs 50 Pack',
    image_url: '/assets/masala_murukku.jpg',
    features: ['Authentic Masala Murukku', '100% Veg Snack'],
    is_active: true
  }
];

const AdminProducts = () => {
  const [products, setProducts] = useState(defaultAdminProducts);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Rice Flour',
    price: '',
    unit: '1kg',
    image_url: '',
    featuresInput: '',
    is_active: true
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('tastraa_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
    if (location.state?.openAdd) {
      openAddModal();
    }
  }, [navigate, location.state]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/products?includeInactive=true');
      if (response.data?.success && Array.isArray(response.data.products) && response.data.products.length > 0) {
        setProducts(response.data.products);
      } else {
        setProducts(defaultAdminProducts);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('tastraa_admin_token');
        navigate('/admin/login');
      } else {
        setProducts(defaultAdminProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: 'Rice Flour',
      price: '',
      unit: '1kg',
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      featuresInput: '100% Pure & Natural, Super Fine Texture, No Preservatives',
      is_active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    const featuresStr = Array.isArray(product.features) ? product.features.join(', ') : (product.features || '');
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      unit: product.unit,
      image_url: product.image_url,
      featuresInput: featuresStr,
      is_active: product.is_active
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingImage(true);
    try {
      const res = await api.post('/products/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.success) {
        const rawUrl = res.data.imageUrl;
        if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
          setFormData((prev) => ({ ...prev, image_url: rawUrl }));
        } else {
          const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
          const baseUrl = rawApiUrl.trim().replace(/\/api\/?$/, '').replace(/\/$/, '');
          setFormData((prev) => ({ ...prev, image_url: `${baseUrl}${rawUrl}` }));
        }
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Parse features comma separated
    const featuresArray = formData.featuresInput
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      unit: formData.unit,
      image_url: formData.image_url,
      features: featuresArray,
      is_active: formData.is_active
    };

    try {
      if (editingProduct) {
        // PUT update
        const res = await api.put(`/products/${editingProduct.id}`, payload);
        if (res.data?.success) {
          setSuccessMsg('Product updated successfully!');
          setIsModalOpen(false);
          fetchProducts();
        }
      } else {
        // POST create
        const res = await api.post('/products', payload);
        if (res.data?.success) {
          setSuccessMsg('New product created successfully!');
          setIsModalOpen(false);
          fetchProducts();
        }
      }
    } catch (err) {
      console.error('Save product error:', err);
      setError(err.response?.data?.message || 'Failed to save product.');
    }
  };

  const toggleActiveStatus = async (product) => {
    try {
      const res = await api.put(`/products/${product.id}`, { is_active: !product.is_active });
      if (res.data?.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Toggle status error:', err);
      alert('Failed to toggle status.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data?.success) {
        setSuccessMsg(`Product "${name}" deleted.`);
        fetchProducts();
      }
    } catch (err) {
      console.error('Delete product error:', err);
      alert('Failed to delete product.');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '50px 0', backgroundColor: '#FAFAFA', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4B5563', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
              Manage Products Catalog
            </h1>
          </div>

          <button onClick={openAddModal} className="btn-primary">
            <Plus size={18} />
            <span>ADD NEW PRODUCT</span>
          </button>
        </div>

        {/* Success / Error Banners */}
        {successMsg && (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '14px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: '600' }}>
            {successMsg}
          </div>
        )}
        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '14px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: '600' }}>
            {error}
          </div>
        )}

        {/* Filter Controls */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Search products by name or text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 38px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.9rem',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="All">All Categories</option>
              <option value="Rice Flour">Rice Flour</option>
              <option value="Mixture">Mixture</option>
              <option value="Gingelly Oil">Gingelly Oil</option>
              <option value="Spices">Spices</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
            <RefreshCw size={32} className="spin" style={{ animation: 'spin 1s linear infinite', color: '#D32F2F', marginBottom: '12px' }} />
            <p>Loading products table...</p>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#111827', color: '#FFFFFF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '16px 20px' }}>Product</th>
                    <th style={{ padding: '16px' }}>Category</th>
                    <th style={{ padding: '16px' }}>Price</th>
                    <th style={{ padding: '16px' }}>Unit</th>
                    <th style={{ padding: '16px' }}>Status</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                        No products match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img 
                            src={p.image_url} 
                            alt={p.name} 
                            style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #E5E7EB' }} 
                          />
                          <div>
                            <strong style={{ color: '#111827', display: 'block', fontSize: '0.95rem' }}>{p.name}</strong>
                            <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>slug: {p.slug}</span>
                          </div>
                        </td>

                        <td style={{ padding: '16px' }}>
                          <span style={{ backgroundColor: '#F3F4F6', color: '#1F2937', fontWeight: '700', padding: '4px 10px', borderRadius: '6px', fontSize: '0.775rem' }}>
                            {p.category}
                          </span>
                        </td>

                        <td style={{ padding: '16px', fontWeight: '800', color: '#D32F2F' }}>
                          LKR {parseFloat(p.price).toFixed(2)}
                        </td>

                        <td style={{ padding: '16px', color: '#4B5563', fontWeight: '600' }}>
                          {p.unit}
                        </td>

                        <td style={{ padding: '16px' }}>
                          <button
                            onClick={() => toggleActiveStatus(p)}
                            style={{
                              border: 'none',
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              fontSize: '0.775rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              backgroundColor: p.is_active ? '#ECFDF5' : '#FEF2F2',
                              color: p.is_active ? '#059669' : '#DC2626'
                            }}
                          >
                            {p.is_active ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {p.is_active ? 'ACTIVE' : 'INACTIVE'}
                          </button>
                        </td>

                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                              onClick={() => openEditModal(p)}
                              style={{
                                backgroundColor: '#EFF6FF',
                                color: '#2563EB',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.825rem',
                                fontWeight: '700',
                                border: '1px solid #BFDBFE',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              style={{
                                backgroundColor: '#FEF2F2',
                                color: '#DC2626',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.825rem',
                                fontWeight: '700',
                                border: '1px solid #FCA5A5',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            border: '1px solid #E5E7EB'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#111827',
              color: '#FFFFFF',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '4px solid #D32F2F'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#9CA3AF' }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. TASTRAA Premium Rice Flour (1kg)"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Rice Flour">Rice Flour</option>
                    <option value="Mixture">Mixture</option>
                    <option value="Gingelly Oil">Gingelly Oil</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Unit / Size *</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g. 1kg, 500g, 500ml"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Price (LKR) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="380.00"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Active Status</label>
                  <select
                    value={formData.is_active ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="true">Active (Visible to public)</option>
                    <option value="false">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Image URL or Upload</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
                  />
                  <label style={{
                    backgroundColor: '#F3F4F6',
                    border: '1px solid #D1D5DB',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Upload size={14} />
                    <span>{uploadingImage ? 'Uploading...' : 'Browse'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the product..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>Features (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.featuresInput}
                  onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
                  placeholder="100% Pure, Super Fine Texture, No Preservatives"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
