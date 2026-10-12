import React from 'react';
import {
  GraduationCap,
  Code,
  CheckCircle,
  Cpu,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const techStack = [
    { name: 'Python 3.11', category: 'Backend Engine' },
    { name: 'FastAPI', category: 'High-Performance API' },
    { name: 'Scikit-Learn', category: 'Machine Learning' },
    { name: 'LinearSVC', category: 'Support Vector Classifier' },
    { name: 'TF-IDF Vectorizer', category: 'Sublinear N-Gram Features' },
    { name: 'Joblib', category: 'Model Serialization' },
    { name: 'React 19', category: 'Modern Frontend UI' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Vite', category: 'Next-Gen Build Tool' },
  ];

  return (
    <section
      id="about"
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
              marginBottom: '10px',
            }}
          >
            Academic Capstone
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '14px' }}>
            About <span className="gradient-text">SmartPrompt</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            A university Data Science and Natural Language Processing project bridging statistical machine learning with generative AI engineering.
          </p>
        </div>

        {/* 2-Column Overview Card */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            marginBottom: '32px',
            background: 'rgba(10, 15, 29, 0.85)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
            }}
          >
            {/* Left Column: Problem & Vision */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <GraduationCap size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>
                  Problem Statement &amp; Motivation
                </h3>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Large Language Models produce drastically higher quality outputs when prompts contain explicit personas, clear task parameters, and structured guardrails. However, standard everyday users query LLMs with vague, 5-to-15 word fragments.
              </p>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                <strong>SmartPrompt</strong> acts as an intelligent middleware. Instead of relying on expensive external API calls for basic categorization, it deploys a locally trained statistical <strong>Linear Support Vector Classifier</strong> to accurately identify user intent in single-digit milliseconds, then constructs domain-engineered prompt specifications.
              </p>

              <div
                style={{
                  padding: '14px 18px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '8px',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c4b5fd', marginBottom: '4px' }}>
                  Project Methodology
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Cleaned dataset of 1,671 curated prompt-refinement pairs. Evaluated with 80/20 stratified split (1,336 train, 335 test) and seed 42 to ensure zero train-test leakage.
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Highlights */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Cpu size={22} color="#22d3ee" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>
                  System Architecture
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: '#ffffff' }}>Scikit-Learn NLP Pipeline:</strong>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      10,000 TF-IDF features with unigram + bigram n-grams and sublinear frequency weighting.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: '#ffffff' }}>Maximum-Margin LinearSVC:</strong>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Balanced class weights to account for class distribution skew across 5 intent domains.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: '#ffffff' }}>FastAPI Inference Engine:</strong>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Asynchronous REST API delivering inference in under 30 milliseconds with CORS and input validation.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: '#ffffff' }}>Modular Prompt Synthesis:</strong>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      5-component structured output format (Persona, Context, Task, Constraints, Output Format).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Production Technologies &amp; Libraries
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {techStack.map((tech) => (
              <div
                key={tech.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Code size={14} color="var(--secondary)" />
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#ffffff' }}>
                  {tech.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  ({tech.category})
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
