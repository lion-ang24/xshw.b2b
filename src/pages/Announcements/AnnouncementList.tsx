import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { useTranslation } from '../../hooks/useTranslation';
import './Announcements.css';

const AnnouncementList: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { getPaginatedAnnouncements } = useAnnouncements();
  const { data, totalPages } = getPaginatedAnnouncements(currentPage, 6);

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

  return (
    <div className="announcement-page">
      <div className="container">
        <h1 className="page-title">公告清單</h1>
        
        <div className="announcement-list">
          {data.map((announcement) => (
            <div key={announcement.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className={`announcement-tag ${getTagClass(announcement.status)}`}>
                  {getTagLabel(announcement.status)}
                </span>
                <span className="meta-date">{announcement.date}</span>
              </div>
              <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
                <Link to={`/announcements/${announcement.id}`}>{announcement.title}</Link>
              </h2>
              <p>
                {truncateContent(announcement.content, 100)}
              </p>
              <Link to={`/announcements/${announcement.id}`} className="view-more">
                {t('announcement_view_more')} →
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="announcement-pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              上一頁
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
              下一頁
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
