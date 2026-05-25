import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAnnouncements } from '../../hooks/useAnnouncements';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const { getRecentAnnouncements } = useAnnouncements();
  const recentAnnouncements = getRecentAnnouncements(7);

  const getTagClass = (status: string) => {
    switch (status) {
      case '新活動': return 'announcement-tag--new';
      case '更新': return 'announcement-tag--update';
      default: return 'announcement-tag--notice';
    }
  };

  const getTagLabel = (status: string) => {
    switch (status) {
      case '新活動': return t('announcement_tag_new') || status;
      case '更新': return t('announcement_tag_update') || status;
      default: return t('announcement_tag_notice') || status;
    }
  };

  const closeMegaMenu = () => {
    // If it's CSS hover-based, removing focus from the active element can help close it on touch devices
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/" style={{ display: 'block' }}>
            <img src="/assets/hc_logo.png" alt="LOGO" style={{ height: '70px', width: '110%', display: 'block' }} />
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
          {/* <button className="login-btn">{t('login')}</button> */}
        </div>
      </header>

      <nav className="nav">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/category" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_catalog')}</Link>
          </li>
          <li className="nav-item has-mega-menu">
            <span className="nav-link">{t('nav_announcement')}</span>
            <div className="mega-menu announcement-mega-menu">
              <div className="mega-container">
                <div className="announcement-panel">
                  <div className="announcement-panel-header">
                    <h3 className="announcement-panel-title">{t('nav_announcement')}</h3>
                    <Link to="/announcements" className="announcement-view-all" onClick={closeMegaMenu}>
                      {t('announcement_view_all')}
                    </Link>
                  </div>
                  <ul className="announcement-list">
                    {recentAnnouncements.map((announcement) => (
                      <li key={announcement.id} className="announcement-item">
                        <span className={`announcement-tag ${getTagClass(announcement.status)}`}>
                          {getTagLabel(announcement.status)}
                        </span>
                        <span className="announcement-date">{announcement.date}</span>
                        <Link
                          to={`/announcements/${announcement.id}`}
                          className="announcement-title"
                          onClick={closeMegaMenu}
                        >
                          {announcement.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item has-contact-dropdown">
            <span className="nav-link nav-contact-trigger">{t('nav_contact')}</span>
            <div className="contact-dropdown">
              <div className="contact-dropdown-title">{t('nav_contact')}</div>
              <a
                href="https://line.me/R/ti/p/@375pbazq"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-dropdown-item"
              >
                <span className="contact-icon contact-icon-line">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </span>
                <div className="contact-info">
                  <span className="contact-label">{t('contact_line_account')}</span>
                  <span className="contact-value">@375pbazq</span>
                </div>
                <svg className="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <div className="contact-dropdown-item contact-dropdown-item--static">
                <span className="contact-icon contact-icon-phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.92-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="contact-info">
                  <span className="contact-label">{t('contact_phone')}</span>
                  <span className="contact-value">+1 (480) 498-9698</span>
                </div>
              </div>
              <a
                href="mailto:yuhungyin@xshw.com.tw"
                className="contact-dropdown-item"
              >
                <span className="contact-icon contact-icon-email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div className="contact-info">
                  <span className="contact-label">{t('contact_email')}</span>
                  <span className="contact-value">yuhungyin@xshw.com.tw</span>
                </div>
                <svg className="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_about')}</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
