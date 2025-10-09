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

  // Use CSS variables for theme-aware styling
  const variantStyles = {
    primary: {
      backgroundColor: '#dc2626',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'var(--theme-bg-secondary)',
      color: 'var(--theme-text-primary)',
      border: '1px solid var(--theme-border)'
    },
    outline: {
      border: '2px solid var(--theme-border)',
      color: 'var(--theme-text-primary)',
      backgroundColor: 'transparent'
    },
    ghost: {
      color: 'var(--theme-text-primary)',
      backgroundColor: 'transparent'
    },
    danger: {
      backgroundColor: 'rgba(185, 28, 28, 0.3)',
      color: '#f87171',
      border: '1px solid rgba(220, 38, 38, 0.3)'
    }
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
        `button-${variant}`, // Add variant class for CSS hover effects
        sizeClasses[size],
        widthClass,
        className
      )}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;