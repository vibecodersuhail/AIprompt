import React from 'react';
import { ArrowRight, Cpu, CheckCircle2, Terminal } from 'lucide-react';

interface HeroProps {
  onStartGenerating: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartGenerating, onLearnMore }) => {
  return (
    <section
      id="home"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px' }}>
          {/* Academic / ML Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '9999px',
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              marginBottom: '20px',
            }}
          >
            <Cpu size={14} color="#a78bfa" />
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#c4b5fd',
                letterSpacing: '0.02em',
              }}
            >
              LinearSVC + TF-IDF (10,000 Features) · Intent Classifier
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '20px',
            }}
          >
            Turn Your Ideas Into <span className="gradient-text">Smarter Prompts</span>
          </h1>

          {/* Supporting Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 32px',
            }}
          >
            SmartPrompt uses machine learning to understand your intent and transform everyday requests into structured, high-quality prompts.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onStartGenerating}
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '14px 28px' }}
            >
              <span>Generate a Prompt</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onLearnMore}
              className="btn-secondary"
              style={{ fontSize: '1rem', padding: '14px 24px' }}
            >
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Visual Preview Transformation Card */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            className="glass-card"
            style={{
              padding: '28px',
              background: 'rgba(10, 15, 29, 0.75)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={16} color="var(--primary)" />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Interactive Pipeline Preview (Illustrative Example)
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                Zero-Shot Intent Routing
              </div>
            </div>

            {/* Split Grid: Raw Input vs Detected Intent & Output */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {/* Left Column: Raw User Prompt */}
              <div
                style={{
                  background: 'rgba(5, 6, 10, 0.7)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                      letterSpacing: '0.03em',
                    }}
                  >
                    1. Natural Language Input
                  </div>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#ffffff',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    &ldquo;Analyze my customer sales data and find important trends.&rdquo;
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Text tokens extracted: <code>['analyze', 'customer', 'sales', 'data', 'trends']</code>
                </div>
              </div>

              {/* Middle Arrow / Transform indicator */}
              <div
                style={{
                  background: 'rgba(17, 24, 44, 0.85)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(34, 211, 238, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Detected Intent Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    2. ML Intent Classification
                  </div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#6ee7b7',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle2 size={13} />
                    Data Analysis
                  </span>
                </div>

                {/* Structured Output Snippet */}
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      letterSpacing: '0.03em',
                    }}
                  >
                    3. Generated Structured Prompt
                  </div>
                  <div
                    style={{
                      background: '#05060a',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.8rem',
                      color: '#e2e8f0',
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1.5,
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span style={{ color: '#818cf8' }}>### Role &amp; Persona</span><br />
                    Act as a Lead Data Scientist and Analytics Director...<br />
                    <span style={{ color: '#818cf8' }}>### Methodology</span><br />
                    1. Clean and validate transaction columns...<br />
                    2. Perform monthly cohort aggregations...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
