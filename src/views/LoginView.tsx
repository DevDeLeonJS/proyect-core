import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { School, User, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onNavigateToRegister
}) => {
  const [username, setUsername] = useState('carolina.martinez');
  const [password, setPassword] = useState('demo12345');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - AUTENTICACIÓN / LOGIN
   * ============================================================================
   * Endpoint esperado: POST /api/v1/auth/login
   * Headers: { 'Content-Type': 'application/json' }
   * Body payload:
   *   {
   *     "username": username, // o correo institucional / matrícula
   *     "password": password
   *   }
   * Respuesta esperada (200 OK):
   *   {
   *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   *     "refreshToken": "...",
   *     "user": { "id": "...", "nombre": "...", "matricula": "..." }
   *   }
   * ============================================================================
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (!username.trim() || !password.trim()) {
        setErrorMessage('Por favor introduce tu usuario y contraseña.');
        return;
      }
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-[#cde8d8]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-[#f7ddc1]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        <Card className="p-8 sm:p-10 border-[#bcdee0]/60 shadow-[0_20px_40px_-15px_rgba(34,48,74,0.08),0_8px_20px_-6px_rgba(69,174,196,0.12)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-3xl bg-[#cde8d8] border border-white/80 text-[#178568] flex items-center justify-center shadow-inner">
              <School className="w-8 h-8 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4d2929] tracking-tight">
              Inicia Sesión
            </h1>
            <p className="text-xs sm:text-sm text-[#5f4440]/70 mt-1 font-medium">
              Ingresa al portal institucional del alumno
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold animate-shake">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#4d2929] mb-1.5 ml-1">
                Usuario o Matrícula
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#178568]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej. carolina.martinez o 20240391"
                  className="soft-input w-full pl-10 pr-4 py-3 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="block text-xs font-bold text-[#4d2929]">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => alert('Simulación: Contacta a Servicios Escolares.')}
                  className="text-[11px] font-bold text-[#178568] hover:text-[#116c55] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#178568]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="soft-input w-full pl-10 pr-11 py-3 text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#22304a]/50 hover:text-[#22304a] transition-colors cursor-pointer"
                  title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full text-white font-bold bg-[#178568] hover:bg-[#116c55] shadow-md shadow-[#178568]/20"
                icon={isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Comprobando credenciales...' : 'Inicia'}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#bcdee0]/40 text-center">
            <p className="text-xs text-[#5f4440]/75">
              ¿No tienes una cuenta aún?{' '}
              <button
                onClick={onNavigateToRegister}
                className="font-bold text-[#178568] hover:text-[#116c55] transition-colors cursor-pointer"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-[#fff9eb] border border-[#fec23d]/40 text-center">
            <p className="text-[11px] text-[#855502] font-semibold">
              Modo Demo: Presiona "Inicia" para ingresar con datos simulados.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
