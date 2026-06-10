import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { getContentPage } from '../../api/content';
import { ContentPage } from '../../types/supabase';
import './Terms.css';

const EnTerms = () => (
  <div className="terms-content">
    <h1>Terms of Use</h1>
    <p>These Terms of Use apply to the services provided on this website. By accessing or using this Site, you agree to be bound by these terms.</p>
    <h2>Site License</h2>
    <p>We grant you a limited, non-exclusive, non-transferable license to access and use this Site.</p>
    <h2>Intellectual Property</h2>
    <p>All content on this Site is owned by the Company or its licensors and is protected by applicable intellectual property laws.</p>
    <h2>Terms Updates</h2>
    <p>We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page.</p>
  </div>
);

const ZhTerms = () => (
  <div className="terms-content">
    <h1>使用條款</h1>
    <p>本使用條款適用於本網站所提供之服務。當您存取或使用本網站時，即表示您同意接受這些條款之約束。</p>
    <h2>網站授權</h2>
    <p>我們授予您有限的、非專屬的、不可轉讓的許可存取和使用本網站。</p>
    <h2>智慧財產權</h2>
    <p>本網站上的所有內容均歸本公司或其授權人所有，並受適用之智慧財產權法保護。</p>
    <h2>條款修改</h2>
    <p>我們保留隨時修改本使用條款之權利，更新內容將公告於本頁面。</p>
  </div>
);

const Terms: React.FC = () => {
  const { language } = useTranslation();
  const [pageData, setPageData] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getContentPage('terms').then(data => {
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
        <div className="terms-content">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }

    // Fallback to static content
    return language === 'en-US' ? <EnTerms /> : <ZhTerms />;
  };

  return (
    <div className="terms-page">
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
};

export default Terms;
