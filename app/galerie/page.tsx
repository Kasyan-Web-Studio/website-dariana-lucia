import type { Metadata } from 'next';
import Link from 'next/link';
import { PageChrome, PageCta } from '@/src/components/PageChrome';
import { galleryItems } from '@/src/data/gallery';
import { pageCopy } from '@/src/data/page-copy';

export const metadata: Metadata = { title: 'Galerie | Dariana & Lucia', description: 'Galerie de lucrări pentru gene și unghii realizate de Dariana și Lucia.' };

export default function GalleryPage() { return <PageChrome><main className="inner-page gallery-page"><header className="inner-page-heading"><p className="section-kicker">Dariana &amp; Lucia</p><h1>{pageCopy.gallery.title}</h1><p>{pageCopy.gallery.intro}</p></header><div className="page-filters" role="group" aria-label="Filtre galerie"><Link className="gallery-filter is-active" href="/galerie">Toate</Link><Link className="gallery-filter" href="/galerie#gene">Gene</Link><Link className="gallery-filter" href="/galerie#unghii">Unghii</Link></div><div className="gallery-grid">{galleryItems.map((item) => <article className={`gallery-card gallery-card-${item.category}`} id={item.id} key={item.id}><div className="gallery-placeholder" aria-label="Fotografie în curând"><span className="gallery-placeholder-icon" aria-hidden="true" /><span>Fotografie în curând</span></div><div className="gallery-card-meta"><span>{item.category === 'gene' ? 'Gene' : 'Unghii'}</span><h2>{item.title}</h2></div></article>)}</div><PageCta /></main></PageChrome>; }
