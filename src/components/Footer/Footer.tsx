import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      {/* Top bar: logo + nav links */}
      <div className="footer-top">
        <div className="footer-logo">
          <span className="footer-logo-name">{t('footer_brand')}</span>
          <span className="footer-logo-sub">{t('footer_brand_sub')}</span>
        </div>
        <nav className="footer-nav">
          <Link to="/">{t('nav_home')}</Link>
          <Link to="/privacy">{t('footer_privacy')}</Link>
          <Link to="/terms">{t('footer_terms')}</Link>
          <Link to="/shipping">{t('footer_shipping')}</Link>
          <Link to="/careers">{t('footer_careers')}</Link>
          <Link to="/catalog">{t('nav_catalog')}</Link>
        </nav>
      </div>

      {/* Bottom bar: address + social */}
      <div className="footer-bottom">
        <div className="footer-address">
          <p className="footer-company-name">{t('footer_company')}</p>
          <p>{t('footer_address_street')}</p>
          <p>{t('footer_address_city')}</p>
          <p>{t('footer_phone')}</p>
        </div>
        <div className="footer-social">
          <span className="footer-follow-label">{t('footer_follow_us')}</span>
          <div className="footer-social-icons">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="YouTube"
            >
              {/* YouTube icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.54 3.6 12 3.6 12 3.6s-7.54 0-9.38.47A3.01 3.01 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.01 3.01 0 0 0 2.12 2.13C4.46 20.4 12 20.4 12 20.4s7.54 0 9.38-.47a3.01 3.01 0 0 0 2.12-2.13A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.52V8.48L15.82 12l-6.07 3.52z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn"
            >
              {/* LinkedIn icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77A1.76 1.76 0 0 0 0 1.73v20.54A1.76 1.76 0 0 0 1.77 24h20.45A1.77 1.77 0 0 0 24 22.27V1.73A1.77 1.77 0 0 0 22.22 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
