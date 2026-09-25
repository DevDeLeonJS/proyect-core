import { useState } from 'react';
import type { ActiveView, User } from './types';
import { mockCurrentUser } from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { DashboardView } from './views/DashboardView';
import { ClassesView } from './views/ClassesView';
import { ActivitiesView } from './views/ActivitiesView';
import { GradesView } from './views/GradesView';
import { PaymentsView } from './views/PaymentsView';
import { 
  ChevronUp, 
  ChevronDown,
  Compass
} from 'lucide-react';
import './App.css';

export function App() {
  // Estado de la pantalla activa (inicia en dashboard para previsualización inmediata)
  const [currentView, setCurrentView] = useState<ActiveView>('dashboard');
  // Estado del usuario activo
  const [currentUser, setCurrentUser] = useState<User | null>(mockCurrentUser);
  // Materia seleccionada para pasar a la vista de actividades
  const [selectedMateriaFilter, setSelectedMateriaFilter] = useState<string | undefined>(undefined);
  // Barra flotante de demostración para el equipo
  const [showDemoBar, setShowDemoBar] = useState(true);

  const handleLoginSuccess = () => {
    setCurrentUser(mockCurrentUser);
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = () => {
    setCurrentUser(mockCurrentUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const navigateToActivitiesFromClass = (classId?: string) => {
    setSelectedMateriaFilter(classId);
    setCurrentView('actividades');
  };

  // Renderizado dinámico de la vista activa
  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setCurrentView('registro')}
          />
        );
      case 'registro':
        return (
          <RegisterView
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        );
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      case 'clases':
        return (
          <ClassesView
            onNavigateToActivities={navigateToActivitiesFromClass}
          />
        );
      case 'actividades':
        return (
          <ActivitiesView
            initialSubjectId={selectedMateriaFilter}
            onNavigateToClasses={() => setCurrentView('clases')}
          />
        );
      case 'calificaciones':
        return <GradesView />;
      case 'pagos':
        return <PaymentsView />;
      default:
        return <DashboardView onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  const isAuthScreen = currentView === 'login' || currentView === 'registro';

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f0] text-[#22304a] selection:bg-[#45aec4] selection:text-white pb-14">
      
      {/* 1. Barra de Navegación Superior (Navbar - Morado suave según especificación) */}
      {!isAuthScreen && currentUser && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            setSelectedMateriaFilter(undefined);
            setCurrentView(view);
          }}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* 2. Área principal de contenido */}
      <main className={`flex-1 w-full pt-28 ${
        currentView === 'dashboard' ? 'lg:pr-[325px] xl:pr-[345px]' : ''
      }`}>
        {renderCurrentView()}
      </main>

      {/* 3. BARRA FLOTANTE DE INSPECCIÓN RÁPIDA PARA EL EQUIPO (DEMO WIREFRAMES) */}
      <aside aria-label="Selector de Wireframes" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 transition-all">
        {showDemoBar ? (
          <div className="bg-[#22304a]/95 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-[#45aec4] font-bold border-r border-white/20 pr-2.5">
              <Compass className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">Wireframes:</span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-[85vw]">
              <button
                onClick={() => setCurrentView('login')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'login' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                01 Login
              </button>
              <button
                onClick={() => setCurrentView('registro')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'registro' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                02 Registro
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'dashboard' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                03 Dashboard
              </button>
              <button
                onClick={() => setCurrentView('clases')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'clases' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                04 Clases
              </button>
              <button
                onClick={() => setCurrentView('actividades')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'actividades' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                05 Actividades
              </button>
              <button
                onClick={() => setCurrentView('calificaciones')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'calificaciones' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                Calificaciones
              </button>
              <button
                onClick={() => setCurrentView('pagos')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  currentView === 'pagos' ? 'bg-[#45aec4] text-white font-bold' : 'hover:bg-white/20 text-white/80'
                }`}
              >
                06 Pagos
              </button>
            </div>

            <button
              onClick={() => setShowDemoBar(false)}
              className="ml-1 p-1 hover:bg-white/20 rounded-lg text-white/60 hover:text-white cursor-pointer"
              title="Minimizar barra"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDemoBar(true)}
            className="bg-[#22304a] text-[#45aec4] px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 text-xs font-bold hover:scale-105 transition-all cursor-pointer"
          >
            <Compass className="w-3 3" />
            <span>Ver Wireframes</span>
            <ChevronUp className="w-3 h-3" />
          </button>
        )}
      </aside>

    </div>
  );
}

export default App;
