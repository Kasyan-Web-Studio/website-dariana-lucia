export type GalleryCategory = 'gene' | 'unghii';

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  image: string | null;
  alt: string;
  title: string;
  service: string;
  specialist: 'Dariana' | 'Lucia';
  featured: boolean;
  order: number;
};

export const galleryItems: GalleryItem[] = [
  { id: 'lashes-01', category: 'gene', image: null, alt: '', title: 'Lucrare gene', service: '', specialist: 'Dariana', featured: true, order: 1 },
  { id: 'lashes-02', category: 'gene', image: null, alt: '', title: 'Lucrare gene', service: '', specialist: 'Dariana', featured: true, order: 2 },
  { id: 'lashes-03', category: 'gene', image: null, alt: '', title: 'Lucrare gene', service: '', specialist: 'Dariana', featured: true, order: 3 },
  { id: 'nails-01', category: 'unghii', image: null, alt: '', title: 'Lucrare unghii', service: '', specialist: 'Lucia', featured: true, order: 1 },
  { id: 'nails-02', category: 'unghii', image: null, alt: '', title: 'Lucrare unghii', service: '', specialist: 'Lucia', featured: true, order: 2 },
  { id: 'nails-03', category: 'unghii', image: null, alt: '', title: 'Lucrare unghii', service: '', specialist: 'Lucia', featured: true, order: 3 },
];

export const featuredGalleryItems = galleryItems.filter((item) => item.featured).sort((a, b) => a.order - b.order);
