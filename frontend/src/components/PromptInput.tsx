import React from 'react';
import { Trash2, Wand2, Sparkles, Code2, PenTool, BookOpen, Image as ImageIcon, BarChart3, Shuffle } from 'lucide-react';
import type { CategoryDetail } from '../types';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: CategoryDetail[];
  isLoading: boolean;
  onSubmit: () => void;
  onClear: () => void;
  error: string | null;
}

const SAMPLE_PRESETS = [
  {
    category: 'Coding',
    text: 'Write a Python script to implement an LRU Cache with O(1) get and put time complexity'
  },
  {
    category: 'Image Generation',
    text: 'A cinematic hyperrealistic portrait of an elderly astronaut on Mars, volumetric sunset lighting, 85mm lens --ar 16:9'
  },
  {
    category: 'Writing',
    text: 'Write an inspirational speech about embracing vulnerability and overcoming failure for graduating college seniors'
  },
  {
    category: 'Data Analysis',
    text: 'Perform exploratory data analysis on a customer churn dataset in Pandas, calculate correlation, and train a Random Forest'
  },
  {
    category: 'Education',
    text: 'Explain quantum entanglement and Einstein spooky action at a distance for high school physics students'
  }
];

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  selectedCategory,
  setSelectedCategory,
  categories,
  isLoading,
  onSubmit,
  onClear,
  error
}) => {
  const getIcon = (catName: string) => {
    switch (catName) {
      case 'Coding': return <Code2 size={15} />;
      case 'Writing': return <PenTool size={15} />;
      case 'Education': return <BookOpen size={15} />;
      case 'Image Generation': return <ImageIcon size={15} />;
      case 'Data Analysis': return <BarChart3 size={15} />;
      default: return <Wand2 size={15} />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!isLoading && prompt.trim().length >= 2) {
        onSubmit();
      }
    }
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wand2 size={20} color="var(--primary)" />
            <span>Input Prompt</span>
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Enter your basic query. Our ML model classifies the intent and generates an optimized prompt.
          </p>
        </div>

        {/* Clear Button */}
        {prompt.length > 0 && (
          <button
            onClick={onClear}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            title="Clear prompt"
          >
            <Trash2 size={14} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Preset Chips */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Shuffle size={13} color="var(--text-muted)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Quick Sample Presets:
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(p.text);
                setSelectedCategory('auto');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                e.currentTarget.style.color = '#c7d2fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {getIcon(p.category)}
              <span>{p.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Area */}
      <div style={{ position: 'relative', marginBottom: '18px' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g., Write a python function to scrape a news website with error handling and rate limiting..."
          rows={6}
          style={{
            width: '100%',
            background: 'var(--bg-input)',
            border: error ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '16px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            lineHeight: 1.6
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Press <strong>Ctrl + Enter</strong> to optimize</span>
          <span>{prompt.length} characters</span>
        </div>
      </div>

      {/* Category selector / Override */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Intent Category Routing:
          </label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {selectedCategory === 'auto' ? 'Auto (Classified by Linear SVM)' : `Manual Override: ${selectedCategory}`}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {/* Auto Mode */}
          <button
            onClick={() => setSelectedCategory('auto')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              border: selectedCategory === 'auto'
                ? '1px solid var(--primary)'
                : '1px solid var(--border-subtle)',
              background: selectedCategory === 'auto'
                ? 'rgba(99, 102, 241, 0.2)'
                : 'rgba(255, 255, 255, 0.03)',
              color: selectedCategory === 'auto' ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            <Sparkles size={14} color={selectedCategory === 'auto' ? '#a5b4fc' : 'var(--text-muted)'} />
            <span>Auto-Detect (ML)</span>
          </button>

          {/* 5 Categories */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                  border: isSelected
                    ? '1px solid var(--primary)'
                    : '1px solid var(--border-subtle)',
                  background: isSelected
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                {getIcon(cat.name)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          fontSize: '0.85rem',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={isLoading || prompt.trim().length < 2}
        className="btn-primary"
        style={{ width: '100%', padding: '14px 20px', fontSize: '0.95rem' }}
      >
        {isLoading ? (
          <>
            <div className="animate-spin" style={{
              width: '18px',
              height: '18px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#ffffff',
              borderRadius: '50%'
            }} />
            <span>Classifying Intent & Generating Prompt...</span>
          </>
        ) : (
          <>
            <Wand2 size={18} />
            <span>Generate Optimized Prompt</span>
          </>
        )}
      </button>
    </div>
  );
};
