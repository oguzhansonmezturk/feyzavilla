import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Amenities = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const amenitiesList = [
    { num: '01', titleKey: 'amenities.pool', descKey: 'amenities.pool_desc', defaultTitle: 'Isıtmalı Havuz', defaultDesc: 'Yılın 365 günü kullanıma açık özel ısıtmalı havuz.' },
    { num: '02', titleKey: 'amenities.view', descKey: 'amenities.view_desc', defaultTitle: 'Doğa Manzarası', defaultDesc: 'Karadeniz\'in eşsiz yeşil vadilerine panoramik bakış.' },
    { num: '03', titleKey: 'amenities.garden', descKey: 'amenities.garden_desc', defaultTitle: 'Özel Bahçe', defaultDesc: 'Tamamen size özel, doğayla iç içe bahçe alanı.' },
    { num: '04', titleKey: 'amenities.wifi', descKey: 'amenities.wifi_desc', defaultTitle: 'Yüksek Hızlı WiFi', defaultDesc: 'Kesintisiz internet bağlantısı.' },
    { num: '05', titleKey: 'amenities.kitchen', descKey: 'amenities.kitchen_desc', defaultTitle: 'Tam Donanımlı Mutfak', defaultDesc: 'İhtiyacınız olan her şeyle donatılmış modern mutfak.' },
    { num: '06', titleKey: 'amenities.parking', descKey: 'amenities.parking_desc', defaultTitle: 'Özel Otopark', defaultDesc: 'Güvenli özel araç park alanı.' },
  ];

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
    <section className="section section--dark" id="amenities" ref={sectionRef}>
      <div className="container">
        <div className="amenities-header anim-reveal">
          <span className="section-label">{t('amenities.label', 'Olanaklar')}</span>
          <h2 className="section-title">{t('amenities.title', 'Sizin İçin Düşündüklerimiz')}</h2>
        </div>

        <div className="amenities-grid anim-reveal">
          {amenitiesList.map((item, idx) => (
            <div className="amenity-item" key={idx}>
              <span className="amenity-number">{item.num}</span>
              <div className="amenity-body">
                <h3>{t(item.titleKey) || item.defaultTitle}</h3>
                <p>{t(item.descKey) || item.defaultDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* --- Amenities --- */
        .amenities-header {
          text-align: center;
          margin-bottom: clamp(48px, 6vw, 80px);
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }

        .amenity-item {
          display: flex;
          gap: 24px;
          padding: 32px;
          border-bottom: 1px solid var(--border-dark);
          transition: background 0.3s;
        }

        .amenity-item:nth-child(odd) {
          border-right: 1px solid var(--border-dark);
        }

        .amenity-item:hover {
          background: rgba(245, 240, 232, 0.04);
        }

        .amenity-number {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 300;
          color: var(--accent);
          flex-shrink: 0;
          line-height: 1.3;
        }

        .amenity-body h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 6px;
        }

        .amenity-body p {
          font-size: 0.9rem;
          color: var(--text-on-dark-mid);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .amenities-grid {
            grid-template-columns: 1fr;
          }

          .amenity-item:nth-child(odd) {
            border-right: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Amenities;
