import type { Metadata } from 'next';
import Link from 'next/link';
import { galleryItems } from '@/src/data/gallery';

export const metadata: Metadata = {
  title: 'Galerie | Dariana & Lucia',
  description: 'Galerie de lucrări pentru gene și unghii realizate de Dariana și Lucia în Giroc, Timiș.',
};

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <Link className="gallery-back" href="/">← Înapoi la acasă</Link>
      <header className="gallery-page-heading">
        <p className="section-kicker">Dariana &amp; Lucia</p>
        <h1>Lucrările noastre</h1>
        <p>Detalii atent realizate, rezultate care vorbesc de la sine.</p>
      </header>
      <div className="gallery-filters" aria-label="Filtre galerie">
        <a className="gallery-filter is-active" href="#toate">Toate</a>
        <a className="gallery-filter" href="#gene">Gene</a>
        <a className="gallery-filter" href="#unghii">Unghii</a>
      </div>
      <div className="gallery-grid" id="toate">
        {galleryItems.map((item) => (
          <article className={`gallery-card gallery-card-${item.category}`} id={item.id} key={item.id}>
            <div className="gallery-placeholder" aria-label="Fotografie în curând">
              <span className="gallery-placeholder-icon" aria-hidden="true" />
              <span>Fotografie în curând</span>
            </div>
            <div className="gallery-card-meta">
              <span>{item.category === 'gene' ? 'Gene' : 'Unghii'}</span>
              <h2>{item.title}</h2>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
