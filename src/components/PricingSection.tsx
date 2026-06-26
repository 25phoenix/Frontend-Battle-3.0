"use client";

import { useEffect, useRef, type ChangeEvent } from "react";
import { ArrowPathIcon } from "./icons";

type Currency = "INR" | "USD" | "EUR";
type BillingCycle = "Monthly" | "Annual";

const pricingMatrix = {
  USD: { base: 19, tariff: 1 },
  EUR: { base: 19, tariff: 0.9 },
  INR: { base: 1499, tariff: 1 },
};

const ANNUAL_DISCOUNT = 0.8;

const tiers = [
  {
    id: "starter",
    name: "Starter",
    multiplier: 1,
    desc: "For individuals exploring AI automation",
    features: ["5 active workflows", "Basic analytics dashboard", "Email support", "1 GB storage"],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    multiplier: 3.33,
    desc: "For teams scaling data pipelines",
    features: ["Unlimited workflows", "Advanced analytics & alerts", "Priority support", "Full API access", "50 GB storage"],
    cta: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    multiplier: 6.67,
    desc: "For organizations with custom needs",
    features: ["Custom integrations", "Dedicated success manager", "99.99% SLA guarantee", "SSO & audit logs", "Unlimited storage"],
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  const priceRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const cycleRef = useRef<BillingCycle>("Monthly");
  const currencyRef = useRef<Currency>("INR");
  const toggleRef = useRef<HTMLDivElement>(null);

  const updatePrices = () => {
    const cycle = cycleRef.current;
    const currency = currencyRef.current;
    const rate = pricingMatrix[currency];

    tiers.forEach((tier) => {
      const el = priceRefs.current[tier.id];
      if (!el) return;

      let value = rate.base * tier.multiplier * rate.tariff;
      if (cycle === "Annual") value *= ANNUAL_DISCOUNT;

      let formatted = "";
      if (currency === "USD") formatted = `$${Math.round(value)}`;
      if (currency === "EUR") formatted = `€${Math.round(value)}`;
      if (currency === "INR") formatted = `₹${Math.round(value).toLocaleString("en-IN")}`;

      el.textContent = formatted;
    });

    if (toggleRef.current) {
      toggleRef.current.style.transform = cycle === "Annual" ? "translateX(100%)" : "translateX(0%)";
    }
  };

  useEffect(() => {
    updatePrices();
  }, []);

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    currencyRef.current = e.target.value as Currency;
    updatePrices();
  };

  const handleCycleToggle = () => {
    cycleRef.current = cycleRef.current === "Monthly" ? "Annual" : "Monthly";
    updatePrices();
  };

  return (
    <section id="pricing" className="w-full bg-[#0e1d25] px-6 py-32 layout-reflow">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-mono font-bold uppercase tracking-[0.3em] text-[#D9E8E2]/60">Transparent Pricing</p>
          <h2 className="mb-6 text-4xl font-mono font-bold text-[#F1F6F4] md:text-6xl">Scale on your terms</h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#D9E8E2]">
            Choose the plan that fits your team. Switch billing cycles or currencies anytime — prices update instantly.
          </p>
        </div>

        <div className="mx-auto mb-20 flex w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-[2rem] border border-white/5 bg-[#172B36] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] md:flex-row md:gap-10">
          <div className="flex items-center gap-4">
            <span className="font-mono font-medium text-[#D9E8E2]">Monthly</span>
            <button
              type="button"
              onClick={handleCycleToggle}
              className="relative h-8 w-16 overflow-hidden rounded-full border border-[#172B36] bg-[#114C5A] shadow-inner micro-interaction"
              aria-label="Toggle billing cycle"
              aria-pressed={cycleRef.current === "Annual"}
            >
              <div ref={toggleRef} className="absolute left-1 top-1 h-6 w-6 rounded-full bg-[#FFC801] shadow-md micro-interaction" />
            </button>
            <span className="font-mono font-medium text-[#D9E8E2]">
              Annual
              <span className="ml-2 whitespace-nowrap rounded-full bg-[#FF9932]/10 px-2 py-0.5 text-[0.7rem] font-bold text-[#FF9932]">Save 20%</span>
            </span>
          </div>

          <div className="hidden h-10 w-px bg-[#114C5A] md:block" />

          <div className="flex items-center gap-3">
            <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#D9E8E2]/60">Currency</span>
            <select
              onChange={handleCurrencyChange}
              defaultValue="INR"
              className="cursor-pointer rounded-xl border border-[#114C5A] bg-[#0e1d25] px-4 py-2 font-mono font-bold text-[#F1F6F4] outline-none transition-colors duration-180 ease-out focus:border-[#FFC801]"
              aria-label="Select currency"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-[2rem] border p-10 micro-interaction hover:-translate-y-2 hover:scale-[1.01] ${
                tier.id === "growth"
                  ? "z-10 border-[#FFC801] bg-[#114C5A]/80 shadow-[0_0_40px_rgba(255,200,1,0.15)]"
                  : "border-[#114C5A] bg-[#172B36]/60 hover:border-[#D9E8E2]/50"
              }`}
            >
              {tier.id === "growth" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF9932] to-[#FFC801] px-6 py-1.5 text-sm font-bold tracking-[0.2em] text-[#172B36] shadow-lg">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="mb-3 text-3xl font-mono font-bold text-[#F1F6F4]">{tier.name}</h3>
                <p className="mb-8 min-h-[48px] text-lg text-[#D9E8E2]/70">{tier.desc}</p>
                <div className="mb-10 flex items-end gap-2 border-b border-white/10 pb-10">
                  <span
                    className={`text-6xl font-mono font-bold tracking-tighter ${tier.id === "growth" ? "text-[#FFC801]" : "text-[#F1F6F4]"}`}
                    ref={(el) => {
                      priceRefs.current[tier.id] = el;
                    }}
                  >
                    --
                  </span>
                  <span className="mb-3 text-xl font-medium text-[#D9E8E2]/50">/mo</span>
                </div>
                <ul className="mb-10 space-y-5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4 text-[#F1F6F4]">
                      <ArrowPathIcon className={`mt-0.5 h-6 w-6 flex-shrink-0 ${tier.id === "growth" ? "text-[#FF9932]" : "text-[#114C5A]"}`} />
                      <span className="text-lg leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-bold micro-interaction ${
                  tier.id === "growth"
                    ? "bg-gradient-to-r from-[#FF9932] to-[#FFC801] text-[#172B36] hover:shadow-[0_0_20px_rgba(255,200,1,0.4)]"
                    : "border-2 border-[#114C5A] bg-transparent text-[#F1F6F4] hover:bg-white/10"
                }`}
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
