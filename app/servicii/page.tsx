import type { Metadata } from 'next';
import { PageChrome, PageCta } from '@/src/components/PageChrome';
import { ServiceCatalog } from '@/src/components/ServiceCatalog';
import { pageCopy } from '@/src/data/page-copy';

export const metadata: Metadata = { title: 'Servicii gene și unghii | Dariana & Lucia', description: 'Descoperă servicii pentru gene și unghii realizate de Dariana și Lucia în Giroc, Timiș.' };

export default function ServicesPage() { return <PageChrome><main className="inner-page services-page"><header className="inner-page-heading"><p className="section-kicker">Dariana &amp; Lucia</p><h1>{pageCopy.services.title}</h1><p>{pageCopy.services.intro}</p></header><ServiceCatalog /><PageCta /></main></PageChrome>; }
