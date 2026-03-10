import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { key: 'about', label: t('nav.about') || 'Hakkımızda', href: '#about' },
    { key: 'amenities', label: t('amenities.label') || 'Olanaklar', href: '#amenities' },
    { key: 'gallery', label: t('nav.gallery') || 'Galeri', href: '#gallery' },
    { key: 'location', label: t('location.label', 'Konum'), href: '#location' },
    { key: 'reviews', label: t('nav.reviews', 'Yorumlar'), href: '#reviews' },
    { key: 'contact', label: t('nav.contact') || 'İletişim', href: '#contact' },
    { key: 'booking', label: t('booking.label') || 'Rezervasyon', href: '#booking', isButton: true },
  ];

  const toggleLangMenu = (e) => {
    e.stopPropagation();
    setLangMenuOpen(!langMenuOpen);
  };

  useEffect(() => {
    const closeLang = () => setLangMenuOpen(false);
    document.addEventListener('click', closeLang);
    return () => document.removeEventListener('click', closeLang);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
            <img src="./images/feyzavillalogo.jpg" alt="Feyza Villa Logo" className="nav-logo-img" />
            <h2 className="logo-text">Feyza Villa</h2>
          </a>
          <div className="nav-links">
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className={link.isButton ? 'nav-booking-btn' : ''}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <div className="lang-switcher">
              <button className="lang-current" onClick={toggleLangMenu}>
                {i18n.language === 'tr' ? '🇹🇷 TR' :
                  i18n.language === 'en' ? '🇬🇧 EN' :
                    i18n.language === 'de' ? '🇩🇪 DE' :
                      i18n.language === 'ru' ? '🇷🇺 RU' : '🇸🇦 AR'}
              </button>
              <div className={`lang-dropdown ${langMenuOpen ? 'open' : ''}`}>
                <button className={i18n.language === 'tr' ? 'active' : ''} onClick={() => changeLanguage('tr')}>🇹🇷 Türkçe</button>
                <button className={i18n.language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>🇬🇧 English</button>
                <button className={i18n.language === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>🇩🇪 Deutsch</button>
                <button className={i18n.language === 'ru' ? 'active' : ''} onClick={() => changeLanguage('ru')}>🇷🇺 Русский</button>
                <button className={i18n.language === 'ar' ? 'active' : ''} onClick={() => changeLanguage('ar')}>🇸🇦 العربية</button>
              </div>
            </div>
            <button className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map(link => (
            <a key={link.key} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
          ))}
          <div className="mobile-lang">
            <button className={i18n.language === 'tr' ? 'active' : ''} onClick={() => changeLanguage('tr')}>TR</button>
            <button className={i18n.language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button>
            <button className={i18n.language === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>DE</button>
            <button className={i18n.language === 'ru' ? 'active' : ''} onClick={() => changeLanguage('ru')}>RU</button>
            <button className={i18n.language === 'ar' ? 'active' : ''} onClick={() => changeLanguage('ar')}>AR</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- Navigation --- */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--nav-height);
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s, border-bottom 0.4s;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav.scrolled {
          background: rgba(245, 240, 232, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 var(--border);
          border-bottom: none;
        }

        .nav.scrolled .nav-logo h2,
        .nav.scrolled .nav-links a,
        .nav.scrolled .lang-current,
        .nav.scrolled .nav-toggle span {
          color: var(--text);
        }

        .nav-inner {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .nav-logo-img {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          object-fit: cover;
          transition: transform 0.4s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-logo:hover .nav-logo-img {
          transform: scale(1.05);
        }

        .logo-text {
          font-family: var(--font-hero);
          color: var(--text-on-dark);
          margin: 0;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.4s;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .nav-links a {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-on-dark);
          transition: color 0.3s, opacity 0.3s;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s var(--ease);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-booking-btn {
          background: linear-gradient(135deg, rgb(201, 169, 110), rgb(168, 139, 74));
          border-radius: 9999px;
          box-shadow: rgba(201, 169, 110, 0.25) 0px 4px 20px 0px;
          color: rgb(255, 255, 255) !important;
          font-weight: 500 !important;
          padding: 10px 22px;
          letter-spacing: 0.05em !important;
          transition: transform 0.3s, box-shadow 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .nav-booking-btn::after {
          display: none !important;
        }

        .nav-booking-btn:hover {
          transform: translateY(-2px);
          box-shadow: rgba(201, 169, 110, 0.4) 0px 6px 24px 0px;
          color: rgb(255, 255, 255) !important;
          opacity: 1 !important;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        /* Language Switcher */
        .lang-switcher {
          position: relative;
        }

        .lang-current {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--text-on-dark);
          background: rgba(255, 255, 255, 0.08); /* Figolla style */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15); /* Figolla style */
          padding: 8px 14px;
          border-radius: 6px;
          transition: all 0.3s;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav.scrolled .lang-current {
          border-color: var(--border);
          color: var(--text);
          background: transparent;
        }

        .lang-current:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 6px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all 0.25s var(--ease);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          min-width: 130px;
        }

        .lang-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .lang-dropdown button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 14px;
          font-size: 0.85rem;
          border-radius: 4px;
          color: var(--text);
          transition: background 0.2s;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .lang-dropdown button:hover {
          background: var(--bg-alt);
        }

        .lang-dropdown button.active {
          color: var(--accent);
          font-weight: 500;
        }

        /* Mobile Nav Toggle */
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          padding: 8px;
        }

        .nav-toggle span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: currentColor;
          color: var(--text-on-dark);
          transition: transform 0.3s var(--ease), opacity 0.3s;
          transform-origin: center;
        }

        .nav-toggle.active span:first-child {
          transform: rotate(45deg) translate(2.5px, 2.5px);
        }

        .nav-toggle.active span:last-child {
          transform: rotate(-45deg) translate(2.5px, -2.5px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(27, 30, 25, 0.97);
          backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s, visibility 0.4s;
        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-inner {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .mobile-menu-inner > a {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-on-dark);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s, transform 0.4s;
        }

        .mobile-menu.open .mobile-menu-inner > a {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu.open .mobile-menu-inner > a:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu.open .mobile-menu-inner > a:nth-child(2) { transition-delay: 0.15s; }
        .mobile-menu.open .mobile-menu-inner > a:nth-child(3) { transition-delay: 0.2s; }
        .mobile-menu.open .mobile-menu-inner > a:nth-child(4) { transition-delay: 0.25s; }
        .mobile-menu.open .mobile-menu-inner > a:nth-child(5) { transition-delay: 0.3s; }

        .mobile-lang {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
          opacity: 0;
          transition: opacity 0.4s 0.35s;
        }

        .mobile-menu.open .mobile-lang {
          opacity: 1;
        }

        .mobile-lang button {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          color: var(--text-on-dark-mid);
          padding: 6px 12px;
          border: 1px solid var(--border-dark);
          border-radius: 4px;
          transition: all 0.25s;
        }

        .mobile-lang button.active,
        .mobile-lang button:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-toggle { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
