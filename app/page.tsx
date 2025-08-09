'use client';
import { useRouter } from 'next/navigation';
import FormBuilderChatbot from '../components/FormBuilderChatbot';

export default function Home() {
  const router = useRouter();

  const features = [
    {
      title: 'AI Form Builder',
      description: 'Create forms quickly with AI assistance',
      icon: '🧠',
      path: '/form-builder'
    },
    {
      title: 'Live Preview',
      description: 'Test your forms in real-time',
      icon: '⚡',
      path: '/preview'
    },
    {
      title: 'My Forms',
      description: 'Manage and organize your forms',
      icon: '📊',
      path: '/myforms'
    },
  ];

  const stats = [
    { label: 'Forms Created', value: '150K+', icon: '🚀' },
    { label: 'Happy Users', value: '25K+', icon: '😊' },
    { label: 'Success Rate', value: '99.9%', icon: '⚡' },
    { label: 'User Rating', value: '4.9★', icon: '⭐' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Simple CSS Styles */}
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .btn-primary {
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .btn-primary:hover {
          background-color: #2563eb;
        }
        
        .btn-secondary {
          background-color: transparent;
          color: #374151;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 22px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-secondary:hover {
          border-color: #9ca3af;
          background-color: #f9fafb;
        }
        
        .card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          transition: box-shadow 0.2s;
        }
        
        .card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        
        .stats-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 32px;
          margin: 60px 0;
        }
        
        @media (max-width: 768px) {
          .grid-3 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .stats-grid {
            gap: 20px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div style={{ padding: '80px 0', textAlign: 'center', backgroundColor: 'white' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
            Build Beautiful Forms
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Create, customize, and deploy professional forms in minutes with our simple form builder.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/form-builder')}
              className="btn-primary"
            >
              Start Building
            </button>
            
            <button
              onClick={() => router.push('/preview')}
              className="btn-secondary"
            >
              View Demo
            </button>
          </div>
          
          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              Simple & Powerful
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>
              Everything you need to create professional forms
            </p>
          </div>
          
          <div className="grid-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card"
                onClick={() => router.push(feature.path)}
                style={{ cursor: 'pointer', textAlign: 'center' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                
                <p style={{ color: '#6b7280', lineHeight: '1.5' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="card">
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#fbbf24', fontSize: '1.5rem', marginBottom: '16px' }}>
                  ⭐⭐⭐⭐⭐
                </div>
                <p style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '24px', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "The most intuitive form builder I have ever used. Simple, fast, and gets the job done perfectly."
                </p>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>Sarah Chen</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Product Manager at TechCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '80px 0', backgroundColor: '#3b82f6', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '32px', opacity: '0.9' }}>
            Join thousands of users who create beautiful forms every day
          </p>
          <button
            onClick={() => router.push('/form-builder')}
            style={{
              backgroundColor: 'white',
              color: '#3b82f6',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 32px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Start Building Now
          </button>
        </div>
      </div>

      {/* Simple Footer */}
      <div style={{ padding: '40px 0', backgroundColor: '#1f2937', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px' }}>FormBuilder</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            © 2024 FormBuilder. Simple forms, powerful results.
          </p>
        </div>
      </div>

      {/* Chatbot */}
      <FormBuilderChatbot />
    </div>
  );
}
