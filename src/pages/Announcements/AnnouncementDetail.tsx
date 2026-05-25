import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { useTranslation } from '../../hooks/useTranslation';
import './Announcements.css';

const AnnouncementDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAnnouncementById } = useAnnouncements();
  
  const getTagLabel = (status: string) => {
    switch (status) {
      case '新活動': return t('announcement_tag_new') || status;
      case '更新': return t('announcement_tag_update') || status;
      default: return t('announcement_tag_notice') || status;
    }
  };

  const getTagClass = (status: string) => {
    switch (status) {
      case '新活動': return 'announcement-tag--new';
      case '更新': return 'announcement-tag--update';
      default: return 'announcement-tag--notice';
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id) return <div className="announcement-page">Invalid ID</div>;
  
  const announcement = getAnnouncementById(id);

  if (!announcement) {
    return (
      <div className="announcement-page">
        <div className="detail-container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-primary)' }}>找不到該筆公告</h2>
          <button onClick={() => navigate('/announcements')} style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--accent-yellow)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t('announcement_back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="announcement-page">
      <div className="detail-container">
        <div style={{ marginBottom: '20px' }}>
          <Link to="/announcements" className="back-link">← {t('announcement_back')}</Link>
        </div>
        
        <div className="detail-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span className={`announcement-tag ${getTagClass(announcement.status)}`}>
              {getTagLabel(announcement.status)}
            </span>
            <span className="meta-date">{announcement.date}</span>
          </div>
          
          <h1>
            {announcement.title}
          </h1>
          
          <div className="divider"></div>
          
          <div className="content">
            {announcement.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
