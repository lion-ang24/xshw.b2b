import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { catalogData } from '../../data/catalogData';
import productsData from '../../data/catalog.json';
import zhTW from '../../data/locales/zh-TW.json';

const getChineseName = (key: string) => (zhTW as Record<string, string>)[key] || key;

const Subcategory: React.FC = () => {
  const { categoryId, subcategoryId } = useParams();
  const { t, language } = useTranslation();

  const getI18nText = (field: any, lang: string) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['zh-TW'] || '';
  };

  // If no categoryId is provided (e.g., /category), default to the first one
  const effectiveCategoryId = categoryId || catalogData[0].id;
  const category = catalogData.find(c => c.id === effectiveCategoryId);
  const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);

  const categoryName = category ? t(category.nameKey) : effectiveCategoryId;
  const subcategoryName = subcategory ? t(subcategory.nameKey) : subcategoryId;

  const categoryChName = category ? getChineseName(category.nameKey) : '';
  const subcategoryChName = subcategory ? getChineseName(subcategory.nameKey) : '';

  const matchedProducts = productsData.products.filter(p => {
    if (!categoryChName) return false;
    const matchCat = p.category.includes(categoryChName);
    if (!matchCat) return false;
    if (subcategoryId && subcategoryChName) {
      return p.subcategory.includes(subcategoryChName);
    }
    return true;
  });

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [categoryId, subcategoryId]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderProductGrid = (products: typeof productsData.products) => {
    const itemsPerPage = 15;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div>
        <div className="product-grid category-product-grid">
          {currentProducts.map((product, idx) => {
            const coverImage = product.specs[0]?.imageUrl || product.imageUrl;
            const hasImage = coverImage && coverImage.trim() !== '';
            const firstSpecSku = product.specs[0]?.sku || '';
            return (
              <Link
                key={idx}
                to={`/product/${encodeURIComponent(typeof product.name === 'string' ? product.name : product.name['zh-TW'])}`}
                className="card"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  border: '1px solid var(--border-color)',
                  padding: '15px',
                  borderRadius: '8px'
                }}
              >
                {hasImage ? (
                  <img src={coverImage} alt={getI18nText(product.name, language)} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'contain', marginBottom: '15px', borderRadius: '4px' }} referrerPolicy="no-referrer" />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '1 / 1', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', color: '#888', borderRadius: '4px' }}>
                    {t('image_pending')}
                  </div>
                )}
                <div className="card-info" style={{ marginBottom: '15px' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    marginBottom: '5px',
                    lineHeight: '1.4',
                    minHeight: '2.8em',
                    wordBreak: 'break-all'
                  }}>
                    {getI18nText(product.name, language) || '\u00a0'}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    minHeight: '2.8em',
                    wordBreak: 'break-all'
                  }}>
                    {firstSpecSku ? `SKU: ${firstSpecSku}` : '\u00a0'}
                  </p>
                </div>
                <div className="card-btn" style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  background: 'var(--primary-color)',
                  color: 'var(--bg-color)',
                  padding: '8px 0',
                  borderRadius: '4px'
                }}>
                  {t('btn_details')}
                </div>
              </Link>
            );
          })}
          {products.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>{t('category_products_preparing')}</p>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === 1 ? '#f5f5f5' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              {t('btn_prev_page')}
            </button>
            
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: currentPage === i + 1 ? 'var(--primary-color)' : '#fff',
                    color: currentPage === i + 1 ? 'var(--bg-color)' : '#333',
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
              {t('btn_next_page')}
            </button>
          </div>
        )}
      </div>
    );
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
            /* Show Category Overview OR Product Grid if no subcategories */
            <div className="category-overview">
              <h1 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '30px' }}>
                {categoryName} {category?.subcategories && category.subcategories.length > 0 ? ' >' : ''}
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
                    </div>
                  ))}
                </div>
              ) : (
                renderProductGrid(matchedProducts)
              )}
            </div>
          ) : (
            /* Show Product Grid for Subcategory */
            <>
              <div className="category-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '30px' }}>
                <h1>{categoryName} &gt; {subcategoryName}</h1>
              </div>
              {renderProductGrid(matchedProducts)}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Subcategory;
