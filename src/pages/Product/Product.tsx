import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { fetchProductDetails } from '../../api/productApi';

const Product: React.FC = () => {
  const { productId } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId).then(data => setProduct(data));
    }
  }, [productId]);

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
          <div className="zoom-icon">
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
            <span className="option-label">{t('battery_capacity')}</span>
            <div className="option-buttons">
              <button className="option-btn">2.0Ah Compact</button>
              <button className="option-btn selected">4.0Ah High Capacity</button>
              <button className="option-btn">5.0Ah Extended</button>
            </div>
          </div>

          <div className="option-group">
            <span className="option-label">{t('configuration')}</span>
            <div className="option-buttons">
              <button className="option-btn">Bare Tool</button>
              <button className="option-btn selected">Kit with Charger</button>
            </div>
          </div>

          <div className="quantity-group">
            <span className="option-label">{t('quantity')}</span>
            <div className="qty-selector">
              <button className="qty-btn" id="qty-minus">-</button>
              <input type="text" className="qty-input" defaultValue="1" id="qty-input" />
              <button className="qty-btn" id="qty-plus">+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-primary-action">{t('btn_add_to_cart')}</button>
            <button className="btn-secondary-action">{t('btn_request_quote')}</button>
            <button className="btn-brand-action">
              {t('buy_with')}
              <svg width="40" height="16" viewBox="0 0 40 16" fill="none" style={{ marginLeft: '5px' }}>
                <path d="M14.5 7.5c0-.5-.1-1-.2-1.5H7.5v2.8h4c-.2 1.3-1 2.4-2.1 3.1v2.5h3.4c2-1.8 3.1-4.5 3.1-7.4z" fill="#4285F4" />
                <path d="M7.5 14.5c2 0 3.6-.7 4.8-1.8l-3.4-2.5c-.7.4-1.5.7-2.4.7-1.8 0-3.3-1.2-3.8-2.8H.3v2.6c1.3 2.6 4.1 4.3 7.2 4.3z" fill="#34A853" />
                <path d="M3.7 8.1c-.2-.6-.2-1.2-.2-1.8s.1-1.2.2-1.8V2H.3C-.2 3.1-.5 4.3-.5 5.5s.3 2.4.8 3.5l3.4-2.6z" fill="#FBBC04" />
                <path d="M7.5 2.8c1.1 0 2.1.4 2.8 1.1l2.1-2.1C11.1.7 9.5 0 7.5 0 4.4 0 1.6 1.7.3 4.3l3.4 2.6c.5-1.6 2-2.8 3.8-2.8z" fill="#EA4335" />
              </svg>
            </button>
          </div>

          <a href="#" className="payment-options-link">{t('more_payment_options')}</a>
        </div>
      </div>
    </div>
  );
};

export default Product;
