import React, { useState } from 'react';
import { Sparkles, Cpu, Menu, X, ArrowRight, Activity } from 'lucide-react';

interface NavbarProps {
  isApiConnected: boolean;
  onOpenModelInfo: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isApiConnected,
  onOpenModelInfo,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'generator', label: 'Generate' },
    { id: 'pipeline', label: 'ML Pipeline' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'evaluation', label: 'Evaluation' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(5, 6, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all 0.2s ease',
      }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleLinkClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* SmartPrompt Logo SVG */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #22D3EE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.45)',
            }}
          >
            <Sparkles size={22} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                }}
              >
                SmartPrompt
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '2px 7px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  letterSpacing: '0.04em',
                }}
              >
                LinearSVC · TF-IDF
              </span>
            </div>
            <p
              style={{
                fontSize: '0.725rem',
                color: 'var(--text-muted)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Understand your intent. Generate smarter prompts.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="desktop-nav-links"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                style={{
                  background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Right Actions (Status + Model Specs + Try CTA) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
          className="desktop-actions"
        >
          {/* Live API Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}
            title={isApiConnected ? 'Connected to FastAPI backend on port 8000' : 'Backend connection unavailable'}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isApiConnected ? '#10b981' : '#ef4444',
                boxShadow: isApiConnected ? '0 0 8px #10b981' : '0 0 8px #ef4444',
              }}
            />
            <span>{isApiConnected ? 'API Online' : 'Connecting...'}</span>
          </div>

          {/* Model Info Modal Trigger */}
          <button
            onClick={onOpenModelInfo}
            className="btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.8rem' }}
            title="Inspect Data Science model architecture & verified metrics"
            aria-label="Inspect Model Architecture"
          >
            <Cpu size={15} color="#c4b5fd" />
            <span>Model Specs</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleLinkClick('generator')}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <span>Try SmartPrompt</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-toggle"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
          }}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              style={{
                background: activeSection === link.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                color: activeSection === link.id ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}

          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Activity size={14} color={isApiConnected ? '#10b981' : '#ef4444'} />
              <span>Backend Status: {isApiConnected ? 'Online (Port 8000)' : 'Offline'}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModelInfo();
              }}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Cpu size={15} />
              <span>Model Architecture & Specs</span>
            </button>

            <button
              onClick={() => handleLinkClick('generator')}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Launch Prompt Generator</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS for Mobile Breakpoints */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav-links, .desktop-actions {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
