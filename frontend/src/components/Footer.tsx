import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: '#030407',
        paddingTop: '48px',
        paddingBottom: '32px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {/* Logo & Brand */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg, #8B5CF6, #22D3EE)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={16} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                Smart<span style={{ color: 'var(--secondary)' }}>Prompt</span>
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              University Data Science &amp; NLP Capstone Project. End-to-end intent classification and prompt synthesis pipeline using LinearSVC and scikit-learn.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <a href="#generator" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Generator
            </a>
            <a href="#categories" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Categories
            </a>
            <a href="#pipeline" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Pipeline
            </a>
            <a href="#how-it-works" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              How It Works
            </a>
            <a href="#evaluation" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Evaluation
            </a>
            <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              About
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="Scroll back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Divider & Metadata Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            &copy; {CURRENT_YEAR} SmartPrompt · Academic NLP Capstone · Model: LinearSVC (Balanced, 69.55% Acc)
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Split: 80/20 Stratified</span>
            <span>•</span>
            <span>Test N: 335</span>
            <span>•</span>
            <span>TF-IDF: 10,000 Features</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
