import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/" style={{ display: 'block' }}>
            <img src="/assets/hc_logo.png" alt="LOGO" style={{ height: '40px', display: 'block' }} />
          </Link>
        </div>
        <div className="header-right">
          <div className="lang-dropdown-wrapper">
            <div className="lang" id="lang-selector">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>{language === 'zh-TW' ? '繁體中文' : 'ENG/US'}</span>
              <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div className="lang-dropdown" id="lang-dropdown">
              <div className="lang-option" onClick={() => setLanguage('zh-TW')}>繁體中文</div>
              <div className="lang-option" onClick={() => setLanguage('en-US')}>ENG/US</div>
            </div>
          </div>
          <button className="login-btn">{t('login')}</button>
        </div>
      </header>

      <nav className="nav">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/category" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_catalog')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/solutions" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_solutions')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/tech-support" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_support')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_contact')}</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
