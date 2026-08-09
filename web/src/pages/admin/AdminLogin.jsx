import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../api';
import logoImg from '../../assets/logo.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@tastraa.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data?.success) {
        localStorage.setItem('tastraa_admin_token', response.data.token);
        localStorage.setItem('tastraa_admin_user', JSON.stringify(response.data.admin));
        navigate('/admin');
      } else {
        setError(response.data?.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      backgroundColor: '#FAFAFA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#111827',
          color: '#FFFFFF',
          padding: '30px 24px',
          textAlign: 'center',
          borderBottom: '4px solid #D32F2F'
        }}>
          <img 
            src={logoImg} 
            alt="TASTRAA Logo" 
            style={{
              height: '46px',
              backgroundColor: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '8px',
              marginBottom: '14px'
            }} 
          />
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Admin Portal</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.825rem', color: '#FEF3C7' }}>TASTRAA (PVT) LTD Products Management</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ padding: '30px 24px' }}>
          {error && (
            <div style={{
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #FCA5A5'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tastraa.com"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Login to Dashboard</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
