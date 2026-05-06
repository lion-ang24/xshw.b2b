import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { useTranslation } from '../../hooks/useTranslation';

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

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>公告清單</h1>
      
      <div className="announcement-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {data.map((announcement) => (
          <div key={announcement.id} className="announcement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px', 
                fontWeight: 'bold',
                backgroundColor: announcement.status === '新活動' ? '#ffebee' : announcement.status === '更新' ? '#e3f2fd' : '#fff3e0',
                color: announcement.status === '新活動' ? '#d32f2f' : announcement.status === '更新' ? '#1976d2' : '#f57c00'
              }}>
                {getTagLabel(announcement.status)}
              </span>
              <span style={{ color: '#666', fontSize: '14px' }}>{announcement.date}</span>
            </div>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
              <Link to={`/announcements/${announcement.id}`} style={{ color: '#333', textDecoration: 'none' }}>{announcement.title}</Link>
            </h2>
            <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '15px' }}>
              {truncateContent(announcement.content, 100)}
            </p>
            <Link to={`/announcements/${announcement.id}`} style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
              {t('announcement_view_more')} →
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === 1 ? '#f5f5f5' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            上一頁
          </button>
          
          <div style={{ display: 'flex', gap: '5px' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: currentPage === i + 1 ? '#1976d2' : '#fff',
                  color: currentPage === i + 1 ? '#fff' : '#333',
                  cursor: 'pointer'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === totalPages ? '#f5f5f5' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            下一頁
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;
