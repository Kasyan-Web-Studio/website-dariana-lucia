import Link from 'next/link';
import { PageChrome } from '@/src/components/PageChrome';

export default function NotFound() { return <PageChrome><main className="not-found-page"><p className="section-kicker">Dariana &amp; Lucia</p><h1>Pagina nu a fost găsită</h1><p>Pagina pe care o cauți nu există sau a fost mutată.</p><div className="not-found-actions"><Link className="button button-primary" href="/">Înapoi acasă <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/servicii">Vezi serviciile <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/programare">Programează-te <span aria-hidden="true">↗</span></Link></div></main></PageChrome>; }
