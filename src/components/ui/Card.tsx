import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = true }) => {
  return (
    <div className={`bg-[#0a0a0a] border border-white/20 rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] ${hoverable ? 'hover:shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all' : ''} p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-foreground ${className}`}>{children}</h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);
