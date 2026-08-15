import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, CheckCircle, XCircle, ArrowRight, ShieldCheck, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import api from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, categoryBreakdown: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tastraa_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await api.get('/stats');
        if (response.data?.success) {
          setStats(response.data.stats);
        }
      } catch (err) {
        console.error('Stats fetch error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('tastraa_admin_token');
          navigate('/admin/login');
        } else {
          setError('Failed to fetch dashboard metrics.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div style={{ padding: '50px 0', backgroundColor: '#FAFAFA', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge-red" style={{ marginBottom: '8px' }}>
              <ShieldCheck size={14} />
              <span>Admin Control Center</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
              TASTRAA Management Dashboard
            </h1>
          </div>

          <Link to="/admin/products" className="btn-primary">
            <Package size={18} />
            <span>Manage Products Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading / Error */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
            <RefreshCw size={32} className="spin" style={{ animation: 'spin 1s linear infinite', color: '#D32F2F', marginBottom: '12px' }} />
            <p>Loading dashboard metrics...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '20px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '12px' }}>
            {error}
          </div>
        ) : (
          <div>
            {/* Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {/* Total Products */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Total Products</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginTop: '4px' }}>{stats.total}</div>
                </div>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#FFEBEE', color: '#D32F2F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={28} />
                </div>
              </div>

              {/* Active Products */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>Active Products</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#059669', marginTop: '4px' }}>{stats.active}</div>
                </div>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={28} />
                </div>
              </div>

              {/* Inactive Products */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#DC2626', textTransform: 'uppercase' }}>Inactive Products</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#DC2626', marginTop: '4px' }}>{stats.inactive}</div>
                </div>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle size={28} />
                </div>
              </div>
            </div>

            {/* Quick Actions Banner */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
                Product Management Control
              </h3>
              <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                As an authorized administrator, you can ADD new products, EDIT existing products, change prices, update images, modify descriptions, categories, units, key features, and toggle active/inactive status.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/admin/products" className="btn-primary">
                  <Plus size={18} />
                  <span>Add / Edit Products</span>
                </Link>
                <Link to="/products" className="btn-secondary">
                  <span>View Public Store</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
