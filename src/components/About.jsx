import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, BedDouble, Bath, Sparkles } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const sectionRef = useRef(null);

  const images = [
    './images/discekim1.jpg',
    './images/iccekim10.png',
    './images/iccekim11.png',
    './images/discekim8.png',
    './images/iccekim4.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

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
  }, []);

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-inner">
          <div className="about-image anim-reveal">
            <div className="image-wrapper">
              <div className="about-slideshow">
                {images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Villa"
                    style={
                      src.includes('iccekim2') ? { objectPosition: 'center 80%' } :
                        src.includes('discekim8') ? { objectPosition: 'center bottom' } : {}
                    }
                    className={`about-slide ${idx === currentSlide ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="about-content anim-reveal">
            <span className="section-label">{t('about.label', 'Feyza Villa')}</span>
            <h2 className="section-title">{t('about.title', 'Huzurun Adresi')}</h2>
            <p className="about-text">
              {t('about.text', "Rize'nin eşsiz doğasıyla iç içe, lüks ve konforun buluştuğu Feyza Villa'da unutulmaz bir konaklama deneyimi sizi bekliyor.")}
            </p>
            <div className="about-stats-grid">
              <div className="stat-card">
                <Users size={24} className="stat-icon" strokeWidth={1.5} />
                <span className="stat-label">{t('about.guests', 'Maksimum 4 Misafir')}</span>
              </div>
              <div className="stat-card">
                <BedDouble size={24} className="stat-icon" strokeWidth={1.5} />
                <span className="stat-label">{t('about.bedrooms', '2 Yatak Odası')}</span>
              </div>
              <div className="stat-card">
                <Bath size={24} className="stat-icon" strokeWidth={1.5} />
                <span className="stat-label">{t('about.bathrooms', '1 Banyo')}</span>
              </div>
              <div className="stat-card stat-card-highlight">
                <Sparkles size={24} className="stat-icon" strokeWidth={1.5} />
                <span className="stat-label">∞ Huzur</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- About --- */
        .about-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: center;
        }

        .about-image .image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }

        .about-image .image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid var(--border);
          border-radius: 4px;
          pointer-events: none;
        }

        /* About Slideshow */
        .about-slideshow {
          position: relative;
          height: 500px;
        }

        .about-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.2s var(--ease);
        }

        .about-slide.active {
          opacity: 1;
        }

        .about-image:hover .about-slide.active {
          transform: scale(1.04);
          transition: opacity 1.2s var(--ease), transform 0.8s var(--ease);
        }

        .about-content {
          max-width: 520px;
        }

        .about-text {
          font-size: 1.05rem;
          color: var(--text-mid);
          margin-bottom: 20px;
          line-height: 1.8;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(140, 122, 107, 0.03);
          border: 1px solid rgba(140, 122, 107, 0.1);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .stat-card-highlight {
          background: rgba(140, 122, 107, 0.08);
          border-color: rgba(140, 122, 107, 0.2);
        }

        .stat-card:hover {
          background: rgba(140, 122, 107, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.03);
        }

        .stat-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--text-dark);
        }

        @media (max-width: 900px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-slideshow {
            height: 360px;
          }
        }

        @media (max-width: 600px) {
          .about-slideshow {
            height: 280px;
          }

          .about-stats {
            gap: 16px;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
