import type { ReactNode } from 'react';
import { PageChrome, PageCta } from './PageChrome';

type LegalSection = { title: string; text: string };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: readonly LegalSection[] }): ReactNode {
  return <PageChrome><main className="inner-page legal-page"><header className="inner-page-heading"><p className="section-kicker">Dariana &amp; Lucia</p><h1>{title}</h1><p>{intro}</p></header><section className="legal-content" aria-label={title}>{sections.map((section) => <article className="legal-card" key={section.title}><h2>{section.title}</h2><p>{section.text}</p></article>)}</section><PageCta /></main></PageChrome>;
}
