import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { useTranslation } from '../../hooks/useTranslation';

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
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id) return <div>Invalid ID</div>;
  
  const announcement = getAnnouncementById(id);

  if (!announcement) {
    return (
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2>找不到該筆公告</h2>
        <button onClick={() => navigate('/announcements')} style={{ marginTop: '20px', padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {t('announcement_back')}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/announcements" style={{ color: '#1976d2', textDecoration: 'none' }}>← {t('announcement_back')}</Link>
      </div>
      
      <div style={{ padding: '40px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <span style={{ 
            padding: '6px 12px', 
            borderRadius: '4px', 
            fontSize: '14px', 
            fontWeight: 'bold',
            backgroundColor: announcement.status === '新活動' ? '#ffebee' : announcement.status === '更新' ? '#e3f2fd' : '#fff3e0',
            color: announcement.status === '新活動' ? '#d32f2f' : announcement.status === '更新' ? '#1976d2' : '#f57c00'
          }}>
            {getTagLabel(announcement.status)}
          </span>
          <span style={{ color: '#666', fontSize: '16px' }}>{announcement.date}</span>
        </div>
        
        <h1 style={{ fontSize: '32px', marginBottom: '30px', lineHeight: '1.4', color: '#222' }}>
          {announcement.title}
        </h1>
        
        <div style={{ height: '1px', backgroundColor: '#eee', marginBottom: '30px' }}></div>
        
        <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }}>
          {announcement.content}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
