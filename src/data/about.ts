export const aboutContent = {
  status: 'draft',
  title: 'Despre noi',
  intro: 'Două specializări, aceeași atenție pentru detalii. Dariana și Lucia creează experiențe personalizate pentru gene și unghii, într-un stil modern, elegant și atent adaptat fiecărei cliente.',
  specialists: [
    { name: 'Dariana', role: 'Lash Artist', description: 'Dariana este specializată în extensii de gene, laminare și efecte personalizate. Pune accent pe proporții armonioase, confort și rezultate adaptate fizionomiei fiecărei cliente.', serviceHref: '/servicii?categorie=gene', serviceLabel: 'Vezi serviciile pentru gene', bookingHref: '/programare?categorie=gene', bookingLabel: 'Programează-te cu Dariana' },
    { name: 'Lucia', role: 'Nail Artist', description: 'Lucia realizează manichiură, întreținere și design personalizat, cu atenție la formă, rezistență și finisaje. Fiecare lucrare este adaptată stilului și preferințelor clientei.', serviceHref: '/servicii?categorie=unghii', serviceLabel: 'Vezi serviciile pentru unghii', bookingHref: '/programare?categorie=unghii', bookingLabel: 'Programează-te cu Lucia' },
  ],
  values: [
    { title: 'Atenție la detalii', description: 'Fiecare etapă este lucrată cu răbdare și precizie.' },
    { title: 'Igienă și produse atent alese', description: 'Un standard atent pentru confort și încredere.' },
    { title: 'Rezultate personalizate', description: 'Un rezultat construit în jurul stilului tău.' },
  ],
} as const;
