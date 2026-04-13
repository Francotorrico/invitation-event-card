import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }

  try {
    const eventDate = new Date(dateStr);
    
    // Forzamos la zona horaria a Argentina (Buenos Aires)
    const formattedDate = eventDate.toLocaleDateString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const formattedTime = eventDate.toLocaleTimeString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit',
      minute: '2-digit',
    });

    return NextResponse.json({ formattedDate, formattedTime });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid date string' }, { status: 400 });
  }
}
