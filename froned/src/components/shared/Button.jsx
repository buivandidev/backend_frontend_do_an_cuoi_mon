import React from 'react';
import clsx from 'clsx';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] shadow-lg shadow-cyan-500/30",
    secondary: "bg-[var(--brand-light)] text-[var(--brand-dark)] hover:bg-[var(--brand)] hover:text-white",
    outline: "border-2 border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
    ghost: "text-[var(--brand)] hover:bg-[var(--brand-light)]",
    white: "bg-white text-[var(--brand-dark)] hover:bg-slate-50 shadow-xl"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };

  return (
    <button 
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
