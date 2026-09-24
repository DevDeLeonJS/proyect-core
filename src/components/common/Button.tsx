import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  }[size];

  const variantStyles = {
    primary: 'bg-[#178568] text-white hover:bg-[#116c55] shadow-sm hover:shadow-md hover:shadow-[#178568]/25 active:scale-[0.98]',
    secondary: 'bg-[#f7ddc1]/85 text-[#4d2929] hover:bg-[#f7ddc1] border border-white/80 active:scale-[0.98]',
    accent: 'bg-[#178568] text-white hover:bg-[#116c55] shadow-sm hover:shadow-md active:scale-[0.98]',
    ghost: 'bg-transparent text-[#4d2929] hover:bg-[#f7ddc1]/60 active:scale-[0.98]',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 active:scale-[0.98]'
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
