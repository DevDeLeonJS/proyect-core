import React, { useMemo, useState } from 'react';
import { Badge } from '../common/Badge';
import { mockCalendarEvents, mockAnnouncements } from '../../data/mockData';
import type { Announcement } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Clock,
  CalendarCheck,
  AlertCircle,
  Trash2,
  X,
  Bell,
  CalendarDays,
  Info,
} from 'lucide-react';

interface RightSidebarProps {
  onSelectActivity?: (activityTitle: string) => void;
}

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

const getMonthLength = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

// El calendario inicia con la fecha real del equipo y permite volver a ella.
export const RightSidebar: React.FC<RightSidebarProps> = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const daysInMonth = getMonthLength(currentYear, currentMonth);
  // JavaScript inicia la semana en domingo; convertimos a lunes como primer día.
  const startOffset = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const calendarDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const blankDays = Array.from({ length: startOffset }, (_, index) => index);

  const activeEvents = useMemo(
    () => mockCalendarEvents.filter(
      (event) => event.dia === selectedDay && event.mes === currentMonth && event.año === currentYear,
    ),
    [selectedDay, currentMonth, currentYear],
  );

  const daysWithEvents = useMemo(
    () => new Set(
      mockCalendarEvents
        .filter((event) => event.mes === currentMonth && event.año === currentYear)
        .map((event) => event.dia),
    ),
    [currentMonth, currentYear],
  );

  const changeMonth = (amount: number) => {
    const nextDate = new Date(currentYear, currentMonth + amount, 1);
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    setSelectedDay((day) => Math.min(day, getMonthLength(nextYear, nextMonth)));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setSelectedDay(now.getDate());
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((current) => current.filter((announcement) => announcement.id !== id));
    setSelectedAnnouncement((current) => current?.id === id ? null : current);
  };

  const formatSelectedDate = () =>
    new Date(currentYear, currentMonth, selectedDay).toLocaleDateString('es-MX', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

  return (
    <aside className="relative lg:fixed top-0 right-0 z-10 w-full lg:w-[325px] xl:w-[345px] lg:h-screen lg:overflow-y-auto bg-gradient-to-b from-[#18513f] via-[#7fae9b] to-[#f5dfc5] p-4 sm:p-5 lg:pt-28 flex flex-col gap-5 rounded-t-[32px] lg:rounded-none mt-6 lg:mt-0">
      {/* CALENDARIO INTERACTIVO */}
      <section className="bg-[#d8e4d7]/55 backdrop-blur-xl rounded-[32px] p-5 shadow-xl shadow-[#173d31]/25 ring-1 ring-white/55 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#c5e8ec] text-[#2d7d8a] flex items-center justify-center">
              <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <h3 className="font-extrabold text-[#55372d] text-base">Calendario</h3>
          </div>
          <div className="flex items-center gap-1 text-[#55372d] px-1 text-[11px] font-bold">
            <button type="button" onClick={() => changeMonth(-1)} className="hover:bg-white/50 rounded-full p-1 cursor-pointer" title="Mes anterior" aria-label="Mes anterior">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="select-none tracking-tight whitespace-nowrap">{monthNames[currentMonth]} {currentYear}</span>
            <button type="button" onClick={() => changeMonth(1)} className="hover:bg-white/50 rounded-full p-1 cursor-pointer" title="Mes siguiente" aria-label="Mes siguiente">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-2">
          <button type="button" onClick={goToToday} className="text-[10px] font-bold text-[#176b52] hover:bg-white/50 rounded-full px-2.5 py-1 transition-colors">
            Ir a hoy
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[11px] font-bold text-[#55372d]/75 py-0.5">{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {blankDays.map((_, index) => <div key={`blank-${index}`} className="h-8" />)}
          {calendarDays.map((day) => {
            const hasEvent = daysWithEvents.has(day);
            const isSelected = selectedDay === day;
            const todayClass = isToday(day) && !isSelected;
            return (
              <button
                type="button"
                key={day}
                onClick={() => setSelectedDay(day)}
                aria-label={`${day} de ${monthNames[currentMonth]} de ${currentYear}${hasEvent ? ', con eventos' : ''}`}
                aria-pressed={isSelected}
                className={`h-8 w-full rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#176b52] text-white shadow-md font-bold'
                    : todayClass
                      ? 'ring-2 ring-[#176b52] text-[#176b52] bg-white/45'
                      : 'text-[#55372d] hover:bg-white/50'
                }`}
              >
                <span>{day}</span>
                {hasEvent && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#238b68]'}`} />}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#bcdee0]/40">
          <p className="text-[10px] uppercase tracking-wide font-bold text-[#237259] mb-2">
            {formatSelectedDate()}
          </p>
          {activeEvents.length > 0 ? (
            <div className="space-y-2">
              {activeEvents.map((event) => (
                <div key={event.id} className="bg-[#fff8ed] rounded-2xl p-3 border border-white/80 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="w-6 h-6 shrink-0 rounded-xl bg-[#c6dfca] text-[#176b52] flex items-center justify-center">
                        {event.tipo === 'examen' ? <AlertCircle className="w-3.5 h-3.5" /> : <CalendarCheck className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#237259]">{event.tipo}</span>
                        <h4 className="text-xs font-bold text-[#55372d] break-words">{event.titulo}</h4>
                      </div>
                    </div>
                    <Badge size="sm" variant={event.tipo === 'examen' ? 'vencida' : 'pendiente'}>{event.hora}</Badge>
                  </div>
                  {event.materia && <p className="mt-1.5 text-[11px] text-[#55372d]/75">{event.materia}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-3 px-2 bg-[#edf7f9]/50 rounded-2xl border border-dashed border-[#bcdee0]">
              <CalendarDays className="w-4 h-4 mx-auto mb-1 text-[#237259]/70" />
              <p className="text-xs text-[#22304a]/70">No hay eventos para este día</p>
            </div>
          )}
        </div>
      </section>

      {/* AVISOS / NOTIFICACIONES INTERACTIVAS */}
      <section className="bg-[#d8e4d7]/55 backdrop-blur-xl rounded-[32px] p-5 shadow-xl shadow-[#173d31]/25 ring-1 ring-white/55 h-auto shrink-0">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/55">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#f5dfc5] text-[#704638] flex items-center justify-center shadow-sm">
              <Megaphone className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-extrabold text-[#55372d] text-sm sm:text-base">Avisos Escolares</h3>
          </div>
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#176b52] shadow-sm">
            {announcements.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {announcements.map((announcement) => (
            <button
              type="button"
              key={announcement.id}
              onClick={() => setSelectedAnnouncement(announcement)}
              className={`block w-full text-left p-3 rounded-2xl bg-[#f5dfc5]/95 hover:bg-[#fff8ed] border shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#176b52] ${
                selectedAnnouncement?.id === announcement.id ? 'border-[#176b52] ring-1 ring-[#176b52]/30' : 'border-white/70'
              }`}
              aria-label={`Ver detalles de ${announcement.titulo}`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  announcement.categoria === 'Urgente'
                    ? 'bg-[#f4c5b3] text-[#9b3828]'
                    : announcement.categoria === 'Académico'
                      ? 'bg-[#f1d3b5] text-[#704638]'
                      : 'bg-[#f0d6b8] text-[#704638]'
                }`}>{announcement.categoria}</span>
                <span className="text-[10px] text-[#704638]/75 font-medium flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />{announcement.fecha}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#55372d]">{announcement.titulo}</h4>
              <p className="text-[11px] text-[#704638]/85 mt-0.5 line-clamp-2">{announcement.descripcion}</p>
              <span className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#176b52]">
                <Info className="w-3 h-3" /> Ver detalles
              </span>
            </button>
          ))}
          {announcements.length === 0 && (
            <div className="text-center py-5 text-[#55372d]/70">
              <Bell className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs">No tienes avisos</p>
            </div>
          )}
        </div>

        {selectedAnnouncement && (
          <div className="mt-3 p-4 rounded-2xl bg-[#fff8ed] border border-white shadow-sm" role="dialog" aria-label="Detalle de notificación">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#176b52]">Detalle del aviso</span>
                <h4 className="mt-1 text-sm font-extrabold text-[#55372d]">{selectedAnnouncement.titulo}</h4>
              </div>
              <button type="button" onClick={() => setSelectedAnnouncement(null)} className="p-1 rounded-full hover:bg-black/5 text-[#704638]" aria-label="Cerrar detalle">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#704638]">{selectedAnnouncement.descripcion}</p>
            <div className="mt-3 pt-3 border-t border-[#704638]/15 space-y-1 text-[11px] text-[#704638]/80">
              <p><strong>Fecha:</strong> {selectedAnnouncement.fecha}</p>
              <p><strong>Emisor:</strong> {selectedAnnouncement.remitente}</p>
              <p><strong>Categoría:</strong> {selectedAnnouncement.categoria}</p>
            </div>
            <button
              type="button"
              onClick={() => deleteAnnouncement(selectedAnnouncement.id)}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-[#f4c5b3] text-[#8f3024] hover:bg-[#edb29e] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Eliminar notificación
            </button>
          </div>
        )}
      </section>
    </aside>
  );
};