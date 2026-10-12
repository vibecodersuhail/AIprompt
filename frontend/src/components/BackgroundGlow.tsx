import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="ambient-bg" aria-hidden="true">
      {/* Subtle Grid Texture */}
      <div className="ambient-grid" />

      {/* Aurora Light Glow Orbs */}
      <div className="ambient-orb ambient-orb-violet" />
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-pink" />
    </div>
  );
};
