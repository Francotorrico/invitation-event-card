import { events } from '@/lib/events';
import InvitationCard from '@/components/InvitationCard';

export default function Home() {
  // Mostramos el evento principal (o el primero que exista) directamente en la raíz
  const event = events[0];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>
        <div className="relative text-center z-10 bg-black/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-500 mb-4 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">404</h1>
          <p className="text-zinc-400 text-lg font-medium">No hay invitaciones disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#050505] font-sans selection:bg-fuchsia-500/30 relative p-5 overflow-x-hidden">
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
