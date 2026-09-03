import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { getContentPage } from '../../api/content';
import { ContentPage } from '../../types/supabase';
import './Privacy.css';

const EnPrivacy: React.FC = () => (
  <div className="privacy-content">
    <h1>Privacy Policy</h1>
    <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit our website.</p>
    <h2>Information Collection</h2>
    <p>We collect information you provide directly to us when using our services.</p>
    <h2>Use of Information</h2>
    <p>We use the collected information to provide, maintain, and improve our services.</p>
    <h2>Policy Updates</h2>
    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
  </div>
);

const ZhPrivacy: React.FC = () => (
  <div className="privacy-content">
    <h1>隱私權政策</h1>
    <p>本隱私權政策適用於本網站所提供之服務。當您使用本網站時，即表示您同意本政策。</p>
    <h2>資料蒐集</h2>
    <p>我們蒐集您在使用我們服務時直接提供給我們的資訊。</p>
    <h2>資料使用</h2>
    <p>我們將蒐集的資訊用於提供、維持及改善我們的服務。</p>
    <h2>政策修改</h2>
    <p>我們保留隨時修改本隱私權政策之權利，更新內容將公告於本頁面。</p>
  </div>
);

const Privacy: React.FC = () => {
  const { language } = useTranslation();
  const [pageData, setPageData] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getContentPage('privacy').then(data => {
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
        <div className="privacy-content">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }

    return language === 'en-US' ? <EnPrivacy /> : <ZhPrivacy />;
  };

  return (
    <div className="privacy-page">
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
};

export default Privacy;
