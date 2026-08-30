'use client';

import { useEffect, useRef, useState } from 'react';
import { homeContent } from '@/src/data/home';

const introDuration = 2600;

function Monogram({ small = false }: { small?: boolean }) {
  return <span className={`monogram${small ? ' monogram-small' : ''}`} aria-hidden="true">D<span>/</span>L</span>;
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return <span className={`wordmark${compact ? ' wordmark-compact' : ''}`}><Monogram small={compact} /><span className="wordmark-name">{homeContent.brand}</span></span>;
}

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = sessionStorage.getItem('dariana-lucia-intro-seen') === 'true';
    const timer = window.setTimeout(() => {
      if (reducedMotion || alreadySeen) setIntroVisible(false);
      else closeIntro();
    }, reducedMotion || alreadySeen ? 0 : introDuration);
    return () => window.clearTimeout(timer);
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

  function closeIntro() {
    sessionStorage.setItem('dariana-lucia-intro-seen', 'true');
    setIntroLeaving(true);
    window.setTimeout(() => setIntroVisible(false), 700);
  }

  function toggleMenu() {
    setMenuOpen((open) => { if (open) window.setTimeout(() => menuButtonRef.current?.focus(), 50); return !open; });
  }

  return (
    <main id="acasa" className="site-shell">
      {introVisible && <section className={`intro${introLeaving ? ' intro-leaving' : ''}`} aria-label="Intro Dariana și Lucia">
        <video className="intro-media" autoPlay muted playsInline poster="/assets/poster.svg" preload="metadata" aria-hidden="true"><source src="/assets/videos/intro/beauty-hero-higgsfield.mp4" type="video/mp4" /></video>
        <div className="intro-shade" aria-hidden="true" /><div className="intro-center"><Wordmark /><div className="intro-progress" aria-hidden="true"><span /></div></div>
        <button className="intro-skip" type="button" onClick={closeIntro}>Skip intro <span aria-hidden="true">↗</span></button>
      </section>}

      <header className="site-header">
        <a className="header-logo" href="#acasa" aria-label="Dariana și Lucia — Acasă"><Wordmark compact /></a>
        <div className="header-actions"><a className="button button-booking" href="#programare">Programare <span aria-hidden="true">↗</span></a>
          <button ref={menuButtonRef} className={`menu-toggle${menuOpen ? ' is-open' : ''}`} type="button" aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={menuOpen} aria-controls="main-menu" onClick={toggleMenu}><span /><span /><span /></button>
        </div>
      </header>

      <section id="hero" className="hero" aria-labelledby="hero-title">
        <video className="hero-media" autoPlay muted loop playsInline poster="/assets/poster.svg" preload="metadata" aria-hidden="true"><source src="/assets/videos/intro/beauty-hero-higgsfield.mp4" type="video/mp4" /></video>
        <div className="hero-shade" aria-hidden="true" /><div className="hero-orbit hero-orbit-one" aria-hidden="true" /><div className="hero-orbit hero-orbit-two" aria-hidden="true" /><div className="hero-mark" aria-hidden="true"><Monogram /></div>
        <div className="hero-copy"><p className="hero-eyebrow"><span className="eyebrow-line" />{homeContent.eyebrow}</p><h1 id="hero-title">{homeContent.title}</h1><p className="hero-subtitle">{homeContent.subtitle}</p>
          <div className="hero-ctas"><a className="button button-primary" href="#programare">{homeContent.primaryCta} <span aria-hidden="true">↗</span></a><a className="button button-ghost" href="#galerie">{homeContent.secondaryCta} <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="hero-meta"><span>01</span><span className="meta-rule" /><span>Beauty studio</span></div><div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><i /></div>
      </section>

      <aside ref={menuPanelRef} id="main-menu" className={`menu-overlay${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} aria-label="Meniu principal"><div className="menu-backdrop" aria-hidden="true" /><div className="menu-inner"><p className="menu-kicker">The details make the difference <span>✦</span></p><nav><ol>{homeContent.menu.map((item, index) => <li key={item.label} style={{ '--item-index': index } as React.CSSProperties}><span className="menu-index">0{index + 1}</span><a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a></li>)}</ol></nav><div className="menu-footer"><span>Dariana &amp; Lucia Studio</span><span>Est. 2026</span></div></div></aside>
    </main>
  );
}
