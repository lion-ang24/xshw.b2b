import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface PlaceholderProps {
  titleKey: string;
}

const PlaceholderPage: React.FC<PlaceholderProps> = ({ titleKey }) => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '50vh' }}>
      <h1>{t(titleKey)}</h1>
      <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>此頁面內容尚在建置中...</p>
    </div>
  );
};

export default PlaceholderPage;
