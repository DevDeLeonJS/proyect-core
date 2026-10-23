import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { School, User, Mail, Hash, Lock, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';

interface RegisterViewProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onRegisterSuccess,
  onNavigateToLogin
}) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - REGISTRO DE ALUMNO
   * ============================================================================
   * Endpoint esperado: POST /api/v1/auth/register
   * Headers: { 'Content-Type': 'application/json' }
   * Body payload:
   *   {
   *     "nombre": nombre,
   *     "correo": correo,
   *     "matricula": matricula,
   *     "password": password
   *   }
   * Respuesta esperada (201 Created):
   *   {
   *     "message": "Registro completado con éxito",
   *     "studentId": "usr-...",
   *     "token": "..."
   *   }
   * ============================================================================
   */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessNotice(true);
      setTimeout(() => {
        onRegisterSuccess();
      }, 1000);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#cde8d8]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-[#f7ddc1]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        <Card className="p-8 sm:p-10 border-[#bcdee0]/60 shadow-[0_20px_40px_-15px_rgba(34,48,74,0.08),0_8px_20px_-6px_rgba(69,174,196,0.12)]">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#cde8d8] border border-white/80 text-[#178568] flex items-center justify-center shadow-inner">
              <School className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4d2929] tracking-tight">
              Regístrate Aquí
            </h1>
            <p className="text-xs sm:text-sm text-[#5f4440]/70 mt-1 font-medium">
              Crea tu perfil de estudiante en el sistema SAIUT
            </p>
          </div>

          {successNotice ? (
            <div className="p-4 rounded-2xl bg-[#eafaf1] border border-[#a2e5be] text-center my-4">
              <p className="text-sm font-bold text-[#1e7e4e]">¡Registro exitoso!</p>
              <p className="text-xs text-[#1e7e4e]/80 mt-1">Iniciando sesión en tu espacio de trabajo...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#22304a] mb-1 ml-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#178568]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Carolina Martínez"
                    className="soft-input w-full pl-10 pr-4 py-2.5 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#22304a] mb-1 ml-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#178568]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="alumno@utech.edu.mx"
                    className="soft-input w-full pl-10 pr-4 py-2.5 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#22304a] mb-1 ml-1">
                  Matrícula
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#178568]">
                    <Hash className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Ej. 20240391"
                    className="soft-input w-full pl-10 pr-4 py-2.5 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#22304a] mb-1 ml-1">
                  Crea una contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#178568]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="soft-input w-full pl-10 pr-11 py-2.5 text-sm font-medium"
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
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  {isLoading ? 'Registrando cuenta...' : 'Regístrate'}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#bcdee0]/40 text-center">
            <button
              onClick={onNavigateToLogin}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#178568] hover:text-[#116c55] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              ¿Ya tienes cuenta? Inicia sesión aquí
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
