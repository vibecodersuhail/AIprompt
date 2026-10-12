import React from 'react';

export const MLStatusBadge: React.FC = () => {
  return (
    <aside
      className="ml-intent-engine-pill"
      style={{
        position: 'fixed',
        bottom: '18px',
        left: '18px',
        zIndex: 35,
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '5px 12px',
        borderRadius: '100px',
        background: 'rgba(10, 15, 29, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
        fontSize: '0.725rem',
        color: 'var(--text-muted)',
        pointerEvents: 'auto',
        userSelect: 'none',
        transition: 'all 0.2s ease',
      }}
      title="NLP Intent Classification Pipeline: LinearSVC (balanced) · 10,000 TF-IDF features"
      aria-label="ML Intent Engine status"
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#22d3ee',
          boxShadow: '0 0 6px rgba(34, 211, 238, 0.7)',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
        ML Intent Engine
      </span>
      <span style={{ color: 'rgba(255, 255, 255, 0.18)' }}>·</span>
      <span style={{ color: 'var(--text-muted)' }}>
        LinearSVC · TF-IDF
      </span>
    </aside>
  );
};
