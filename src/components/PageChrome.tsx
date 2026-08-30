'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contacts } from '@/src/data/contact';
import { homeContent } from '@/src/data/home';
import { locations } from '@/src/data/locations';
import { siteConfig } from '@/src/data/site-config';

function ContactSummary() {
  return <div className="footer-details">{contacts.map((contact) => { const location = locations.find((item) => item.category === (contact.id === 'dariana' ? 'gene' : 'unghii')); return <article key={contact.id}><strong>{contact.name}</strong><span>{contact.service}</span>{location && <address>{location.address}</address>}<small>Program zilnic: {siteConfig.scheduleLabel}</small><a href={`tel:${contact.phone}`} aria-label={`Sună la ${contact.name}`}>{contact.displayPhone}</a><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Trimite mesaj pe WhatsApp ${contact.name === 'Dariana' ? 'Darianei' : 'Luciei'}`}>WhatsApp</a>{contact.instagram && <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Deschide profilul Instagram al ${contact.name}`}>Instagram</a>}{contact.tiktok && <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" aria-label={`Deschide profilul TikTok al ${contact.name}`}>TikTok</a>}</article>; })}</div>;
}

export function PageChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    if (!menuOpen) {
      menuButtonRef.current?.focus();
      return () => document.body.classList.remove('menu-is-open');
    }
    const firstLink = menuPanelRef.current?.querySelector<HTMLElement>('a');
    firstLink?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return; }
      if (event.key !== 'Tab' || !menuPanelRef.current) return;
      const focusable = Array.from(menuPanelRef.current.querySelectorAll<HTMLElement>('a, button'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.classList.remove('menu-is-open'); };
  }, [menuOpen]);

  return <div className="page-shell"><header className="site-header page-header"><Link className="header-logo" href="/" aria-label="Dariana și Lucia — Acasă"><img src="/assets/brand/logo-gold-woman-v1.png?v=1" alt="Dariana & Lucia — Nails & Lashes" /></Link><button ref={menuButtonRef} className={`menu-toggle${menuOpen ? ' is-open' : ''}`} type="button" aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={menuOpen} aria-controls="page-menu" onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button></header>{children}<aside ref={menuPanelRef} id="page-menu" className={`menu-overlay${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} aria-modal="true" aria-label="Meniu principal"><div className="menu-backdrop" aria-hidden="true" onClick={closeMenu} /><div className="menu-inner"><img className="brand-logo brand-logo-mark menu-logo" src="/assets/brand/logo-gold-woman-v1.png?v=1" alt="Dariana & Lucia" /><p className="menu-kicker">The details make the difference <span>✦</span></p><nav><ol>{homeContent.menu.map((item, index) => <li key={item.label}><span className="menu-index">0{index + 1}</span><a href={item.href} aria-current={item.href === pathname || (item.href === '/' && pathname === '/') ? 'page' : undefined} onClick={closeMenu}>{item.label}</a></li>)}</ol></nav><div className="menu-footer"><span>Dariana &amp; Lucia Studio</span><span>Est. 2026</span></div></div></aside><footer className="site-footer"><img className="brand-logo brand-logo-no-slogan" src="/assets/brand/logo-gold-woman-v1.png?v=1" alt="Dariana & Lucia — Lashes & Nails Studio" /><p>Beauty, shaped in every detail.</p><ContactSummary /></footer></div>;
}

export function PageCta() { return <section className="page-cta" aria-labelledby="page-cta-title"><h2 id="page-cta-title">Alege serviciul potrivit pentru tine</h2><p>Continuă către programare și selectează serviciul dorit.</p><div className="pre-footer-actions"><a className="button button-primary" href="/programare?categorie=gene">Programare gene <span aria-hidden="true">↗</span></a><a className="button button-primary" href="/programare?categorie=unghii">Programare unghii <span aria-hidden="true">↗</span></a></div></section>; }
