import { services, type Service, type ServiceCategory } from '@/src/data/services';
import { contacts } from '@/src/data/contact';
import { locations, type StudioLocation } from '@/src/data/locations';
import { siteConfig } from '@/src/data/site-config';

export type BookingCategory = 'gene' | 'unghii';
export type BookingServiceSelection = { type: 'service'; serviceId: string } | { type: 'unknown'; description: string };
export type BookingFormData = {
  category: BookingCategory | null;
  serviceSelection: BookingServiceSelection | null;
  preferredDate: string;
  preferredTime: string;
  clientName: string;
  clientPhone: string;
  notes: string;
  consent: boolean;
};

export const bookingCategoryToService: Record<BookingCategory, ServiceCategory> = { gene: 'lashes', unghii: 'nails' };
export const bookingCategoryLabel: Record<BookingCategory, string> = { gene: 'Gene', unghii: 'Unghii' };
export const categorySpecialist: Record<BookingCategory, 'Dariana' | 'Lucia'> = { gene: 'Dariana', unghii: 'Lucia' };

export function getServicesForCategory(category: BookingCategory): Service[] { return services.filter((service) => service.category === bookingCategoryToService[category]); }
export function getService(category: BookingCategory, serviceId: string | null): Service | null { return getServicesForCategory(category).find((service) => service.id === serviceId) ?? null; }
export function getLocation(category: BookingCategory): StudioLocation { return locations.find((location) => location.category === category) ?? locations[category === 'gene' ? 0 : 1]; }
export function getContact(category: BookingCategory) { return contacts.find((contact) => contact.id === (category === 'gene' ? 'dariana' : 'lucia')) ?? contacts[0]; }
export function normalizePhone(value: string): string { const digits = value.replace(/\D/g, ''); if (digits.startsWith('00')) return `+${digits.slice(2)}`; if (digits.startsWith('0')) return `+40${digits.slice(1)}`; if (digits.startsWith('40')) return `+${digits}`; return `+${digits}`; }
export function validatePhone(value: string): boolean { const normalized = normalizePhone(value); return /^\+40[0-9]{9}$/.test(normalized); }
export function validateUnknownDescription(value: string): boolean { const normalized = value.trim().replace(/\s+/g, ' '); if (normalized.length < 20 || normalized.length > 800) return false; if (/^[\p{P}\p{S}\s]+$/u.test(normalized)) return false; return !['nu știu', 'habar n-am', 'ajutor', 'gene', 'unghii'].includes(normalized.toLocaleLowerCase('ro-RO')); }
export function getDateBounds() { const today = new Date(); const min = new Date(today.getFullYear(), today.getMonth(), today.getDate()); const max = new Date(min); max.setDate(max.getDate() + 90); const toInput = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; return { min: toInput(min), max: toInput(max) }; }
export function formatBookingDate(value: string): string { if (!value) return 'Nu a fost aleasă'; const [year, month, day] = value.split('-').map(Number); return new Intl.DateTimeFormat('ro-RO', { dateStyle: 'long' }).format(new Date(year, month - 1, day)); }
export function isDateInRange(value: string): boolean { const { min, max } = getDateBounds(); return Boolean(value && value >= min && value <= max); }
export function createTimeSlots() { return Array.from({ length: 21 }, (_, index) => { const totalMinutes = 8 * 60 + index * 30; return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`; }); }
export function formatServicePrice(service: Service): string { return service.priceText ?? (service.price ? `${service.price} lei` : 'Detalii în curs de actualizare'); }
export function formatServiceDuration(service: Service): string { return service.durationMinutes ? `${service.durationMinutes} min` : 'Detalii în curs de actualizare'; }
export function buildWhatsAppMessage(data: BookingFormData): string {
  if (!data.category) return '';
  const category = data.category;
  const contact = getContact(category);
  const location = getLocation(category);
  const selectedService = data.serviceSelection?.type === 'service' ? getService(category, data.serviceSelection.serviceId) : null;
  const isUnknown = data.serviceSelection?.type === 'unknown';
  const unknownDescription = data.serviceSelection?.type === 'unknown' ? data.serviceSelection.description : '';
  const lines = isUnknown ? [
    `Bună, ${contact.name}! Doresc să trimit o cerere de programare pentru ${bookingCategoryLabel[category].toLowerCase()}.`, '',
    'Serviciu:', 'Nu știu ce să aleg', '', 'Descrierea mea:', unknownDescription, '',
    `Data preferată: ${formatBookingDate(data.preferredDate)}`, `Ora preferată: ${data.preferredTime || 'Nu a fost aleasă'}`, '',
  ] : [
    `Bună, ${contact.name}! Doresc să trimit o cerere de programare.`, '',
    `Categorie: ${bookingCategoryLabel[category]}`, `Serviciu: ${selectedService?.name ?? 'Nu a fost ales'}`, `Durată estimată: ${selectedService ? formatServiceDuration(selectedService) : 'Detalii în curs de actualizare'}`, `Preț afișat: ${selectedService ? formatServicePrice(selectedService) : 'Detalii în curs de actualizare'}`, '',
    `Data preferată: ${formatBookingDate(data.preferredDate)}`, `Ora preferată: ${data.preferredTime || 'Nu a fost aleasă'}`, '',
  ];
  lines.push(`Nume: ${data.clientName.trim()}`, `Telefon: ${data.clientPhone.trim()}`, '', 'Observații:', data.notes.trim() || 'Nu au fost adăugate.', '', `Locație:`, location.address, '', `Program: ${siteConfig.scheduleLabel}`, '', isUnknown ? 'Știu că serviciul, data și ora vor fi confirmate ulterior.' : 'Știu că data și ora vor fi confirmate ulterior.');
  return lines.join('\n');
}
