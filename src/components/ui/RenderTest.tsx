import React, { useEffect, useState } from 'react';

interface RenderTestProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component to test if rendering is working in a specific container
 */
export default function RenderTest({ name, className, style }: RenderTestProps) {
  const [mounted, setMounted] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toLocaleTimeString());
    console.log(`🔍 RenderTest "${name}" mounted at`, timestamp);

    const interval = setInterval(() => {
      console.log(`💫 RenderTest "${name}" is alive at`, new Date().toLocaleTimeString());
    }, 5000);

    return () => {
      clearInterval(interval);
      console.log(`👋 RenderTest "${name}" unmounted`);
    };
  }, [name]);

  return (
    <div
      className={className}
      style={{
        ...style,
        background: 'linear-gradient(45deg, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1))',
        border: '2px dashed rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontFamily: 'monospace',
        color: 'white',
        textAlign: 'center' as const,
        padding: '8px',
        animation: 'pulse 2s infinite'
      }}
    >
      <div>
        <div>{name}</div>
        <div>✅ Rendered</div>
        <div>{mounted ? timestamp : 'Loading...'}</div>
        <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px' }}>
          If you see this, the container is working
        </div>
      </div>
    </div>
  );
}