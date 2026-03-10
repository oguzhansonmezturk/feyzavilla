import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
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
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-header">
          <span className="section-label anim-reveal">{t('contact.label') || 'İletişim'}</span>
          <h2 className="section-title anim-reveal">{t('contact.title') || 'Bize Ulaşın'}</h2>
        </div>

        <div className="contact-grid anim-reveal">
          <a href="tel:+905438831626" className="contact-card">
            <div className="contact-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <span className="contact-type">{t('contact.phone', 'Telefon')}</span>
            <span className="contact-value">0543 883 16 26</span>
          </a>

          <a href="https://wa.me/905438831626" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="contact-type">WhatsApp</span>
            <span className="contact-value">0543 883 16 26</span>
          </a>

          <a href="mailto:info@feyzavilla.com" className="contact-card">
            <div className="contact-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
            </div>
            <span className="contact-type">{t('contact.email', 'E-posta')}</span>
            <span className="contact-value">info@feyzavilla.com</span>
          </a>

          <a href="https://instagram.com/feyzavilla" className="contact-card" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="contact-type">Instagram</span>
            <span className="contact-value">@feyzavilla</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        /* --- Contact --- */
        .contact-header {
          text-align: center;
          margin-bottom: clamp(40px, 5vw, 64px);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .contact-card {
          background: white;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          transition: transform 0.3s var(--ease), box-shadow 0.3s;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          text-decoration: none;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .contact-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--bg-alt);
          margin: 0 auto 20px;
          color: var(--accent);
          transition: background 0.3s, color 0.3s;
        }

        .contact-card:hover .contact-icon-wrap {
          background: var(--accent);
          color: white;
        }

        .contact-icon-wrap svg {
          width: 26px;
          height: 26px;
          flex-shrink: 0;
        }

        .contact-type {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 8px;
        }

        .contact-value {
          display: block;
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--text);
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 500px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
