import React, { useState } from 'react';
import { Copy, Check, Sparkles, CheckCircle2, AlertCircle, Layers, Lightbulb, FileText, Clock } from 'lucide-react';
import type { PromptResponse } from '../types';

interface PromptOutputProps {
  result: PromptResponse | null;
  isLoading: boolean;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({ result, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'full' | 'breakdown' | 'suggestions'>('full');

  if (isLoading) {
    return (
      <div className="glass-card" style={{
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center'
      }}>
        <div className="animate-spin" style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          marginBottom: '20px'
        }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
          Running NLP Intent Inference
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>
          TF-IDF Vectorizer is extracting n-grams, Linear SVM is calculating decision boundary margins, and the prompt refinement engine is applying domain templates...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-card" style={{
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center',
        borderStyle: 'dashed'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <Sparkles size={24} color="var(--text-muted)" />
        </div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Optimized Prompt Will Appear Here
        </h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', maxWidth: '340px' }}>
          Enter a prompt in the input panel and click <strong>Generate Optimized Prompt</strong> to see the classified intent and prompt structure.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.refined_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Coding': return { bg: 'rgba(59, 130, 246, 0.15)', text: '#93c5fd', border: 'rgba(59, 130, 246, 0.4)' };
      case 'Writing': return { bg: 'rgba(168, 85, 247, 0.15)', text: '#d8b4fe', border: 'rgba(168, 85, 247, 0.4)' };
      case 'Education': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fcd34d', border: 'rgba(245, 158, 11, 0.4)' };
      case 'Image Generation': return { bg: 'rgba(244, 63, 94, 0.15)', text: '#fda4af', border: 'rgba(244, 63, 94, 0.4)' };
      case 'Data Analysis': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#6ee7b7', border: 'rgba(16, 185, 129, 0.4)' };
      default: return { bg: 'rgba(99, 102, 241, 0.15)', text: '#c7d2fe', border: 'rgba(99, 102, 241, 0.4)' };
    }
  };

  const catStyle = getCategoryColor(result.applied_intent);

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      {/* Header Banner: Prediction & Confidence */}
      <div style={{
        background: 'rgba(12, 19, 34, 0.8)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Classified Intent
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '8px',
                background: catStyle.bg,
                color: catStyle.text,
                border: `1px solid ${catStyle.border}`
              }}>
                {result.applied_intent}
              </span>
              {result.is_overridden && (
                <span style={{ fontSize: '0.75rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={13} />
                  <span>Manual override (Model predicted: {result.detected_intent})</span>
                </span>
              )}
            </div>
          </div>

          {/* Confidence Meter */}
          <div style={{ minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Calibrated Confidence:</span>
              <span style={{ fontWeight: 700, color: '#38bdf8' }}>
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${Math.min(100, Math.max(10, result.confidence * 100))}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
                borderRadius: '3px',
                transition: 'width 0.4s ease'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <Clock size={11} />
              <span>Inference: {result.processing_time_ms} ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Copy Action */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('full')}
            style={{
              background: activeTab === 'full' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              border: activeTab === 'full' ? '1px solid var(--primary)' : '1px solid transparent',
              color: activeTab === 'full' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={14} />
            <span>Optimized Prompt</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            style={{
              background: activeTab === 'breakdown' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              border: activeTab === 'breakdown' ? '1px solid var(--primary)' : '1px solid transparent',
              color: activeTab === 'breakdown' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers size={14} />
            <span>Structure Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('suggestions')}
            style={{
              background: activeTab === 'suggestions' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              border: activeTab === 'suggestions' ? '1px solid var(--primary)' : '1px solid transparent',
              color: activeTab === 'suggestions' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lightbulb size={14} />
            <span>Suggestions ({result.suggestions.length})</span>
          </button>
        </div>

        {/* Copy Prompt Button */}
        <button
          onClick={handleCopy}
          className="btn-primary"
          style={{
            padding: '8px 16px',
            fontSize: '0.825rem',
            background: copied ? '#10b981' : undefined
          }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Prompt'}</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'full' && (
        <div style={{ position: 'relative' }}>
          <pre style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '20px',
            fontSize: '0.875rem',
            color: '#e2e8f0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '440px',
            overflowY: 'auto',
            lineHeight: 1.65
          }}>
            {result.refined_prompt}
          </pre>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '440px', overflowY: 'auto' }}>
          <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>1. Role & Persona</span>
            <p style={{ fontSize: '0.875rem', color: '#f8fafc', marginTop: '4px' }}>{result.structured_breakdown.persona}</p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>2. Context & Objective</span>
            <p style={{ fontSize: '0.875rem', color: '#f8fafc', marginTop: '4px' }}>{result.structured_breakdown.context}</p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>3. Specific Tasks</span>
            <pre style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{result.structured_breakdown.task}</pre>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>4. Constraints & Guardrails</span>
            <pre style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{result.structured_breakdown.constraints}</pre>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f472b6', textTransform: 'uppercase' }}>5. Expected Output Format</span>
            <pre style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{result.structured_breakdown.output_format}</pre>
          </div>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div style={{ maxHeight: '440px', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Recommended refinements to push prompt performance even further:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {result.suggestions.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: 'var(--bg-input)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <CheckCircle2 size={16} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
