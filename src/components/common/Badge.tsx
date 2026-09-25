import React from 'react';

type BadgeVariant = 
  | 'pendiente' 
  | 'vencida' 
  | 'entregada' 
  | 'calificada' 
  | 'pagado' 
  | 'proximo' 
  | 'info' 
  | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'info', 
  className = '',
  size = 'md'
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'pendiente':
        return 'bg-[#fff8e7] text-[#9c6a08] border border-[#fec23d]/50';
      case 'vencida':
        return 'bg-[#fff0f0] text-[#c93b3b] border border-[#ffb4b4]/60';
      case 'entregada':
        return 'bg-[#eaf8fa] text-[#1f7c8f] border border-[#77c7d2]/50';
      case 'calificada':
        return 'bg-[#eff5ff] text-[#2c5eb3] border border-[#87b7ff]/50';
      case 'pagado':
        return 'bg-[#eafaf1] text-[#1e7e4e] border border-[#a2e5be]';
      case 'proximo':
        return 'bg-[#f0f4ff] text-[#4f73b8] border border-[#bcdee0]';
      case 'warning':
        return 'bg-[#fec23d]/20 text-[#855502] border border-[#fec23d]/40';
      case 'info':
      default:
        return 'bg-[#edf7f9] text-[#22304a] border border-[#bcdee0]';
    }
  };

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs sm:text-sm';

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full tracking-wide capitalize ${sizeStyles} ${getStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {children}
    </span>
  );
};

