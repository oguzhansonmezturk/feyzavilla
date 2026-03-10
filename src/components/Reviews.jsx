import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Reviews = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "O. Y.",
      initial: "O",
      date: t('reviews.item1.date', 'Google · 2 hafta önce'),
      text: t('reviews.item1.text', 'Doğanın içinde, huzur dolu bir tatil arayanlar için eşsiz bir yer! Villanın dere kenarında, sessiz sakin bir ortamda konumlanmış olması gerçekten dinlendiriciydi. Bahçesindeki havuz ile beraber doğa manzarasının keyfini çıkardık. Sabahları derenin huzur verici sesiyle uyanmak ve gün boyu doğayla baş başa kalmak harikaydı. Villa oldukça temiz ve konforluydu, her şey düşünülmüş. Ailece keyifli vakit geçirdik. Teşekkürler.')
    },
    {
      id: 2,
      name: "S. T.",
      initial: "S",
      date: t('reviews.item2.date', 'Google · 1 ay önce'),
      text: t('reviews.item2.text', 'Bugün geldik, burası gerçekten harika bir yer. Herkese kesinlikle tavsiye ediyorum. Sahipleri çok cana yakın insanlar 3 gün burada kalacağız ve her sene geleceğimiz tek yer burası olacak. Hiç düşünmeden burayı seçebilirsiniz pişman olmayacaksınız. Teşekkürler Feyza Villa ailesi.')
    },
    {
      id: 3,
      name: "G. E.",
      initial: "G",
      date: t('reviews.item3.date', 'Google · 2 ay önce'),
      text: t('reviews.item3.text', 'Harika bir ortam çalışanları çok yardımcı oldular. Tertemiz ve çok rahattı her şey düşünülmüştü. Bize sadece eğlenmesi kaldı. Rize\'ye geldiğimde mutlaka tekrar geleceğim. Tavsiye ediyorum, kesinlikle konaklamanız gereken huzur dolu bir yer.')
    },
    {
      id: 4,
      name: "H. B.",
      initial: "H",
      date: t('reviews.item4.date', 'Google · 3 ay önce'),
      text: t('reviews.item4.text', 'Konumu mükemmel, villa mükemmel, içinde ihtiyacınız olan her şey fazlasıyla mevcut. Villa sahipleri güler yüzlü sıcakkanlı insanlar. Güvenilir bir ortam var. Merkeze de birkaç dakika uzaklıkta. Düşünmeden konaklayabilirsiniz.')
    },
    {
      id: 5,
      name: "M. Y.",
      initial: "M",
      date: t('reviews.item5.date', 'Google · 4 ay önce'),
      text: t('reviews.item5.text', 'Rize\'de tek kelime ile müthiş bir yer. Ailem ile gittim, geniş bahçesi çocuklar için müthiş bir sosyal aktivite oldu. Tebrik ediyorum, güzel iş çıkardılar.')
    },
    {
      id: 6,
      name: "A. K.",
      initial: "A",
      date: t('reviews.item6.date', 'Google · 5 ay önce'),
      text: t('reviews.item6.text', 'Konumu mükemmel. Doğa içinde, önünde dere, tam bir doğa harikası. Havuz ayrı bir güzel. Aile için çok uygun bir yer. Kesinlikle tavsiye ederim, her şey mükemmel.')
    }
  ];

  // Feature request: Exact 4 reviews as per lustrous-figolla design
  const displayedReviews = reviews.slice(0, 4);

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
    <section className="reviews section" id="reviews" ref={sectionRef}>
      <div className="container">
        <div className="reviews-header">
          <h2 className="section-title anim-reveal">{t('reviews.title') || 'Misafir Yorumları'}</h2>
          <span className="section-label anim-reveal" style={{ marginTop: '16px', display: 'block' }}>
            {t('reviews.subtitle', 'Misafirlerimiz ne diyor?')}
          </span>
        </div>

        <div className="reviews-grid">
          {displayedReviews.map((review) => (
            <div key={review.id} className="review-card anim-reveal">
              <div className="review-card-header">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <svg className="review-quote-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="review-text">{review.text}</p>

              <div className="review-author-footer">
                <div className="review-author">
                  <div className="review-avatar" style={{ backgroundColor: review.id % 2 === 0 ? '#1E3A8A' : '#1F2937' }}>
                    {review.initial}
                  </div>
                  <div className="review-author-info">
                    <span className="review-name">{review.name}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>

                <div className="review-recommend">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{t('reviews.recommends', 'Tavsiye Ediyor')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* --- Reviews --- */
        .reviews {
          background-color: var(--bg-light); /* Ref: #fdfcfb or similar */
          padding: 100px 0;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: clamp(50px, 6vw, 80px);
        }

        .reviews-header .section-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 600;
          color: var(--text-dark);
          position: relative;
          display: inline-block;
          margin: 0;
        }

        /* The signature gold underline found in the reference */
        .reviews-header .section-title::after {
          content: "";
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: var(--accent);
        }

        .reviews-header .section-label {
          color: var(--text-light); /* Greyer color */
          font-size: 1.1rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          text-transform: none;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (max-width: 1023px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }

        .review-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.02);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .review-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
        }

        .review-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .review-stars {
          display: flex;
          gap: 4px;
        }

        .review-stars svg {
          width: 18px;
          height: 18px;
          fill: #c9a96e; /* Muted gold matching the reference */
        }

        .review-quote-icon {
          width: 32px;
          height: 32px;
          fill: #f0ebe1; /* Very light beige quote mark */
        }

        .review-text {
          font-family: 'Jost', 'Segoe UI', sans-serif;
          font-size: 1.05rem;
          line-height: 1.8;
          color: #4a4a4a;
          font-weight: 400;
          flex: 1; /* Pushes footer down */
        }

        .review-author-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          border-top: 1px solid rgba(0,0,0,0.04);
          padding-top: 24px;
        }

        .review-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .review-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Jost', sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 1px;
          flex-shrink: 0;
        }

        .review-author-info {
          display: flex;
          flex-direction: column;
        }

        .review-name {
          font-family: 'Jost', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #222;
        }

        .review-date {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          color: #888;
          margin-top: 2px;
        }

        .review-recommend {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #e8f5e9;
          color: #2e7d32;
          padding: 8px 16px;
          border-radius: 30px;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .review-recommend svg {
          width: 14px;
          height: 14px;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
