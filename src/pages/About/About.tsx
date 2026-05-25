import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const About: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page" style={{ padding: '60px 20px', minHeight: 'calc(100vh - 200px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'var(--bg-card)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>{t('nav_about')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>This is a blank page for Company Profile.</p>
      </div>
    </div>
  );
};

export default About;
