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
    <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-68px)] bg-[#eef1e8]">
      
      {/* =====================================================================
          COLUMNA IZQUIERDA: ÁREA PRINCIPAL BLANCA
         ===================================================================== */}
      <div className="flex-1 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 space-y-9">
        
        {/* 1. TÍTULO "¡Hola Carolina!" */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#4d2929] tracking-tight">
            ¡Hola Carolina!
          </h1>
        </div>

        {/* 2. ACTIVIDADES PENDIENTES (Título solicitado encima de las cards azules) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#178568] rounded-full" />
              <h2 className="text-xl font-extrabold text-[#4d2929] tracking-tight">
                Actividades pendientes
              </h2>
            </div>
            <span className="text-xs font-bold text-[#155d4d] bg-[#cde8d8]/80 px-3 py-1 rounded-full border border-[#a8d2bb]">
              {pendingActivities.length} por entregar
            </span>
          </div>

          {/* Grid de Cards azules/celestes con el formato Soft Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topThreeActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => onNavigate('actividades')}
                className="group bg-[#fffaf1]/75 backdrop-blur-md rounded-[30px] p-6 shadow-lg shadow-[#806b54]/15 hover:shadow-xl hover:shadow-[#806b54]/20 transition-all duration-300 flex flex-col justify-between min-h-[290px] cursor-pointer hover:-translate-y-1 border border-white/80"
              >
                {/* Cabecera de la tarjeta */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#6a3730] bg-[#f7ddc1]/85 px-3 py-1 rounded-full tracking-wide">
                      {act.materia}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#178568] text-white flex items-center justify-center group-hover:bg-[#116c55] group-hover:scale-110 transition-all shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#4d2929] leading-snug line-clamp-2">
                    {act.titulo}
                  </h3>

                  <p className="text-xs text-[#5f4440]/85 line-clamp-3 leading-relaxed">
                    {act.descripcion}
                  </p>
                </div>

                {/* Pie de la tarjeta */}
                <div className="pt-4 border-t border-[#d9cbbb]/70 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4d2929] flex items-center gap-1.5 bg-[#f7ddc1]/75 px-2.5 py-1 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-[#178568]" />
                    {act.fechaLimite}
                  </span>
                  <span className="font-extrabold text-white bg-[#178568] px-2.5 py-1 rounded-xl">
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
                <div className="w-2.5 h-6 bg-[#e3a63a] rounded-full" />
                <h2 className="text-xl font-extrabold text-[#4d2929] tracking-tight">
                  Actividades vencidas
                </h2>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                {overdueActivities.length} pendientes urgentes
              </span>
            </div>

            {/* Grid con el mismo formato que las cards azules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {overdueActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => onNavigate('actividades')}
                  className="group bg-[#fffaf1]/75 backdrop-blur-md rounded-[30px] p-6 shadow-lg shadow-[#806b54]/15 hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[290px] cursor-pointer hover:-translate-y-1 border border-white/80">
                  {/* Cabecera */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#6a3730] bg-[#f7ddc1]/85 px-3 py-1 rounded-full tracking-wide">
                        {act.materia}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold text-red-600 bg-white/90 px-2.5 py-0.5 rounded-full shadow-2xs">
                          Vencida
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#178568] text-white flex items-center justify-center group-hover:bg-[#116c55] group-hover:scale-110 transition-all shadow-sm">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#4d2929] leading-snug line-clamp-2">
                      {act.titulo}
                    </h3>

                    <p className="text-xs text-[#5f4440]/85 line-clamp-3 leading-relaxed">
                      {act.descripcion}
                    </p>
                  </div>

                  {/* Pie */}
                  <div className="pt-4 border-t border-[#d9cbbb]/70 flex items-center justify-between text-xs">
                    <span className="font-bold text-red-700 flex items-center gap-1.5 bg-white/60 px-2.5 py-1 rounded-xl">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      Límite: {act.fechaLimite}
                    </span>
                    <span className="font-extrabold text-white bg-[#178568] px-2.5 py-1 rounded-xl">
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
          <Card className="p-6 bg-[#fffaf1]/75 backdrop-blur-md border-white/80 shadow-lg shadow-[#806b54]/15">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#bcdee0]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#cde8d8] text-[#155d4d] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#178568]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#4d2929] text-base">
                    Próximas clases
                  </h3>
                  <p className="text-xs text-[#22304a]/65">
                    Horario asignado para el día de hoy
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('clases')}
                className="text-xs font-bold text-[#178568] hover:text-[#4d2929] flex items-center gap-1 transition-colors cursor-pointer"
              >
                Ver horario completo <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockUpcomingClasses.map((clase, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-[#f7eadc]/80 hover:bg-[#f7ddc1] border border-[#ddc9b5]/60 transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-extrabold text-[#4d2929] block">
                      {clase.materia}
                    </span>
                    <span className="text-[11px] text-[#5f4440]/70 font-medium block mt-0.5">
                      {clase.aula} • {clase.profesor}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#178568] text-white shadow-xs">
                    {clase.hora}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Término de ciclo */}
          <Card className="p-6 border-white/80 bg-[#fffaf1]/75 backdrop-blur-md shadow-lg shadow-[#806b54]/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#178568]">
                  Ciclo Cuatrimestral
                </span>
                <h3 className="text-base font-bold text-[#4d2929]">
                  Término de ciclo: {mockCycleProgress.nombreCiclo}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#cde8d8] text-[#155d4d] border border-[#a8d2bb]">
                  Semana {mockCycleProgress.semanaActual} de {mockCycleProgress.totalSemanas}
                </span>
                <span className="text-sm font-extrabold text-[#4d2929]">
                  {mockCycleProgress.porcentaje}%
                </span>
              </div>
            </div>

            <div className="w-full bg-[#dce8df] h-4 rounded-full overflow-hidden p-0.5 border border-[#c4d8cb] shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#178568] via-[#58ae8e] to-[#e3a63a] transition-all duration-700 shadow-xs"
                style={{ width: `${mockCycleProgress.porcentaje}%` }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-[#22304a]/70 font-medium">
              <span>Inicio: Septiembre 2026</span>
              <span className="text-[#178568] font-semibold">
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
