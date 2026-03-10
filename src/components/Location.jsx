import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Location = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);

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
    <section className="location section section--dark" id="location" ref={sectionRef}>
      <div className="container">
        <div className="location-inner">
          <div className="location-content">
            <span className="section-label anim-reveal">{t('location.label') || 'Konum'}</span>
            <h2 className="section-title anim-reveal">{t('location.title', 'Pazar / Rize')}</h2>
            <p className="location-text anim-reveal">
              {t('location.text') || "Rize'nin eşsiz doğasında, Pazar ilçesinin huzur dolu atmosferinde yer alan villamız, hem dinlenmek hem macera arayanlar için ideal bir konumdadır."}
            </p>

            <div className="location-details anim-reveal">
              <div className="location-detail">
                <span className="detail-icon">&#9992;</span>
                <div>
                  <strong>{t('location.airport', 'En Yakın Havalimanı')}</strong>
                  <span>{t('location.airport_desc', 'Rize-Artvin - 15 dk | Trabzon - 1.5 saat')}</span>
                </div>
              </div>

              <div className="location-detail">
                <span className="detail-icon">&#9968;</span>
                <div>
                  <strong>{t('location.nature') || 'Doğa Aktiviteleri'}</strong>
                  <span>{t('location.nature_desc') || 'Trekking, yayla turları, rafting'}</span>
                </div>
              </div>

              <div className="location-detail">
                <span className="detail-icon">&#127861;</span>
                <div>
                  <strong>{t('location.culture') || 'Yerel Kültür'}</strong>
                  <span>{t('location.culture_desc') || 'Çay bahçeleri, yöresel mutfak'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="location-map anim-reveal">
            <div className="map-wrapper">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.404386746167!2d40.9519738!3d41.1693463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40664569e8d46817%3A0xb397dcf2934563e0!2sFeyza%20villaa!5e0!3m2!1str!2s${i18n.language || 'tr'}!4v1772946601531!5m2!1str!2s${i18n.language || 'tr'}&language=${i18n.language || 'tr'}`}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Feyza Villa Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- Location --- */
        .location-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: center;
        }

        .location-text {
          font-size: 1.05rem;
          color: var(--text-on-dark-mid);
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .location-details {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .location-detail {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .detail-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
          line-height: 1;
          margin-top: 2px;
        }

        .location-detail strong {
          display: block;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .location-detail span {
          font-size: 0.9rem;
          color: var(--text-on-dark-mid);
        }

        .location-map {
          width: 100%;
        }

        .map-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          height: 480px;
          background: var(--bg-dark-alt);
        }

        .map-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: grayscale(20%) contrast(1.05);
        }

        @media (max-width: 900px) {
          .location-inner {
            grid-template-columns: 1fr;
          }
          
          .map-wrapper {
            height: 360px;
          }
        }
      `}</style>
    </section>
  );
};

export default Location;
