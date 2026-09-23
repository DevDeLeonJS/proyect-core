import React from 'react';
import { Card } from '../components/common/Card';
import { RightSidebar } from '../components/layout/RightSidebar';
import { 
  mockActivities, 
  mockUpcomingClasses, 
  mockCycleProgress
} from '../data/mockData';
import { 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import type { ActiveView } from '../types';

interface DashboardViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  onNavigate 
}) => {
  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - DASHBOARD
   * ============================================================================
   * 1. GET /api/v1/dashboard/summary
   *    Retorna actividades pendientes, vencidas, próximas clases y ciclo actual.
   * 2. GET /api/v1/activities?status=pendiente
   * 3. GET /api/v1/activities?status=vencida
   * 4. GET /api/v1/schedule/today
   * ============================================================================
   */

  const pendingActivities = mockActivities.filter(a => a.estado === 'pendiente');
  const overdueActivities = mockActivities.filter(a => a.estado === 'vencida');
  const topThreeActivities = pendingActivities.slice(0, 3);

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-68px)] bg-white">
      
      {/* =====================================================================
          COLUMNA IZQUIERDA: ÁREA PRINCIPAL BLANCA
         ===================================================================== */}
      <div className="flex-1 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 space-y-10">
        
        {/* 1. TÍTULO "¡Hola Carolina!" */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight">
            ¡Hola Carolina!
          </h1>
        </div>

        {/* 2. ACTIVIDADES PENDIENTES (Título solicitado encima de las cards azules) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#45aec4] rounded-full" />
              <h2 className="text-xl font-extrabold text-[#22304a] tracking-tight">
                Actividades pendientes
              </h2>
            </div>
            <span className="text-xs font-bold text-[#1a5b66] bg-[#b8dcde]/60 px-3 py-1 rounded-full border border-[#9ecfd3]/60">
              {pendingActivities.length} por entregar
            </span>
          </div>

          {/* Grid de Cards azules/celestes con el formato Soft Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThreeActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => onNavigate('actividades')}
                className="group bg-[#b8dcde] rounded-[36px] p-6 shadow-xl shadow-[#b8dcde]/40 hover:shadow-2xl hover:shadow-[#77c7d2]/35 transition-all duration-300 flex flex-col justify-between min-h-[250px] sm:min-h-[270px] cursor-pointer hover:-translate-y-1 border border-white/40"
              >
                {/* Cabecera de la tarjeta */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#1a5b66] bg-white/70 px-3 py-1 rounded-full shadow-2xs tracking-wide">
                      {act.materia}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/80 text-[#1a5b66] flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#113a42] leading-snug line-clamp-2">
                    {act.titulo}
                  </h3>

                  <p className="text-xs text-[#1a5b66]/85 line-clamp-3 leading-relaxed">
                    {act.descripcion}
                  </p>
                </div>

                {/* Pie de la tarjeta */}
                <div className="pt-4 border-t border-[#9ecfd3]/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#113a42] flex items-center gap-1.5 bg-white/50 px-2.5 py-1 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-[#1a5b66]" />
                    {act.fechaLimite}
                  </span>
                  <span className="font-extrabold text-[#113a42] bg-white/70 px-2.5 py-1 rounded-xl">
                    {act.puntosMaximos} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            3. ACTIVIDADES VENCIDAS (Con el MISMO formato que las cards azules de arriba)
           ===================================================================== */}
        {overdueActivities.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-6 bg-[#fed77a] rounded-full" />
                <h2 className="text-xl font-extrabold text-[#22304a] tracking-tight">
                  Actividades vencidas
                </h2>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                {overdueActivities.length} pendientes urgentes
              </span>
            </div>

            {/* Grid con el mismo formato que las cards azules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {overdueActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => onNavigate('actividades')}
                  className="group bg-white/40 rounded-[36px] p-6 shadow-xl shadow-[#b8dcde]/40 hover:shadow-2xl hover:shadow-[#77c7d2]/35 transition-all duration-300 flex flex-col justify-between min-h-[250px] sm:min-h-[270px] cursor-pointer hover:-translate-y-1 border border-white/40">
                  {/* Cabecera */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#1a5b66] bg-white/70 px-3 py-1 rounded-full shadow-2xs tracking-wide">
                        {act.materia}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold text-red-600 bg-white/90 px-2.5 py-0.5 rounded-full shadow-2xs">
                          Vencida
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/80 text-[#1a5b66] flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#113a42] leading-snug line-clamp-2">
                      {act.titulo}
                    </h3>

                    <p className="text-xs text-[#1a5b66]/85 line-clamp-3 leading-relaxed">
                      {act.descripcion}
                    </p>
                  </div>

                  {/* Pie */}
                  <div className="pt-4 border-t border-[#9ecfd3]/60 flex items-center justify-between text-xs">
                    <span className="font-bold text-red-700 flex items-center gap-1.5 bg-white/60 px-2.5 py-1 rounded-xl">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      Límite: {act.fechaLimite}
                    </span>
                    <span className="font-extrabold text-[#113a42] bg-white/70 px-2.5 py-1 rounded-xl">
                      {act.puntosMaximos} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            4. PRÓXIMAS CLASES Y TÉRMINO DE CICLO
           ===================================================================== */}
        <div className="space-y-8 pt-2">
          
          {/* Próximas Clases */}
          <Card className="p-6 border-[#bcdee0]/60">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#bcdee0]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#87b7ff]/20 text-[#22304a] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#2c5eb3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#22304a] text-base">
                    Próximas clases
                  </h3>
                  <p className="text-xs text-[#22304a]/65">
                    Horario asignado para el día de hoy
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('clases')}
                className="text-xs font-bold text-[#45aec4] hover:text-[#22304a] flex items-center gap-1 transition-colors cursor-pointer"
              >
                Ver horario completo <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockUpcomingClasses.map((clase, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-[#edf7f9]/70 hover:bg-[#edf7f9] border border-[#77c7d2]/30 transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-extrabold text-[#22304a] block">
                      {clase.materia}
                    </span>
                    <span className="text-[11px] text-[#22304a]/70 font-medium block mt-0.5">
                      {clase.aula} • {clase.profesor}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-white text-[#22304a] shadow-xs border border-[#bcdee0]/60">
                    {clase.hora}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Término de ciclo */}
          <Card className="p-6 border-[#bcdee0]/60 bg-gradient-to-br from-white via-white to-[#fbfdfe]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#45aec4]">
                  Ciclo Cuatrimestral
                </span>
                <h3 className="text-base font-bold text-[#22304a]">
                  Término de ciclo: {mockCycleProgress.nombreCiclo}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fed77a]/30 text-[#855502] border border-[#fed77a]">
                  Semana {mockCycleProgress.semanaActual} de {mockCycleProgress.totalSemanas}
                </span>
                <span className="text-sm font-extrabold text-[#22304a]">
                  {mockCycleProgress.porcentaje}%
                </span>
              </div>
            </div>

            <div className="w-full bg-[#edf4f7] h-4 rounded-full overflow-hidden p-0.5 border border-[#bcdee0]/50 shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#45aec4] via-[#77c7d2] to-[#fed77a] transition-all duration-700 shadow-xs"
                style={{ width: `${mockCycleProgress.porcentaje}%` }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-[#22304a]/70 font-medium">
              <span>Inicio: Septiembre 2026</span>
              <span className="text-[#45aec4] font-semibold">
                Faltan {mockCycleProgress.diasRestantes} días para el cierre
              </span>
              <span>Cierre: Diciembre 2026</span>
            </div>
          </Card>

        </div>

      </div>

      {/* =====================================================================
          COLUMNA DERECHA: BARRA LATERAL AMARILLA (Más esbelta)
         ===================================================================== */}
      <RightSidebar />

    </div>
  );
};
