import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { mockClasses, mockActivities } from '../data/mockData';
import type { ClassCourse } from '../types';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  ArrowRight,
  X
} from 'lucide-react';

interface ClassesViewProps {
  onNavigateToActivities: (classId?: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({ 
  onNavigateToActivities 
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassCourse | null>(null);

  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - MIS CLASES
   * ============================================================================
   * Endpoint esperado: GET /api/v1/courses/enrolled
   * Headers: { Authorization: `Bearer ${token}` }
   * Response shape: ClassCourse[]
   * ============================================================================
   */

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#22304a] tracking-tight">
          Mis Clases
        </h1>
        <p className="text-xs sm:text-sm text-[#22304a]/70 mt-1 font-medium">
          Asignaturas inscritas en el 4to Cuatrimestre • TI-41
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {mockClasses.map((item: ClassCourse) => (
            <Card
              key={item.id}
              hoverable
              onClick={() => setSelectedClass(item)}
              className="flex flex-col justify-between p-6 border-[#bcdee0]/60 relative overflow-hidden group cursor-pointer min-h-[260px]"
            >
              <div
                className="absolute top-0 left-0 right-0 h-2 transition-all group-hover:h-3"
                style={{ backgroundColor: item.colorTema }}
              />

              <div className="pt-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#edf7f9] text-[#22304a] border border-[#bcdee0]/60">
                    {item.codigo}
                  </span>
                  <span className="text-xs font-bold text-[#45aec4]">
                    Promedio: {item.promedioActual}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#22304a] group-hover:text-[#45aec4] transition-colors leading-snug mb-1">
                  {item.nombre}
                </h3>

                <div className="space-y-1.5 mt-3 text-xs text-[#22304a]/75">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#77c7d2]" />
                    <span className="font-semibold text-[#22304a]">{item.profesor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#77c7d2]" />
                    <span>{item.dias} • {item.horario}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#77c7d2]" />
                    <span>{item.aula}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#bcdee0]/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#45aec4]" />
                  <span className="font-semibold text-[#22304a]">
                    {item.actividadesPendientes > 0 ? (
                      <span className="text-[#9c6a08] bg-[#fff8e7] px-1.5 py-0.5 rounded-md font-bold">
                        {item.actividadesPendientes} pendiente{item.actividadesPendientes > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-[#1e7e4e]">Al corriente</span>
                    )}
                  </span>
                </div>

                <div className="w-7 h-7 rounded-xl bg-[#edf7f9] text-[#45aec4] flex items-center justify-center group-hover:bg-[#45aec4] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 border border-[#bcdee0] shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedClass(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#edf7f9] text-[#22304a] hover:bg-[#bcdee0] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: selectedClass.colorTema }}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#45aec4]">{selectedClass.codigo}</span>
                <h3 className="text-xl font-extrabold text-[#22304a]">{selectedClass.nombre}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#f6fafd] border border-[#bcdee0]/50 mb-4 text-xs">
              <div>
                <span className="text-[#22304a]/60 font-semibold block">Profesor:</span>
                <span className="font-bold text-[#22304a]">{selectedClass.profesor}</span>
              </div>
              <div>
                <span className="text-[#22304a]/60 font-semibold block">Aula asignada:</span>
                <span className="font-bold text-[#22304a]">{selectedClass.aula}</span>
              </div>
              <div>
                <span className="text-[#22304a]/60 font-semibold block">Horario de clase:</span>
                <span className="font-bold text-[#22304a]">{selectedClass.dias} • {selectedClass.horario}</span>
              </div>
              <div>
                <span className="text-[#22304a]/60 font-semibold block">Promedio parcial:</span>
                <span className="font-bold text-[#45aec4]">{selectedClass.promedioActual} / 10</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-[#22304a] uppercase tracking-wider mb-2">
                Actividades asignadas ({mockActivities.filter(a => a.materiaId === selectedClass.id).length})
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {mockActivities
                  .filter(a => a.materiaId === selectedClass.id)
                  .map((act) => (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-xl bg-white border border-[#bcdee0]/60 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-[#22304a]">{act.titulo}</p>
                        <p className="text-[11px] text-[#22304a]/60">Vence: {act.fechaLimite}</p>
                      </div>
                      <Badge size="sm" variant={act.estado}>
                        {act.estado}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setSelectedClass(null);
                  onNavigateToActivities(selectedClass.id);
                }}
              >
                Ir a las Actividades de esta clase
              </Button>
              <Button
                variant="secondary"
                onClick={() => setSelectedClass(null)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

