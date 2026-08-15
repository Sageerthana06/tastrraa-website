import React from 'react';
import { Wheat, Flame, Droplet, Truck, PackageCheck, Handshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const servicesList = [
    {
      icon: <Wheat size={36} style={{ color: '#F59E0B' }} />,
      title: "Rice Flour Production",
      bg: "#FFFBEB",
      borderColor: "#FDE68A",
      description: "Custom milling and production of super-fine white and red rice flour tailored for String Hoppers (Idiyappam), Pittu, Dosa, and snack batter formulation.",
      features: ["Super fine particle texture", "100% pure Sri Lankan rice", "Hygienic stainless milling", "Custom mesh sizing"]
    },
    {
      icon: <Flame size={36} style={{ color: '#D32F2F' }} />,
      title: "Mixture Production",
      bg: "#FFEBEE",
      borderColor: "#FFCDD2",
      description: "Crafting authentic Jaffna style savory snack mixture prepared with premium quality peanuts, fried gram, aromatic curry leaves, and secret spice blends.",
      features: ["Authentic traditional recipe", "Guaranteed crispness & fresh crunch", "Low oil retention packaging", "Available in multiple spicy levels"]
    },
    {
      icon: <Droplet size={36} style={{ color: '#D97706' }} />,
      title: "Gingelly Oil Production",
      bg: "#FEF3C7",
      borderColor: "#FCD34D",
      description: "Cold-pressed extraction of 100% pure Gingelly (Sesame) Oil processed at optimal temperatures to retain maximum nutrients, rich golden color, and natural aroma.",
      features: ["Unrefined cold-pressed extraction", "Rich natural sesame aroma", "Chemical-free & unadulterated", "High thermal smoke point"]
    },
    {
      icon: <Truck size={36} style={{ color: '#2563EB' }} />,
      title: "Product Supply & Distribution",
      bg: "#EFF6FF",
      borderColor: "#BFDBFE",
      description: "Efficient local product distribution delivering fresh batches directly to supermarkets, retail stores, groceries, and food outlets across Sri Lanka.",
      features: ["Scheduled delivery cycles", "Protective moisture packaging", "Flexible order sizes", "Consistent inventory availability"]
    },
    {
      icon: <PackageCheck size={36} style={{ color: '#059669' }} />,
      title: "Bulk Orders & Commercial Packaging",
      bg: "#ECFDF5",
      borderColor: "#A7F3D0",
      description: "Large-scale bulk supply packages (25kg, 50kg, 10L, 20L) for commercial caterers, bakeries, hotels, restaurants, and food manufacturing units.",
      features: ["Volume discounted rates", "Industrial grade packaging", "Consistent batch specifications", "Dedicated logistics handling"]
    },
    {
      icon: <Handshake size={36} style={{ color: '#7C3AED' }} />,
      title: "Business Partnerships",
      bg: "#F5F3FF",
      borderColor: "#DDD6FE",
      description: "Strategic supply agreements and long-term contracts with food distributors, export agents, and retail chains looking for reliable Sri Lankan food staples.",
      features: ["Long-term contract pricing", "Custom label options available", "Strict quality assurance", "Dedicated account support"]
    }
  ];

  return (
    <div>
      {/* Banner */}
      <section style={{
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '70px 0',
        textAlign: 'center',
        borderBottom: '4px solid #F59E0B'
      }}>
        <div className="container">
          <span className="badge-yellow" style={{ marginBottom: '14px' }}>Capabilities & Solutions</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', color: '#FFFFFF' }}>
            Our Production & Supply Services
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#9CA3AF', fontSize: '1.1rem', lineHeight: '1.6' }}>
            From high-grade rice milling to authentic Jaffna mixture and pure gingelly oil extraction, TASTRAA delivers excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {servicesList.map((srv, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: srv.bg,
                  border: `2px solid ${srv.borderColor}`,
                  borderRadius: '24px',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}
              >
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    {srv.icon}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827', marginBottom: '14px' }}>
                    {srv.title}
                  </h3>

                  <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '24px' }}>
                    {srv.description}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                    {srv.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1F2937', fontWeight: '600' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D32F2F', display: 'inline-block' }}></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Business Inquiry CTA */}
          <div style={{
            backgroundColor: '#111827',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '50px',
            textAlign: 'center',
            borderTop: '4px solid #D32F2F',
            boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '16px', color: '#FFFFFF' }}>
              Interested in Bulk Supply or Business Partnership?
            </h2>
            <p style={{ color: '#9CA3AF', maxWidth: '600px', margin: '0 auto 30px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Contact TASTRAA (PVT) LTD today to discuss bulk pricing, supply schedules, or retail distribution terms.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                <span>CONTACT SALES TEAM</span>
                <ArrowRight size={18} />
              </Link>
              <a 
                href="https://wa.me/94779789223?text=Hi%20TASTRAA,%20I%20am%20interested%20in%20a%20business%20partnership%20or%20bulk%20order." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp"
              >
                <span>WHATSAPP INQUIRY</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
