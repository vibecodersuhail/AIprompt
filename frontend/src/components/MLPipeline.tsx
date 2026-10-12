import React from 'react';
import { PIPELINE_STAGES } from '../constants';
import { Terminal, Filter, Binary, Cpu, Wand2, CheckSquare } from 'lucide-react';

export const MLPipeline: React.FC = () => {
  const getStageIcon = (step: string) => {
    switch (step) {
      case '01': return <Terminal size={20} color="#38bdf8" />;
      case '02': return <Filter size={20} color="#a855f7" />;
      case '03': return <Binary size={20} color="#22d3ee" />;
      case '04': return <Cpu size={20} color="#8b5cf6" />;
      case '05': return <Wand2 size={20} color="#f472b6" />;
      case '06': return <CheckSquare size={20} color="#34d399" />;
      default: return <Cpu size={20} />;
    }
  };

  return (
    <section
      id="pipeline"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--secondary)',
              marginBottom: '12px',
            }}
          >
            End-to-End System Architecture
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '16px' }}>
            Powered by <span className="gradient-text">Machine Learning</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            A transparent Data Science pipeline separating machine-learning intent classification from domain-tailored prompt synthesis.
          </p>
        </div>

        {/* 6-Stage Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {PIPELINE_STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                {/* Step number and badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getStageIcon(stage.step)}
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--text-accent)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                    }}
                  >
                    {stage.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                  <span style={{ color: 'var(--secondary)', marginRight: '6px', fontFamily: 'var(--font-mono)' }}>
                    {stage.step}.
                  </span>
                  {stage.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {stage.description}
                </p>
              </div>

              {/* Progress footer */}
              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Stage {idx + 1} of 6</span>
                {idx === 3 && (
                  <span style={{ color: '#22d3ee', fontWeight: 600 }}>Core Classifier</span>
                )}
                {idx === 4 && (
                  <span style={{ color: '#f472b6', fontWeight: 600 }}>Refinement Engine</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Callout Card */}
        <div
          style={{
            background: 'rgba(139, 92, 246, 0.07)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.2)',
              marginTop: '2px',
            }}
          >
            <Cpu size={20} color="#c4b5fd" />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px', color: '#ffffff' }}>
              Academic Design Distinction: Classification vs. Generation
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              In this architecture, the <strong>LinearSVC</strong> model is responsible strictly for <strong>Intent Classification</strong> (determining which of the 5 domains applies). Once the intent category is determined, the <strong>Prompt Refinement Engine</strong> constructs the structured deliverable with domain-specific engineering guardrails.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
