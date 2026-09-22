import React from 'react';
import { Card } from '../components/common/Card';
import { mockGrades } from '../data/mockData';
import type { GradeItem } from '../types';
import { GraduationCap, Award, BookCheck } from 'lucide-react';

export const GradesView: React.FC = () => {
  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - CALIFICACIONES / KÁRDEX
   * ============================================================================
   * Endpoint esperado: GET /api/v1/grades/student/{matricula}
   * Headers: { Authorization: `Bearer ${token}` }
   * Response shape: GradeItem[]
   * ============================================================================
   */

  const validGrades = mockGrades.filter((g: GradeItem) => g.promedioFinal !== null);
  const average = (
    validGrades.reduce((acc: number, curr: GradeItem) => acc + (curr.promedioFinal || 0), 0) / (validGrades.length || 1)
  ).toFixed(2);

  const totalCredits = mockGrades.reduce((acc: number, curr: GradeItem) => acc + curr.creditos, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Cabecera */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#22304a] tracking-tight">
          Calificaciones y Avance Académico
        </h1>
        <p className="text-xs sm:text-sm text-[#22304a]/70 mt-1 font-medium">
          Historial de evaluaciones parciales y promedio del 4to Cuatrimestre
        </p>
      </div>

      {/* Tarjetas de Métricas de Desempeño */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        
        <Card className="p-5 border-[#bcdee0]/60 flex items-center gap-4 bg-gradient-to-br from-white to-[#f4faff]">
          <div className="w-12 h-12 rounded-2xl bg-[#45aec4] text-white flex items-center justify-center shadow-md shadow-[#45aec4]/25">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#22304a]/60 uppercase tracking-wider block">
              Promedio General
            </span>
            <span className="text-2xl font-extrabold text-[#22304a]">
              {average} <span className="text-xs font-semibold text-[#45aec4]">/ 10</span>
            </span>
          </div>
        </Card>

        <Card className="p-5 border-[#bcdee0]/60 flex items-center gap-4 bg-gradient-to-br from-white to-[#fffcf5]">
          <div className="w-12 h-12 rounded-2xl bg-[#fec23d] text-[#855502] flex items-center justify-center shadow-md shadow-[#fec23d]/25">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#22304a]/60 uppercase tracking-wider block">
              Créditos Cursados
            </span>
            <span className="text-2xl font-extrabold text-[#22304a]">
              {totalCredits} <span className="text-xs font-semibold text-[#855502]">Créditos</span>
            </span>
          </div>
        </Card>

        <Card className="p-5 border-[#bcdee0]/60 flex items-center gap-4 bg-gradient-to-br from-white to-[#f6fcf8]">
          <div className="w-12 h-12 rounded-2xl bg-[#77c7d2] text-[#1f7c8f] flex items-center justify-center shadow-md shadow-[#77c7d2]/25">
            <BookCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#22304a]/60 uppercase tracking-wider block">
              Materias Aprobadas
            </span>
            <span className="text-2xl font-extrabold text-[#1e7e4e]">
              6 / 6 <span className="text-xs font-semibold text-[#1e7e4e]">(100%)</span>
            </span>
          </div>
        </Card>

      </div>

      {/* Tabla de Calificaciones por Parcial */}
      <Card className="p-6 border-[#bcdee0]/60">
        <div className="pb-4 mb-4 border-b border-[#bcdee0]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[#22304a]">
              Detalle de Parciales por Asignatura
            </h2>
            <p className="text-xs text-[#22304a]/65">
              Escala de calificación numérica de 0 a 10 (Mínima aprobatoria: 7.0)
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#edf7f9] text-[#45aec4]">
            Cuatrimestre 4 • Regular
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#bcdee0]/50 text-[#22304a]/70 font-bold uppercase text-[11px] tracking-wider">
                <th className="pb-3 px-3">Materia</th>
                <th className="pb-3 px-3">Profesor</th>
                <th className="pb-3 px-3 text-center">Créditos</th>
                <th className="pb-3 px-3 text-center">Parcial 1</th>
                <th className="pb-3 px-3 text-center">Parcial 2</th>
                <th className="pb-3 px-3 text-center">Parcial 3</th>
                <th className="pb-3 px-3 text-center">Promedio</th>
                <th className="pb-3 px-3 text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bcdee0]/30">
              {mockGrades.map((g: GradeItem) => (
                <tr key={g.materiaId} className="hover:bg-[#f6fafd] transition-colors">
                  <td className="py-4 px-3 font-bold text-[#22304a]">
                    {g.materia}
                  </td>
                  <td className="py-4 px-3 text-[#22304a]/70 font-medium">
                    {g.profesor}
                  </td>
                  <td className="py-4 px-3 text-center text-[#22304a]/80 font-bold">
                    {g.creditos}
                  </td>
                  <td className="py-4 px-3 text-center font-semibold text-[#22304a]">
                    {g.parcial1 !== null ? g.parcial1.toFixed(1) : '-'}
                  </td>
                  <td className="py-4 px-3 text-center font-semibold text-[#22304a]">
                    {g.parcial2 !== null ? g.parcial2.toFixed(1) : '-'}
                  </td>
                  <td className="py-4 px-3 text-center font-semibold text-[#22304a]/50">
                    {g.parcial3 !== null ? g.parcial3.toFixed(1) : 'Pendiente'}
                  </td>
                  <td className="py-4 px-3 text-center font-extrabold text-[#45aec4] text-sm">
                    {g.promedioFinal !== null ? g.promedioFinal.toFixed(1) : '-'}
                  </td>
                  <td className="py-4 px-3 text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#eafaf1] text-[#1e7e4e] border border-[#a2e5be]">
                      {g.estatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

