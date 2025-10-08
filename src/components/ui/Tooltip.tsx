import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({
  children,
  content,
  className = '',
  delay = 200,
  position = 'top'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = useCallback(() => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();

    // Calculate estimated tooltip dimensions if not yet mounted
    let tooltipWidth = 320; // max-w-xs default
    let tooltipHeight = 100; // estimated height

    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      tooltipWidth = tooltipRect.width;
      tooltipHeight = tooltipRect.height;
    }
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);
        y = triggerRect.top - tooltipHeight - 12;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);
        y = triggerRect.bottom + 12;
        break;
      case 'left':
        x = triggerRect.left - tooltipWidth - 12;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipHeight / 2);
        break;
      case 'right':
        x = triggerRect.right + 12;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipHeight / 2);
        break;
    }

    // Keep tooltip within viewport bounds
    if (x < 8) x = 8;
    if (x + tooltipWidth > viewportWidth - 8) {
      x = viewportWidth - tooltipWidth - 8;
    }
    if (y < 8) y = 8;
    if (y + tooltipHeight > viewportHeight - 8) {
      y = viewportHeight - tooltipHeight - 8;
    }

    setTooltipPosition({ x, y });
  }, [position]);

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setMounted(true);
      updateTooltipPosition();
    }, delay);
  }, [delay, updateTooltipPosition]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible && mounted) {
      // Update position after tooltip is rendered
      const timer = setTimeout(() => {
        updateTooltipPosition();
      }, 10);

      window.addEventListener('scroll', updateTooltipPosition);
      window.addEventListener('resize', updateTooltipPosition);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', updateTooltipPosition);
        window.removeEventListener('resize', updateTooltipPosition);
      };
    }
  }, [isVisible, mounted, updateTooltipPosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <span
        ref={triggerRef}
        className={`relative inline-block cursor-help border-b border-dotted border-red-400/60 hover:border-red-400 transition-colors duration-200 ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        role="button"
        aria-describedby={isVisible ? 'tooltip' : undefined}
      >
        {children}
      </span>

      {/* Portal-style tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className="fixed z-50 px-3 py-2 text-sm rounded-lg shadow-2xl backdrop-blur-sm transition-opacity duration-200 max-w-xs sm:max-w-sm pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            color: 'var(--theme-text-primary, #f4f4f5)',
            backgroundColor: 'var(--theme-bg-card, #18181b)',
            border: '1px solid var(--theme-border, #52525b)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(220, 38, 38, 0.15)',
          }}
        >
          {content}

          {/* Arrow indicator */}
          <div
            className="absolute w-2 h-2 transform rotate-45"
            style={{
              backgroundColor: 'var(--theme-bg-card, #18181b)',
              borderColor: 'var(--theme-border, #52525b)',
              borderWidth: '1px',
              borderStyle: 'solid',
              ...(position === 'top' && {
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                borderTop: 'none',
                borderLeft: 'none'
              }),
              ...(position === 'bottom' && {
                top: '-5px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                borderBottom: 'none',
                borderRight: 'none'
              }),
              ...(position === 'left' && {
                right: '-5px',
                top: '50%',
                transform: 'translateY(-50%) rotate(45deg)',
                borderTop: 'none',
                borderLeft: 'none'
              }),
              ...(position === 'right' && {
                left: '-5px',
                top: '50%',
                transform: 'translateY(-50%) rotate(45deg)',
                borderBottom: 'none',
                borderRight: 'none'
              }),
            }}
          />
        </div>
      )}
    </>
  );
}