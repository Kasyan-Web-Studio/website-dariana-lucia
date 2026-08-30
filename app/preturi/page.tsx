import type { Metadata } from 'next';
import { PageChrome, PageCta } from '@/src/components/PageChrome';
import { PriceCatalog } from '@/src/components/PriceCatalog';
import { pageCopy } from '@/src/data/page-copy';

export const metadata: Metadata = { title: 'Prețuri gene și unghii | Dariana & Lucia', description: 'Vezi tarifele pentru servicii de gene și unghii oferite în Giroc, Timiș.' };

export default function PricesPage() { return <PageChrome><main className="inner-page prices-page"><header className="inner-page-heading"><p className="section-kicker">Dariana &amp; Lucia</p><h1>{pageCopy.prices.title}</h1><p>{pageCopy.prices.intro}</p></header><PriceCatalog /><p className="pricing-note">Prețurile și duratele pot fi actualizate. Confirmarea finală se realizează înainte de programare.</p><PageCta /></main></PageChrome>; }
