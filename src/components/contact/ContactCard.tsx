import React from 'react';
import { motion } from 'motion/react';

interface ContactCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  href?: string;
  isEmail?: boolean;
}

export default function ContactCard({
  title,
  subtitle,
  icon,
  color,
  onClick,
  href,
  isEmail = false
}: ContactCardProps) {
  const cardContent = (
    <>
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent)` }}
      />

      {/* Card content */}
      <div className="relative backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" style={{ backgroundColor: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)' }}>
        <div className="flex items-start gap-4">
          {/* Icon container */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              boxShadow: `0 0 20px ${color}20`
            }}
          >
            {icon}
          </div>

          {/* Text content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 transition-colors" style={{ color: 'var(--theme-text-primary)' }}>
              {title}
            </h3>
            <p className="text-sm transition-colors" style={{ color: 'var(--theme-text-secondary)' }}>
              {subtitle}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className="transition-all duration-300 group-hover:translate-x-1" style={{ color: 'var(--theme-text-muted)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );

  const baseClasses = "relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";

  if (isEmail && href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -2 }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      {cardContent}
    </motion.div>
  );
}