import type { User, Activity, ClassCourse, Announcement, PaymentItem, GradeItem, CalendarEvent } from '../types';

/**
 * ============================================================================
 * GUÍA DE INTEGRACIÓN CON EL BACKEND (MOCK DATA)
 * ============================================================================
 * Todos los datos a continuación son simulados para el desarrollo de la interfaz.
 * Cuando el equipo de backend tenga listos los endpoints, reemplazar estas fuentes
 * con llamadas HTTP (fetch/axios o React Query / RTK Query).
 * Cada sección detalla el endpoint sugerido y el formato esperado.
 * ============================================================================
 */

// ==========================================
// 1. USUARIO ACTUAL (PERFIL DE ALUMNO)
// Endpoint sugerido: GET /api/v1/auth/me o GET /api/v1/students/profile
// ==========================================
export const mockCurrentUser: User = {
  id: 'usr-2024-001',
  nombre: 'Carolina Martínez',
  matricula: '20240391',
  correo: 'carolina.martinez@utech.edu.mx',
  carrera: 'Ingeniería en Tecnologías de la Información',
  cuatrimestre: '4to Cuatrimestre',
  grupo: 'TI-41',
  estatus: 'Regular',
  beca: '50% Académica',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
};

// ==========================================
// 2. ACTIVIDADES / TAREAS
// Endpoint sugerido: GET /api/v1/activities?studentId={id}
// Endpoint para entregar: POST /api/v1/activities/{id}/submit
// ==========================================
export const mockActivities: Activity[] = [
  {
    id: 'act-101',
    titulo: 'Derivadas Parciales y Aplicaciones',
    materia: 'Matemáticas',
    materiaId: 'mat-01',
    fechaLimite: '2026/09/21',
    horaLimite: '23:59',
    estado: 'pendiente',
    puntosMaximos: 10,
    descripcion: 'Resolver los ejercicios 1 al 15 del capítulo 4 del libro de Cálculo Multivariable. Subir en formato PDF con procedimiento claro.'
  },
  {
    id: 'act-102',
    titulo: 'Diagrama Entidad-Relación Tienda Online',
    materia: 'Bases de Datos',
    materiaId: 'bd-03',
    fechaLimite: '2026/09/22',
    horaLimite: '18:00',
    estado: 'pendiente',
    puntosMaximos: 15,
    descripcion: 'Diseñar el modelo conceptual y lógico con normalización hasta 3FN para un sistema de comercio electrónico.'
  },
  {
    id: 'act-103',
    titulo: 'Ensayo: Liderazgo y Inteligencia Emocional',
    materia: 'Desarrollo Humano',
    materiaId: 'dh-02',
    fechaLimite: '2026/09/24',
    horaLimite: '20:00',
    estado: 'pendiente',
    puntosMaximos: 10,
    descripcion: 'Escribir un ensayo reflexivo de mínimo 3 cuartillas sobre la aplicación del liderazgo empático en equipos ágiles.'
  },
  {
    id: 'act-104',
    titulo: 'Oral Presentation: Tech Trends 2026',
    materia: 'Inglés IV',
    materiaId: 'ing-04',
    fechaLimite: '2026/09/25',
    horaLimite: '12:00',
    estado: 'pendiente',
    puntosMaximos: 20,
    descripcion: 'Preparar diapositivas y video de 3 minutos presentando un nuevo desarrollo en inteligencia artificial.'
  },
  {
    id: 'act-105',
    titulo: 'Álgebra Lineal: Matrices Inversas',
    materia: 'Matemáticas',
    materiaId: 'mat-01',
    fechaLimite: '2026/09/15',
    horaLimite: '23:59',
    estado: 'vencida',
    puntosMaximos: 10,
    descripcion: 'Práctica de Gauss-Jordan y determinantes para resolver matrices inversas.'
  },
  {
    id: 'act-106',
    titulo: 'Reporte de Lectura: Ética Profesional',
    materia: 'Desarrollo Humano',
    materiaId: 'dh-02',
    fechaLimite: '2026/09/14',
    horaLimite: '18:00',
    estado: 'vencida',
    puntosMaximos: 10,
    descripcion: 'Síntesis del código ético de la ingeniería y casos de estudio reales.'
  },
  {
    id: 'act-107',
    titulo: 'Práctica 1: Configuración de Router Cisco',
    materia: 'Redes de Computadoras',
    materiaId: 'red-05',
    fechaLimite: '2026/09/10',
    horaLimite: '23:59',
    estado: 'calificada',
    puntosMaximos: 10,
    calificacion: 9.5,
    fechaEntrega: '2026-09-09 17:20',
    descripcion: 'Laboratorio en Packet Tracer configurando VLANs y enrutamiento inter-VLAN.'
  },
  {
    id: 'act-108',
    titulo: 'Creación de Mockups con Soft Design',
    materia: 'Desarrollo Web Integral',
    materiaId: 'web-06',
    fechaLimite: '2026/09/11',
    horaLimite: '22:00',
    estado: 'entregada',
    puntosMaximos: 10,
    fechaEntrega: '2026-09-11 15:45',
    descripcion: 'Wireframes y prototipo funcional en Figma implementando paleta de colores oficial.'
  }
];

// ==========================================
// 3. MIS CLASES / MATERIAS
// Endpoint sugerido: GET /api/v1/classes?studentId={id}
// ==========================================
export const mockClasses: ClassCourse[] = [
  {
    id: 'mat-01',
    codigo: 'MAT-401',
    nombre: 'Matemáticas Avanzadas',
    profesor: 'Dr. Roberto Gallegos',
    aula: 'Edificio B - Aula 204',
    horario: '18:00 - 19:30',
    dias: 'Lun, Mié, Vie',
    colorTema: '#45aec4',
    colorBg: '#e6f7fa',
    totalActividades: 6,
    actividadesPendientes: 2,
    promedioActual: 8.8
  },
  {
    id: 'dh-02',
    codigo: 'DH-402',
    nombre: 'Desarrollo Humano',
    profesor: 'Mtra. Silvia Padrón',
    aula: 'Edificio A - Aula 102',
    horario: '16:00 - 17:30',
    dias: 'Mar, Jue',
    colorTema: '#87b7ff',
    colorBg: '#eff5ff',
    totalActividades: 5,
    actividadesPendientes: 1,
    promedioActual: 9.6
  },
  {
    id: 'bd-03',
    codigo: 'TI-403',
    nombre: 'Bases de Datos Relacionales',
    profesor: 'Ing. Carlos Mendoza',
    aula: 'Laboratorio de Cómputo 3',
    horario: '19:30 - 21:00',
    dias: 'Lun, Mié',
    colorTema: '#77c7d2',
    colorBg: '#edf8fa',
    totalActividades: 7,
    actividadesPendientes: 1,
    promedioActual: 9.1
  },
  {
    id: 'ing-04',
    codigo: 'IDI-404',
    nombre: 'Inglés Técnico IV',
    profesor: 'Lic. Amanda Ross',
    aula: 'Centro de Idiomas - Aula 5',
    horario: '19:00 - 20:30',
    dias: 'Mar, Jue, Vie',
    colorTema: '#fec23d',
    colorBg: '#fff9eb',
    totalActividades: 4,
    actividadesPendientes: 1,
    promedioActual: 9.4
  },
  {
    id: 'red-05',
    codigo: 'TI-405',
    nombre: 'Redes de Computadoras',
    profesor: 'Ing. Héctor Salazar',
    aula: 'Laboratorio de Redes 1',
    horario: '17:30 - 19:00',
    dias: 'Mar, Jue',
    colorTema: '#22304a',
    colorBg: '#edf1f7',
    totalActividades: 5,
    actividadesPendientes: 0,
    promedioActual: 9.5
  },
  {
    id: 'web-06',
    codigo: 'TI-406',
    nombre: 'Desarrollo Web Frontend',
    profesor: 'Ing. Mariana Treviño',
    aula: 'Laboratorio de Cómputo 2',
    horario: '16:00 - 18:00',
    dias: 'Lun, Vie',
    colorTema: '#45aec4',
    colorBg: '#eaf7fa',
    totalActividades: 8,
    actividadesPendientes: 0,
    promedioActual: 9.8
  }
];

// ==========================================
// 4. PRÓXIMAS CLASES DE HOY (DASHBOARD)
// Endpoint sugerido: GET /api/v1/schedule/today
// ==========================================
export const mockUpcomingClasses = [
  { materia: 'Matemáticas', hora: '6:00 pm', aula: 'Aula 204', profesor: 'Dr. Roberto Gallegos' },
  { materia: 'Inglés', hora: '7:00 pm', aula: 'Centro Idiomas', profesor: 'Lic. Amanda Ross' },
  { materia: 'Bases de Datos', hora: '8:30 pm', aula: 'Lab Cómputo 3', profesor: 'Ing. Carlos Mendoza' }
];

// ==========================================
// 5. ANUNCIOS Y AVISOS ESCOLARES
// Endpoint sugerido: GET /api/v1/announcements?active=true
// ==========================================
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-01',
    titulo: 'Fechas de Evaluaciones Segundo Parcial',
    descripcion: 'Se informa a la comunidad estudiantil que los exámenes parciales se llevarán a cabo del 28 de septiembre al 02 de octubre.',
    fecha: '18 Sep 2026',
    remitente: 'Dirección Académica',
    categoria: 'Académico',
    fijado: true
  },
  {
    id: 'ann-02',
    titulo: 'Convocatoria de Becas de Excelencia',
    descripcion: 'Abierta la recepción de solicitudes para la renovación de becas del ciclo siguiente. Fecha límite: 30 de septiembre.',
    fecha: '16 Sep 2026',
    remitente: 'Servicios Escolares',
    categoria: 'General'
  },
  {
    id: 'ann-03',
    titulo: 'Mantenimiento en Plataforma de Laboratorios',
    descripcion: 'Este sábado habrá corte de servidores de 02:00 am a 06:00 am por actualización de seguridad.',
    fecha: '15 Sep 2026',
    remitente: 'Sistemas e Infraestructura',
    categoria: 'Urgente'
  }
];

// ==========================================
// 6. HISTORIAL DE PAGOS / ESTADO FINANCIERO
// Endpoint sugerido: GET /api/v1/payments/student/{matricula}
// Endpoint para pagar: POST /api/v1/payments/checkout
// ==========================================
export const mockPayments: PaymentItem[] = [
  {
    id: 'pay-001',
    concepto: 'Inscripción Cuatrimestral Sep-Dic 2026',
    periodo: 'Sep - Dic 2026',
    montoOriginal: 2400,
    descuentoBeca: 1200,
    montoFinal: 1200,
    fechaLimite: '31 Ago 2026',
    estado: 'pagado',
    folioComprobante: 'REC-2026-9938'
  },
  {
    id: 'pay-002',
    concepto: 'Cuota de Laboratorios y Talleres',
    periodo: 'Sep - Dic 2026',
    montoOriginal: 600,
    descuentoBeca: 0,
    montoFinal: 600,
    fechaLimite: '05 Sep 2026',
    estado: 'pagado',
    folioComprobante: 'REC-2026-1042'
  },
  {
    id: 'pay-003',
    concepto: 'Mensualidad 1 - Colegiatura',
    periodo: 'Septiembre 2026',
    montoOriginal: 1800,
    descuentoBeca: 900,
    montoFinal: 900,
    fechaLimite: '10 Sep 2026',
    estado: 'pagado',
    folioComprobante: 'REC-2026-1188'
  },
  {
    id: 'pay-004',
    concepto: 'Mensualidad 2 - Colegiatura',
    periodo: 'Octubre 2026',
    montoOriginal: 1800,
    descuentoBeca: 900,
    montoFinal: 900,
    fechaLimite: '10 Oct 2026',
    estado: 'pendiente'
  },
  {
    id: 'pay-005',
    concepto: 'Mensualidad 3 - Colegiatura',
    periodo: 'Noviembre 2026',
    montoOriginal: 1800,
    descuentoBeca: 900,
    montoFinal: 900,
    fechaLimite: '10 Nov 2026',
    estado: 'proximo'
  },
  {
    id: 'pay-006',
    concepto: 'Seguro Médico Estudiantil',
    periodo: 'Anual 2026-2027',
    montoOriginal: 450,
    descuentoBeca: 0,
    montoFinal: 450,
    fechaLimite: '15 Oct 2026',
    estado: 'pendiente'
  }
];

// ==========================================
// 7. CALIFICACIONES DEL CUATRIMESTRE
// Endpoint sugerido: GET /api/v1/grades/student/{matricula}
// ==========================================
export const mockGrades: GradeItem[] = [
  {
    materiaId: 'mat-01',
    materia: 'Matemáticas Avanzadas',
    profesor: 'Dr. Roberto Gallegos',
    creditos: 6,
    parcial1: 9.0,
    parcial2: 8.5,
    parcial3: null,
    promedioFinal: 8.8,
    estatus: 'En curso'
  },
  {
    materiaId: 'dh-02',
    materia: 'Desarrollo Humano',
    profesor: 'Mtra. Silvia Padrón',
    creditos: 4,
    parcial1: 9.5,
    parcial2: 9.7,
    parcial3: null,
    promedioFinal: 9.6,
    estatus: 'En curso'
  },
  {
    materiaId: 'bd-03',
    materia: 'Bases de Datos Relacionales',
    profesor: 'Ing. Carlos Mendoza',
    creditos: 7,
    parcial1: 9.0,
    parcial2: 9.2,
    parcial3: null,
    promedioFinal: 9.1,
    estatus: 'En curso'
  },
  {
    materiaId: 'ing-04',
    materia: 'Inglés Técnico IV',
    profesor: 'Lic. Amanda Ross',
    creditos: 5,
    parcial1: 9.2,
    parcial2: 9.6,
    parcial3: null,
    promedioFinal: 9.4,
    estatus: 'En curso'
  },
  {
    materiaId: 'red-05',
    materia: 'Redes de Computadoras',
    profesor: 'Ing. Héctor Salazar',
    creditos: 6,
    parcial1: 9.5,
    parcial2: 9.5,
    parcial3: null,
    promedioFinal: 9.5,
    estatus: 'En curso'
  },
  {
    materiaId: 'web-06',
    materia: 'Desarrollo Web Frontend',
    profesor: 'Ing. Mariana Treviño',
    creditos: 7,
    parcial1: 9.8,
    parcial2: 9.8,
    parcial3: null,
    promedioFinal: 9.8,
    estatus: 'En curso'
  }
];

// ==========================================
// 8. EVENTOS DE CALENDARIO DEL MES ACTUAL
// Endpoint sugerido: GET /api/v1/calendar?month=8&year=2026
// ==========================================
export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'ev-1', dia: 7, mes: 8, año: 2026, titulo: 'Inicio de asesorías', hora: '15:00', tipo: 'clase' },
  { id: 'ev-2', dia: 15, mes: 8, año: 2026, titulo: 'Entrega Álgebra', hora: '23:59', tipo: 'tarea', materia: 'Matemáticas' },
  { id: 'ev-3', dia: 18, mes: 8, año: 2026, titulo: 'Aviso de parciales', hora: '10:00', tipo: 'aviso' },
  { id: 'ev-4', dia: 21, mes: 8, año: 2026, titulo: 'Derivadas Parciales', hora: '23:59', tipo: 'tarea', materia: 'Matemáticas' },
  { id: 'ev-5', dia: 22, mes: 8, año: 2026, titulo: 'Diagrama E-R', hora: '18:00', tipo: 'tarea', materia: 'Bases de Datos' },
  { id: 'ev-6', dia: 24, mes: 8, año: 2026, titulo: 'Ensayo Liderazgo', hora: '20:00', tipo: 'tarea', materia: 'Desarrollo Humano' },
  { id: 'ev-7', dia: 28, mes: 8, año: 2026, titulo: 'Examen Parcial II', hora: '18:00', tipo: 'examen', materia: 'Matemáticas' }
];

// ==========================================
// 9. DATOS DE PROGRESO DE CICLO (DASHBOARD)
// Endpoint sugerido: GET /api/v1/cycle/status
// ==========================================
export const mockCycleProgress = {
  nombreCiclo: 'Septiembre - Diciembre 2026',
  semanaActual: 7,
  totalSemanas: 15,
  porcentaje: 46.6,
  diasRestantes: 56
};
