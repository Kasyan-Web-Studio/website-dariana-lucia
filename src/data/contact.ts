export type ContactPerson = {
  id: 'dariana' | 'lucia';
  name: 'Dariana' | 'Lucia';
  service: 'Gene' | 'Unghii';
  phone: string;
  displayPhone: string;
  whatsapp: string;
  instagram: string | null;
  tiktok: string | null;
};

export const contacts: ContactPerson[] = [
  { id: 'dariana', name: 'Dariana', service: 'Gene', phone: '+40760058240', displayPhone: '0760 058 240', whatsapp: 'https://wa.me/40760058240', instagram: 'https://www.instagram.com/lashesby.dariana28', tiktok: 'https://www.tiktok.com/@lashesby_dariana' },
  { id: 'lucia', name: 'Lucia', service: 'Unghii', phone: '+40762662255', displayPhone: '0762 662 255', whatsapp: 'https://wa.me/40762662255', instagram: null, tiktok: null },
];

export const contactById = Object.fromEntries(contacts.map((contact) => [contact.id, contact])) as Record<ContactPerson['id'], ContactPerson>;
