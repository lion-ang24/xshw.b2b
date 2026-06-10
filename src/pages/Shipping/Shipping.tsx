import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { getContentPage } from '../../api/content';
import { ContentPage } from '../../types/supabase';
import './Shipping.css';

const EnShipping = () => (
  <div className="shipping-content">
    <h1>Shipping & Returns</h1>
    <p>We are dedicated to providing clear and efficient shipping and returns services for our B2B partners. Detailed policies will be available soon.</p>
  </div>
);

const ZhShipping = () => (
  <div className="shipping-content">
    <h1>運送與退貨</h1>
    <p>我們致力於為 B2B 合作夥伴提供清晰且高效的運送與退貨服務。詳細的政策說明即將推出，敬請期待。</p>
  </div>
);

const Shipping: React.FC = () => {
  const { language } = useTranslation();
  const [pageData, setPageData] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getContentPage('shipping').then(data => {
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
        <div className="shipping-content">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }

    // Fallback to static content
    return language === 'en-US' ? <EnShipping /> : <ZhShipping />;
  };

  return (
    <div className="shipping-page">
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
};

export default Shipping;
