export type GalleryCategory = 'gene' | 'unghii';

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  image: string | null;
  alt: string;
  title: string;
  service: string;
  effectLabel?: string;
  specialist: 'Dariana' | 'Lucia';
  featured: boolean;
  order: number;
};

export const galleryItems: GalleryItem[] = [
  { id: 'lashes-01', category: 'gene', image: '/assets/gallery/gene/gene-1d-2d-natural-classic.jpeg', alt: 'Extensii gene 1D–2D, efect Natural / Classic', title: 'Extensii gene 1D–2D', service: 'Natural / Classic', effectLabel: '1D–2D · Natural / Classic', specialist: 'Dariana', featured: true, order: 1 },
  { id: 'lashes-02', category: 'gene', image: '/assets/gallery/gene/gene-3d-4d-cat-eye-foxy.jpeg', alt: 'Extensii gene 3D–4D, efect Cat Eye / Foxy', title: 'Extensii gene 3D–4D', service: 'Cat Eye / Foxy', effectLabel: '3D–4D · Cat Eye / Foxy', specialist: 'Dariana', featured: true, order: 2 },
  { id: 'lashes-03', category: 'gene', image: '/assets/gallery/gene/gene-5d-doll-eye-open-eye.jpeg', alt: 'Extensii gene 5D, efect Doll Eye / Open Eye cu volum', title: 'Extensii gene 5D', service: 'Doll Eye / Open Eye, cu volum', effectLabel: '5D · Doll Eye / Open Eye, cu volum', specialist: 'Dariana', featured: true, order: 3 },
  { id: 'nails-01', category: 'unghii', image: null, alt: '', title: 'Lucrare unghii', service: '', specialist: 'Lucia', featured: true, order: 1 },
  { id: 'nails-02', category: 'unghii', image: null, alt: '', title: 'Lucrare unghii', service: '', specialist: 'Lucia', featured: true, order: 2 },
  { id: 'nails-03', category: 'unghii', image: null, alt: '', title: 'Lucrare unghii', service: '', specialist: 'Lucia', featured: true, order: 3 },
];

export const featuredGalleryItems = galleryItems.filter((item) => item.featured).sort((a, b) => a.order - b.order);
