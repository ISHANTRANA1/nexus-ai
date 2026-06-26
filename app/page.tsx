"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Official SVGs from asset pack (recolored to palette) ──────
const LogoSVG = () => (
  <svg width="28" height="28" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="#FFC801" d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"/>
  </svg>
);

// chevron-down from asset pack
const ChevronDownSVG = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="m19.5 8.25l-7.5 7.5l-7.5-7.5"/>
  </svg>
);

// x-mark from asset pack
const XMarkSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#D9E8E2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

// arrow-trending-up from asset pack
const ArrowTrendingSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
  </svg>
);

// arrow-path (refresh/automation) from asset pack
const ArrowPathSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFC801" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
  </svg>
);

// chart-pie from asset pack
const ChartPieSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFC801" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/>
    <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/>
  </svg>
);

// cog-8-tooth from asset pack
const CogSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFC801" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929l.15-.894Z"/>
    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/>
  </svg>
);

// cube from asset pack
const CubeSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="22" height="22" aria-hidden="true">
    <path fill="#FFC801" d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"/>
  </svg>
);

// link from asset pack
const LinkSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFC801" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
    <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
  </svg>
);

// search from asset pack — used in nav/hero
const SearchSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path fill="#D9E8E2" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
  </svg>
);

// check SVG (custom, not in pack)
const CheckSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-icon" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="#FFC801" fillOpacity="0.15"/>
    <path d="M5 8l2 2 4-4" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
  return Math.round(billing === "annual" ? base * ANNUAL_MULTIPLIER : base);
}

// ── Feature Data (using official SVGs from asset pack) ─────────
const FEATURES = [
  { id: 0, Icon: ArrowPathSVG,  title: "Neural Pipeline Engine",      desc: "Self-optimizing ML pipelines that adapt in real-time. Train once, deploy everywhere — with automatic drift detection and model versioning baked in.", tag: "Core AI",        large: true  },
  { id: 1, Icon: ArrowTrendingSVG, title: "Sub-50ms Processing",      desc: "Edge-first architecture delivers results before your users notice. Powered by WASM and parallel execution graphs.", tag: "Performance" },
  { id: 2, Icon: CogSVG,        title: "Zero-Trust Security",         desc: "End-to-end encryption, SOC 2 Type II certified, and granular RBAC — compliance built into every layer.", tag: "Security" },
  { id: 3, Icon: ChartPieSVG,   title: "Live Intelligence Dashboard", desc: "Real-time insights with customizable KPI widgets, anomaly detection alerts, and exportable reports.", tag: "Analytics" },
  { id: 4, Icon: LinkSVG,       title: "Universal API Gateway",       desc: "Connect any data source with 200+ native connectors or our open SDK. GraphQL, REST, and gRPC all supported.", tag: "Integration" },
  { id: 5, Icon: CubeSVG,       title: "Global Edge Network",         desc: "Deployed across 42 regions. Data stays local, latency stays low, and uptime stays at 99.99%.", tag: "Infrastructure" },
];

// ── Main Page ──────────────────────────────────────────────────
export default function Home() {
  const [loaderHidden, setLoaderHidden]     = useState(false);
  const [billing, setBilling]               = useState<Billing>("monthly");
  const [currency, setCurrency]             = useState<Currency>("USD");
  const [activeFeature, setActiveFeature]   = useState<number | null>(null);
  const [openAccordion, setOpenAccordion]   = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen]   = useState(false);

  const activeFeatureRef = useRef<number | null>(null);
  const priceRefs        = useRef<Record<string, HTMLSpanElement | null>>({});

  useEffect(() => { activeFeatureRef.current = activeFeature; }, [activeFeature]);

  // Loader 420ms
  useEffect(() => {
    const t = setTimeout(() => setLoaderHidden(true), 420);
    return () => clearTimeout(t);
  }, []);

  // Entry fade-up
  useEffect(() => {
    if (!loaderHidden) return;
    document.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 55);
    });
  }, [loaderHidden]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loaderHidden]);

  // Resize: bento → accordion index transfer
  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768 && activeFeatureRef.current !== null) {
      setOpenAccordion(activeFeatureRef.current);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Isolated price DOM update — no parent re-render
  const updatePrices = useCallback((newBilling: Billing, newCurrency: Currency) => {
    TIERS.forEach((tier, i) => {
      const amountEl = priceRefs.current[`amount-${i}`];
      const symbolEl = priceRefs.current[`symbol-${i}`];
      if (amountEl) amountEl.textContent = String(computePrice(tier, newCurrency, newBilling));
      if (symbolEl) symbolEl.textContent = SYMBOLS[newCurrency];
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

  return (
    <>
      {/* ── Loader ── */}
      <div id="loader" className={loaderHidden ? "hidden" : ""} role="status" aria-label="Loading NexusAI">
        <div className="loader-inner">
          <div className="nav-logo"><LogoSVG /><span>NexusAI</span></div>
          <div className="loader-bar"><div className="loader-fill" /></div>
        </div>
      </div>

      {/* ── Header / Nav ── */}
      <header>
        <nav role="navigation" aria-label="Main navigation">
          <a href="#" className="nav-logo" aria-label="NexusAI home"><LogoSVG /><span>NexusAI</span></a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Customers</a></li>
            <li><a href="#docs">Docs</a></li>
          </ul>
          <div className="nav-right">
            <a href="#pricing" className="nav-cta">Get Started</a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileNavOpen(v => !v)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <XMarkSVG /> : <SearchSVG />}
            </button>
          </div>
        </nav>
        {/* Mobile nav drawer */}
        {mobileNavOpen && (
          <div className="mobile-nav" role="dialog" aria-label="Mobile navigation">
            <ul>
              <li><a href="#features" onClick={() => setMobileNavOpen(false)}>Features</a></li>
              <li><a href="#pricing" onClick={() => setMobileNavOpen(false)}>Pricing</a></li>
              <li><a href="#testimonials" onClick={() => setMobileNavOpen(false)}>Customers</a></li>
              <li><a href="#docs" onClick={() => setMobileNavOpen(false)}>Docs</a></li>
            </ul>
            <a href="#pricing" className="nav-cta" style={{ marginTop: 16 }} onClick={() => setMobileNavOpen(false)}>Get Started</a>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-badge fade-up">
              <span className="badge-dot" aria-hidden="true" />
              Now with GPT-4o &amp; Claude 3.5 integration
            </div>
            <h1 id="hero-heading" className="fade-up">
              Automate Data.<br />
              <span>Amplify Intelligence.</span>
            </h1>
            <p className="hero-sub fade-up">
              NexusAI transforms raw data into business intelligence — automatically. Build, deploy, and scale AI pipelines in minutes, not months.
            </p>
            <div className="hero-actions fade-up">
              <a href="#pricing" className="btn-primary">Start Free Trial <ArrowTrendingSVG /></a>
              <a href="#features" className="btn-secondary">See How It Works <ChevronDownSVG className="btn-chevron" /></a>
            </div>
            <div className="hero-stats fade-up" role="list" aria-label="Platform statistics">
              {[
                { num: "12K+",    label: "Companies Automated" },
                { num: "4.2B",    label: "Records Processed" },
                { num: "99.99%",  label: "Uptime SLA" },
                { num: "<50ms",   label: "Avg. Response Time" },
              ].map(s => (
                <div className="stat-item" role="listitem" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
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

        {/* ── Features ── */}
        <section id="features" className="features-section" aria-labelledby="features-heading">
          <div className="section-header" style={{ maxWidth: 1200, margin: "0 auto 64px" }}>
            <p className="section-label fade-up">Platform Features</p>
            <h2 id="features-heading" className="section-title fade-up">
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
            <p className="section-sub fade-up">Six pillars of intelligent automation — each independently powerful, unstoppable together.</p>
          </div>

          {/* Desktop: Bento Grid */}
          <div className="bento-grid" role="list" aria-label="Feature showcase">
            {FEATURES.map(f => (
              <article
                key={f.id}
                className={`bento-card fade-up${f.large ? " large" : ""}${activeFeature === f.id ? " active" : ""}`}
                role="listitem"
                onMouseEnter={() => setActiveFeature(f.id)}
                onMouseLeave={() => setActiveFeature(null)}
                tabIndex={0}
                onFocus={() => setActiveFeature(f.id)}
                onBlur={() => setActiveFeature(null)}
                aria-label={f.title}
              >
                <div className="bento-icon" aria-hidden="true"><f.Icon /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="bento-tag">{f.tag}</span>
              </article>
            ))}
          </div>

          {/* Mobile: Accordion */}
          <div className="accordion-list" role="list" aria-label="Feature list">
            {FEATURES.map(f => {
              const isOpen = openAccordion === f.id;
              return (
                <div key={f.id} className={`accordion-item${isOpen ? " open" : ""}`} role="listitem">
                  <button
                    className="accordion-trigger"
                    onClick={() => setOpenAccordion(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-body-${f.id}`}
                    id={`accordion-trigger-${f.id}`}
                  >
                    <div className="accordion-trigger-left">
                      <div className="bento-icon" style={{ margin: 0, width: 36, height: 36 }} aria-hidden="true">
                        <f.Icon />
                      </div>
                      <h3>{f.title}</h3>
                    </div>
                    <ChevronDownSVG className="accordion-chevron" />
                  </button>
                  <div className="accordion-body" id={`accordion-body-${f.id}`} role="region" aria-labelledby={`accordion-trigger-${f.id}`}>
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
            <p className="section-sub fade-up" style={{ margin: "0 auto" }}>No hidden fees. Scale as you grow. Cancel anytime.</p>
          </div>

          <div className="pricing-controls fade-up">
            <div className="billing-toggle" role="group" aria-label="Billing cycle">
              <button className={`toggle-btn${billing === "monthly" ? " active" : ""}`} onClick={() => handleBillingChange("monthly")} aria-pressed={billing === "monthly"}>Monthly</button>
              <button className={`toggle-btn${billing === "annual" ? " active" : ""}`} onClick={() => handleBillingChange("annual")} aria-pressed={billing === "annual"}>
                Annual<span className="annual-badge" aria-label="Save 20 percent">-20%</span>
              </button>
            </div>
            <div className="currency-selector">
              <label htmlFor="currency-select">Currency:</label>
              <select id="currency-select" className="currency-select" value={currency} onChange={e => handleCurrencyChange(e.target.value as Currency)} aria-label="Select currency">
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
                <article key={tier.name} className={`pricing-card${i === 1 ? " featured" : ""}`} aria-label={`${tier.name} plan`}>
                  {i === 1 && <div className="featured-badge" aria-label="Most popular plan">MOST POPULAR</div>}
                  <p className="plan-name">{tier.name}</p>
                  <div className="plan-price-wrap">
                    <span className="plan-currency" ref={el => { priceRefs.current[`symbol-${i}`] = el; }} aria-hidden="true">{SYMBOLS[currency]}</span>
                    <span className="plan-amount" ref={el => { priceRefs.current[`amount-${i}`] = el; }} aria-label={`${initPrice} ${currency} per month`}>{initPrice}</span>
                    <span className="plan-period">/mo</span>
                  </div>
                  <p className="plan-desc">{tier.desc}</p>
                  <div className="plan-divider" aria-hidden="true" />
                  <ul className="plan-features" aria-label={`${tier.name} plan features`}>
                    {tier.features.map(f => <li key={f}><CheckSVG />{f}</li>)}
                  </ul>
                  <a href="#" className={`plan-btn ${i === 1 ? "plan-btn-fill" : "plan-btn-outline"}`} aria-label={`Get started with ${tier.name} plan`}>
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
              { q: "NexusAI cut our data pipeline build time from 3 weeks to 2 days. The neural engine basically replaced an entire data engineering squad.", name: "Priya Nair",  role: "Head of Data, Razorpay", initials: "PN" },
              { q: "The currency switcher and real-time pricing were selling points for our global rollout. Crazy that this much power comes in one platform.",  name: "Marcus Webb", role: "CTO, Growthline",        initials: "MW" },
              { q: "We process 400M events daily with zero downtime since migrating. Sub-50ms is not marketing speak — it's real and it's unreal.",             name: "Sofia Chen",  role: "VP Engineering, Lumen",  initials: "SC" },
            ].map(t => (
              <article key={t.name} className="testimonial-card fade-up">
                <div className="stars" aria-label="5 stars">★★★★★</div>
                <blockquote>&ldquo;{t.q}&rdquo;</blockquote>
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
            Start Free — 14 Days <ArrowTrendingSVG />
          </a>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer role="contentinfo">
        <div className="footer-grid">
          <div>
            <div className="nav-logo"><LogoSVG /><span>NexusAI</span></div>
            <p className="footer-brand-desc">The AI-native data automation platform built for engineering teams who move fast and break nothing.</p>
          </div>
          {[
            { title: "Product",    links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"] },
            { title: "Developers", links: ["Documentation", "API Reference", "SDKs", "GitHub", "Community"] },
            { title: "Company",    links: ["About", "Blog", "Careers", "Privacy", "Terms"] },
          ].map(col => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 NexusAI, Inc. All rights reserved.</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--forsythia)", opacity: 0.6 }}>v2.4.1</span>
        </div>
      </footer>
    </>
  );
}
