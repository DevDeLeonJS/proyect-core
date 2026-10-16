import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { mockActivities } from '../data/mockData';
import type { Activity } from '../types';
import { 
  Clock, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  X
} from 'lucide-react';

interface ActivitiesViewProps {
  initialSubjectId?: string;
  onNavigateToClasses?: () => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  initialSubjectId
}) => {
  const [selectedSubject] = useState<string>(initialSubjectId || 'todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');
  const [activeModalActivity, setActiveModalActivity] = useState<Activity | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - ACTIVIDADES / TAREAS
   * ============================================================================
   * 1. GET /api/v1/activities
   *    Query params opcionales: ?materiaId={id}&status={estado}
   * 2. POST /api/v1/activities/{id}/submit
   *    Content-Type: multipart/form-data
   *    FormData: { file: binary, comentario: string }
   * ============================================================================
   */

  const filteredActivities = mockActivities.filter((act: Activity) => {
    const matchSubject = selectedSubject === 'todas' || act.materiaId === selectedSubject;
    const matchStatus = selectedStatus === 'todas' || act.estado === selectedStatus;
    return matchSubject && matchStatus;
  });

  const subjectsWithActivities: string[] = Array.from(
    new Set(filteredActivities.map((a: Activity) => a.materia))
  );

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileName) {
      alert('Por favor selecciona un archivo simulado para entregar.');
      return;
    }
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setActiveModalActivity(null);
      setSelectedFileName('');
    }, 1200);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Cabecera y filtros */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4d2929] tracking-tight">
            Actividades
          </h1>
          <p className="text-xs sm:text-sm text-[#5f4440]/70 mt-1 font-medium">
            Entregas, proyectos y evaluaciones del cuatrimestre
          </p>
        </div>

        {/* Filtros de estado suaves */}
        <div className="flex items-center justify-center gap-1.5 bg-[#527466]/75 p-1 rounded-full border border-white/80 shadow-sm overflow-x-auto self-center sm:self-auto">
          {['todas', 'pendiente', 'vencida', 'entregada', 'calificada'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-[#178568] text-white shadow-xs'
                  : 'text-white/85 hover:bg-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Listado de actividades agrupadas por materia */}
      <div className="w-full max-w-6xl mx-auto">
        
        {/* COLUMNA IZQUIERDA: LISTADO DE ACTIVIDADES AGRUPADAS POR MATERIA */}
        <div className="w-full space-y-6">
          
          {subjectsWithActivities.length === 0 ? (
            <Card className="p-8 text-center border-dashed border-[#bcdee0]">
              <CheckCircle2 className="w-12 h-12 text-[#77c7d2] mx-auto mb-2" />
              <h3 className="font-bold text-base text-[#22304a]">No hay actividades con este filtro</h3>
              <p className="text-xs text-[#22304a]/70 mt-1">
                Prueba cambiando los filtros de materia o estatus.
              </p>
            </Card>
          ) : (
            subjectsWithActivities.map((materiaNombre: string) => {
              const activitiesInGroup = filteredActivities.filter(
                (a: Activity) => a.materia === materiaNombre
              );

              return (
                <div key={materiaNombre} className="space-y-3">
                  
                  {/* Título de la materia (Wireframe 05: Matemáticas, Desarrollo humano) */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#bcdee0]/40">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-6 rounded-full bg-[#178568]" />
                      <h2 className="text-base sm:text-lg font-extrabold text-[#4d2929]">
                        {materiaNombre}
                      </h2>
                    </div>
                    <span className="text-xs font-semibold text-[#5f4440]/60">
                      {activitiesInGroup.length} tarea{activitiesInGroup.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Filas redondeadas suaves de cada tarea */}
                  <div className="space-y-2.5">
                    {activitiesInGroup.map((act: Activity) => (
                      <div
                        key={act.id}
                        onClick={() => setActiveModalActivity(act)}
                        className="p-6 rounded-[30px] bg-[#fffaf1]/75 backdrop-blur-md hover:bg-[#fffaf1] border border-white/80 shadow-lg shadow-[#806b54]/15 hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            act.estado === 'calificada' 
                              ? 'bg-[#cde8d8] text-[#178568]' 
                              : act.estado === 'entregada'
                              ? 'bg-[#cde8d8] text-[#178568]'
                              : act.estado === 'vencida'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-[#f7ddc1]/85 text-[#4d2929]'
                          }`}>
                            <FileText className="w-4 h-4" />
                          </div>

                          <div>
                            <h3 className="text-sm font-bold text-[#4d2929] group-hover:text-[#178568] transition-colors leading-snug">
                              {act.titulo}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[#22304a]/70">
                              <span className="flex items-center gap-1 font-medium">
                                <Clock className="w-3 h-3 text-[#178568]" />
                                Vence: {act.fechaLimite} ({act.horaLimite})
                              </span>
                              <span>•</span>
                              <span>Puntos: {act.puntosMaximos} pts</span>
                            </div>
                          </div>
                        </div>

                        {/* Estado y Calificación / Acción */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#bcdee0]/30">
                          {act.calificacion !== undefined && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#eff5ff] text-[#2c5eb3] border border-[#87b7ff]/40">
                              Nota: {act.calificacion}/{act.puntosMaximos}
                            </span>
                          )}
                          <Badge variant={act.estado}>
                            {act.estado}
                          </Badge>
                          <Button size="sm" variant="secondary" className="text-xs">
                            Detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

      {/* Modal interactivo de Subir Tarea / Detalle de actividad */}
      {activeModalActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-[#fffaf1]/95 backdrop-blur-md rounded-[30px] p-6 border border-white/80 shadow-lg shadow-[#806b54]/15 relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModalActivity(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#178568] text-white hover:bg-[#116c55] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant={activeModalActivity.estado}>
                {activeModalActivity.estado}
              </Badge>
              <span className="text-xs font-bold text-[#45aec4]">
                {activeModalActivity.materia}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-[#22304a] leading-tight mb-2">
              {activeModalActivity.titulo}
            </h3>

            <div className="p-3.5 rounded-2xl bg-[#f6fafd] border border-[#bcdee0]/50 text-xs space-y-2 mb-4">
              <p className="text-[#22304a]/85 leading-relaxed">
                {activeModalActivity.descripcion}
              </p>
              <div className="pt-2 border-t border-[#bcdee0]/30 flex items-center justify-between text-[11px] text-[#22304a]/70">
                <span>Fecha límite: <strong>{activeModalActivity.fechaLimite} {activeModalActivity.horaLimite}</strong></span>
                <span>Puntos: <strong>{activeModalActivity.puntosMaximos} pts</strong></span>
              </div>
            </div>

            {/* Simulación de Subir Archivo */}
            <form onSubmit={handleSimulatedSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-[#178568]/40 hover:border-[#178568] rounded-2xl p-5 text-center bg-[#cde8d8]/40 hover:bg-[#cde8d8]/70 transition-all cursor-pointer">
                <UploadCloud className="w-9 h-9 text-[#45aec4] mx-auto mb-2" />
                <p className="text-xs font-bold text-[#22304a]">
                  Arrastra tu archivo aquí o haz clic para seleccionar
                </p>
                <p className="text-[11px] text-[#22304a]/60 mt-0.5">
                  Formatos permitidos: PDF, DOCX, ZIP (Máx. 25MB)
                </p>
                <input
                  type="file"
                  id="task-file-input"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label 
                  htmlFor="task-file-input"
                  className="inline-block mt-3 px-4 py-1.5 rounded-xl bg-white border border-[#bcdee0] text-xs font-bold text-[#45aec4] hover:bg-[#45aec4] hover:text-white transition-colors cursor-pointer"
                >
                  Examinar archivos
                </label>
              </div>

              {selectedFileName && (
                <div className="p-3 rounded-xl bg-[#edf7f9] border border-[#77c7d2]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#45aec4]" />
                    <span className="font-bold text-[#22304a]">{selectedFileName}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setSelectedFileName('')}
                    className="text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    Quitar
                  </button>
                </div>
              )}

              {uploadSuccess ? (
                <div className="p-3 rounded-2xl bg-[#eafaf1] text-[#1e7e4e] font-bold text-center text-xs">
                  ¡Tarea entregada con éxito! (Simulación mock)
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={activeModalActivity.estado === 'vencida'}
                  >
                    {activeModalActivity.estado === 'entregada' ? 'Reenviar Tarea' : 'Entregar Tarea'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveModalActivity(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
