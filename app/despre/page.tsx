import { AboutSection } from '@/src/components/AboutSection';
import { PageChrome } from '@/src/components/PageChrome';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Despre noi | Dariana & Lucia', description: 'Află mai multe despre Dariana, Lash Artist, și Lucia, Nail Artist, și serviciile lor din Giroc, Timiș.' };

export default function AboutPage() { return <PageChrome><main className="inner-page about-page"><AboutSection page /></main></PageChrome>; }
