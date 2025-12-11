import React, { useState } from "react";

/**
 * Repay Right – React + TypeScript + Tailwind
 * - Hero with text overlay (image URL from you)
 * - Right-side multi-step form (Contact → Loan → Offer → Confirm)
 * - EMI comparison, monthly savings
 * - Tables + FAQs sections
 *
 * Replace placeholder text below with your own/allowed wording.
 */

/* ------------------------------ DATA ------------------------------ */

type FAQ = { q: string; a: string };
type TableSpec = { title: string; headers: string[]; rows: (string | number)[][] };

const HERO = {
  title: "Repay Right – Optimize Your Home Loan",
  subtitle:
    "Lower EMIs, smarter repayment, and clearer timelines. Explore balance transfer, top-up options, and repayment strategies.",
  image: "https://www.basichomeloan.com/assets/images/home/form-tab.jpg",
};

const INTRO = {
  heading: "What is Repay Right?",
  body:
    "Repay Right is a structured approach to improve your home loan terms—by comparing offers, restructuring tenure, or leveraging balance transfer/top-up where appropriate.",
};

const HOW_IT_WORKS = {
  heading: "How It Works",
  steps: [
    "Tell us about your current loan and property.",
    "We estimate savings from transfer, tenure tweak, or rate change.",
    "You pick an option and we guide the documentation & switch.",
  ],
};

const TABLES: TableSpec[] = [
  {
    title: "Illustrative EMI Comparison",
    headers: ["Loan Amount", "ROI (Old)", "ROI (New)", "Tenure (Months)", "EMI Old", "EMI New", "Monthly Savings"],
    rows: [
      ["₹20,00,000", "9.5%", "8.5%", 180, "₹18,749", "₹17,823", "₹926"],
      ["₹35,00,000", "10.0%", "8.9%", 240, "₹33,828", "₹31,736", "₹2,092"],
      ["₹50,00,000", "9.2%", "8.5%", 240, "₹45,516", "₹43,265", "₹2,251"],
    ],
  },
  {
    title: "Indicative Charges (Balance Transfer)",
    headers: ["Item", "Typical Range"],
    rows: [
      ["Processing Fee", "0.25% – 1%"],
      ["Legal & Valuation", "₹3,000 – ₹10,000"],
      ["CERSAI/Stamping", "As per state + lender"],
      ["Foreclosure (if applicable)", "As per lender policy"],
    ],
  },
];

const FAQS: FAQ[] = [
  { q: "What is a balance transfer?", a: "Moving your existing home loan to another lender offering better terms." },
  { q: "Will my tenure change?", a: "Yes, you can choose a fresh tenure to balance EMI vs. total interest." },
  { q: "Are there charges?", a: "Processing, legal/valuation, and statutory charges may apply as per lender." },
  { q: "Can I get a top-up?", a: "Many lenders allow a top-up along with balance transfer, subject to eligibility." },
];

/* ------------------------------ Helpers ------------------------------ */

const INR = (v: number) => v.toLocaleString("en-IN");

function emi(P: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return P / months;
  const pow = Math.pow(1 + r, months);
  return (P * r * pow) / (pow - 1);
}

/* ------------------------------ UI Parts ------------------------------ */

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">{title}</h2>
    {subtitle && <p className="mt-3 text-gray-700">{subtitle}</p>}
  </div>
);

const Accordion: React.FC<{ items: FAQ[] }> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {items.map((it, idx) => (
        <button
          key={idx}
          onClick={() => setOpen(open === idx ? null : idx)}
          className="w-full text-left p-4 focus:outline-none"
          aria-expanded={open === idx}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-gray-900">{it.q}</h4>
              {open === idx && <p className="mt-2 text-sm text-gray-600">{it.a}</p>}
            </div>
            <span className={`shrink-0 transition-transform ${open === idx ? "rotate-45" : ""}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

const TableBlock: React.FC<TableSpec> = ({ title, headers, rows }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} className="whitespace-nowrap px-4 py-2 text-gray-800">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ------------------------------ Page ------------------------------ */

export default function RepayRightPage() {
  // right-side form (multi-step)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [loanAmount, setLoanAmount] = useState(2000000);
  const [currentRate, setCurrentRate] = useState(9.5);
  const [newRate, setNewRate] = useState(8.5);
  const [tenure, setTenure] = useState(180);

  const emiOld = emi(loanAmount, currentRate, tenure);
  const emiNew = emi(loanAmount, newRate, tenure);
  const savings = Math.max(emiOld - emiNew, 0);

  // simple validations
  const canNext1 =
    name.trim().length >= 2 && /^\d{10}$/.test(mobile) && /.+@.+\..+/.test(email) && city.trim().length > 1;
  const canNext2 = loanAmount >= 100000 && tenure >= 12;

  const resetForm = () => {
    setStep(1);
    setName("");
    setMobile("");
    setEmail("");
    setCity("");
    setLoanAmount(2000000);
    setCurrentRate(9.5);
    setNewRate(8.5);
    setTenure(180);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO: text overlay on image + form on right */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-4 py-8 md:grid-cols-2 md:px-8 md:py-12">
          {/* Left: Image with overlayed text */}
          <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-gray-200 shadow md:h-[520px]">
            <img
              src={HERO.image}
              alt="Repay Right visual"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
              <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl">{HERO.title}</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">{HERO.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#intro"
                  className="rounded-xl bg-white/95 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-white"
                >
                  Learn More
                </a>
                <a
                  href="#form"
                  className="rounded-xl border border-white/70 bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Start Now
                </a>
              </div>
            </div>
          </div>

          {/* Right: Multi-step Form */}
          <div id="form" className="flex">
            <div className="relative w-full rounded-2xl border border-gray-200 bg-white p-5 shadow">
              <h3 className="text-lg font-semibold text-gray-900">Repay Right – Get Your Plan</h3>
              <p className="mt-1 text-xs text-gray-600">Fill in details. We’ll show estimated savings and options.</p>

              <div className="mt-4">
                {/* Stepper heads */}
                <div className="mb-4 grid grid-cols-4 gap-2 text-center text-[11px] font-medium">
                  {["Contact", "Loan", "Offer", "Confirm"].map((label, idx) => (
                    <div
                      key={label}
                      className={`rounded-lg border px-2 py-1 ${
                        step === idx + 1
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 bg-gray-50 text-gray-700"
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-800">Full Name</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-800">Mobile</label>
                        <input
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="10-digit mobile"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-800">Email</label>
                        <input
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-800">City</label>
                      <input
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button disabled className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-500">
                        Previous
                      </button>
                      <button
                        disabled={!canNext1}
                        onClick={() => setStep(2)}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                          canNext1 ? "bg-gray-900 hover:bg-black" : "bg-gray-400"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-800">Loan Amount (₹)</label>
                        <input
                          type="number"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-800">Tenure (months)</label>
                        <input
                          type="number"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                          value={tenure}
                          onChange={(e) => setTenure(Number(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-800">Current ROI (% p.a.)</label>
                        <input
                          type="number"
                          step="0.1"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                          value={currentRate}
                          onChange={(e) => setCurrentRate(Number(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-800">Expected ROI (% p.a.)</label>
                        <input
                          type="number"
                          step="0.1"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                          value={newRate}
                          onChange={(e) => setNewRate(Number(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <div className="text-xs text-gray-500">EMI (Current)</div>
                          <div className="font-semibold">₹{INR(Math.round(emiOld))}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">EMI (New)</div>
                          <div className="font-semibold">₹{INR(Math.round(emiNew))}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Saved / Month</div>
                          <div className="font-semibold">₹{INR(Math.round(savings))}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 pt-2">
                      <button onClick={() => setStep(1)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                        Previous
                      </button>
                      <button
                        disabled={!canNext2}
                        onClick={() => setStep(3)}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                          canNext2 ? "bg-gray-900 hover:bg-black" : "bg-gray-400"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm">
                      <p className="font-semibold text-green-900">Your Offer Snapshot</p>
                      <ul className="mt-2 list-inside list-disc text-gray-800">
                        <li>Name: {name}</li>
                        <li>City: {city}</li>
                        <li>Loan: ₹{INR(loanAmount)}</li>
                        <li>Tenure: {tenure} months</li>
                        <li>Current ROI: {currentRate}% p.a.</li>
                        <li>Expected ROI: {newRate}% p.a.</li>
                        <li>Est. Monthly Saving: ₹{INR(Math.round(savings))}</li>
                      </ul>
                    </div>
                    <div className="flex justify-between gap-2 pt-2">
                      <button onClick={() => setStep(2)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                        Previous
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
                      <p className="font-semibold text-gray-900">Confirmation</p>
                      <p className="mt-1 text-gray-700">
                        We will reach out with lender options matching your details. You can also download this snapshot.
                      </p>
                    </div>
                    <div className="flex justify-between gap-2 pt-2">
                      <button onClick={() => setStep(3)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                        Previous
                      </button>
                      <button
                        onClick={resetForm}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section id="intro" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <SectionTitle title={INTRO.heading} />
        <div className="mx-auto mt-5 max-w-4xl text-gray-700">
          <p>{INTRO.body}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <SectionTitle title={HOW_IT_WORKS.heading} />
        <div className="mx-auto mt-6 max-w-3xl">
          <ol className="space-y-3 text-gray-700">
            {HOW_IT_WORKS.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tables */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {TABLES.map((t, i) => (
            <TableBlock key={i} {...t} />
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <SectionTitle title="FAQs" />
        <div className="mt-6">
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Ready to Repay Right?</h4>
            <p className="text-sm text-gray-600">Start your assessment now and see potential savings instantly.</p>
          </div>
          <a
            href="#form"
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
          >
            Start Now
          </a>
        </div>
      </section>
    </div>
  );
}
