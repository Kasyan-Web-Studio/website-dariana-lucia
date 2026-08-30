import type { Metadata } from 'next';
import { LegalPage } from '@/src/components/LegalPage';
import { legalCopy } from '@/src/data/legal';

export const metadata: Metadata = { title: 'Politica de confidențialitate | Dariana & Lucia', description: 'Informații provizorii despre confidențialitate pentru site-ul Dariana & Lucia.' };

export default function PrivacyPage() { return <LegalPage {...legalCopy.privacy} />; }
