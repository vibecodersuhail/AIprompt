import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Cpu,
  Layers,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Raw Natural Language Input',
      shortTitle: '1. User Input',
      icon: <MessageSquare size={22} color="#38bdf8" />,
      accent: '#38bdf8',
      summary: 'Accepts unstructured prompts from users describing goals in simple words.',
      details:
        'Users frequently prompt AI models with vague or under-specified inputs (e.g., "Sort numbers in Python" or "Explain French Revolution"). The system accepts free-form text without requiring special syntax.',
      codeSnippet: `Raw Input Example:
"Create a program that sorts a list of numbers and handles invalid input."`,
    },
    {
      step: '02',
      title: 'NLP Preprocessing & Cleaning',
      shortTitle: '2. Preprocessing',
      icon: <Sparkles size={22} color="#a855f7" />,
      accent: '#a855f7',
      summary: 'Lowercasing, punctuation normalization, English stop-word filtering.',
      details:
        'Text undergoes lowercasing, stop-word removal (removing noise words like "the", "and", "is"), and token boundary recognition. This reduces vocabulary sparsity and preserves high-signal keywords.',
      codeSnippet: `Tokens Extracted:
['create', 'program', 'sorts', 'list', 'numbers', 'handles', 'invalid', 'input']`,
    },
    {
      step: '03',
      title: 'TF-IDF Vectorization (10k Features)',
      shortTitle: '3. Vectorization',
      icon: <Layers size={22} color="#22d3ee" />,
      accent: '#22d3ee',
      summary: 'Transforms text into a 10,000-dimensional sparse feature vector with sublinear term frequency.',
      details:
        'Uses scikit-learn TfidfVectorizer with unigram + bigram n-gram range (1, 2) and sublinear_tf=True. Sublinear scaling replaces raw term frequency tf with 1 + log(tf), dampening dominant repetitive words.',
      codeSnippet: `TF-IDF Matrix:
Vocabulary size: 10,000 features
N-gram range: (1, 2) [unigrams + bigrams]
Output: 1 x 10000 sparse vector`,
    },
    {
      step: '04',
      title: 'LinearSVC Intent Classification',
      shortTitle: '4. ML Inference',
      icon: <Cpu size={22} color="#8b5cf6" />,
      accent: '#8b5cf6',
      summary: 'Classifies query into 1 of 5 domains via balanced-weight maximum-margin hyperplanes.',
      details:
        'Linear Support Vector Classifier (LinearSVC with class_weight="balanced") computes decision function scores across Coding, Writing, Education, Image Generation, and Data Analysis. It selects the argmax hyperplane distance.',
      codeSnippet: `Classification Output:
Predicted Class: "Coding"
Confidence Score: 0.892 (calibrated decision distance)
Evaluation: 69.55% test accuracy across 335 test samples`,
    },
    {
      step: '05',
      title: 'Structured Prompt Synthesis',
      shortTitle: '5. Refinement',
      icon: <FileCheck size={22} color="#34d399" />,
      accent: '#34d399',
      summary: 'Synthesizes persona, context, task, constraints, and validation criteria.',
      details:
        'Based on the classified intent, the refinement engine applies domain-specific prompt engineering templates to expand the input into an enterprise-ready prompt formatted in clean Markdown.',
      codeSnippet: `Refined Markdown Prompt:
### Role & Persona: Senior Software Engineer
### Context: Robust data sorting utility
### Core Task: Implement numerical sorting with input validation
### Constraints: O(n log n) complexity, type assertions, error handling`,
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 44px' }}>
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
            System Walkthrough
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '14px' }}>
            How <span className="gradient-text">SmartPrompt</span> Works
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            From unpolished input to publication-grade prompt: an academic look under the hood at every step of our machine-learning pipeline.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {steps.map((s, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{s.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Display Card */}
        <div
          className="glass-card"
          style={{
            maxWidth: '960px',
            margin: '0 auto 40px',
            padding: '32px',
            background: 'rgba(10, 15, 29, 0.85)',
            border: `1px solid ${steps[activeStep].accent}40`,
            boxShadow: `0 8px 30px -4px ${steps[activeStep].accent}20`,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Description */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: `${steps[activeStep].accent}15`,
                  border: `1px solid ${steps[activeStep].accent}40`,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: steps[activeStep].accent,
                  marginBottom: '16px',
                }}
              >
                <span>STEP {steps[activeStep].step}</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
                {steps[activeStep].title}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#ffffff',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                {steps[activeStep].summary}
              </p>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}
              >
                {steps[activeStep].details}
              </p>

              {/* Navigation controls */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="btn-secondary"
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 14px',
                    opacity: activeStep === 0 ? 0.4 : 1,
                  }}
                >
                  Previous Step
                </button>

                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="btn-primary"
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 14px',
                    opacity: activeStep === steps.length - 1 ? 0.4 : 1,
                  }}
                >
                  <span>Next Step</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column: Code / Data preview */}
            <div>
              <div
                style={{
                  background: '#04060c',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {/* Window header */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '10px 14px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span
                    style={{
                      marginLeft: '8px',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    pipeline_step_{steps[activeStep].step}.log
                  </span>
                </div>

                {/* Window content */}
                <pre
                  style={{
                    padding: '18px',
                    margin: 0,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto',
                  }}
                >
                  {steps[activeStep].codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Horizontal Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}
        >
          {steps.map((s, index) => {
            const isCurrent = activeStep === index;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(index)}
                className="glass-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isCurrent ? s.accent : 'var(--border-subtle)',
                  background: isCurrent ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: s.accent, fontFamily: 'var(--font-mono)' }}>
                    {s.step}
                  </span>
                  {s.icon}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isCurrent ? '#ffffff' : 'var(--text-secondary)' }}>
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
