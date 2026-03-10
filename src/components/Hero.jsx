import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="./images/discekim1.jpg" alt="Feyza Villa Escape" />
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-location">{t('location.title', 'Pazar / Rize')}</div>
          <h1 className="hero-title">
            <span className="hero-title-line">Feyza</span>
            <span className="hero-title-line">Villa</span>
          </h1>
          <div className="hero-tagline">{t('hero.tagline', "Rize'nin Kalbinde Lüks Bir Kaçış")}</div>
          <div className="hero-scroll">
            <span>{t('hero.explore', 'KEŞFET')}</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* --- Hero --- */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.08);
          animation: heroZoom 25s var(--ease) forwards;
        }

        @keyframes heroZoom {
          to {
            transform: scale(1);
          }
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          text-align: center;
          color: var(--text-on-dark);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hero-location {
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
          animation: heroTextIn 1s var(--ease-out) 0.3s forwards;
        }

        .hero-title {
          font-family: var(--font-hero);
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-title-line {
          display: block;
          opacity: 0;
          transform: translateY(40px);
          animation: heroTextIn 1.2s var(--ease-out) forwards;
        }

        .hero-title-line:nth-child(1) {
          animation-delay: 0.5s;
        }

        .hero-title-line:nth-child(2) {
          animation-delay: 0.7s;
        }

        .hero-tagline {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.04em;
          margin-top: 24px;
          opacity: 0;
          animation: heroTextIn 1s var(--ease-out) 1.0s forwards;
        }

        @keyframes heroTextIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translate(-50%, 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: var(--text-on-dark);
          opacity: 0;
          animation: heroScrollIn 0.8s var(--ease-out) 1.4s forwards;
        }

        @keyframes heroScrollIn {
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .hero-scroll span {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: var(--accent);
          transform-origin: top;
          animation: scrollPulse 2s ease-in-out infinite 3s;
        }

        @keyframes scrollPulse {
          0%,
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.4);
            opacity: 0.4;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: clamp(2.2rem, 12vw, 4rem);
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
