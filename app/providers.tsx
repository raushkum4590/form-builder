"use client";
import { Provider } from 'react-redux';
import { store } from '../store';
import Navigation from '../components/Navigation';
import { FormLoader } from '../components/FormLoader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        color: '#0f172a'
      }}>
        <Navigation />
        <FormLoader />
        {children}
      </div>
    </Provider>
  );
}
