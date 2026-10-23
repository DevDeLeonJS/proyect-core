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
      className={`bg-[#fffaf1]/75 backdrop-blur-md rounded-[30px] p-6 border border-white/80 shadow-lg shadow-[#806b54]/15 ${
        hoverable ? 'cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#806b54]/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
