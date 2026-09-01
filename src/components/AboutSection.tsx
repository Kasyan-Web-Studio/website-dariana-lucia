import { aboutContent } from '@/src/data/about';
import { contactById } from '@/src/data/contact';
import { siteConfig } from '@/src/data/site-config';

type AboutSectionProps = {
  page?: boolean;
};

export function AboutSection({ page = false }: AboutSectionProps) {
  return (
    <section
      id={page ? undefined : 'despre'}
      className={`about-section${page ? ' about-section-page' : ' about-section-home'}`}
      aria-labelledby={page ? 'about-page-title' : 'about-section-title'}
    >
      <header className={page ? 'inner-page-heading' : 'section-heading about-section-heading'}>
        <p className="section-kicker">Dariana &amp; Lucia</p>
        {page ? <h1 id="about-page-title">{aboutContent.title}</h1> : <h2 id="about-section-title">{aboutContent.title}</h2>}
        <p>{aboutContent.intro}</p>
      </header>

      <div className="specialist-grid" aria-label="Specialiști">
        {aboutContent.specialists.map((specialist) => {
          const contact = contactById[specialist.name.toLowerCase() as 'dariana' | 'lucia'];

          return (
            <article className="specialist-card" key={specialist.name}>
              <p className="specialist-role">{specialist.role}</p>
              <h2>{specialist.name}</h2>
              <p>{specialist.description}</p>
              <p className="card-schedule">{siteConfig.scheduleLabel}</p>
              <div className="card-contact-links">
                <a href={`tel:${contact.phone}`} aria-label={`Sună la ${contact.name}`}>
                  {contact.displayPhone}
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Trimite mesaj pe WhatsApp ${contact.name === 'Dariana' ? 'Darianei' : 'Luciei'}`}
                >
                  WhatsApp
                </a>
              </div>
              <div className="card-actions">
                <a className="button button-outline" href={specialist.serviceHref}>{specialist.serviceLabel}</a>
                <a className="button button-primary" href={specialist.bookingHref}>{specialist.bookingLabel}</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
