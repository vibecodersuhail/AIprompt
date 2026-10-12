import React from 'react';
import { INTENT_CATEGORIES, SAMPLE_PROMPTS } from '../constants';
import { Code2, PenTool, BookOpen, Image as ImageIcon, BarChart3, ArrowUpRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectSample: (text: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectSample }) => {
  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={24} color={color} />;
      case 'PenTool': return <PenTool size={24} color={color} />;
      case 'BookOpen': return <BookOpen size={24} color={color} />;
      case 'ImageIcon': return <ImageIcon size={24} color={color} />;
      case 'BarChart3': return <BarChart3 size={24} color={color} />;
      default: return <Code2 size={24} color={color} />;
    }
  };

  return (
    <section
      id="categories"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--primary)',
              marginBottom: '12px',
            }}
          >
            Multi-Class Intent Taxonomy
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '16px' }}>
            Five Specialized <span className="gradient-text">Intent Categories</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Each intent category maps to a dedicated prompt-engineering structure engineered for modern frontier AI models.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {INTENT_CATEGORIES.map((cat) => {
            const sample = SAMPLE_PROMPTS.find((p) => p.category === cat.name);
            return (
              <div
                key={cat.name}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${cat.badgeColor}`,
                }}
              >
                <div>
                  {/* Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `rgba(255, 255, 255, 0.04)`,
                      border: `1px solid ${cat.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {getIcon(cat.iconName, cat.badgeColor)}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
                    {cat.name}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: cat.badgeColor,
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {cat.tagline}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                    {cat.description}
                  </p>
                </div>

                {/* Interactive Preset Action */}
                {sample && (
                  <button
                    onClick={() => onSelectSample(sample.text)}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      fontSize: '0.775rem',
                    }}
                    title={`Load "${sample.title}" sample`}
                  >
                    <span>Try Sample Query</span>
                    <ArrowUpRight size={14} color={cat.badgeColor} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
