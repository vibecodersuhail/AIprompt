import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LaunchAnimationProps {
  onComplete: () => void;
}

export const LaunchAnimation: React.FC<LaunchAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'enter' | 'shimmer' | 'exit'>('enter');
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      return !mediaQuery.matches;
    }
    return true;
  });

  useEffect(() => {
    if (!visible) {
      onComplete();
      return;
    }

    // Sequence timing
    // 0ms: enter (scale 92% -> 100%, opacity 0 -> 1)
    // 450ms: shimmer passes through
    const shimmerTimer = setTimeout(() => {
      setStage('shimmer');
    }, 450);

    // 1250ms: begin smooth fade out
    const exitTimer = setTimeout(() => {
      setStage('exit');
    }, 1250);

    // 1650ms: complete and unmount
    const finishTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1650);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete, visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#05060a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: stage === 'exit' ? 0 : 1,
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: stage === 'exit' ? 'none' : 'auto',
      }}
      aria-label="SmartPrompt launch sequence"
      role="status"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '24px',
          maxWidth: '420px',
          transform: stage === 'enter' ? 'scale(0.92)' : 'scale(1)',
          opacity: 1,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Glow halo behind logo */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(34, 211, 238, 0.15) 50%, transparent 75%)',
            filter: 'blur(28px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* SmartPrompt Emblem */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #22D3EE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Sparkles size={34} color="#ffffff" />

          {/* Shimmer light sweep bar across logo */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%)',
              transform: stage === 'enter' ? 'translateX(-120%)' : 'translateX(120%)',
              transition: 'transform 0.75s ease-in-out',
            }}
          />
        </div>

        {/* Brand Name */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.9rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            color: '#ffffff',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Smart<span className="gradient-text">Prompt</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0,
            lineHeight: 1.4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Understand your intent. Generate smarter prompts.
        </p>

        {/* Small subtle status indicator */}
        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22d3ee',
              boxShadow: '0 0 8px #22d3ee',
            }}
          />
          <span>LinearSVC &bull; TF-IDF ML Pipeline</span>
        </div>
      </div>
    </div>
  );
};
