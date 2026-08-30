import type { Metadata } from 'next';
import { LegalPage } from '@/src/components/LegalPage';
import { legalCopy } from '@/src/data/legal';

export const metadata: Metadata = { title: 'Politica de cookies | Dariana & Lucia', description: 'Informații provizorii despre cookies pentru site-ul Dariana & Lucia.' };

export default function CookiesPage() { return <LegalPage {...legalCopy.cookies} />; }
