import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GeneratorSection } from './components/GeneratorSection';
import { ResultDashboard } from './components/ResultDashboard';
import { CategoriesSection } from './components/CategoriesSection';
import { MLPipeline } from './components/MLPipeline';
import { HowItWorks } from './components/HowItWorks';
import { EvaluationSection } from './components/EvaluationSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ModelInfoModal } from './components/ModelInfoModal';
import { LaunchAnimation } from './components/LaunchAnimation';
import { BackgroundGlow } from './components/BackgroundGlow';
import { MLStatusBadge } from './components/MLStatusBadge';
import type { ModelInfo, PromptResponse } from './types';
import { checkHealth, getModelInfo, generateOptimizedPrompt } from './services/api';

export const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('auto');
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [result, setResult] = useState<PromptResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showLaunchAnimation, setShowLaunchAnimation] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('smartprompt_launched');
    } catch {
      return true;
    }
  });

  // Initialize and fetch metadata from backend
  useEffect(() => {
    const initApp = async () => {
      const connected = await checkHealth();
      setIsApiConnected(connected);

      if (connected) {
        try {
          const info = await getModelInfo();
          setModelInfo(info);
        } catch (err) {
          console.error('Failed to load initial metadata:', err);
        }
      }
    };

    initApp();
    const interval = setInterval(async () => {
      const alive = await checkHealth();
      setIsApiConnected(alive);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'generator', 'results', 'categories', 'pipeline', 'how-it-works', 'evaluation', 'about'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId === 'results' ? 'generator' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchComplete = () => {
    setShowLaunchAnimation(false);
    try {
      sessionStorage.setItem('smartprompt_launched', 'true');
    } catch {
      // Ignore sessionStorage exceptions if private mode blocks it
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = async () => {
    if (prompt.trim().length < 2) {
      setError('Please enter a prompt with at least 2 characters.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await generateOptimizedPrompt(prompt, selectedCategory);
      setResult(data);
      // Smooth scroll to results after brief delay
      setTimeout(() => {
        const resEl = document.getElementById('results');
        if (resEl) {
          resEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while communicating with the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResult(null);
    setError(null);
    setSelectedCategory('auto');
  };

  const handleSelectSample = (sampleText: string) => {
    setPrompt(sampleText);
    setError(null);
    handleNavigate('generator');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Short Professional Opening Launch Animation */}
      {showLaunchAnimation && (
        <LaunchAnimation onComplete={handleLaunchComplete} />
      )}

      {/* Subtle Aurora Glow Ambient Background */}
      <BackgroundGlow />

      {/* Non-intrusive Subtle ML Intent Engine Status Pill */}
      <MLStatusBadge />

      {/* Sticky Glass Navbar */}
      <Navbar
        isApiConnected={isApiConnected}
        onOpenModelInfo={() => setIsModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero
          onStartGenerating={() => handleNavigate('generator')}
          onLearnMore={() => handleNavigate('how-it-works')}
        />

        {/* NLP Generator Input Section */}
        <GeneratorSection
          prompt={prompt}
          setPrompt={setPrompt}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isLoading={isLoading}
          onGenerate={handleGenerate}
          onClear={handleClear}
          error={error}
        />

        {/* Results Dashboard (Rendered if response is present) */}
        {result && (
          <ResultDashboard
            result={result}
            onRegenerate={handleGenerate}
            onEdit={() => handleNavigate('generator')}
          />
        )}

        {/* 5-Class Intent Taxonomy Showcase */}
        <CategoriesSection onSelectSample={handleSelectSample} />

        {/* ML End-to-End Pipeline Visualization */}
        <MLPipeline />

        {/* How It Works 5-Step Deep Dive */}
        <HowItWorks />

        {/* Empirical Evaluation & Academic Rigor */}
        <EvaluationSection />

        {/* About Project & Academic Capstone Context */}
        <AboutSection />
      </main>

      {/* Production Footer */}
      <Footer />

      {/* Model Specifications & Evaluation Modal */}
      <ModelInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelInfo={modelInfo}
      />
    </div>
  );
};

export default App;
