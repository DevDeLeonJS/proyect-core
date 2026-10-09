import React, { useState } from 'react';
import type { ActiveView, User } from '../../types';
import { 
  Bell, 
  LogOut, 
  Landmark,
  CreditCard,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  user: User;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onLogout
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - SESIÓN Y NOTIFICACIONES
   * ============================================================================
   * 1. GET /api/v1/notifications/unread
   * 2. POST /api/v1/auth/logout
   * ============================================================================
   */

  const navItems: { id: ActiveView; label: string }[] = [
    { id: 'dashboard', label: 'Inicio' },
    { id: 'clases', label: 'Mis clases' },
    { id: 'actividades', label: 'Actividades' },
    { id: 'calificaciones', label: 'Calificaciones' },
    { id: 'pagos', label: 'Pagos' },
  ];

  return (
    <header className="fixed top-0 left-3 right-3 z-50 px-3 sm:px-6 lg:px-10 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 transition-all">
      <div className="w-full rounded-[28px] md:rounded-full bg-white/45 backdrop-blur-xl border border-white/70 shadow-lg shadow-[#315f4d]/20 overflow-hidden">
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2">
        
        {/* 1. LOGO & BRAND "SAIIUT" */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/85 shadow-sm flex items-center justify-center text-[#176b52] group-hover:scale-105 transition-transform border border-white">
            <Landmark className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="font-['Outfit',sans-serif] font-black text-2xl tracking-tight text-[#176b52]">
            SAIIUT
          </span>
        </div>

        {/* 2. CAPSULA DE NAVEGACIÓN CENTRAL (Exacta a la imagen) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#527466]/75 backdrop-blur-xl px-2 py-1.5 rounded-full border border-white/30 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#178568] text-white shadow-sm border border-white/30'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* 3. DERECHA: CAMPANA Y PERFIL DE USUARIO */}
        <div className="flex items-center gap-3">
          
          {/* Botón de Campana / Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-[#176b52] text-white flex items-center justify-center shadow-sm hover:bg-[#0f513f] transition-colors cursor-pointer"
              title="Notificaciones"
            >
              <Bell className="w-4 h-4 stroke-[2.2]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#bcdee0] p-3 text-xs z-50">
                <div className="flex justify-between items-center pb-2 border-b border-[#bcdee0]/40 font-bold text-[#22304a]">
                  <span>Notificaciones recientes</span>
                  <span className="text-[10px] text-[#45aec4] font-medium cursor-pointer">Marcar leídas</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-xl bg-[#eaf7fa] border border-[#77c7d2]/30">
                    <p className="font-semibold text-[#22304a]">Nueva tarea: Matemáticas</p>
                    <p className="text-[11px] text-[#22304a]/75">Derivadas parciales vence el 21 Sep.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pastilla de Usuario: [C] Carolina Martínez */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 bg-[#176b52] pl-1.5 pr-4 py-1.5 rounded-full shadow-sm hover:bg-[#0f513f] transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-[#73c8d3] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                C
              </div>
              <span className="text-xs font-bold text-white">
                {user.nombre}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-[#bcdee0] p-2 z-50">
                <div className="p-3 border-b border-[#bcdee0]/40">
                  <p className="font-bold text-sm text-[#22304a]">{user.nombre}</p>
                  <p className="text-xs text-[#22304a]/70">{user.carrera}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => { onNavigate('pagos'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#22304a] hover:bg-[#edf7f9] rounded-xl cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#45aec4]" />
                    Estado de Cuenta
                  </button>
                  <button
                    onClick={() => { onNavigate('calificaciones'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#22304a] hover:bg-[#edf7f9] rounded-xl cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#87b7ff]" />
                    Calificaciones
                  </button>
                </div>
                <div className="pt-1 border-t border-[#bcdee0]/40">
                  <button
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Navegación móvil inferior */}
      <div className="flex md:hidden items-center gap-1.5 px-3 pb-2.5 pt-1.5 border-t border-white/50 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                isActive
                  ? 'bg-white/80 backdrop-blur-md text-[#22304a] shadow-sm border border-white/80'
                  : 'text-[#22304a]/75 hover:bg-[#dff4ff]/60'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      </div>
    </header>
  );
};
