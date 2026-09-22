import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { mockCalendarEvents, mockAnnouncements } from '../../data/mockData';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Megaphone, 
  Clock, 
  CalendarCheck,
  AlertCircle
} from 'lucide-react';

interface RightSidebarProps {
  onSelectActivity?: (activityTitle: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(8); // Septiembre
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedDay, setSelectedDay] = useState<number>(21);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

  const activeEvent = mockCalendarEvents.find(
    (ev) => ev.dia === selectedDay && ev.mes === currentMonth && ev.año === currentYear
  );

  const daysWithEvents = mockCalendarEvents
    .filter((ev) => ev.mes === currentMonth && ev.año === currentYear)
    .map((ev) => ev.dia);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = 30;
  const startOffset = 1; // Martes
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDays = Array.from({ length: startOffset }, (_, i) => i);

  return (
    <aside className="w-full lg:w-[325px] xl:w-[345px] bg-[#fed77a] p-3.5 sm:p-4 flex flex-col gap-4 shrink-0 self-stretch min-h-screen">
      
      {/* 1. TARJETA CALENDARIO (Blanca con esquinas redondeadas exactas a la imagen) */}
      <div className="bg-white rounded-[32px] p-5 shadow-sm flex flex-col justify-between">
        
        {/* Cabecera del Calendario */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#c5e8ec] text-[#2d7d8a] flex items-center justify-center">
              <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <h3 className="font-extrabold text-[#22304a] text-base">
              Calendario
            </h3>
          </div>

          {/* Pastilla Turquesa con Selector de Mes */}
          <div className="flex items-center gap-1 bg-[#62b9cc] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs">
            <button 
              onClick={handlePrevMonth}
              className="hover:opacity-80 transition-opacity cursor-pointer p-0.5"
              title="Mes anterior"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="select-none tracking-tight">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={handleNextMonth}
              className="hover:opacity-80 transition-opacity cursor-pointer p-0.5"
              title="Mes siguiente"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[11px] font-bold text-[#22304a]/50 py-0.5">
              {day}
            </span>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {blankDays.map((_, index) => (
            <div key={`blank-${index}`} className="h-7"></div>
          ))}
          {calendarDays.map((day) => {
            const hasEvent = daysWithEvents.includes(day);
            const isSelected = selectedDay === day;

            return (
              <button
                key={`day-${day}`}
                onClick={() => setSelectedDay(day)}
                className={`h-7 w-full rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#45aec4] text-white shadow-xs font-bold scale-105'
                    : 'text-[#22304a] hover:bg-[#edf7f9]'
                }`}
              >
                <span>{day}</span>
                {hasEvent && (
                  <span 
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isSelected ? 'bg-[#fed77a]' : 'bg-[#45aec4]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Evento activo del día */}
        <div className="mt-4 pt-3.5 border-t border-[#bcdee0]/40">
          {activeEvent ? (
            <div className="bg-[#f5fbfd] rounded-2xl p-3 border border-[#77c7d2]/40 relative shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-xl bg-[#45aec4] text-white flex items-center justify-center">
                    {activeEvent.tipo === 'examen' ? (
                      <AlertCircle className="w-3.5 h-3.5" />
                    ) : (
                      <CalendarCheck className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#45aec4]">
                      {activeEvent.tipo === 'examen' ? 'Examen' : 'Actividad'}
                    </span>
                    <h4 className="text-xs font-bold text-[#22304a]">
                      {activeEvent.titulo}
                    </h4>
                  </div>
                </div>

                <Badge size="sm" variant={activeEvent.tipo === 'examen' ? 'vencida' : 'pendiente'}>
                  {activeEvent.hora}
                </Badge>
              </div>

              {activeEvent.materia && (
                <p className="mt-1.5 text-[11px] text-[#22304a]/75 flex items-center gap-1.5">
                  <span className="font-semibold text-[#22304a]">{activeEvent.materia}</span>
                  <span>•</span>
                  <span>Día {activeEvent.dia}</span>
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-2 bg-[#edf7f9]/50 rounded-2xl border border-dashed border-[#bcdee0]">
              <p className="text-xs text-[#22304a]/60">
                Sin eventos para el día {selectedDay}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 2. TARJETA AVISOS (Se adapta en tamaño según cuántos avisos haya, sin estirarse a lo loco) */}
      <div className="bg-white rounded-[32px] p-5 shadow-sm h-auto shrink-0">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#bcdee0]/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#fed77a]/30 text-[#855502] flex items-center justify-center">
              <Megaphone className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-extrabold text-[#22304a] text-sm sm:text-base">
              Avisos Escolares
            </h3>
          </div>
          <span className="text-xs font-bold text-[#45aec4] bg-[#edf7f9] px-2 py-0.5 rounded-full">
            {mockAnnouncements.length}
          </span>
        </div>

        {/* Lista dinámica de avisos que define la altura exacta de la tarjeta */}
        <div className="space-y-2.5">
          {mockAnnouncements.map((announcement) => (
            <div 
              key={announcement.id}
              className="p-3 rounded-2xl bg-[#fafcfd] hover:bg-[#edf7f9] border border-[#bcdee0]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  announcement.categoria === 'Urgente' 
                    ? 'bg-red-50 text-red-700' 
                    : announcement.categoria === 'Académico'
                    ? 'bg-[#eff5ff] text-[#2c5eb3]'
                    : 'bg-[#fff9eb] text-[#855502]'
                }`}>
                  {announcement.categoria}
                </span>
                <span className="text-[10px] text-[#22304a]/60 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {announcement.fecha}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#22304a]">
                {announcement.titulo}
              </h4>
              <p className="text-[11px] text-[#22304a]/75 mt-0.5 line-clamp-2">
                {announcement.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
