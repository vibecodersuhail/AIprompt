import React from 'react';
import { Wand2, Trash2, Sparkles, AlertCircle, Code2, PenTool, BookOpen, Image as ImageIcon, BarChart3, CornerDownLeft } from 'lucide-react';
import { SAMPLE_PROMPTS } from '../constants';

interface GeneratorSectionProps {
  prompt: string;
  setPrompt: (text: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
  onClear: () => void;
  error: string | null;
}

export const GeneratorSection: React.FC<GeneratorSectionProps> = ({
  prompt,
  setPrompt,
  selectedCategory,
  setSelectedCategory,
  isLoading,
  onGenerate,
  onClear,
  error,
}) => {
  const categories = [
    { id: 'auto', label: 'Auto Intent (ML Model)' },
    { id: 'Coding', label: 'Coding' },
    { id: 'Writing', label: 'Writing' },
    { id: 'Education', label: 'Education' },
    { id: 'Image Generation', label: 'Image Generation' },
    { id: 'Data Analysis', label: 'Data Analysis' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!isLoading && prompt.trim().length >= 2) {
        onGenerate();
      }
    }
  };

  const getSampleIcon = (category: string) => {
    switch (category) {
      case 'Coding': return <Code2 size={14} color="#3b82f6" />;
      case 'Writing': return <PenTool size={14} color="#8b5cf6" />;
      case 'Education': return <BookOpen size={14} color="#f59e0b" />;
      case 'Image Generation': return <ImageIcon size={14} color="#ec4899" />;
      case 'Data Analysis': return <BarChart3 size={14} color="#10b981" />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <section
      id="generator"
      style={{
        paddingTop: '64px',
        paddingBottom: '64px',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
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
            Live NLP Inference
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '12px' }}>
            What do you want to accomplish?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Describe your idea or task in natural language. Our machine-learning pipeline will classify the intent and engineer a structured, production-ready prompt.
          </p>
        </div>

        {/* Input Card Container */}
        <div
          className="glass-card"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '28px',
            background: 'rgba(10, 15, 29, 0.85)',
            border: '1px solid rgba(139, 92, 246, 0.28)',
          }}
        >
          {/* Header Row: Label + Clear Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wand2 size={18} color="var(--primary)" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                Enter Natural Language Request
              </span>
            </div>

            {prompt.length > 0 && (
              <button
                onClick={onClear}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                title="Clear input textarea"
              >
                <Trash2 size={13} />
                <span>Clear Input</span>
              </button>
            )}
          </div>

          {/* Textarea Input */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want AI to help you with..."
              rows={5}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                resize: 'vertical',
                minHeight: '140px',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              aria-label="Natural Language Prompt Input"
            />

            {/* Character Count */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '16px',
                fontSize: '0.75rem',
                color: prompt.length > 500 ? 'var(--primary)' : 'var(--text-muted)',
                background: 'rgba(5, 6, 10, 0.75)',
                padding: '2px 8px',
                borderRadius: '6px',
                pointerEvents: 'none',
              }}
            >
              {prompt.length} characters
            </div>
          </div>

          {/* Sample Prompts Chips */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '10px',
              }}
            >
              Click a Verified Sample to Test:
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {SAMPLE_PROMPTS.map((sample) => (
                <button
                  key={sample.category}
                  onClick={() => setPrompt(sample.text)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.775rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                  title={sample.text}
                >
                  {getSampleIcon(sample.category)}
                  <strong>{sample.category}:</strong>
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Category Override Selector */}
          <div
            style={{
              marginBottom: '24px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Optional Intent Override (Defaults to ML Prediction):
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Keep on &ldquo;Auto&rdquo; to test model accuracy
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map((c) => {
                const isSelected = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message Banner */}
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#fca5a5',
                fontSize: '0.85rem',
              }}
              role="alert"
            >
              <AlertCircle size={18} color="#ef4444" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Row: Generate Button + Keyboard Hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <CornerDownLeft size={14} />
              <span>Press <strong>Ctrl + Enter</strong> to analyze and generate prompt</span>
            </div>

            <button
              onClick={onGenerate}
              disabled={isLoading || prompt.trim().length < 2}
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                minWidth: '220px',
              }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin" style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                  }} />
                  <span>Analyzing your prompt...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Analyze &amp; Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
