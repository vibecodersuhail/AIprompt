import React from 'react';
import { X, Cpu, Database, Layers, ShieldCheck, Award } from 'lucide-react';
import type { ModelInfo } from '../types';
import { MODEL_EVALUATION_FACTS } from '../constants';

interface ModelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelInfo: ModelInfo | null;
}

export const ModelInfoModal: React.FC<ModelInfoModalProps> = ({
  isOpen,
  onClose,
  modelInfo,
}) => {
  if (!isOpen) return null;

  const accuracy = modelInfo
    ? `${(modelInfo.test_accuracy * 100).toFixed(2)}%`
    : `${(MODEL_EVALUATION_FACTS.testAccuracy * 100).toFixed(2)}%`;

  const macroF1 = modelInfo
    ? `${(modelInfo.test_macro_f1 * 100).toFixed(2)}%`
    : `${(MODEL_EVALUATION_FACTS.macroF1 * 100).toFixed(2)}%`;

  const testSamples = modelInfo?.test_samples ?? MODEL_EVALUATION_FACTS.testSamples;
  const trainSamples = modelInfo?.train_samples ?? MODEL_EVALUATION_FACTS.trainSamples;
  const features = modelInfo?.vectorizer_features ?? MODEL_EVALUATION_FACTS.maxFeatures;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '28px',
          background: 'rgba(10, 15, 29, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(139, 92, 246, 0.35)',
              }}
            >
              <Cpu size={20} color="var(--primary)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                Machine Learning Specifications
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                Trained Intent Classifier Architecture &amp; Evaluation Benchmark
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Metric Badges Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Selected Model</span>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px', margin: 0 }}>
              LinearSVC (balanced)
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Test Accuracy</span>
            <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px', margin: 0 }}>
              {accuracy}
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Macro F1-Score</span>
            <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#a855f7', marginTop: '4px', margin: 0 }}>
              {macroF1}
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Test Samples</span>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', marginTop: '4px', margin: 0 }}>
              {testSamples} (20%)
            </p>
          </div>
        </div>

        {/* Architecture Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c7d2fe', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 6px 0' }}>
              <Layers size={15} />
              <span>TF-IDF Feature Representation ({features.toLocaleString()} Features)</span>
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              TfidfVectorizer with sublinear_tf=True, English stop-word removal, and Unigrams + Bigrams (ngram_range=(1, 2)) capped at {features.toLocaleString()} terms.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c7d2fe', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 6px 0' }}>
              <Database size={15} />
              <span>Dataset Split &amp; Reproducibility</span>
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              1,671 curated prompt-refinement pairs divided into {trainSamples.toLocaleString()} training samples (80%) and {testSamples.toLocaleString()} testing samples (20%) via stratified train/test split (random_state=42). Zero leakage.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c7d2fe', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 6px 0' }}>
              <Award size={15} />
              <span>Baseline Benchmark Comparison</span>
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Majority-class Zero-R baseline is 53.73%. LinearSVC achieves 69.55% (+15.82 pp absolute gain, +29.44% relative improvement over baseline).
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c7d2fe', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 6px 0' }}>
              <ShieldCheck size={15} />
              <span>Inference Pipeline Boundary</span>
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              LinearSVC handles intent classification across 5 domains. The prompt refinement engine subsequently constructs structured prompts with persona, context, task, and constraints.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '12px' }}
        >
          Close Specifications
        </button>
      </div>
    </div>
  );
};
