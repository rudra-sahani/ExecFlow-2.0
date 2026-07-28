import React, { useEffect } from 'react';
import {
  Navigation,
  HeroSection,
  TrustedBySection,
  InteractiveDemo,
  FeaturesGrid,
  AgentPipelinePreview,
  ProductShowcase,
  WorkflowSection,
  AIAdvantages,
  AutomationShowcase,
  AnalyticsShowcase,
  SecuritySection,
  ArchitectureSection,
  Testimonials,
  FAQ,
  PricingPreview,
  CTASection,
  Footer,
} from '../components';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // Set document title for SEO
    document.title = 'ExecFlow - AI Meeting Intelligence & Execution Platform';

    // Inject JSON-LD Structured Data
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ExecFlow',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      description:
        'ExecFlow is an AI-powered Meeting Intelligence & Execution Platform transforming meeting discussions into automated tasks, decisions, risks, knowledge, and executive insights.',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '24',
        highPrice: '79',
        offerCount: '3',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'execflow-jsonld';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('execflow-jsonld');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-[#7CB518] selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navigation />

      {/* Main Sections Stack */}
      <main className="relative z-10">
        <HeroSection />
        <TrustedBySection />
        <InteractiveDemo />
        <FeaturesGrid />
        <AgentPipelinePreview />
        <ProductShowcase />
        <WorkflowSection />
        <AIAdvantages />
        <AutomationShowcase />
        <AnalyticsShowcase />
        <SecuritySection />
        <ArchitectureSection />
        <Testimonials />
        <FAQ />
        <PricingPreview />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
