import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { getContentPage } from '../../api/content';
import { ContentPage } from '../../types/supabase';
import './About.css';

const About: React.FC = () => {
  const { language } = useTranslation();
  const [pageData, setPageData] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getContentPage('about').then(data => {
      setPageData(data);
      setLoading(false);
    });
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>;
    }

    if (pageData) {
      const title = language === 'en-US' ? pageData.title_en : pageData.title_zh;
      const content = language === 'en-US' ? pageData.content_en : pageData.content_zh;
      return (
        <div className="about-content">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="about-page">
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
};

export default About;
