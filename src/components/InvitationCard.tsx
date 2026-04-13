"use client";

import React, { useState, useEffect } from 'react';
import { EventData, generateGoogleCalendarUrl } from '@/lib/events';

interface Props {
  event: EventData;
}

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

export default function InvitationCard({ event }: Props) {
  const gcalUrl = generateGoogleCalendarUrl(event);
  const [timeData, setTimeData] = useState({
    formattedDate: 'Cargando...',
    formattedTime: '...'
  });
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    const target = new Date(event.date).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  useEffect(() => {
    async function fetchArgentinaTime() {
      try {
        const res = await fetch(`/api/time?date=${encodeURIComponent(event.date)}`);
        if (res.ok) {
          const data = await res.json();
          setTimeData({
            formattedDate: data.formattedDate,
            formattedTime: data.formattedTime
          });
        }
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    }
    fetchArgentinaTime();
  }, [event.date]);

  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto flex flex-col gap-2 z-10">
      {/* Countdown Badge / Message */}
      <div className="self-end animate-fade-in px-1">
        {timeLeft ? (
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-xl shadow-lg flex items-center gap-2">
            <span className="text-[9px] lg:text-[11px] uppercase tracking-widest text-fuchsia-400 font-bold">Faltan</span>
            <div className="flex gap-1.5 text-white font-mono text-[10px] lg:text-sm">
              <div className="flex items-baseline gap-0.5">
                <span className="font-bold">{timeLeft.d}</span>
                <span className="text-[8px] text-zinc-400 uppercase">d</span>
              </div>
              <span className="text-zinc-500">:</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-bold">{timeLeft.h.toString().padStart(2, '0')}</span>
                <span className="text-[8px] text-zinc-400 uppercase">h</span>
              </div>
              <span className="text-zinc-500">:</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-bold">{timeLeft.m.toString().padStart(2, '0')}</span>
                <span className="text-[8px] text-zinc-400 uppercase">m</span>
              </div>
              <span className="text-zinc-500">:</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-bold text-fuchsia-400">{timeLeft.s.toString().padStart(2, '0')}</span>
                <span className="text-[8px] text-zinc-400 uppercase">s</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-1.5 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-white/20 animate-pulse">
            <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white font-black stroke-black">
              ¡Hoy es mi Cumple! 🎂🎉
            </span>
          </div>
        )}
      </div>

      <div className="relative group w-full transform transition-all duration-500 hover:scale-[1.01]">
        {/* Glow Effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600 blur-xl opacity-40 group-hover:opacity-80 transition duration-1000"></div>

        {/* Glassmorphism Card — vertical padding stays compact always */}
        <div className="relative flex flex-col p-4 sm:p-5 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500"></div>

          <div className="flex flex-col items-center text-center space-y-1.5 mb-4">
            <div className="inline-block px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-fuchsia-300 text-[9px] lg:text-xs font-semibold tracking-[0.2em] uppercase">
              Estás Invitado
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 leading-tight drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              {event.title}
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed font-light">
              {event.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-zinc-200 mb-4 w-full">
            <div className="flex items-center gap-3 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
              <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/20 shrink-0">
                <CalendarIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] lg:text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Día</span>
                <span className="font-medium capitalize text-xs sm:text-sm lg:text-base xl:text-lg">{timeData.formattedDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
              <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/20 shrink-0">
                <ClockIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] lg:text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Hora</span>
                <span className="font-medium text-xs sm:text-sm lg:text-base xl:text-lg">{timeData.formattedTime} </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
              <div className="p-1.5 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/20 shrink-0">
                <MapPinIcon />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] lg:text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Ubicación</span>
                <span className="font-medium text-xs sm:text-sm lg:text-base xl:text-lg leading-tight">{event.address}</span>
              </div>
            </div>
          </div>

          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-fuchsia-600 bg-[length:200%_auto] text-white font-bold text-sm lg:text-base xl:text-lg transition-all duration-300 hover:bg-[position:right_center] hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] active:scale-95"
          >
            <CalendarIcon />
            <span>Agendar Evento</span>
          </a>
        </div>
      </div>
    </div>
  );
}
