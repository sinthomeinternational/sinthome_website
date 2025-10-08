import React, { useState, useRef, useEffect, useCallback, useId, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

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
  const [isMounted, setIsMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    opacity: 0,
    visibility: 'hidden',
    left: '-9999px',
    top: '-9999px',
    color: 'var(--theme-text-primary, #f4f4f5)',
    backgroundColor: 'var(--theme-bg-card, #18181b)',
    border: '1px solid var(--theme-border, #52525b)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(220, 38, 38, 0.15)',
    transition: 'opacity 200ms'
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  // Set up portal container after component mounts
  useEffect(() => {
    console.log(`[${tooltipId}] Setting up portal container`);
    setPortalContainer(document.body);
    setIsMounted(true);

    return () => {
      console.log(`[${tooltipId}] Cleaning up portal container`);
      setIsMounted(false);
    };
  }, [tooltipId]);

  const calculatePosition = useCallback(() => {
    console.log(`[${tooltipId}] === calculatePosition START ===`);

    if (!triggerRef.current || !tooltipRef.current) {
      console.log(`[${tooltipId}] Missing refs:`, {
        triggerRef: !!triggerRef.current,
        tooltipRef: !!tooltipRef.current
      });
      return null;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    console.log(`[${tooltipId}] triggerRect:`, triggerRect);

    // Force layout to get accurate dimensions
    const tooltipStyles = window.getComputedStyle(tooltipRef.current);
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const tooltipBoundingRect = tooltipRef.current.getBoundingClientRect();

    console.log(`[${tooltipId}] tooltip dimensions:`, {
      offsetWidth: tooltipWidth,
      offsetHeight: tooltipHeight,
      boundingRect: tooltipBoundingRect,
      computedDisplay: tooltipStyles.display,
      computedVisibility: tooltipStyles.visibility,
      computedPosition: tooltipStyles.position
    });

    if (tooltipWidth === 0 || tooltipHeight === 0) {
      console.log(`[${tooltipId}] Tooltip has zero dimensions - not ready`);
      return null;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    console.log(`[${tooltipId}] viewport:`, { viewportWidth, viewportHeight });

    let x = 0;
    let y = 0;

    // Calculate position relative to viewport (for fixed positioning)
    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);
        y = triggerRect.top - tooltipHeight - 8;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);
        y = triggerRect.bottom + 8;
        break;
      case 'left':
        x = triggerRect.left - tooltipWidth - 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipHeight / 2);
        break;
      case 'right':
        x = triggerRect.right + 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipHeight / 2);
        break;
    }

    console.log(`[${tooltipId}] calculated position (${position}):`, { x, y });

    // Clamp to viewport
    const originalX = x;
    const originalY = y;
    x = Math.max(8, Math.min(x, viewportWidth - tooltipWidth - 8));
    y = Math.max(8, Math.min(y, viewportHeight - tooltipHeight - 8));

    if (originalX !== x || originalY !== y) {
      console.log(`[${tooltipId}] position clamped:`, {
        original: { x: originalX, y: originalY },
        clamped: { x, y }
      });
    }

    console.log(`[${tooltipId}] === calculatePosition END ===`, { x, y });
    return { x, y };
  }, [position, tooltipId]);

  const updateTooltipPosition = useCallback(() => {
    console.log(`[${tooltipId}] updateTooltipPosition called, isVisible:`, isVisible);
    const position = calculatePosition();
    if (position && isVisible) {
      console.log(`[${tooltipId}] Setting tooltip style with position:`, position);
      const newStyle: React.CSSProperties = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: 1,
        visibility: 'visible' as const,
        position: 'fixed' as const,
        transition: 'opacity 200ms',
        color: 'var(--theme-text-primary, #f4f4f5)',
        backgroundColor: 'var(--theme-bg-card, #18181b)',
        border: '1px solid var(--theme-border, #52525b)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(220, 38, 38, 0.15)',
      };
      console.log(`[${tooltipId}] New style:`, newStyle);
      setTooltipStyle(newStyle);
    } else {
      console.log(`[${tooltipId}] Not updating position - position:`, position, 'isVisible:', isVisible);
    }
  }, [calculatePosition, isVisible, tooltipId]);

  const showTooltip = useCallback(() => {
    console.log(`[${tooltipId}] showTooltip called`);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log(`[${tooltipId}] Setting isVisible to true after delay`);
      setIsVisible(true);
    }, delay);
  }, [delay, tooltipId]);

  const hideTooltip = useCallback(() => {
    console.log(`[${tooltipId}] hideTooltip called`);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setTooltipStyle(prev => {
      const newStyle: React.CSSProperties = {
        ...prev,
        left: '-9999px',
        top: '-9999px',
        opacity: 0,
        visibility: 'hidden' as const
      };
      console.log(`[${tooltipId}] Hiding tooltip with style:`, newStyle);
      return newStyle;
    });
  }, [tooltipId]);

  // Use layout effect to position tooltip immediately after render
  useLayoutEffect(() => {
    console.log(`[${tooltipId}] useLayoutEffect triggered, isVisible:`, isVisible);
    if (isVisible) {
      console.log(`[${tooltipId}] Calling updateTooltipPosition from useLayoutEffect`);
      updateTooltipPosition();
    }
  }, [isVisible, updateTooltipPosition, tooltipId]);

  // Update position on scroll/resize
  useEffect(() => {
    console.log(`[${tooltipId}] useEffect scroll/resize triggered, isVisible:`, isVisible);
    if (isVisible) {
      const handleUpdate = () => {
        console.log(`[${tooltipId}] Scroll/resize event fired`);
        updateTooltipPosition();
      };

      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);

      console.log(`[${tooltipId}] Added scroll/resize event listeners`);

      return () => {
        console.log(`[${tooltipId}] Removing scroll/resize event listeners`);
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }
  }, [isVisible, updateTooltipPosition, tooltipId]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Create tooltip element
  const tooltipElement = isMounted && portalContainer && (
    <div
      ref={tooltipRef}
      id={tooltipId}
      role="tooltip"
      className="z-[9999] px-3 py-2 text-sm rounded-lg shadow-2xl backdrop-blur-sm max-w-xs sm:max-w-sm pointer-events-none"
      style={tooltipStyle}
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
  );

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
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </span>

      {/* Render tooltip via portal to document.body */}
      {portalContainer && tooltipElement && createPortal(tooltipElement, portalContainer)}
    </>
  );
}