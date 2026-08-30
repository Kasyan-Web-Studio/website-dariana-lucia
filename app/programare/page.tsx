'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BookingPage() {
  const [category, setCategory] = useState<'gene' | 'unghii'>('gene');
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('categorie') !== 'unghii') return;
    const timer = window.setTimeout(() => setCategory('unghii'), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const specialist = category === 'unghii' ? 'Lucia' : 'Dariana';
  const label = category === 'unghii' ? 'unghii' : 'gene';

  return <main className="booking-page"><Link className="booking-back" href="/">← Înapoi la acasă</Link><div className="booking-card"><p className="section-kicker">Programare</p><h1>Programare {label} cu {specialist}</h1><p>Categoria și specialistul au fost preselectate. Următorul pas este alegerea serviciului potrivit.</p><div className="booking-selection"><span>Categorie</span><strong>{label}</strong><span>Specialist</span><strong>{specialist}</strong></div><button className="button button-primary" type="button">Alege serviciul <span aria-hidden="true">↗</span></button></div></main>;
}
