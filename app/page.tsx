"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ── SVG Assets (from asset pack) ──────────────────────────────
const LogoSVG = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="28" height="28" rx="6" fill="#FFC801" fillOpacity="0.15"/>
    <path d="M6 14L14 6L22 14L14 22L6 14Z" stroke="#FFC801" strokeWidth="2" fill="none"/>
    <circle cx="14" cy="14" r="3" fill="#FFC801"/>
    <path d="M14 6V10M14 18V22M6 14H10M18 14H22" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ChevronSVG = () => (
  <svg className="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const CheckSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-icon" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="#FFC801" fillOpacity="0.15"/>
    <path d="M5 8l2 2 4-4" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Bento icon SVGs
const IconSVGs: Record<string, () => React.ReactElement> = {
  brain: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    </svg>
  ),
  zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chart: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  api: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 9l3 3-3 3M13 15h3"/>
      <rect x="2" y="4" width="20" height="16" rx="4"/>
    </svg>
  ),
  globe: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

// ── Pricing Matrix ─────────────────────────────────────────────
type Currency = "INR" | "USD" | "EUR";
type Billing = "monthly" | "annual";

interface PricingTier { base: number; name: string; desc: string; features: string[]; }

const TARIFFS: Record<Currency, number> = { INR: 83.5, USD: 1, EUR: 0.92 };
const SYMBOLS: Record<Currency, string> = { INR: "₹", USD: "$", EUR: "€" };
const ANNUAL_MULTIPLIER = 0.8;

const TIERS: PricingTier[] = [
  { base: 29, name: "Starter", desc: "Perfect for small teams getting started with AI automation.", features: ["5 data pipelines", "10k records/month", "Basic analytics", "Email support", "REST API access"] },
  { base: 89, name: "Pro", desc: "For growing teams that need more power and flexibility.", features: ["Unlimited pipelines", "1M records/month", "Advanced analytics", "Priority support", "Webhooks & API", "Custom models", "Team collaboration"] },
  { base: 249, name: "Enterprise", desc: "Full-scale automation for large organizations.", features: ["Unlimited everything", "Custom SLAs", "Dedicated infra", "24/7 phone support", "SSO & SAML", "Audit logs", "Custom contracts"] },
];

function computePrice(tier: PricingTier, currency: Currency, billing: Billing): number {
  const base = tier.base * TARIFFS[currency];
  const discounted = billing === "annual" ? base * ANNUAL_MULTIPLIER : base;
  return Math.round(discounted);
}

// ── Feature Data ───────────────────────────────────────────────
const FEATURES = [
  { id: 0, icon: "brain", title: "Neural Pipeline Engine", desc: "Self-optimizing ML pipelines that adapt in real-time. Train once, deploy everywhere — with automatic drift detection and model versioning baked in.", tag: "Core AI", large: true },
  { id: 1, icon: "zap", title: "Sub-50ms Processing", desc: "Edge-first architecture delivers results before your users notice. Powered by WASM and parallel execution graphs.", tag: "Performance" },
  { id: 2, icon: "shield", title: "Zero-Trust Security", desc: "End-to-end encryption, SOC 2 Type II certified, and granular RBAC — compliance built into every layer.", tag: "Security", tall: true },
  { id: 3, icon: "chart", title: "Live Intelligence Dashboard", desc: "Real-time insights with customizable KPI widgets, anomaly detection alerts, and exportable reports.", tag: "Analytics" },
  { id: 4, icon: "api", title: "Universal API Gateway", desc: "Connect any data source with 200+ native connectors or our open SDK. GraphQL, REST, and gRPC all supported.", tag: "Integration" },
  { id: 5, icon: "globe", title: "Global Edge Network", desc: "Deployed across 42 regions. Data stays local, latency stays low, and uptime stays at 99.99%.", tag: "Infrastructure" },
];

// ── Main Page ──────────────────────────────────────────────────
export default function Home() {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const activeFeatureRef = useRef<number | null>(null);
  const priceRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Track activeFeature in ref for resize handler
  useEffect(() => { activeFeatureRef.current = activeFeature; }, [activeFeature]);

  // ── Loader: hide after 420ms ──
  useEffect(() => {
    const t = setTimeout(() => setLoaderHidden(true), 420);
    return () => clearTimeout(t);
  }, []);

  // ── Entry fade-up animations ──
  useEffect(() => {
    if (!loaderHidden) return;
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 60);
    });
  }, [loaderHidden]);

  // ── Resize: bento → accordion context transfer ──
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (mobile && activeFeatureRef.current !== null) {
      setOpenAccordion(activeFeatureRef.current);
    }
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // ── Isolated price update (no global re-render) ──
  const updatePrices = useCallback((newBilling: Billing, newCurrency: Currency) => {
    TIERS.forEach((tier, i) => {
      const amountEl = priceRefs.current[`amount-${i}`];
      const symbolEl = priceRefs.current[`symbol-${i}`];
      if (amountEl && symbolEl) {
        amountEl.textContent = String(computePrice(tier, newCurrency, newBilling));
        symbolEl.textContent = SYMBOLS[newCurrency];
      }
    });
  }, []);

  const handleBillingChange = useCallback((val: Billing) => {
    setBilling(val);
    updatePrices(val, currency);
  }, [currency, updatePrices]);

  const handleCurrencyChange = useCallback((val: Currency) => {
    setCurrency(val);
    updatePrices(billing, val);
  }, [billing, updatePrices]);

  // ── Scroll reveal ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loaderHidden]);

  return (
    <>
      {/* ── Loader ── */}
      <div id="loader" className={loaderHidden ? "hidden" : ""} role="status" aria-label="Loading NexusAI">
        <div className="loader-inner">
          <div className="nav-logo"><LogoSVG /> NexusAI</div>
          <div className="loader-bar"><div className="loader-fill" /></div>
        </div>
      </div>

      {/* ── Nav ── */}
      <header>
        <nav role="navigation" aria-label="Main navigation">
          <div className="nav-logo"><LogoSVG /><span>NexusAI</span></div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Customers</a></li>
            <li><a href="#contact">Docs</a></li>
          </ul>
          <a href="#pricing" className="nav-cta">Get Started</a>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-badge fade-up">
              <span className="badge-dot" aria-hidden="true" />
              Now with GPT-4o & Claude 3.5 integration
            </div>
            <h1 id="hero-heading" className="fade-up">
              Automate Data.<br />
              <span>Amplify Intelligence.</span>
            </h1>
            <p className="hero-sub fade-up">
              NexusAI transforms raw data into business intelligence — automatically. Build, deploy, and scale AI pipelines in minutes, not months.
            </p>
            <div className="hero-actions fade-up">
              <a href="#pricing" className="btn-primary">Start Free Trial <ArrowSVG /></a>
              <a href="#features" className="btn-secondary">See How It Works <ArrowSVG /></a>
            </div>
            <div className="hero-stats fade-up" role="list" aria-label="Platform statistics">
              <div className="stat-item" role="listitem">
                <div className="stat-num" aria-label="12 thousand plus companies">12K+</div>
                <div className="stat-label">Companies Automated</div>
              </div>
              <div className="stat-item" role="listitem">
                <div className="stat-num" aria-label="4.2 billion records processed">4.2B</div>
                <div className="stat-label">Records Processed</div>
              </div>
              <div className="stat-item" role="listitem">
                <div className="stat-num" aria-label="99.99% uptime">99.99%</div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="stat-item" role="listitem">
                <div className="stat-num" aria-label="sub 50 milliseconds">{"<"}50ms</div>
                <div className="stat-label">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Bar ── */}
        <section className="logos-section" aria-label="Trusted by leading companies">
          <p className="logos-label">TRUSTED BY ENGINEERING TEAMS AT</p>
          <div className="logos-track" role="list">
            {["Stripe", "Notion", "Linear", "Vercel", "Figma", "Planetscale", "Supabase"].map(name => (
              <span key={name} className="logo-item" role="listitem">{name}</span>
            ))}
          </div>
        </section>

        {/* ── Features (Bento / Accordion) ── */}
        <section id="features" className="features-section" aria-labelledby="features-heading">
          <div className="section-header" style={{ maxWidth: 1200, margin: "0 auto 64px" }}>
            <p className="section-label fade-up">Platform Features</p>
            <h2 id="features-heading" className="section-title fade-up">
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
            <p className="section-sub fade-up">
              Six pillars of intelligent automation — each independently powerful, unstoppable together.
            </p>
          </div>

          {/* Desktop: Bento Grid */}
          <div className="bento-grid" role="list" aria-label="Feature showcase">
            {FEATURES.map(f => {
              const IconComp = IconSVGs[f.icon];
              return (
                <article
                  key={f.id}
                  className={`bento-card fade-up${f.large ? " large" : ""}${f.tall ? " tall" : ""}${activeFeature === f.id ? " active" : ""}`}
                  role="listitem"
                  onMouseEnter={() => setActiveFeature(f.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                  tabIndex={0}
                  onFocus={() => setActiveFeature(f.id)}
                  onBlur={() => setActiveFeature(null)}
                  aria-label={f.title}
                >
                  <div className="bento-icon" aria-hidden="true"><IconComp /></div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <span className="bento-tag">{f.tag}</span>
                </article>
              );
            })}
          </div>

          {/* Mobile: Accordion */}
          <div className="accordion-list" role="list" aria-label="Feature list">
            {FEATURES.map(f => {
              const IconComp = IconSVGs[f.icon];
              const isOpen = openAccordion === f.id;
              return (
                <div
                  key={f.id}
                  className={`accordion-item${isOpen ? " open" : ""}`}
                  role="listitem"
                >
                  <button
                    className="accordion-trigger"
                    onClick={() => setOpenAccordion(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-body-${f.id}`}
                    id={`accordion-trigger-${f.id}`}
                  >
                    <div className="accordion-trigger-left">
                      <div className="bento-icon" style={{ margin: 0, width: 36, height: 36 }} aria-hidden="true">
                        <IconComp />
                      </div>
                      <h3>{f.title}</h3>
                    </div>
                    <ChevronSVG />
                  </button>
                  <div
                    className="accordion-body"
                    id={`accordion-body-${f.id}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${f.id}`}
                  >
                    <div className="accordion-body-inner">
                      <p>{f.desc}</p>
                      <span className="bento-tag" style={{ marginTop: 12 }}>{f.tag}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="pricing-section" aria-labelledby="pricing-heading">
          <div className="section-header">
            <p className="section-label fade-up">Pricing</p>
            <h2 id="pricing-heading" className="section-title fade-up">Simple, transparent pricing</h2>
            <p className="section-sub fade-up" style={{ margin: "0 auto 0" }}>
              No hidden fees. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="pricing-controls fade-up">
            <div className="billing-toggle" role="group" aria-label="Billing cycle">
              <button
                className={`toggle-btn${billing === "monthly" ? " active" : ""}`}
                onClick={() => handleBillingChange("monthly")}
                aria-pressed={billing === "monthly"}
              >Monthly</button>
              <button
                className={`toggle-btn${billing === "annual" ? " active" : ""}`}
                onClick={() => handleBillingChange("annual")}
                aria-pressed={billing === "annual"}
              >
                Annual
                <span className="annual-badge" aria-label="Save 20 percent">-20%</span>
              </button>
            </div>
            <div className="currency-selector">
              <label htmlFor="currency-select" className="currency-selector">Currency:</label>
              <select
                id="currency-select"
                className="currency-select"
                value={currency}
                onChange={e => handleCurrencyChange(e.target.value as Currency)}
                aria-label="Select currency"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          <div className="pricing-grid fade-up">
            {TIERS.map((tier, i) => {
              const initPrice = computePrice(tier, currency, billing);
              return (
                <article
                  key={tier.name}
                  className={`pricing-card${i === 1 ? " featured" : ""}`}
                  aria-label={`${tier.name} plan`}
                >
                  {i === 1 && <div className="featured-badge" aria-label="Most popular plan">MOST POPULAR</div>}
                  <p className="plan-name">{tier.name}</p>
                  <div className="plan-price-wrap">
                    <span
                      className="plan-currency"
                      ref={el => { priceRefs.current[`symbol-${i}`] = el; }}
                      aria-hidden="true"
                    >{SYMBOLS[currency]}</span>
                    <span
                      className="plan-amount"
                      ref={el => { priceRefs.current[`amount-${i}`] = el; }}
                      aria-label={`${initPrice} ${currency} per month`}
                    >{initPrice}</span>
                    <span className="plan-period">/mo</span>
                  </div>
                  <p className="plan-desc">{tier.desc}</p>
                  <div className="plan-divider" aria-hidden="true" />
                  <ul className="plan-features" aria-label={`${tier.name} plan features`}>
                    {tier.features.map(f => (
                      <li key={f}><CheckSVG />{f}</li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className={`plan-btn ${i === 1 ? "plan-btn-fill" : "plan-btn-outline"}`}
                    aria-label={`Get started with ${tier.name} plan`}
                  >
                    {i === 2 ? "Contact Sales" : "Get Started"}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className="social-section" aria-labelledby="testimonials-heading">
          <div className="section-header" style={{ maxWidth: 1100, margin: "0 auto 64px" }}>
            <p className="section-label fade-up">Customer Stories</p>
            <h2 id="testimonials-heading" className="section-title fade-up">Loved by data teams worldwide</h2>
          </div>
          <div className="testimonials-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
            {[
              { q: "NexusAI cut our data pipeline build time from 3 weeks to 2 days. The neural engine basically replaced an entire data engineering squad.", name: "Priya Nair", role: "Head of Data, Razorpay", initials: "PN" },
              { q: "The currency switcher and real-time pricing were selling points for our global rollout. Crazy that this much power comes in one platform.", name: "Marcus Webb", role: "CTO, Growthline", initials: "MW" },
              { q: "We process 400M events daily with zero downtime since migrating. Sub-50ms is not marketing speak — it's real and it's unreal.", name: "Sofia Chen", role: "VP Engineering, Lumen", initials: "SC" },
            ].map(t => (
              <article key={t.name} className="testimonial-card fade-up">
                <div className="stars" aria-label="5 stars">★★★★★</div>
                <blockquote cite="#">&ldquo;{t.q}&rdquo;</blockquote>
                <footer className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section fade-up" aria-labelledby="cta-heading">
          <h2 id="cta-heading">Ready to automate everything?</h2>
          <p>Join 12,000+ teams who shipped faster with NexusAI. No credit card required.</p>
          <a href="#pricing" className="btn-primary" style={{ display: "inline-flex" }}>
            Start Free — 14 Days <ArrowSVG />
          </a>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer role="contentinfo">
        <div className="footer-grid">
          <div>
            <div className="nav-logo"><LogoSVG /> NexusAI</div>
            <p className="footer-brand-desc">
              The AI-native data automation platform built for engineering teams who move fast and break nothing.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              {["Features", "Pricing", "Changelog", "Roadmap", "Status"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Developers</h4>
            <ul>
              {["Documentation", "API Reference", "SDKs", "GitHub", "Community"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {["About", "Blog", "Careers", "Privacy", "Terms"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 NexusAI, Inc. All rights reserved.</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--forsythia)", opacity: 0.6 }}>v2.4.1</span>
        </div>
      </footer>
    </>
  );
}
