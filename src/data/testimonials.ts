export type Testimonial = {
  id: string;
  name: string | null;
  service: string;
  specialist: string;
  rating: number | null;
  text: string | null;
  date: string | null;
  approved: boolean;
  featured: boolean;
};

export const testimonials: Testimonial[] = [
  { id: 'testimonial-01', name: null, service: 'Gene', specialist: 'Dariana', rating: null, text: null, date: null, approved: false, featured: true },
  { id: 'testimonial-02', name: null, service: 'Unghii', specialist: 'Lucia', rating: null, text: null, date: null, approved: false, featured: true },
  { id: 'testimonial-03', name: null, service: 'Experiență personalizată', specialist: '', rating: null, text: null, date: null, approved: false, featured: true },
];
