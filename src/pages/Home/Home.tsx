import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const catCarouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [catCanScrollLeft, setCatCanScrollLeft] = useState(false);
  const [catCanScrollRight, setCatCanScrollRight] = useState(true);
  const totalBrands = 6;

  const cardButtonStyle: React.CSSProperties = {
    background: 'none',
    padding: 0,
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    outline: 'none',
    border: '1px solid var(--border-color)',
  };

  const updateCatScrollState = () => {
    const el = catCarouselRef.current;
    if (!el) return;
    setCatCanScrollLeft(el.scrollLeft > 4);
    setCatCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scrollCatCarousel = (dir: 'left' | 'right') => {
    const el = catCarouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  const handleCategoryClick = (id: string) => {
    navigate(`/category/${id}`);
  };

  useEffect(() => {
    const el = catCarouselRef.current;
    if (!el) return;
    updateCatScrollState();
    el.addEventListener('scroll', updateCatScrollState);
    return () => el.removeEventListener('scroll', updateCatScrollState);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isAnimating = false;
    let autoSlideInterval: ReturnType<typeof setInterval>;

    const slideCarousel = (steps = 1) => {
      if (isAnimating || steps === 0) return;
      isAnimating = true;

      const firstChild = track.children[0] as HTMLElement;
      if (!firstChild) {
        isAnimating = false;
        return;
      }

      const itemWidth = firstChild.getBoundingClientRect().width;
      const gap = 15;
      const moveDistance = (itemWidth + gap) * steps;

      setCurrentIndex((prev) => (prev + steps) % totalBrands);

      track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      track.style.transform = `translateX(-${moveDistance}px)`;

      setTimeout(() => {
        track.style.transition = 'none';
        for (let i = 0; i < steps; i++) {
          if (track.children[0]) {
            track.appendChild(track.children[0]);
          }
        }
        track.style.transform = 'translateX(0)';
        isAnimating = false;
      }, 600);
    };

    const startAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => slideCarousel(1), 5000);
    };

    startAutoSlide();

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, []);

  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('/assets/hero_bg_2.jpg')" }}>
        <div className="hero-left">
          <div className="hero-content">
            <h1>{t('hero_title')}</h1>
            <p>{t('hero_desc')}</p>
            <button className="cta-btn" onClick={() => navigate('/about')}>{t('hero_btn')}</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="brand-carousel">
            <div className="brand-track" id="brand-track" ref={trackRef}>
              <div className="brand-slide" data-brand="dewalt">
                <span className="brand-logo dewalt-logo">DEWALT</span>
                <span className="brand-tagline">GUARANTEED TOUGH</span>
              </div>
              <div className="brand-slide" data-brand="milwaukee">
                <span className="brand-logo milwaukee-logo">Milwaukee</span>
                <span className="brand-tagline">NOTHING BUT HEAVY DUTY</span>
              </div>
              <div className="brand-slide" data-brand="makita">
                <span className="brand-logo makita-logo">makita</span>
                <span className="brand-tagline">POWER TOOL PERFORMANCE</span>
              </div>
              <div className="brand-slide" data-brand="bosch">
                <span className="brand-logo bosch-logo">BOSCH</span>
                <span className="brand-tagline">Invented for life</span>
              </div>
              <div className="brand-slide" data-brand="hikoki">
                <span className="brand-logo hikoki-logo">HIKOKI</span>
                <span className="brand-tagline">HIGH PERFORMANCE POWER TOOLS</span>
              </div>
              <div className="brand-slide" data-brand="metabo">
                <span className="brand-logo metabo-logo">metabo</span>
                <span className="brand-tagline">PROFESSIONAL POWER TOOL SOLUTIONS</span>
              </div>
            </div>
          </div>

          <div className="carousel-indicators" id="brand-indicators">
            {Array.from({ length: totalBrands }).map((_, idx) => (
              <span
                key={idx}
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-categories">
        <div className="section-header">
          <h2>{t('featured_categories')}</h2>
        </div>
        <div className="cat-carousel-wrapper">
          <button
            className={`cat-arrow cat-arrow--left ${catCanScrollLeft ? 'visible' : ''}`}
            onClick={() => scrollCatCarousel('left')}
            aria-label="向左滑動"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="carousel-container" ref={catCarouselRef}>
            <button className="card" onClick={() => handleCategoryClick('handtools')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/1eFEdnlkeSM0qMskXF2Vej-7tpOhjki7f" alt={t('cat_handtools')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('cat_handtools')}</span>
            </button>
            <button className="card" onClick={() => handleCategoryClick('electric')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/1UQEEZYYpGd_dg_AVYs60lzmcWaJT5uiy" alt={t('cat_electric')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('cat_electric')}</span>
            </button>
            <button className="card" onClick={() => handleCategoryClick('machine/E')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/1JBfqkvMOK9ZMs7OIamp2ERZar9kH_VvC" alt={t('subcat_machine_e')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('subcat_machine_e')}</span>
            </button>
            <button className="card" onClick={() => handleCategoryClick('water')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/1IEqqIlKsMPFzamTDPUWbuebyLeAXYxoy" alt={t('cat_water')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('cat_water')}</span>
            </button>
            <button className="card" onClick={() => handleCategoryClick('protect')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/1s1m05vkkXbjbx_lp_0JRie9pzw0Bch1o" alt={t('cat_protect')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('cat_protect')}</span>
            </button>
            <button className="card" onClick={() => handleCategoryClick('building')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/1_LfLEEcjgC9Z9FKDyBTzZYL1UwI-rkLI" alt={t('cat_building')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('cat_building')}</span>
            </button>
            <button className="card" onClick={() => handleCategoryClick('metal')} style={cardButtonStyle}>
              <img src="https://lh3.googleusercontent.com/d/13EpRSJw0CRohrzz9duUbBGCar7Kt4KRo" alt={t('cat_metal')} referrerPolicy="no-referrer" />
              <span className="card-btn" style={{ display: 'block' }}>{t('cat_metal')}</span>
            </button>
          </div>

          <button
            className={`cat-arrow cat-arrow--right ${catCanScrollRight ? 'visible' : ''}`}
            onClick={() => scrollCatCarousel('right')}
            aria-label="向右滑動"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </section>

      <section className="middle-banner" style={{ backgroundImage: "url('/assets/hero_bg_3.jpg')" }}>
        <div className="value-box">
          <h2>{t('middle_banner')}</h2>
        </div>
      </section>

      <section className="featured-products">
        <div className="section-header">
          <h2>{t('featured_products')}</h2>
        </div>
        <div className="product-grid" id="prod-grid">
          <button className="card" onClick={() => navigate('/product/兩口自動梅花板手')} style={cardButtonStyle}>
            <img src="https://lh3.googleusercontent.com/d/1BJAybJ4srp5jmUnkjyHfUJjO97K7kpVr" alt="兩口自動梅花棘輪板手" />
            <span className="card-btn" style={{ display: 'block' }}>{t('prod_wrench')}</span>
          </button>
          <button className="card" onClick={() => navigate('/product/油漆刷%20-%20長毛')} style={cardButtonStyle}>
            <img src="https://lh3.googleusercontent.com/d/1uimJAKRjR_VWoTiWC-eB3q6z3rljZP2F" alt="長毛油漆刷" />
            <span className="card-btn" style={{ display: 'block' }}>{t('prod_brush')}</span>
          </button>
          <button className="card" onClick={() => navigate('/product/絕緣膠布%2048MM')} style={cardButtonStyle}>
            <img src="https://lh3.googleusercontent.com/d/1ichisoBsKBsyqkFTKIDCQ9DVG3QH0Fc3" alt="絕緣膠帶" />
            <span className="card-btn" style={{ display: 'block' }}>{t('prod_tape')}</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
