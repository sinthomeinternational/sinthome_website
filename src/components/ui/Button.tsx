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
  const baseClasses = 'font-semibold transition-all duration-300 inline-flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black';

  // Accessibility: Enhanced color contrast for WCAG 2.1 AA compliance
  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:bg-red-700',
    secondary: 'bg-zinc-700 text-zinc-100 hover:bg-zinc-600 active:bg-zinc-800 focus:bg-zinc-600', // Improved contrast
    outline: 'border-2 border-zinc-300 text-zinc-100 hover:bg-zinc-300 hover:text-black focus:bg-zinc-300 focus:text-black', // Better contrast
    ghost: 'text-zinc-100 hover:bg-zinc-800 active:bg-zinc-700 focus:bg-zinc-800', // Improved contrast
    danger: 'bg-red-800 text-red-100 hover:bg-red-700 border border-red-600 hover:border-red-500 focus:bg-red-700' // Better contrast
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