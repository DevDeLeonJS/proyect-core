import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false,
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl p-5 border border-[#bcdee0]/40 shadow-[0_10px_25px_-8px_rgba(34,48,74,0.06),0_4px_10px_-4px_rgba(69,174,196,0.08)] ${
        hoverable ? 'cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_-10px_rgba(34,48,74,0.1),0_6px_14px_-4px_rgba(69,174,196,0.15)] hover:border-[#77c7d2]/60' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

