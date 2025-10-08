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
    if (!triggerRef.current || !mounted) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();

    // Wait for tooltip to be rendered and get actual dimensions
    if (!tooltipRef.current) {
      // If tooltip isn't ready yet, try again shortly
      setTimeout(() => updateTooltipPosition(), 20);
      return;
    }

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width || 320; // fallback to max-w-xs
    const tooltipHeight = tooltipRect.height || 100; // fallback estimate

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.pageXOffset || window.scrollX;
    const scrollY = window.pageYOffset || window.scrollY;

    let x = 0;
    let y = 0;

    // Calculate position relative to viewport
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
    const minX = 8;
    const maxX = viewportWidth - tooltipWidth - 8;
    const minY = 8;
    const maxY = viewportHeight - tooltipHeight - 8;

    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));

    setTooltipPosition({ x, y });
  }, [position, mounted]);

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setMounted(true);
      // Don't update position immediately - wait for render
    }, delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setMounted(false);
  }, []);

  useEffect(() => {
    if (isVisible && mounted) {
      // Use requestAnimationFrame to ensure DOM has updated
      const rafId = requestAnimationFrame(() => {
        updateTooltipPosition();
        // Update again shortly after to ensure correct positioning
        setTimeout(() => {
          updateTooltipPosition();
        }, 50);
      });

      window.addEventListener('scroll', updateTooltipPosition);
      window.addEventListener('resize', updateTooltipPosition);

      return () => {
        cancelAnimationFrame(rafId);
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