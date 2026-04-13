import { events } from '@/lib/events';
import Link from 'next/link';

const ArrowIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="transition-transform group-hover:translate-x-1"
  >
    <path d="m12 19 7-7-7-7"/><path d="M19 12H5"/>
  </svg>
);

export default function Home() {
  const event = events[0];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] relative p-5">
        <h1 className="text-white">No hay eventos.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-fuchsia-500/30 relative p-5 overflow-hidden">
      {/* Background ambient light effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[20%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="w-full max-w-sm z-10 flex flex-col items-center gap-8">
        <div className="text-center space-y-2 mb-4 animate-fade-in">
          <h2 className="text-fuchsia-400 text-sm font-bold tracking-[0.3em] uppercase">Has recibido un mensaje</h2>
          <p className="text-zinc-400 text-xs italic">Toca para abrir la tarjeta de Santiago</p>
        </div>

        <Link 
          href={`/${event.slug}`}
          className="relative group w-full"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600 blur-xl opacity-40 group-hover:opacity-100 transition duration-500"></div>
          
          {/* Preview Card */}
          <div className="relative flex items-center justify-between p-6 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-active:scale-95">
            <div className="flex flex-col gap-1">
              <span className="text-fuchsia-300 text-[10px] font-bold uppercase tracking-wider">Invitación</span>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
                {event.title}
              </h1>
            </div>
            
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-white transition-all duration-300">
              <ArrowIcon />
            </div>
          </div>
        </Link>

        {/* Floating decorative elements */}
        <div className="flex gap-4 opacity-30 mt-4 h-12 items-end">
          <div className="w-1.5 h-full bg-fuchsia-500/50 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1/2 bg-purple-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-3/4 bg-pink-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
