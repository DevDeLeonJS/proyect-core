// ============================================================================
// DEFINICIÓN DE MODELOS Y TIPOS (TypeScript)
// ============================================================================
// Estos contratos de datos reflejan las entidades del sistema educativo.
// Al integrar el backend, las respuestas de los servicios deben coincidir con estas interfaces.

export type ActivityStatus = 'pendiente' | 'vencida' | 'entregada' | 'calificada';

export interface User {
  id: string;
  nombre: string;
  matricula: string;
  correo: string;
  carrera: string;
  cuatrimestre: string;
  grupo: string;
  estatus: 'Regular' | 'Condicionado' | 'Baja Temporal';
  beca: string;
  avatarUrl?: string;
}

export interface Activity {
  id: string;
  titulo: string;
  materia: string;
  materiaId: string;
  fechaLimite: string;
  horaLimite: string;
  estado: ActivityStatus;
  puntosMaximos: number;
  calificacion?: number;
  descripcion?: string;
  fechaEntrega?: string;
  archivoAdjunto?: string;
}

export interface ClassCourse {
  id: string;
  codigo: string;
  nombre: string;
  profesor: string;
  aula: string;
  horario: string;
  dias: string;
  colorTema: string;
  colorBg: string;
  totalActividades: number;
  actividadesPendientes: number;
  promedioActual: number;
}

export interface Announcement {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  remitente: string;
  categoria: 'Académico' | 'General' | 'Urgente' | 'Evento';
  fijado?: boolean;
}

export interface PaymentItem {
  id: string;
  concepto: string;
  periodo: string;
  montoOriginal: number;
  descuentoBeca: number;
  montoFinal: number;
  fechaLimite: string;
  estado: 'pagado' | 'pendiente' | 'proximo';
  folioComprobante?: string;
}

export interface GradeItem {
  materiaId: string;
  materia: string;
  profesor: string;
  creditos: number;
  parcial1: number | null;
  parcial2: number | null;
  parcial3: number | null;
  promedioFinal: number | null;
  estatus: 'Aprobado' | 'En curso' | 'En riesgo';
}

export interface CalendarEvent {
  id: string;
  dia: number;
  mes: number; // 0-11
  año: number;
  titulo: string;
  materia?: string;
  hora: string;
  tipo: 'tarea' | 'clase' | 'examen' | 'aviso';
}

export type ActiveView = 
  | 'login' 
  | 'registro' 
  | 'dashboard' 
  | 'clases' 
  | 'actividades' 
  | 'calificaciones' 
  | 'pagos';

