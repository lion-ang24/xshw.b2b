import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="link-col">
          <h3>{t('footer_catalog')}</h3>
          <ul>
            <li><Link to="/category/handtools">手工具</Link></li>
            <li><Link to="/category/electric">電料</Link></li>
            <li><Link to="/category/machine">加工機械零配件</Link></li>
            <li><Link to="/category/house">夢幻家電</Link></li>
            <li><Link to="/category/water">水料</Link></li>
            <li><Link to="/category/protect">防震用品&耗材</Link></li>
            <li><Link to="/category/machine">起重/搬運設備</Link></li>
            <li><Link to="/category/electric">儀器與控制元件</Link></li>
          </ul>
        </div>
        <div className="link-col">
          <h3>{t('footer_support')}</h3>
          <ul>
            <li><Link to="/about">關於我們</Link></li>
            <li><Link to="/news">最新消息</Link></li>
            <li><Link to="/faq">常見問題</Link></li>
          </ul>
        </div>
        <div className="link-col">
          <h3>{t('footer_contact')}</h3>
          <ul>
            <li><Link to="/customer-service">客戶服務</Link></li>
            <li><Link to="/tech-support">技術支援</Link></li>
            <li><Link to="/purchasing">採購諮詢</Link></li>
          </ul>
        </div>
      </div>
      <div className="company-info-box">
        <h2>{t('footer_company')}</h2>
        <p style={{ marginTop: '15px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>{t('footer_company_desc')}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
