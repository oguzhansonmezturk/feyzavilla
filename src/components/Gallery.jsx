import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('section-pool');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const sectionRef = useRef(null);

  // Group photos exactly as in reference
  const galleries = {
    'section-pool': [
      './images/discekim1.jpg',
      './images/discekim2.jpg',
      './images/discekim3.jpg',
      './images/discekim4.jpg',
      './images/discekim5.jpg',
      './images/discekim6.jpg',
      './images/discekim7.png',
      './images/discekim8.png',
      './images/discekim9.png'
    ],
    'section-living': [
      './images/iccekim1.jpg',
      './images/iccekim3.jpg',
      './images/iccekim5.jpg',
      './images/iccekim8.jpg',
      './images/iccekim11.png'
    ],
    'section-bedroom': [
      './images/iccekim2.jpg',
      './images/iccekim4.jpg',
      './images/iccekim9.jpg',
      './images/iccekim10.png'
    ],
    'section-bathroom': [
      './images/iccekim6.jpg'
    ]
  };

  // Ensure flat list for lightbox arrows to loop through all active category items
  const currentImages = galleries[activeTab];

  const openLightbox = (index) => {
    setCurrentImgIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.anim-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, [activeTab]); // re-bind when tab changes if structure allows new elements

  return (
    <section className="gallery section" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header">
          <span className="section-label anim-reveal">{t('gallery.label') || 'Galeri'}</span>
          <h2 className="section-title anim-reveal">{t('gallery.title') || 'Villamızı Keşfedin'}</h2>
        </div>

        <div className="gallery-tabs anim-reveal">
          <button
            className={`gallery-tab ${activeTab === 'section-pool' ? 'active' : ''}`}
            onClick={() => setActiveTab('section-pool')}
          >
            {t('gallery.pool', 'Bahçe & Havuz')}
          </button>
          <button
            className={`gallery-tab ${activeTab === 'section-living' ? 'active' : ''}`}
            onClick={() => setActiveTab('section-living')}
          >
            {t('gallery.room', 'Salon & Mutfak')}
          </button>
          <button
            className={`gallery-tab ${activeTab === 'section-bedroom' ? 'active' : ''}`}
            onClick={() => setActiveTab('section-bedroom')}
          >
            {t('gallery.bed', 'Yatak Odası')}
          </button>
          <button
            className={`gallery-tab ${activeTab === 'section-bathroom' ? 'active' : ''}`}
            onClick={() => setActiveTab('section-bathroom')}
          >
            {t('gallery.bath', 'Banyo')}
          </button>
        </div>

        {activeTab === 'section-pool' && (
          <div className="gallery-category visible">
            <h3 className="gallery-category-title anim-reveal">{t('gallery.pool', 'Bahçe & Havuz')}</h3>
            <div className="gallery-grid">
              {galleries['section-pool'].map((src, idx) => (
                <div className="gallery-item anim-reveal" key={idx} onClick={() => openLightbox(idx)}>
                  <img src={src} alt="Exterior" loading="lazy" />
                  <div className="gallery-overlay">
                    <span>{t('gallery.enlarge', 'BÜYÜT')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'section-living' && (
          <div className="gallery-category visible">
            <h3 className="gallery-category-title anim-reveal">{t('gallery.room', 'Salon & Mutfak')}</h3>
            <div className="gallery-grid">
              {galleries['section-living'].map((src, idx) => (
                <div className="gallery-item anim-reveal" key={idx} onClick={() => openLightbox(idx)}>
                  <img src={src} alt="Interior" loading="lazy" />
                  <div className="gallery-overlay">
                    <span>{t('gallery.enlarge', 'BÜYÜT')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'section-bedroom' && (
          <div className="gallery-category visible">
            <h3 className="gallery-category-title anim-reveal">{t('gallery.bed', 'Yatak Odası')}</h3>
            <div className="gallery-grid gallery-grid--bedroom">
              {galleries['section-bedroom'].map((src, idx) => (
                <div className="gallery-item anim-reveal" key={idx} onClick={() => openLightbox(idx)}>
                  <img src={src} alt="Bedroom" loading="lazy" />
                  <div className="gallery-overlay">
                    <span>{t('gallery.enlarge', 'BÜYÜT')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'section-bathroom' && (
          <div className="gallery-category visible">
            <h3 className="gallery-category-title anim-reveal">{t('gallery.bath', 'Banyo')}</h3>
            <div className="gallery-grid gallery-grid--bedroom">
              {galleries['section-bathroom'].map((src, idx) => (
                <div className="gallery-item anim-reveal" key={idx} onClick={() => openLightbox(idx)}>
                  <img src={src} alt="Bathroom" loading="lazy" />
                  <div className="gallery-overlay">
                    <span>{t('gallery.enlarge', 'BÜYÜT')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxOpen ? 'open' : ''}`} onClick={closeLightbox}>
        <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
        <button className="lightbox-prev" onClick={prevImg}>&#8249;</button>
        <button className="lightbox-next" onClick={nextImg}>&#8250;</button>

        {lightboxOpen && currentImages[currentImgIndex] && (
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentImages[currentImgIndex]} alt="Gallery Full" />
            <div className="lightbox-counter">
              {currentImgIndex + 1} / {currentImages.length}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* --- Gallery --- */
        .gallery {
          background: var(--bg-alt);
        }

        .gallery-header {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 80px);
        }

        /* Gallery Tabs */
        .gallery-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: clamp(32px, 5vw, 56px);
          flex-wrap: wrap;
        }

        .gallery-tab {
          padding: 12px 28px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-mid);
          border: 1px solid var(--border);
          border-radius: 100px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }

        .gallery-tab:hover {
          color: var(--text);
          border-color: var(--text-mid);
        }

        .gallery-tab.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        /* Gallery Categories */
        .gallery-category {
          margin-bottom: clamp(48px, 6vw, 80px);
          animation: fade 0.6s var(--ease);
        }
        
        @keyframes fade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gallery-category:last-child {
          margin-bottom: 0;
        }

        .gallery-category-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--text);
          margin-bottom: clamp(20px, 3vw, 32px);
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          grid-auto-flow: dense;
        }

        .gallery-grid--bedroom {
          grid-template-columns: repeat(2, 1fr);
          max-width: 900px;
          margin: 0 auto;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
          aspect-ratio: 4/3;
        }

        .gallery-item--wide {
          grid-column: span 2;
        }

        .gallery-item--tall {
          grid-row: span 2;
          aspect-ratio: auto;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.7s var(--ease);
        }

        .gallery-item:hover img {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(27, 30, 25, 0);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          transition: background 0.4s;
        }

        .gallery-overlay span {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: white;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s, transform 0.4s;
        }

        .gallery-item:hover .gallery-overlay {
          background: rgba(27, 30, 25, 0.3);
        }

        .gallery-item:hover .gallery-overlay span {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- Lightbox --- */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 10001;
          background: rgba(27, 30, 25, 0.96);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s, visibility 0.4s;
        }

        .lightbox.open {
          opacity: 1;
          visibility: visible;
        }

        .lightbox-content {
          max-width: 90vw;
          max-height: 85vh;
        }

        .lightbox-content img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 4px;
        }

        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 28px;
          font-size: 2rem;
          color: white;
          opacity: 0.7;
          transition: opacity 0.3s;
          z-index: 2;
        }

        .lightbox-close:hover {
          opacity: 1;
        }

        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 3rem;
          color: white;
          opacity: 0.5;
          transition: opacity 0.3s;
          padding: 20px;
          z-index: 2;
        }

        .lightbox-prev { left: 12px; }
        .lightbox-next { right: 12px; }

        .lightbox-prev:hover,
        .lightbox-next:hover { opacity: 1; }

        .lightbox-counter {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-grid--bedroom {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-item--wide {
            grid-column: span 2;
          }

          .gallery-item--tall {
            grid-row: span 1;
            aspect-ratio: 4/3;
          }
        }

        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .gallery-grid--bedroom {
            grid-template-columns: 1fr;
            max-width: 100%;
          }

          .gallery-item--wide {
            grid-column: span 1;
          }

          .gallery-tabs {
            gap: 6px;
          }

          .gallery-tab {
            padding: 10px 18px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
