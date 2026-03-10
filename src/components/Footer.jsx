import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Plane, Car } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/images/feyzavillalogo.jpg" alt="Feyza Villa Logo" className="footer-logo-img" />
            <h2 className="footer-logo-text">Feyza Villa</h2>
          </div>

          <div className="footer-info-grid">
            <div className="footer-info-col">
              <h4>{t('contact.label', 'İletişim')}</h4>
              <ul>
                <li>
                  <MapPin size={16} />
                  <span>Dere Mevki, Pazar, Dernek Köyü Yolu, 53300 Sahilköy/Pazar/Rize</span>
                </li>
                <li>
                  <Phone size={16} />
                  <span>0543 883 16 26</span>
                </li>
              </ul>
            </div>
            <div className="footer-info-col">
              <h4>Feyza Villa</h4>
              <div className="footer-links-col">
                <a href="#about">{t('nav.about', 'Hakkımızda')}</a>
                <a href="#amenities">{t('amenities.label', 'Olanaklar')}</a>
                <a href="#gallery">{t('nav.gallery', 'Galeri')}</a>
                <a href="#location">{t('location.label', 'Konum')}</a>
                <a href="#reviews">{t('reviews.label', 'Yorumlar')}</a>
                <a href="#contact">{t('nav.contact', 'İletişim')}</a>
              </div>
            </div>
          </div>

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Feyza Villa. <span>{t('footer.rights', 'Tüm hakları saklıdır.')}</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* --- Footer --- */
        .footer {
          background: var(--bg-dark);
          color: var(--text-on-dark);
          padding: 40px 0 30px;
        }

        .footer-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .footer-logo-img {
          width: 80px;
          height: auto;
          border-radius: 6px;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .footer-logo-text {
          font-family: 'Cinzel', serif;
          font-size: 2rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: var(--text-on-dark);
          margin: 0;
        }

        .footer-info-grid {
          display: flex;
          gap: 64px;
          text-align: left;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          max-width: 800px;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 32px 0;
        }

        .footer-info-col h4 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: white;
          margin-bottom: 16px;
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        .footer-info-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-info-col li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.85rem;
          color: var(--text-on-dark-mid);
          line-height: 1.6;
        }

        .footer-info-col li svg {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-links-col {
          display: grid;
          grid-template-columns: repeat(2, minmax(110px, auto));
          column-gap: 24px;
          row-gap: 10px;
        }

        .footer-links-col a {
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          color: var(--text-on-dark-mid);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links-col a:hover {
          color: var(--accent);
        }

        .footer-copy {
          font-size: 0.8rem;
          color: var(--text-on-dark-mid);
          opacity: 0.6;
          margin-top: 8px;
        }

        @media (max-width: 600px) {
          .footer-info-grid {
            flex-direction: column;
            gap: 40px;
            text-align: left;
            padding: 0 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
