// src/pages/home-loan/AxisHomeLoan.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Highlight = { label: string; value: string };
type RateRow = { label: string; salaried: string; selfEmployed: string };
type EligibilityRow = { label: string; salaried: string; selfEmployed: string };
type ChargeRow = { name: string; value: string };
type Plan = { title: string; points: string[] };
type FAQ = { q: string; a: string };

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl md:text-2xl font-bold text-basic-dark mb-3">{children}</h2>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-5 md:p-6">
      {children}
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<Array<React.ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5">
      <table className="min-w-[760px] w-full border-collapse bg-white">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h, i) => (
              <th
                key={`${h}-${i}`}
                className="text-left text-sm font-semibold text-gray-800 px-4 py-3 border-b"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={`row-${ri}`} className="odd:bg-white even:bg-gray-50/40">
              {r.map((c, ci) => (
                <td
                  key={`cell-${ri}-${ci}`}
                  className="text-sm text-gray-800 px-4 py-3 border-b align-top"
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQItem({ item }: { item: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-basic-dark">{item.q}</span>
        <span className={`mt-0.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">{item.a}</div>}
    </div>
  );
}

export default function AxisHomeLoan() {
  // Slider ranges match the reference page: 1 Lac–10 Cr, 0–20%, 1–30 years
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(9.0);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const P = useMemo(() => clamp(loanAmount, 100000, 100000000), [loanAmount]);
  const annualRate = useMemo(() => clamp(interestRate, 0, 20), [interestRate]);
  const years = useMemo(() => clamp(tenureYears, 1, 30), [tenureYears]);

  const emi = useMemo(() => {
    const r = annualRate / 12 / 100;
    const n = years * 12;
    if (n <= 0) return 0;
    if (r === 0) return Math.round(P / n);
    const pow = Math.pow(1 + r, n);
    const value = (P * r * pow) / (pow - 1);
    return Number.isFinite(value) ? Math.round(value) : 0;
  }, [P, annualRate, years]);

  const totalPayable = useMemo(() => emi * years * 12, [emi, years]);
  const totalInterest = useMemo(() => Math.max(0, totalPayable - P), [totalPayable, P]);

  const highlights: Highlight[] = [
    { label: "Loan Amount", value: "Up to ₹5 Crore" },
    { label: "Interest Rate (starts)", value: "8.75% – 9.40% (Floating) / 14% (Fixed)" },
    { label: "Processing Fee", value: "Up to 1% + GST (Min ₹10,000)" },
    { label: "Max Tenure", value: "30 years (Floating) / 20 years (Fixed)" },
    { label: "Penal Interest", value: "24% p.a." },
    { label: "Prepayment / Foreclosure", value: "Nil" },
  ];

  const rateRows: RateRow[] = [
    { label: "Fixed (Salaried)", salaried: "14% p.a.", selfEmployed: "-" },
    { label: "Fixed (Self-Employed)", salaried: "-", selfEmployed: "14% p.a." },
    { label: "Floating (Salaried)", salaried: "9.00% – 9.40%", selfEmployed: "-" },
    { label: "Floating (Self-Employed)", salaried: "-", selfEmployed: "9.10% – 9.40%" },
    { label: "Repo + Spread (Salaried)", salaried: "Repo + 2.6% to Repo + 2.9%", selfEmployed: "-" },
    { label: "Repo + Spread (Self-Employed)", salaried: "-", selfEmployed: "Repo + 2.5% to Repo + 2.9%" },
  ];

  const eligibilityRows: EligibilityRow[] = [
    { label: "Age Range", salaried: "21 – 60 years", selfEmployed: "21 – 65 years" },
    { label: "Nationality", salaried: "Indian Residents / NRIs", selfEmployed: "Indian Residents / NRIs" },
    { label: "Minimum Income", salaried: "As per bank norms", selfEmployed: "As per bank norms" },
  ];

  const charges: ChargeRow[] = [
    { name: "Processing Fee", value: "Up to 1% of loan amount + GST (Minimum ₹10,000)" },
    { name: "Cheque Bounce", value: "₹399 per instance" },
    {
      name: "Re-pricing (Rate Switch)",
      value:
        "Floating → Fixed: 1% of outstanding principal (Min ₹10,000). Fixed → Floating: 2% of outstanding principal.",
    },
    { name: "Duplicate Statement", value: "₹250 per instance" },
    { name: "Copy of Title Documents", value: "₹500 per document set" },
    { name: "Customer request for document copies", value: "₹500 per document set" },
    { name: "Repayment instruction / instrument return", value: "₹339 per instance" },
    { name: "Stamp duty & statutory charges", value: "As applicable" },
    { name: "CERSAI Charges", value: "₹50 (loan up to ₹5 Lakhs) | ₹100 (loan > ₹5 Lakhs)" },
  ];

  const plans: Plan[] = [
    {
      title: "Axis Shubh Aarambh Home Loan",
      points: [
        "Loan amount up to ₹30 Lakhs",
        "12 EMI waiver possible for strong repayment history (as per scheme)",
        "PMAY subsidy support (where eligible)",
        "Balance transfer option available",
      ],
    },
    {
      title: "Axis QuickPay Home Loan",
      points: [
        "Designed to reduce overall interest outgo over time",
        "Higher principal repayment in early years",
        "Balance transfer option available",
        "No prepayment / foreclosure charges (as per scheme)",
      ],
    },
    {
      title: "Axis Fast Forward Home Loan",
      points: [
        "12 EMI waiver possible for strong repayment history (as per scheme)",
        "Minimum loan amount ₹30 Lakhs",
        "Tenure up to 30 years (as per policy)",
        "No prepayment / foreclosure charges (as per scheme)",
      ],
    },
    {
      title: "Axis Asha Home Loan",
      points: [
        "Funding up to ~90% of property value (as per policy)",
        "Loan starts from ₹1 Lakh",
        "Maximum loan amount up to ₹28 Lakhs",
        "Potential EMI waiver benefits based on banking history (as per scheme)",
      ],
    },
    {
      title: "Axis Power Advantage Home Loan",
      points: [
        "Balance transfer option available",
        "Simplified documentation for faster disbursal (scheme-based)",
        "Initial 2 years can be fixed-rate, then floating (scheme-based)",
        "PMAY support (where eligible)",
      ],
    },
    {
      title: "Axis Super Saver Home Loan",
      points: [
        "Loan starts from ₹50 Lakhs",
        "Helps reduce interest via savings/OD-style structure (scheme-based)",
        "No prepayment / foreclosure charges (as per scheme)",
        "Tenure up to ~22 years (scheme-based)",
      ],
    },
    {
      title: "PMAY (Axis support)",
      points: [
        "Interest subsidy support on eligible cases",
        "Subsidy generally for tenure up to 20 years (scheme rules apply)",
        "Indicative eligible subsidy loan amounts vary by category (scheme rules apply)",
        "Applicable subject to policy and eligibility",
      ],
    },
  ];

  const faqs: FAQ[] = [
    {
      q: "What is the current Axis Bank home loan interest rate?",
      a: "The reference page mentions rates in the 9.0% – 14% range depending on floating vs fixed packages. Actual rates depend on profile/scheme and can change—verify at the time of application.",
    },
    {
      q: "How can I get an Axis home loan interest certificate?",
      a: "You can request it at the branch, or download it using net banking by navigating to enquiries and selecting the home loan/provisional certificate option.",
    },
    {
      q: "Does Axis provide floating and fixed rates?",
      a: "Yes. You can also switch between floating and fixed options, subject to repricing/switch charges as per bank policy.",
    },
    {
      q: "Can salaried applicants apply for Axis home loan?",
      a: "Yes—salaried applicants can apply if they meet the bank’s eligibility requirements (age, nationality, income, repayment capacity, etc.).",
    },
    {
      q: "How to reduce EMI on Axis home loan?",
      a: "A common way is to extend the repayment tenure (subject to bank’s allowed max tenure), which can lower the monthly EMI.",
    },
    {
      q: "What documents are generally required?",
      a: "Commonly: identity proof, age/address proof, photos, filled form, income proof (salary slips/ITR), bank statements, and property documents.",
    },
    {
      q: "Can I switch from fixed to floating rate?",
      a: "Axis allows switching between fixed and floating rate plans, usually with switch charges depending on the direction of conversion.",
    },
    {
      q: "Can I transfer an existing home loan to Axis?",
      a: "Yes, Axis offers home loan balance transfer options (subject to eligibility and bank policy).",
    },
  ];

  // Simple callback form (no backend)
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, "");
    if (!name.trim() || cleaned.length < 10) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2">
                {/* <img
                  src="/axis-bank-logo.png"
                  alt="Axis Bank"
                  className="h-9 w-auto object-contain bg-white rounded-lg p-1"
                /> */}
                <span className="text-sm font-semibold opacity-90">Axis Bank Home Loan</span>
              </div>

              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Axis Bank Home Loan</h1>

              <p className="mt-3 text-white/80 leading-relaxed">
                Axis Bank offers housing loans with flexible repayment tenures and both floating and fixed rate options.
                The page also highlights processing fees up to 1% + GST (minimum ₹10,000) and tenure up to 30 years
                for floating plans (scheme/policy dependent).
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/eligibility-check"
                  className="inline-flex items-center justify-center rounded-xl bg-basic-cyan text-basic-dark px-5 py-2.5 text-sm font-bold hover:opacity-90"
                >
                  Eligibility
                </Link>
                <a
                  href="#emi"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15"
                >
                  Calculate EMI
                </a>
              </div>
            </div>

            <div className="w-full md:max-w-md">
              <div className="rounded-2xl bg-white text-basic-dark shadow-sm ring-1 ring-black/5 p-5">
                <p className="font-bold text-lg">Quick Highlights</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {highlights.slice(0, 4).map((h, idx) => (
                    <div key={`${h.label}-${idx}`} className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-600">{h.label}</p>
                      <p className="text-sm font-bold">{h.value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Figures are indicative; final terms depend on scheme, profile, and Axis Bank policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* EMI Calculator */}
        <section id="emi">
          <SectionTitle>Axis Bank Home Loan EMI Calculator</SectionTitle>
          <Card>
            <p className="text-sm text-gray-700 mb-5">
              Adjust loan amount, interest rate, and tenure to estimate your monthly EMI and the total payment breakup.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-800">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={P}
                  onChange={(e) => setLoanAmount(Number(e.target.value || 0))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  min={100000}
                  max={100000000}
                />
                <input
                  type="range"
                  min={100000}
                  max={100000000}
                  step={100000}
                  value={P}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-1 text-xs text-gray-500 flex justify-between">
                  <span>₹1 Lac</span>
                  <span>₹10 Cr</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-800">Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  value={Number(annualRate.toFixed(2))}
                  onChange={(e) => setInterestRate(Number(e.target.value || 0))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  min={0}
                  max={20}
                  step={0.05}
                />
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.05}
                  value={annualRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-1 text-xs text-gray-500 flex justify-between">
                  <span>0%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-800">Tenure (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setTenureYears(Number(e.target.value || 0))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  min={1}
                  max={30}
                />
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-1 text-xs text-gray-500 flex justify-between">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-600">Your monthly EMI</p>
                <p className="mt-1 text-2xl font-extrabold text-basic-dark">₹ {formatINR(emi)}</p>

                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p className="flex justify-between">
                    <span>Total Amount Payable</span>
                    <span className="font-semibold">₹ {formatINR(totalPayable)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Principal Amount</span>
                    <span className="font-semibold">₹ {formatINR(P)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Total Interest</span>
                    <span className="font-semibold">₹ {formatINR(totalInterest)}</span>
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white ring-1 ring-black/5 p-5">
                <p className="font-bold text-basic-dark">Get a callback</p>
                <p className="mt-1 text-sm text-gray-700">
                  Share your details and we’ll connect to guide you through the process.
                </p>

                {!submitted ? (
                  <form onSubmit={onSubmit} className="mt-4 space-y-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    />
                    <input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile Number"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                      inputMode="numeric"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-basic-blue text-white px-4 py-2.5 text-sm font-bold hover:opacity-95"
                    >
                      Submit
                    </button>
                    <p className="text-xs text-gray-500">
                      This is a demo form (local only). Connect to your backend to capture leads.
                    </p>
                  </form>
                ) : (
                  <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                    Thanks! We’ve received your details.
                  </div>
                )}
              </div>
            </div>
          </Card>
        </section>

        {/* Key Highlights */}
        <section>
          <SectionTitle>Key Highlights</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((h, idx) => (
              <Card key={`${h.label}-${idx}`}>
                <p className="text-xs text-gray-600">{h.label}</p>
                <p className="mt-1 text-base font-extrabold text-basic-dark">{h.value}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Interest Rates */}
        <section>
          <SectionTitle>Axis Bank Home Loan Interest Rates (2026)</SectionTitle>
          <p className="text-sm text-gray-700 mb-4">
            Rates vary by scheme and borrower profile. The slabs below are indicative as per the reference page.
          </p>

          <Table
            headers={["Plan / Slab", "Salaried", "Self-Employed"]}
            rows={rateRows.map((r, idx) => [r.label, r.salaried, r.selfEmployed])}
          />

          <p className="mt-3 text-xs text-gray-500">
            Note: The reference page mentions that the above rates were last updated on 30 November 2025.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <SectionTitle>Axis Bank Home Loan Eligibility Criteria</SectionTitle>
          <Card>
            <p className="text-sm text-gray-700 mb-4">
              Axis evaluates eligibility based on age, employment type, nationality, income and repayment capacity.
            </p>

            <Table
              headers={["Eligibility Parameter", "Salaried", "Self-Employed"]}
              rows={eligibilityRows.map((r) => [r.label, r.salaried, r.selfEmployed])}
            />
          </Card>
        </section>

        {/* Fees & Charges */}
        <section>
          <SectionTitle>Processing Fee and Charges</SectionTitle>
          <Card>
            <Table
              headers={["Charge", "Details"]}
              rows={charges.map((c) => [c.name, c.value])}
            />
          </Card>
        </section>

        {/* Plans */}
        <section>
          <SectionTitle>Axis Bank Home Loan Plans</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {plans.map((p, idx) => (
              <Card key={`${p.title}-${idx}`}>
                <p className="font-extrabold text-basic-dark">{p.title}</p>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
                  {p.points.map((pt, i) => (
                    <li key={`${p.title}-${i}`}>{pt}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Note: Plans/features are scheme-based and offered at the bank’s discretion as per borrower profile/policy.
          </p>
        </section>

        {/* Offices near you (simple CTA) */}
        <section>
          <SectionTitle>Find Axis Home Loan Offices Near You</SectionTitle>
          <Card>
            <p className="text-sm text-gray-700 leading-relaxed">
              If you want to visit a nearby Axis office to understand offers and apply, submit your details for a free
              consultation and assistance with the process.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/eligibility-check"
                className="inline-flex items-center justify-center rounded-xl bg-basic-blue text-white px-5 py-2.5 text-sm font-bold hover:opacity-95"
              >
                Eligibility
              </Link>
              <a
                href="https://wa.me/917388016015"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-green-600 text-white px-5 py-2.5 text-sm font-bold hover:bg-green-700"
              >
                WhatsApp Support
              </a>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <section>
          <SectionTitle>Disclaimer</SectionTitle>
          <Card>
            <p className="text-sm text-gray-700 leading-relaxed">
              Interest rates, charges and eligibility can change based on lender policy and borrower profile. Fees may
              attract applicable taxes. Always verify current terms on the official Axis Bank website before applying.
            </p>
          </Card>
        </section>

        {/* FAQs */}
        <section>
          <SectionTitle>FAQs</SectionTitle>
          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <FAQItem key={`faq-${idx}`} item={f} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
