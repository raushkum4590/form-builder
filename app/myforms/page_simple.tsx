'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, setFields, setFormName } from '../../store';

interface SavedForm {
  id: string;
  name: string;
  fields: any[];
  createdAt: string;
}

const MyFormsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSavedForms();
  }, []);

  const loadSavedForms = () => {
    const saved = localStorage.getItem('savedForms');
    if (saved) {
      const forms = JSON.parse(saved);
      setSavedForms(forms);
    }
  };

  const handleEditForm = (form: SavedForm) => {
    dispatch(setFormName(form.name));
    dispatch(setFields(form.fields));
    router.push('/form-builder');
  };

  const handleDeleteForm = (formId: string) => {
    const updatedForms = savedForms.filter(form => form.id !== formId);
    setSavedForms(updatedForms);
    localStorage.setItem('savedForms', JSON.stringify(updatedForms));
  };

  const filteredForms = savedForms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem', textAlign: 'center' }}>
            My Forms
          </h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          {filteredForms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📁</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                No Forms Found
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Create your first form to get started with our powerful form builder.
              </p>
              <button
                onClick={() => router.push('/form-builder')}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
              >
                Create New Form
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredForms.map((form) => (
                <div
                  key={form.id}
                  style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {form.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteForm(form.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '1.2rem'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    {form.fields.length} field{form.fields.length !== 1 ? 's' : ''}
                  </p>
                  
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                    Created: {new Date(form.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEditForm(form)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(setFormName(form.name));
                        dispatch(setFields(form.fields));
                        router.push('/preview');
                      }}
                      style={{
                        background: 'transparent',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFormsPage;
