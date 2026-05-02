import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-none font-bold uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none';

  
  const variants = {
    primary: 'bg-brand-purple text-white border border-brand-purple shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]',
    secondary: 'bg-white text-black border border-white shadow-[4px_4px_0px_0px_rgba(168,85,247,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(168,85,247,0.6)]',
    outline: 'border-2 border-brand-purple text-brand-purple bg-[#0a0a0a] shadow-[4px_4px_0px_0px_rgba(168,85,247,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(168,85,247,0.4)]',
    ghost: 'text-brand-purple hover:bg-white/5 border border-transparent',
    glass: 'bg-[#0a0a0a] border border-white/20 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[6px_6px_0px_0px_rgba(168,85,247,0.3)]',
  };

  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};
