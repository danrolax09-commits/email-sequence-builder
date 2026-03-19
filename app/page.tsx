'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const plans = [
    {
      name: 'Starter',
      price: '$19',
      priceId: 'price_starter',
      description: 'Perfect for small campaigns',
      features: ['Create up to 5 email sequences', 'Basic email templates', 'Email scheduling', 'Basic analytics'],
    },
    {
      name: 'Professional',
      price: '$49',
      priceId: 'price_pro',
      description: 'For growing businesses',
      features: ['Unlimited sequences', 'Advanced templates', 'A/B testing', 'Advanced analytics', 'Team collaboration (3 users)'],
    },
    {
      name: 'Enterprise',
      price: '$99',
      priceId: 'price_enterprise',
      description: 'For large-scale operations',
      features: ['Everything in Pro', 'Custom templates', 'API access', 'Priority support', 'Unlimited team members', 'Dedicated account manager'],
    },
  ];

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Revenue Product</h1>
          <nav className="flex gap-4">
            <a href="#features" className="text-slate-300 hover:text-white">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white">Pricing</a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">Build Powerful Email Sequences in Minutes</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Create, automate, and optimize email campaigns without coding. Increase conversions with intelligent sequencing and A/B testing.</p>
        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8 py-3 rounded-lg font-semibold transition"
          >
            See Features
          </button>
        </div>
      </section>

      {activeTab === 'features' && (
        <section className="bg-slate-800/50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '📧', title: 'Smart Templates', desc: 'Pre-designed templates optimized for conversions' },
                { icon: '⏱️', title: 'Auto-Scheduling', desc: 'Send emails at optimal times for each recipient' },
                { icon: '📊', title: 'Analytics', desc: 'Track opens, clicks, conversions in real-time' },
                { icon: '🧪', title: 'A/B Testing', desc: 'Test subjects, content, and send times' },
                { icon: '🤖', title: 'Automation', desc: 'Trigger sequences based on user behavior' },
                { icon: '🔗', title: 'Integrations', desc: 'Connect with your favorite CRM and tools' },
              ].map((feature) => (
                <div key={feature.title} className="p-6 rounded-lg bg-slate-700/30 border border-slate-600">
                  <p className="text-4xl mb-3">{feature.icon}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="pricing" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={plan.name} 
              className={`border rounded-lg p-8 transition transform hover:scale-105 ${
                idx === 1 
                  ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500' 
                  : 'border-slate-700 bg-slate-800/50'
              }`}
            >
              {idx === 1 && <div className="text-sm font-bold text-blue-400 mb-2 uppercase">Most Popular</div>}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
              <p className="text-4xl font-bold text-white mb-6">
                {plan.price}
                <span className="text-lg text-slate-400">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="text-slate-300 flex items-start">
                    <span className="text-green-400 mr-3">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
                  idx === 1
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {loading ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>&copy; 2026 Revenue Product. All rights reserved.</p>
      </footer>
    </main>
  );
}
