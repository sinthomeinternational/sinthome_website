import React from 'react';
import clsx from 'clsx';

/**
 * Button component with multiple variants and sizes
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'font-semibold transition-all duration-300 inline-flex items-center justify-center rounded-lg';

  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 active:bg-zinc-900',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-black',
    ghost: 'text-white hover:bg-white/10 active:bg-white/20',
    danger: 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-600/30 hover:border-red-600/50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;