'use client';

import { useEffect, useRef, useState } from 'react';
import { homeContent } from '@/src/data/home';
import { featuredGalleryItems, type GalleryCategory } from '@/src/data/gallery';
import { testimonials } from '@/src/data/testimonials';
import { locations } from '@/src/data/locations';
import { contacts } from '@/src/data/contact';
import { siteConfig } from '@/src/data/site-config';

const introDuration = 5000;

function BrandLogo({ variant, alt, className = '' }: { variant: 'intro' | 'mark' | 'no-slogan' | 'light'; alt: string; className?: string }) {
  const files = { intro: 'logo-dl-black-gold-v1.png?v=2', mark: 'logo-dl-black-gold-v1.png?v=2', 'no-slogan': 'logo-dl-black-gold-v1.png?v=2', light: 'logo-dl-black-gold-v1.png?v=2' };
  return <img className={`brand-logo brand-logo-${variant} ${className}`} src={`/assets/brand/${files[variant]}`} alt={alt} />;
}

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const [videoMounted, setVideoMounted] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'toate' | GalleryCategory>('toate');
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
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const visibleGalleryItems = galleryFilter === 'toate'
    ? featuredGalleryItems
    : featuredGalleryItems.filter((item) => item.category === galleryFilter);

  return (
    <main id="acasa" className={`site-shell${introVisible ? ' intro-active' : ''}`}>
      {introVisible && <section className={`intro${introLeaving ? ' intro-leaving' : ''}`} aria-label="Intro Dariana și Lucia">
        {videoMounted && <video ref={introVideoRef} className={`intro-media${videoReady ? ' intro-video-ready' : ''}${videoFading ? ' intro-video-fading' : ''}`} autoPlay muted playsInline preload="auto" onLoadedData={handleVideoReady} onCanPlay={handleVideoReady} aria-hidden="true"><source src="/assets/videos/intro/beauty-hero-higgsfield.mp4" type="video/mp4" /></video>}
        <div className="intro-shade" aria-hidden="true" /><div className="intro-center"><BrandLogo variant="intro" alt="Dariana & Lucia — Lashes & Nails Studio" /><div className="intro-progress" aria-hidden="true"><span /></div></div>
      </section>}

      <header className={`site-header${headerScrolled ? ' header-scrolled' : ''}`}>
        <a className="header-logo" href="#acasa" aria-label="Dariana și Lucia — Acasă"><picture><source media="(max-width: 699px)" srcSet="/assets/brand/logo-dl-black-gold-v1.png?v=2" /><img src="/assets/brand/logo-dl-black-gold-v1.png?v=2" alt="Dariana & Lucia — Nails & Lashes" /></picture></a>
        <div className="header-actions">
          <button ref={menuButtonRef} className={`menu-toggle${menuOpen ? ' is-open' : ''}`} type="button" aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={menuOpen} aria-controls="main-menu" onClick={toggleMenu}><span /><span /><span /></button>
        </div>
      </header>

      <section id="hero" className={`split-hero${heroReady ? ' hero-ready' : ''}`} aria-label="Alege serviciul dorit"><div className="split-panel split-panel-lashes"><a href="/programare?categorie=gene" aria-label="Programează-te pentru gene cu Dariana"><div className="split-image-frame"><img className="split-panel-image" src="/assets/beauty/lashes-eye-cutout.png" alt="Ochi cu gene accentuate" /></div><div className="split-panel-content"><p className="split-kicker">Cu Dariana</p><h1>GENE</h1><p>Extensii, laminare și efecte personalizate.</p><span className="split-link">Programează-te pentru gene <b aria-hidden="true">↗</b></span></div></a></div><div className="split-divider" aria-hidden="true" /><div className="split-panel split-panel-nails"><a href="/programare?categorie=unghii" aria-label="Programează-te pentru unghii cu Lucia"><div className="split-image-frame"><img className="split-panel-image" src="/assets/beauty/nails-hand-cutout.png" alt="Mână cu unghii îngrijite" /></div><div className="split-panel-content"><p className="split-kicker">Cu Lucia</p><h1>UNGHII</h1><p>Manichiură, întreținere și design personalizat.</p><span className="split-link">Programează-te pentru unghii <b aria-hidden="true">↗</b></span></div></a></div></section>

      <section id="despre" className="studio-intro" aria-labelledby="studio-intro-title"><div className="section-copy"><h2 id="studio-intro-title">Precizie care se simte, stil care rămâne.</h2><p>Un spațiu creat pentru momentele în care frumusețea devine timp pentru tine. Fiecare formă, textură și finisaj este ales cu grijă.</p><a className="text-link" href="#servicii">Descoperă serviciile <span aria-hidden="true">↗</span></a><ul className="benefit-list"><li><span className="benefit-icon benefit-icon-detail" aria-hidden="true" /><div><strong>Atenție la detalii</strong><small>Fiecare finisaj este atent lucrat.</small></div></li><li><span className="benefit-icon benefit-icon-premium" aria-hidden="true" /><div><strong>Produse premium</strong><small>Texturi și formule alese cu grijă.</small></div></li><li><span className="benefit-icon benefit-icon-custom" aria-hidden="true" /><div><strong>Rezultate personalizate</strong><small>Un look creat pentru tine.</small></div></li></ul></div></section>

      <section id="servicii" className="services-preview" aria-labelledby="services-title"><div className="services-heading"><h2 id="services-title">Ritualuri create pentru tine.</h2></div><div className="service-list"><article><div className="service-icon service-icon-lashes" aria-hidden="true" /><h3>Gene</h3><p>Privire definită, proporții naturale și un rezultat care te reprezintă.</p></article><article><div className="service-icon service-icon-nails" aria-hidden="true" /><h3>Unghii</h3><p>Forme curate, nuanțe atent alese și detalii care completează fiecare gest.</p></article><article><div className="service-icon service-icon-experience" aria-hidden="true" /><h3>Experiență personalizată</h3><p>Un ritual creat pentru tine, de la prima inspirație până la ultimul detaliu.</p></article></div></section>

      <section id="galerie" className="gallery-preview" aria-labelledby="gallery-title"><div className="section-heading"><p className="section-kicker">Preview</p><h2 id="gallery-title">Lucrările noastre</h2><p>Detalii atent realizate, rezultate care vorbesc de la sine.</p></div><div className="gallery-filters" role="group" aria-label="Filtre galerie"><button className={`gallery-filter${galleryFilter === 'toate' ? ' is-active' : ''}`} type="button" onClick={() => setGalleryFilter('toate')} aria-pressed={galleryFilter === 'toate'}>Toate</button><button className={`gallery-filter${galleryFilter === 'gene' ? ' is-active' : ''}`} type="button" onClick={() => setGalleryFilter('gene')} aria-pressed={galleryFilter === 'gene'}>Gene</button><button className={`gallery-filter${galleryFilter === 'unghii' ? ' is-active' : ''}`} type="button" onClick={() => setGalleryFilter('unghii')} aria-pressed={galleryFilter === 'unghii'}>Unghii</button></div><div className="gallery-grid">{visibleGalleryItems.map((item) => <article className={`gallery-card gallery-card-${item.category}`} key={item.id}><div className="gallery-placeholder" aria-label="Fotografie în curând"><span className="gallery-placeholder-icon" aria-hidden="true" /><span>Fotografie în curând</span></div><div className="gallery-card-meta"><span>{item.category === 'gene' ? 'Gene' : 'Unghii'}</span><h3>{item.title}</h3></div></article>)}</div><a className="button button-outline gallery-more" href="/galerie">Vezi galeria completă <span aria-hidden="true">↗</span></a></section>

      <section id="recenzii" className="testimonials-section" aria-labelledby="testimonials-title"><div className="section-heading"><p className="section-kicker">Feedback</p><h2 id="testimonials-title">Ce spun clientele noastre</h2><p>Experiențe construite cu grijă, precizie și atenție la fiecare detaliu.</p></div><div className="testimonials-grid">{testimonials.filter((item) => item.featured).map((item) => <article className="testimonial-card" key={item.id}><span className="testimonial-mark" aria-hidden="true">“</span><p className="testimonial-placeholder">{item.approved && item.text ? item.text : 'Testimonial în curând'}</p><p className="testimonial-note">{item.approved && item.text ? `${item.service} · ${item.name ?? ''}` : 'Recenzie clientă · Conținutul va fi adăugat după primirea recenziilor reale'}</p></article>)}</div></section>

      <section id="contact" className="locations-section" aria-labelledby="locations-title"><div className="section-heading"><p className="section-kicker">Găsește-ne</p><h2 id="locations-title">Unde ne găsești</h2><p>Alege locația potrivită serviciului dorit.</p></div><div className="locations-grid">{locations.map((location) => <article className={`location-card location-card-${location.category}`} key={location.id}><span className="location-icon" aria-hidden="true" /><p className="location-specialist">{location.specialist}</p><h3>{location.serviceLabel}</h3><address>{location.address}</address><p className="location-schedule">{siteConfig.scheduleLabel}</p><a className="location-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`} target="_blank" rel="noopener noreferrer" aria-label={`Deschide locația pentru ${location.category} cu ${location.specialist} în Google Maps`}>Deschide în Google Maps <span aria-hidden="true">↗</span></a></article>)}</div><p className="locations-note">Programările se realizează în locații diferite.</p></section>

      <section className="pre-footer-cta" aria-labelledby="pre-footer-title"><h2 id="pre-footer-title">Pregătită pentru următorul tău look?</h2><p>Alege serviciul dorit și continuă direct către programare.</p><div className="pre-footer-actions"><a className="button button-primary" href="/programare?categorie=gene">Programare gene <span aria-hidden="true">↗</span></a><a className="button button-primary" href="/programare?categorie=unghii">Programare unghii <span aria-hidden="true">↗</span></a></div></section>

      <aside ref={menuPanelRef} id="main-menu" className={`menu-overlay${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} aria-label="Meniu principal"><div className="menu-backdrop" aria-hidden="true" /><div className="menu-inner"><BrandLogo variant="mark" alt="DL" className="menu-logo" /><p className="menu-kicker">The details make the difference <span>✦</span></p><nav><ol>{homeContent.menu.map((item, index) => <li key={item.label} style={{ '--item-index': index } as React.CSSProperties}><span className="menu-index">0{index + 1}</span><a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a></li>)}</ol></nav><div className="menu-footer"><span>Dariana &amp; Lucia Studio</span><span>Est. 2026</span></div></div></aside>
      <footer className="site-footer"><BrandLogo variant="no-slogan" alt="Dariana & Lucia — Lashes & Nails Studio" /><p>Beauty, shaped in every detail.</p><p className="footer-schedule">{siteConfig.scheduleLabel}</p><div className="footer-contacts">{contacts.map((contact) => <div key={contact.id}><strong>{contact.name}</strong><span>{contact.service}</span><a href={`tel:${contact.phone}`} aria-label={`Sună la ${contact.name}`}>{contact.displayPhone}</a></div>)}</div></footer>
    </main>
  );
}
