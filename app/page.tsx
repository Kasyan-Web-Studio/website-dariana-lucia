'use client';

import { useEffect, useRef, useState } from 'react';
import { homeContent } from '@/src/data/home';

const introDuration = 5000;

function BrandLogo({ variant, alt, className = '' }: { variant: 'intro' | 'mark' | 'no-slogan' | 'light'; alt: string; className?: string }) {
  const files = { intro: 'logo-dariana-lucia-new.png', mark: 'logo-dariana-lucia-new.png', 'no-slogan': 'logo-dariana-lucia-new.png', light: 'logo-dariana-lucia-new.png' };
  return <img className={`brand-logo brand-logo-${variant} ${className}`} src={`/assets/brand/${files[variant]}`} alt={alt} />;
}

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const [videoMounted, setVideoMounted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);

  function closeIntro() {
    const video = introVideoRef.current;
    video?.pause();
    if (video) video.currentTime = 0;
    setVideoMounted(false);
    setHeroReady(true);
    setIntroLeaving(true);
    window.setTimeout(() => setIntroVisible(false), 700);
  }

  function handleVideoReady() {
    setVideoReady(true);
    void introVideoRef.current?.play().catch(() => undefined);
  }

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setVideoFading(true), introDuration - 500);
    const timer = window.setTimeout(closeIntro, introDuration);
    return () => { window.clearTimeout(fadeTimer); window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === 'Tab' && menuPanelRef.current) {
        const focusable = menuPanelRef.current.querySelectorAll<HTMLElement>('a, button');
        if (!focusable.length) return;
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    menuPanelRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  function toggleMenu() {
    setMenuOpen((open) => { if (open) window.setTimeout(() => menuButtonRef.current?.focus(), 50); return !open; });
  }

  return (
    <main id="acasa" className={`site-shell${introVisible ? ' intro-active' : ''}`}>
      {introVisible && <section className={`intro${introLeaving ? ' intro-leaving' : ''}`} aria-label="Intro Dariana și Lucia">
        {videoMounted && <video ref={introVideoRef} className={`intro-media${videoReady ? ' intro-video-ready' : ''}${videoFading ? ' intro-video-fading' : ''}`} autoPlay muted playsInline preload="auto" onLoadedData={handleVideoReady} onCanPlay={handleVideoReady} aria-hidden="true"><source src="/assets/videos/intro/beauty-hero-higgsfield.mp4" type="video/mp4" /></video>}
        <div className="intro-shade" aria-hidden="true" /><div className="intro-center"><BrandLogo variant="intro" alt="Dariana & Lucia — Lashes & Nails Studio" /><div className="intro-progress" aria-hidden="true"><span /></div></div>
      </section>}

      <header className="site-header">
        <a className="header-logo" href="#acasa" aria-label="Dariana și Lucia — Acasă"><picture><source media="(max-width: 699px)" srcSet="/assets/brand/logo-dariana-lucia-new.png" /><img src="/assets/brand/logo-dariana-lucia-new.png" alt="Dariana & Lucia — Nails & Lashes" /></picture></a>
        <div className="header-actions"><a className="button button-booking" href="#programare">Programare <span aria-hidden="true">↗</span></a>
          <button ref={menuButtonRef} className={`menu-toggle${menuOpen ? ' is-open' : ''}`} type="button" aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={menuOpen} aria-controls="main-menu" onClick={toggleMenu}><span /><span /><span /></button>
        </div>
      </header>

      <section id="hero" className={`hero${heroReady ? ' hero-ready' : ''}`} aria-labelledby="hero-title">
        <div className="hero-shade" aria-hidden="true" /><div className="hero-orbit hero-orbit-one" aria-hidden="true" /><div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-copy"><p className="hero-eyebrow"><span className="eyebrow-line" />{homeContent.eyebrow}</p><h1 id="hero-title">{homeContent.title}</h1><p className="hero-subtitle">{homeContent.subtitle}</p>
          <div className="hero-ctas"><a className="button button-primary" href="#programare">{homeContent.primaryCta} <span aria-hidden="true">↗</span></a><a className="button button-ghost" href="#galerie">{homeContent.secondaryCta} <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section id="despre" className="studio-intro" aria-labelledby="studio-intro-title"><div className="section-index">01 / Despre studio</div><div className="section-copy"><p className="section-kicker">A quiet ritual of detail</p><h2 id="studio-intro-title">Precizie care se simte, stil care rămâne.</h2><p>Un spațiu atent construit pentru momentele în care frumusețea devine timp pentru tine. Fiecare formă, textură și finisaj este ales cu grijă.</p><a className="text-link" href="#servicii">Descoperă serviciile <span aria-hidden="true">↗</span></a></div><div className="section-shape section-shape-circle" aria-hidden="true" /><div className="section-grid" aria-hidden="true" /></section>

      <section id="servicii" className="services-preview" aria-labelledby="services-title"><div className="section-index">02 / Servicii &amp; prețuri</div><div className="services-heading"><p className="section-kicker">The finishing touch</p><h2 id="services-title">Ritualuri create pentru tine.</h2></div><div className="service-list"><article><span>01</span><h3>Lashes</h3><p>Privire definită, proporții naturale și un rezultat care te reprezintă.</p></article><article><span>02</span><h3>Nails</h3><p>Forme curate, nuanțe atent alese și detalii care completează fiecare gest.</p></article><article><span>03</span><h3>Signature</h3><p>O experiență personalizată, de la prima inspirație până la ultimul detaliu.</p></article></div></section>

      <aside ref={menuPanelRef} id="main-menu" className={`menu-overlay${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} aria-label="Meniu principal"><div className="menu-backdrop" aria-hidden="true" /><div className="menu-inner"><BrandLogo variant="mark" alt="DL" className="menu-logo" /><p className="menu-kicker">The details make the difference <span>✦</span></p><nav><ol>{homeContent.menu.map((item, index) => <li key={item.label} style={{ '--item-index': index } as React.CSSProperties}><span className="menu-index">0{index + 1}</span><a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a></li>)}</ol></nav><div className="menu-footer"><span>Dariana &amp; Lucia Studio</span><span>Est. 2026</span></div></div></aside>
      <footer className="site-footer"><BrandLogo variant="no-slogan" alt="Dariana & Lucia — Lashes & Nails Studio" /><p>Beauty, shaped in every detail.</p></footer>
    </main>
  );
}
