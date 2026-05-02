import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-foreground/10 text-foreground/70',
    success: 'bg-brand-lake/20 text-brand-lake',
    warning: 'bg-orange-500/20 text-orange-500',
    error: 'bg-red-500/20 text-red-500',
    info: 'bg-brand-indigo/20 text-brand-indigo',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
