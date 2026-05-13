import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { catalogData } from '../../data/catalogData';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const catCarouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [catCanScrollLeft, setCatCanScrollLeft] = useState(false);
  const [catCanScrollRight, setCatCanScrollRight] = useState(true);
  const totalBrands = 6;

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
      <section className="hero" style={{ backgroundImage: "url('/assets/hero_bg.png')" }}>
        <div className="hero-left">
          <div className="hero-content">
            <h1>{t('hero_title')}</h1>
            <p>{t('hero_desc')}</p>
            <button className="cta-btn">{t('hero_btn')}</button>
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
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="carousel-container" ref={catCarouselRef}>
            <div className="card">
              <img src="https://lh3.googleusercontent.com/d/1gg6_zL1Objsrw3cbwMVC13w7dDTxeeDC" alt="手工具" referrerPolicy="no-referrer" />
              <button className="card-btn" onClick={() => handleCategoryClick('handtools')}>手工具</button>
            </div>
            <div className="card">
              <img src="https://loremflickr.com/400/400/electronics/all" alt="電料" />
              <button className="card-btn" onClick={() => handleCategoryClick('electric')}>電料</button>
            </div>
            <div className="card">
              <img src="https://loremflickr.com/400/400/machinery/all" alt="加工機械零配件" />
              <button className="card-btn" onClick={() => handleCategoryClick('machine')}>加工機械零配件</button>
            </div>
            <div className="card">
              <img src="https://loremflickr.com/400/400/plumbing/all" alt="水料" />
              <button className="card-btn" onClick={() => handleCategoryClick('water')}>水料</button>
            </div>
            <div className="card">
              <img src="https://loremflickr.com/400/400/construction/all" alt="防震用品&耗材" />
              <button className="card-btn" onClick={() => handleCategoryClick('protect')}>防震用品&耗材</button>
            </div>
            <div className="card">
              <img src="https://loremflickr.com/400/400/crane/all" alt="起重/搬運設備" />
              <button className="card-btn" onClick={() => handleCategoryClick('machine')}>起重/搬運設備</button>
            </div>
            <div className="card">
              <img src="https://loremflickr.com/400/400/instrument/all" alt="儀器與控制元件" />
              <button className="card-btn" onClick={() => handleCategoryClick('machine')}>儀器與控制元件</button>
            </div>
          </div>

          <button
            className={`cat-arrow cat-arrow--right ${catCanScrollRight ? 'visible' : ''}`}
            onClick={() => scrollCatCarousel('right')}
            aria-label="向右滑動"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </section>

      <section className="middle-banner" style={{ backgroundImage: "url('/assets/hero_bg.png')" }}>
        <div className="value-box">
          <h2>{t('middle_banner')}</h2>
        </div>
      </section>

      <section className="featured-products">
        <div className="section-header">
          <h2>{t('featured_products')}</h2>
        </div>
        <div className="product-grid" id="prod-grid">
          <div className="card"><img src="https://loremflickr.com/400/400/ruler,tool/all" alt="Product" /><button className="card-btn">有刻度鐵工角尺</button></div>
          <div className="card"><img src="https://loremflickr.com/400/400/multimeter/all" alt="Product" /><button className="card-btn">三用電錶</button></div>
          <div className="card"><img src="https://loremflickr.com/400/400/laser,tool/all" alt="Product" /><button className="card-btn">雷射測距儀</button></div>
        </div>
      </section>
    </>
  );
};

export default Home;
