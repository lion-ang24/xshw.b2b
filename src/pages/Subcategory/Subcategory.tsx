import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { catalogData } from '../../utils/catalogData';

const Subcategory: React.FC = () => {
  const { categoryId, subcategoryId } = useParams();
  const { t } = useTranslation();

  // If no categoryId is provided (e.g., /category), default to the first one
  const effectiveCategoryId = categoryId || catalogData[0].id;
  const category = catalogData.find(c => c.id === effectiveCategoryId);
  const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
  
  const categoryName = category ? t(category.nameKey) : effectiveCategoryId;
  const subcategoryName = subcategory ? t(subcategory.nameKey) : subcategoryId;

  // [LEGACY DATA] 為了維持附圖顯示，暫時保留舊資料清單，未來串接 API 後刪除
  const legacyData: Record<string, Record<string, { name: string, img: string, productId?: string }[]>> = {
    'oa': {
      'desk': [{ name: '辦公桌', img: 'https://loremflickr.com/40/40/desk' }],
      'chair': [{ name: '人體工學椅', img: 'https://loremflickr.com/40/40/chair' }]
    },
    'handtools': {
      'wrench': [
        { name: '活動板手', img: 'https://loremflickr.com/40/40/wrench' },
        { name: '深孔套筒', img: 'https://loremflickr.com/40/40/socket' },
        { name: '薄型梅扳手', img: 'https://loremflickr.com/40/40/wrench' },
        { name: '萬向套筒扳手', img: 'https://loremflickr.com/40/40/tool' }
      ],
      'pliers': [
        { name: '萬能鉗', img: 'https://loremflickr.com/40/40/pliers' },
        { name: '管子鉗', img: 'https://loremflickr.com/40/40/pliers' },
        { name: 'PE.PVC管切刀', img: 'https://loremflickr.com/40/40/cutter' }
      ],
      'ruler': [
        { name: '有刻度鐵工角尺', img: 'https://loremflickr.com/40/40/ruler' },
        { name: '捲尺', img: 'https://loremflickr.com/40/40/tape' },
        { name: '水平尺', img: 'https://loremflickr.com/40/40/level' }
      ]
    },
    'powertools': {
      'screwdriver': [
        { name: '電動起子機', img: 'https://loremflickr.com/40/40/drill', productId: 'frc-d12-pro' }
      ],
      'drill': [
        { name: '震動電鑽', img: 'https://loremflickr.com/40/40/drill' }
      ],
      'grinder': [
        { name: '砂輪機', img: 'https://loremflickr.com/40/40/grinder' }
      ],
      'saw': [
        { name: '圓鋸機', img: 'https://loremflickr.com/40/40/saw' }
      ]
    }
  };

  return (
    <div className="subcategory-page">
      <div className="breadcrumb" style={{ padding: '20px' }}>
        <Link to="/">{t('nav_home')}</Link> <span>/</span> <Link to="/category">{t('nav_catalog')}</Link> 
        {effectiveCategoryId && (
          <>
            <span>/</span>
            <Link to={`/category/${effectiveCategoryId}`}>{categoryName}</Link>
          </>
        )}
        {subcategoryId && (
          <>
            <span>/</span>
            {subcategoryName}
          </>
        )}
      </div>
      <div className="category-layout" style={{ display: 'flex', padding: '0 20px', minHeight: '60vh' }}>
        <aside className="sidebar" style={{ width: '250px', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>{t('sidebar_categories')}</h2>
          <ul className="sidebar-cat-list" style={{ listStyle: 'none', padding: 0 }}>
            {catalogData.map(cat => (
              <li key={cat.id} className={effectiveCategoryId === cat.id ? 'active' : ''} style={{ marginBottom: '15px' }}>
                <Link to={`/category/${cat.id}`} style={{ textDecoration: 'none', color: effectiveCategoryId === cat.id ? 'var(--primary-color)' : 'var(--text-color)', fontWeight: effectiveCategoryId === cat.id ? 'bold' : 'normal' }}>
                  {t(cat.nameKey)}
                </Link>
                {effectiveCategoryId === cat.id && cat.subcategories && (
                  <ul className="sidebar-subcat-list" style={{ listStyle: 'none', paddingLeft: '15px', marginTop: '10px' }}>
                    {cat.subcategories.map(sub => (
                      <li key={sub.id} className={subcategoryId === sub.id ? 'active' : ''} style={{ marginBottom: '8px' }}>
                        <Link to={`/category/${cat.id}/${sub.id}`} style={{ textDecoration: 'none', color: subcategoryId === sub.id ? 'var(--primary-color)' : 'var(--text-secondary)' }}>
                          {t(sub.nameKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
        
        <main className="main-content" style={{ flex: 1, paddingLeft: '40px' }}>
          {!subcategoryId ? (
            /* Show Category Overview (Subcategory List) */
            <div className="category-overview">
              <h1 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '30px' }}>
                {categoryName} &gt;
              </h1>
              {category?.subcategories && category.subcategories.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '40px 20px' }}>
                  {category.subcategories.map(sub => (
                    <div key={sub.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                       <Link to={`/category/${effectiveCategoryId}/${sub.id}`} style={{
                        textDecoration: 'none',
                        color: 'var(--text-color)',
                        padding: '15px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {t(sub.nameKey)} <span>&gt;</span>
                      </Link>
                      
                      {/* [LEGACY DATA] 為了維持附圖顯示，暫時保留舊資料清單，未來串接 API 後刪除 */}
                      {effectiveCategoryId && legacyData[effectiveCategoryId] && legacyData[effectiveCategoryId][sub.id] && (
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                          {legacyData[effectiveCategoryId][sub.id].map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                              <img src={item.img} alt="" style={{ width: '32px', height: '32px', marginRight: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                              <Link to={item.productId ? `/product/${item.productId}` : '/category'} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>此分類的產品內容尚在整理中。</p>
              )}
            </div>
          ) : (
            /* Show Product Grid for Subcategory */
            <>
              <div className="category-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '30px' }}>
                <h1>{categoryName} &gt; {subcategoryName}</h1>
              </div>
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="card" style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: '8px' }}>
                  <img src="https://loremflickr.com/400/400/drill" alt="Product" style={{ width: '100%', height: 'auto', marginBottom: '15px' }} />
                  <div className="card-info" style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>無刷衝擊電鑽 18V</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>SKU: DRL-18V-PRO</p>
                  </div>
                  <Link to="/product/frc-d12-pro" className="card-btn" style={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    textDecoration: 'none',
                    background: 'var(--primary-color)',
                    color: 'var(--bg-color)',
                    padding: '8px 0',
                    borderRadius: '4px'
                  }}>詳細資訊</Link>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Subcategory;
