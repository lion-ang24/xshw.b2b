import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { fetchProductDetails } from '../../api/productApi';

const Product: React.FC = () => {
  const { productId } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState<any>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const specOptions = [
    { name: '2.0Ah Compact', detail: '2.0Ah Compact Bare Tool / Kit with Charger' },
    { name: '4.0Ah High Capacity', detail: '4.0Ah High Capacity Bare Tool / Kit with Charger' },
    { name: '5.0Ah Extended', detail: '5.0Ah Extended Bare Tool / Kit with Charger' },
  ];
  const [selectedSpecIndex, setSelectedSpecIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId).then(data => setProduct(data));
    }
  }, [productId]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!product) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="breadcrumb" style={{ padding: '20px' }}>
        <Link to="/">{t('nav_home')}</Link> <span>/</span>
        <Link to="/category">{t('nav_catalog')}</Link> <span>/</span>
        <Link to="/category/powertools/screwdriver">{t('subcat_screwdriver')}</Link> <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </div>

      <div className="product-detail-container">
        {/* Left Column: Image */}
        <div className="product-image-large">
          <img src="/assets/drill_1.png" alt={product.name} />
          <div className="zoom-icon" onClick={() => setIsLightboxOpen(true)} style={{ cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="product-info-right">
          <div className="brand-label">{product.brand}</div>
          <h1 className="product-h1">{product.name}</h1>
          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="option-group">
            <span className="option-label">{t('spec_name')}</span>
            <div className="option-buttons">
              {specOptions.map((opt, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedSpecIndex === index ? 'selected' : ''}`}
                  onClick={() => setSelectedSpecIndex(index)}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="option-label" style={{ marginBottom: '8px' }}>{t('spec_details')}</span>
            <div style={{ width: '100%' }}>
              <div
                style={{
                  width: '100%',
                  minHeight: '60px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #444',
                  backgroundColor: '#1e1e1e',
                  color: '#eeeeee',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {specOptions[selectedSpecIndex].detail}
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {specOptions[selectedSpecIndex].detail.length} / 500
              </div>
            </div>
          </div>

          {/* 
            根據需求隱藏以下按鈕與欄位：
            - 數量選擇
            - 加入購物車
            - 加入報價單/詢價單
            - 使用以下方式購買
            - 更多付款方式
          */}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)} aria-label="Close">
              &times;
            </button>
            <img src="/assets/drill_1.png" alt={product.name} className="lightbox-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
