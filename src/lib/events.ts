export interface EventData {
  slug: string;
  title: string;
  date: string;
  address: string;
  description: string;
}

export const events: EventData[] = [
  {
    slug: 'cumple-santiago',
    title: 'Mis 18 Años! 🎉',
    date: '2026-04-18T00:00:00Z',
    address: 'Eva Perón 1590, Presidente Derqui',
    description: '¡Preparate para la mejor noche! Habrá música, drinks y mucha fiesta. ¡No podés faltar, te espero para celebrar juntos!',
  }
];

export function getEventBySlug(slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug);
}

export function generateGoogleCalendarUrl(event: EventData): string {
  // Format dates for Google Calendar: YYYYMMDDTHHmmssZ
  const startDate = new Date(event.date);
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000); // Add 6 hours for party duration

  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.address,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
