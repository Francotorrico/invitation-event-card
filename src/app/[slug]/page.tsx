import { events, getEventBySlug } from '@/lib/events';
import InvitationCard from '@/components/InvitationCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-fuchsia-500/30 relative p-5 overflow-x-hidden">
      {/* Back Button - Subtle */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 p-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 group shadow-lg"
        aria-label="Volver"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </Link>

      {/* Background ambient light effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[20%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="w-full flex flex-col items-center justify-center min-h-[calc(100dvh-40px)] z-10">
        <main className="w-full flex flex-col items-center my-auto py-2">
          <InvitationCard event={event} />
        </main>
      </div>
    </div>
  );
}

// Optional: Generar rutas estáticas para rendimiento
export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}
