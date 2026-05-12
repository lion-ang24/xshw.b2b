import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { fetchProductDetails } from '../../api/productApi';
import { useCart } from '../../context/CartContext';
import { ORDER_EMAIL } from '../../config/orderConfig';

const Product: React.FC = () => {
  const { productId } = useParams();
  const { t } = useTranslation();
  const { addItem, items } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const specOptions = [
    { name: '2.0Ah Compact', detail: '2.0Ah Compact Bare Tool / Kit with Charger' },
    { name: '4.0Ah High Capacity', detail: '4.0Ah High Capacity Bare Tool / Kit with Charger' },
    { name: '5.0Ah Extended', detail: '5.0Ah Extended Bare Tool / Kit with Charger' },
  ];
  const [selectedSpecIndex, setSelectedSpecIndex] = useState(0);
  const [hasSelectedSpec, setHasSelectedSpec] = useState(false);
  const [queueToast, setQueueToast] = useState<'added' | 'duplicate' | null>(null);

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
                  onClick={() => { setSelectedSpecIndex(index); setHasSelectedSpec(true); }}
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

          {/* Action Buttons — 規格選定後顯示 */}
          {hasSelectedSpec && (
            <div className="spec-action-buttons">
              <button
                className="spec-action-btn spec-action-btn--secondary"
                onClick={() => {
                  const itemId = `${productId}-${specOptions[selectedSpecIndex].name}`;
                  const alreadyInCart = items.some(i => i.id === itemId);
                  addItem({
                    id: itemId,
                    productId: productId ?? '',
                    productName: product?.name ?? '',
                    spec: specOptions[selectedSpecIndex].name,
                    qty: 1,
                  });
                  setQueueToast(alreadyInCart ? 'duplicate' : 'added');
                  setTimeout(() => setQueueToast(null), 2500);
                }}
              >
                {t('add_to_queue')}
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdWx8YvWJxxF-pDihwXEddwueI8zfDbkepvTKwd2IuTB61dVA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="spec-action-btn spec-action-btn--primary"
              >
                {t('direct_order')}
              </a>
              <button
                className="spec-action-btn spec-action-btn--mail"
                onClick={() => {
                  const today = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  const spec = specOptions[selectedSpecIndex].name;
                  const subject = `【Mail 採購】${product?.name ?? ''} - ${spec}`;
                  const body =
`您好，

以下為本次 Mail 採購需求，請確認後回覆。

──────────────────────
Date: ${today}
商品：${product?.name ?? ''}
規格：${spec}
數量：
──────────────────────
備註：

`;
                  window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {t('mail_order')}
              </button>
            </div>
          )}

          {/* Queue Toast Notification */}
          {queueToast === 'added' && (
            <div className="spec-queue-toast">
              ✓ {t('add_to_queue_success') || '已加入清單'}
            </div>
          )}
          {queueToast === 'duplicate' && (
            <div className="spec-queue-toast spec-queue-toast--duplicate">
              ⚠ {t('add_to_queue_duplicate') || '該商品已加入清單'}
            </div>
          )}

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
