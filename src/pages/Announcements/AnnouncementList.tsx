import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements } from '../../api/announcement';
import { Announcement } from '../../types/supabase';
import { useTranslation } from '../../hooks/useTranslation';
import './Announcements.css';

const AnnouncementList: React.FC = () => {
  const { t, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAnnouncements()
      .then(data => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || '撈取公告清單失敗，請檢查您的網路連線。');
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

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

  const itemsPerPage = 6;
  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const currentAnnouncements = announcements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="announcement-page">
      <div className="container">
        <h1 className="page-title">公告清單</h1>
        
        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
        ) : error ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: '#ef4444', fontWeight: 'bold' }}>
            {error}
          </div>
        ) : announcements.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
            暫無公告
          </div>
        ) : (
          <div className="announcement-list">
            {currentAnnouncements.map((announcement) => {
              const title = language === 'en-US' ? announcement.title_en : announcement.title_zh;
              const content = language === 'en-US' ? announcement.content_en : announcement.content_zh;
              return (
                <div key={announcement.id} className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span className={`announcement-tag ${getTagClass(announcement.status)}`}>
                      {getTagLabel(announcement.status)}
                    </span>
                    <span className="meta-date">{announcement.date}</span>
                  </div>
                  <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
                    <Link to={`/announcements/${announcement.id}`}>{title}</Link>
                  </h2>
                  <p>
                    {truncateContent(content, 100)}
                  </p>
                  <Link to={`/announcements/${announcement.id}`} className="view-more">
                    {t('announcement_view_more')} →
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="announcement-pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {t('btn_prev_page')}
            </button>
            
            <div style={{ display: 'flex', gap: '5px' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {t('btn_next_page')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
