import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Booking = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const onDateClick = (date) => {
    if (date < today) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const onDateHover = (date) => {
    if (checkIn && !checkOut && date >= checkIn) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  };

  const lang = i18n.language || 'tr';

  const getWeekdays = (locale) => {
    const format = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const days = [];
    // 2024-01-01 is a Monday
    for (let i = 1; i <= 7; i++) {
      let dayStr = format.format(new Date(2024, 0, i));
      dayStr = dayStr.charAt(0).toUpperCase() + dayStr.slice(1);
      days.push(dayStr);
    }
    return days;
  };

  const getMonthName = (locale, monthIndex) => {
    const format = new Intl.DateTimeFormat(locale, { month: 'long' });
    // 2024 is arbitrary, monthIndex is 0-11
    let mStr = format.format(new Date(2024, monthIndex, 1));
    return mStr.charAt(0).toUpperCase() + mStr.slice(1);
  };

  const nightCount = checkIn && checkOut
    ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    : 0;

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const unspecified = t('booking.unspecified') || 'Belirtilmedi';
    const ci = checkIn ? checkIn.toLocaleDateString(lang) : unspecified;
    const co = checkOut ? checkOut.toLocaleDateString(lang) : unspecified;

    let text = `${t('booking.wa_intro', 'Merhaba, Feyza Villa için rezervasyon talebim var.')}\n\n`;
    text += `${t('booking.wa_checkin', 'Giriş:')} ${ci}\n${t('booking.wa_checkout', 'Çıkış:')} ${co}\n${t('booking.wa_nights', 'Gece:')} ${nightCount}\n`;
    text += `${t('booking.wa_name', 'İsim:')} ${name}\n${t('booking.wa_phone', 'Telefon:')} ${phone}\n${t('booking.wa_email', 'E-posta:')} ${email}\n${t('booking.wa_message', 'Mesaj:')} ${message}`;

    const url = `https://wa.me/905300704053?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const renderMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // 0 = Sunday, 1 = Monday ... 6 = Saturday
    let firstDayIndex = new Date(year, month, 1).getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Adjust for Mon-Sun

    const weekdaysList = getWeekdays(lang);
    const mName = getMonthName(lang, month);

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isCheckIn = checkIn && date.getTime() === checkIn.getTime();
      const isCheckOut = checkOut && date.getTime() === checkOut.getTime();

      let isInRange = false;
      let isHoverRange = false;

      if (checkIn && checkOut) {
        isInRange = date > checkIn && date < checkOut;
      } else if (checkIn && hoverDate && !checkOut) {
        isHoverRange = date > checkIn && date <= hoverDate;
      }

      let classes = 'calendar-day';
      if (isPast) classes += ' disabled';
      if (isToday) classes += ' today';
      if (isCheckIn) classes += ' selected-start';
      if (isCheckOut) classes += ' selected-end';
      if (isInRange || isHoverRange) classes += ' in-range';
      if ((isInRange || isHoverRange) && date.getTime() === (checkIn.getTime() + 86400000)) classes += ' range-start';
      if (isCheckOut || (isHoverRange && date.getTime() === hoverDate?.getTime())) classes += ' range-end';

      days.push(
        <div
          key={i}
          className={classes}
          onClick={() => !isPast && onDateClick(date)}
          onMouseEnter={() => !isPast && onDateHover(date)}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="calendar-month" key={`${year}-${month}`}>
        <div className="calendar-month-title">{mName} {year}</div>
        <div className="calendar-weekdays">
          {weekdaysList.map((d, index) => <div key={`wd-${index}`} className="calendar-weekday">{d}</div>)}
        </div>
        <div className="calendar-days">
          {days}
        </div>
      </div>
    );
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
  }, []);

  const m1Year = currentDate.getFullYear();
  const m1Month = currentDate.getMonth();

  const m2Date = new Date(m1Year, m1Month + 1, 1);
  const m2Year = m2Date.getFullYear();
  const m2Month = m2Date.getMonth();

  return (
    <section className="booking section" id="booking" ref={sectionRef}>
      <div className="container">
        <div className="booking-header">
          <span className="section-label anim-reveal">{t('booking.label') || 'Rezervasyon'}</span>
          <h2 className="section-title anim-reveal">{t('booking.title') || 'Tarihinizi Seçin'}</h2>
          <p className="booking-subtitle anim-reveal">
            {t('booking.subtitle') || 'Giriş ve çıkış tarihlerinizi takvimden seçerek rezervasyon talebinizi oluşturun.'}
          </p>
        </div>

        <div className="booking-content anim-reveal">
          <div className="calendar-wrapper">
            <div className="calendar-container">
              <div className="calendar-nav">
                <button className="calendar-nav-btn" onClick={prevMonth}>&#8249;</button>
                <div className="calendar-months-title">{m1Year}</div>
                <button className="calendar-nav-btn" onClick={nextMonth}>&#8250;</button>
              </div>
              <div className="calendar-months">
                {renderMonth(m1Year, m1Month)}
                {renderMonth(m2Year, m2Month)}
              </div>
            </div>
            <div className="calendar-hint">
              {t('booking.min_nights', 'Minimum konaklama süresi 2 gecedir.')}
            </div>
          </div>

          <div className="booking-sidebar">
            <div className="booking-summary" id="bookingSummary">
              <h3>{t('booking.summary') || 'Rezervasyon Özeti'}</h3>
              <div className="summary-row">
                <span>{t('booking.checkin') || 'Giriş'}</span>
                <span className="summary-value" id="checkinDate">
                  {checkIn ? checkIn.toLocaleDateString(lang) : '—'}
                </span>
              </div>
              <div className="summary-row">
                <span>{t('booking.checkout') || 'Çıkış'}</span>
                <span className="summary-value" id="checkoutDate">
                  {checkOut ? checkOut.toLocaleDateString(lang) : '—'}
                </span>
              </div>
              <div className="summary-row summary-row--highlight">
                <span>{t('booking.nights') || 'Gece'}</span>
                <span className="summary-value" id="nightCount">
                  {nightCount > 0 ? nightCount : '—'}
                </span>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleWhatsApp}>
              <input
                type="text"
                placeholder={t('booking.name_ph') || 'Adınız Soyadınız'}
                value={name} onChange={e => setName(e.target.value)} required
              />
              <input
                type="tel"
                placeholder={t('booking.phone_ph') || 'Telefon Numaranız'}
                value={phone} onChange={e => setPhone(e.target.value)} required
              />
              <input
                type="email"
                placeholder={t('booking.email_ph') || 'E-posta Adresiniz'}
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <textarea
                rows="3"
                placeholder={t('booking.message_ph') || 'Mesajınız (isteğe bağlı)'}
                value={message} onChange={e => setMessage(e.target.value)}
              ></textarea>

              <button type="submit" className="btn btn-primary" id="bookingSubmit">
                {t('booking.submit') || 'Rezervasyon Talebi Gönder'}
              </button>

              <a href="#" onClick={handleWhatsApp} className="btn btn-whatsapp" id="whatsappBtn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>{t('booking.whatsapp') || 'WhatsApp ile İletişim'}</span>
              </a>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- Booking Section --- */
        .booking {
          background-color: var(--bg-alt);
        }
        
        .booking-header {
          text-align: center;
          margin-bottom: clamp(40px, 5vw, 64px);
        }

        .booking-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .booking-content {
            grid-template-columns: 1fr;
          }
        }

        /* Calendar Styles */
        .calendar-wrapper {
          padding: clamp(24px, 4vw, 48px);
        }
        
        .calendar-container {
          background: #fff;
        }
        
        .calendar-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .calendar-nav-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--text);
          cursor: pointer;
          transition: all 0.3s;
          line-height: 1;
        }
        
        .calendar-nav-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(140, 122, 107, 0.05);
        }
        
        .calendar-months-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-dark);
        }
        
        .calendar-months {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        
        @media (max-width: 768px) {
          .calendar-months {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        
        .calendar-month-title {
          text-align: center;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 1.1rem;
          margin-bottom: 20px;
          color: var(--text-dark);
        }
        
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 12px;
          font-weight: 500;
        }
        
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          color: var(--text-dark);
          position: relative;
        }
        
        .calendar-day:hover:not(.disabled):not(.empty) {
          background: rgba(140, 122, 107, 0.1);
        }
        
        .calendar-day.empty {
          cursor: default;
        }
        
        .calendar-day.disabled {
          color: #ccc;
          cursor: not-allowed;
          text-decoration: line-through;
        }
        
        .calendar-day.today::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
        }
        
        .calendar-day.selected-start,
        .calendar-day.selected-end {
          background: var(--accent) !important;
          color: #fff !important;
          font-weight: 500;
          border-radius: 6px;
        }
        
        .calendar-day.in-range {
          background: rgba(140, 122, 107, 0.08);
          border-radius: 0;
        }
        
        .calendar-day.range-start {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        
        .calendar-day.range-end {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        
        .calendar-hint {
          margin-top: 32px;
          font-size: 0.85rem;
          color: var(--text-light);
          text-align: center;
          font-style: italic;
        }
        
        /* Sidebar */
        .booking-sidebar {
          background: #fdfcfb;
          border-left: 1px solid var(--border);
          color: var(--text-dark);
          padding: clamp(32px, 4vw, 48px);
          display: flex;
          flex-direction: column;
        }
        
        .booking-summary h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 32px;
          color: var(--text-dark);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          font-size: 0.95rem;
          color: var(--text-mid);
        }
        
        .summary-value {
          font-weight: 500;
          color: var(--text-dark);
        }
        
        .summary-row--highlight {
          border-bottom: none;
          margin-top: 16px;
          padding-top: 20px;
          border-top: 1px solid rgba(0,0,0,0.1);
          font-size: 1.05rem;
        }
        
        .summary-row--highlight .summary-value {
          color: var(--accent);
          font-size: 1.2rem;
        }
        
        .booking-form {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .booking-form input,
        .booking-form textarea {
          width: 100%;
          padding: 16px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-dark);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .booking-form input:focus,
        .booking-form textarea:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(140, 122, 107, 0.1);
        }
        
        .booking-form input::placeholder,
        .booking-form textarea::placeholder {
          color: var(--text-light);
        }
        
        .booking-form textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .btn {
          width: 100%;
          padding: 18px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
        }
        
        .btn-primary {
          background: var(--accent);
          color: white;
          margin-top: 16px;
        }
        
        .btn-primary:hover {
          background: #a39182;
        }
        
        .btn-whatsapp {
          background: #25D366;
          color: white;
        }
        
        .btn-whatsapp:hover {
          background: #20C05C;
        }
      `}</style>
    </section>
  );
};

export default Booking;
