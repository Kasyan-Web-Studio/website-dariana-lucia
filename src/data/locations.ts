export type StudioLocation = {
  id: string;
  specialist: 'Dariana' | 'Lucia';
  category: 'gene' | 'unghii';
  serviceLabel: string;
  address: string;
  mapsQuery: string;
};

export const locations: StudioLocation[] = [
  {
    id: 'lashes-location',
    specialist: 'Dariana',
    category: 'gene',
    serviceLabel: 'Gene',
    address: 'Strada Macilor 71A, Giroc, Timiș, România',
    mapsQuery: 'Strada Macilor 71A, Giroc, Timiș, România',
  },
  {
    id: 'nails-location',
    specialist: 'Lucia',
    category: 'unghii',
    serviceLabel: 'Unghii',
    address: 'Strada Mierlei nr. 8, Giroc, Timiș, România',
    mapsQuery: 'Strada Mierlei nr. 8, Giroc, Timiș, România',
  },
];
