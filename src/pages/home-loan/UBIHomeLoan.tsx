// src/pages/home-loan/UnionBankOfIndiaHomeLoan.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Highlight = { label: string; value: string };
type RateRow = { slab: string; male: string; female: string };
type ChargeRow = { name: string; value: string };
type DocSection = { title: string; items: string[] };
type FAQ = { q: string; a: string };

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl font-bold text-basic-dark mb-3">
      {children}
    </h2>
  );
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
      <table className="min-w-[720px] w-full border-collapse bg-white">
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
                <td key={`cell-${ri}-${ci}`} className="text-sm text-gray-800 px-4 py-3 border-b align-top">
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
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function UnionBankOfIndiaHomeLoan() {
  // Reference page sliders: Loan 1 Lac–10 Cr, Interest 0–20, Tenure 1–30 years
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.7);
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
    { label: "Loan Amount", value: "Up to ₹75 Lakhs" },
    { label: "Interest Rate (starts)", value: "8.70% p.a." },
    { label: "RPLR", value: "9.30% p.a." },
    { label: "Processing Fee", value: "0.50% (max ₹15,000 + GST)" },
    { label: "Max Tenure", value: "Up to 30 years" },
    { label: "Rate Options", value: "Fixed / Floating" },
  ];

  // Interest slab table shown on the reference page (Home loan up to ₹30 lakhs, salaried)
  const rateRows: RateRow[] = [
    { slab: "Less than 600", male: "10.70%", female: "10.70%" },
    { slab: "600 – 649", male: "10.15%", female: "10.15%" },
    { slab: "650 – 699", male: "9.55%", female: "9.50%" },
    { slab: "700 – 749", male: "9.45%", female: "9.40%" },
    { slab: "750 – 774", male: "8.85%", female: "8.85%" },
    { slab: "775 and above", male: "8.70%", female: "8.70%" },
  ];

  const charges: ChargeRow[] = [
    { name: "Processing Fee", value: "0.50% of the loan amount (maximum ₹15,000 + GST)" },
    { name: "Cheque Bounce Charges", value: "₹250 + GST" },
    { name: "Copy of Documents (per set)", value: "₹500" },
    { name: "Stamp Duty / Valuation / Legal / CERSAI", value: "As per actuals" },
  ];

  const salariedDocs: DocSection[] = [
    {
      title: "Proof of Income",
      items: ["Salary slips (last 3 months)", "Bank statements (last 6 months)", "ITR (last 2 years)"],
    },
    {
      title: "Other Documents",
      items: ["Filled application form", "Passport-size photographs (3)", "Processing fee (as applicable)"],
    },
  ];

  const selfEmployedDocs: DocSection[] = [
    {
      title: "Proof of Income",
      items: [
        "Profit & Loss statement (last 2 years)",
        "ITR (last 3 years) / proof of other income",
        "Bank statements (last 6 months)",
      ],
    },
    {
      title: "Other Documents",
      items: ["Filled application form", "Passport-size photographs (3)", "Processing fee (as applicable)"],
    },
  ];

  const commonDocs: DocSection[] = [
    {
      title: "Identity & Address Proof",
      items: ["Aadhaar / Voter ID / Driving Licence / Passport copy", "PAN card"],
    },
    {
      title: "Property Documents",
      items: [
        "Sale deed / Allotment letter",
        "Occupancy certificate",
        "Payment receipts to builder",
        "Construction permission (if applicable)",
        "Approved plan copy",
        "Development agreement (builder)",
        "NOC from builder / society (if applicable)",
      ],
    },
  ];

  const faqs: FAQ[] = [
    {
      q: "What is the current Union Bank home loan starting rate?",
      a: "As per the reference page, UBI home loans start from 8.70% p.a. Rates can vary by profile/scheme and may change—verify from the bank’s official site before applying.",
    },
    {
      q: "What documents are typically required?",
      a: "You generally need ID/address proof, income proof (salary slips/bank statements/ITR), property papers, photographs, and details of any existing loans (if applicable).",
    },
    {
      q: "Can I get PMAY subsidy on a UBI home loan?",
      a: "Home loans under PMAY may offer interest subsidy up to 6.5% depending on the beneficiary category and scheme rules.",
    },
    {
      q: "What credit score is usually needed?",
      a: "The page indicates a minimum CIBIL score of around 600 is considered; approvals can still depend on overall eligibility and policy.",
    },
    {
      q: "What’s the maximum amount mentioned for UBI home loans?",
      a: "The page mentions up to ₹75 Lakhs for purchase/construction (subject to eligibility and bank terms).",
    },
    {
      q: "Are prepayment / foreclosure charges applicable?",
      a: "The page indicates prepayment/foreclosure charges are not levied for standard home loans; confirm exact conditions for your scheme/profile.",
    },
    {
      q: "What is the moratorium period mentioned?",
      a: "Up to 3 years for purchase/construction; up to 1 year for renovation/repair—subject to scheme and bank policy.",
    },
  ];

  // Optional: simple callback form (local-only)
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, "");
    if (!name.trim() || cleaned.length < 10) return;
    setSubmitted(true);
    // Hook this to your backend later if you have one.
  };

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2">
                <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/Union_Bank_of_India_Home_Loan.jpg"
                  alt="Union Bank of India"
                  className="h-9 w-auto object-contain bg-white rounded-lg p-1"
                />
                <span className="text-sm font-semibold opacity-90">UBI Home Loan</span>
              </div>

              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">
                Union Bank of India (UBI) Home Loan
              </h1>

              <p className="mt-3 text-white/80 leading-relaxed">
                Union Bank of India offers home loans for buying a new/old home and for construction,
                with processing fees capped and tenure options that can go up to 30 years depending on policy.
                The reference page highlights a starting rate of 8.70% p.a. with a 0.50% processing fee (max ₹15,000 + GST).
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

            {/* Highlights mini grid */}
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
                  Figures are indicative; actuals depend on scheme/profile & bank policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* EMI Calculator */}
        <section id="emi">
          <SectionTitle>Union Bank Home Loan EMI Calculator</SectionTitle>
          <Card>
            <p className="text-sm text-gray-700 mb-5">
              Adjust the values below to estimate your monthly EMI and total payment breakup.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-800">Loan Amount (₹)</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    value={P}
                    onChange={(e) => setLoanAmount(Number(e.target.value || 0))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    min={100000}
                    max={100000000}
                  />
                </div>
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
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    value={Number(annualRate.toFixed(2))}
                    onChange={(e) => setInterestRate(Number(e.target.value || 0))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    min={0}
                    max={20}
                    step={0.05}
                  />
                </div>
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
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setTenureYears(Number(e.target.value || 0))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    min={1}
                    max={30}
                  />
                </div>
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
                <p className="mt-1 text-2xl font-extrabold text-basic-dark">
                  ₹ {formatINR(emi)}
                </p>
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p className="flex justify-between"><span>Total Amount Payable</span><span className="font-semibold">₹ {formatINR(totalPayable)}</span></p>
                  <p className="flex justify-between"><span>Principal Amount</span><span className="font-semibold">₹ {formatINR(P)}</span></p>
                  <p className="flex justify-between"><span>Total Interest</span><span className="font-semibold">₹ {formatINR(totalInterest)}</span></p>
                </div>
              </div>

              <div className="rounded-2xl bg-white ring-1 ring-black/5 p-5">
                <p className="font-bold text-basic-dark">Apply for UBI Home Loan</p>
                <p className="mt-1 text-sm text-gray-700">
                  Prefer a quick callback? Share basic details and we’ll get back to you.
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
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City (optional)"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-basic-blue text-white px-4 py-2.5 text-sm font-bold hover:opacity-95"
                    >
                      Submit
                    </button>
                    <p className="text-xs text-gray-500">
                      Note: This demo form stores data locally only. Connect to your backend if needed.
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
          <SectionTitle>Union Bank Home Loan Interest Rates (Indicative Slabs)</SectionTitle>
          <p className="text-sm text-gray-700 mb-4">
            The reference page lists CIBIL-based slabs (example shown for salaried applicants up to ₹30 Lakhs).
            Rates are indicative and can change.
          </p>

          <Table
            headers={["CIBIL / Score Slab", "Male", "Female"]}
            rows={rateRows.map((r) => [r.slab, r.male, r.female])}
          />

          <p className="mt-3 text-xs text-gray-500">
            Rate slab “last updated on 30 November 2025” as mentioned on the reference page.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <SectionTitle>Eligibility Criteria</SectionTitle>
          <Card>
            <p className="text-sm text-gray-700 mb-4">
              Eligibility is evaluated on factors like age, nationality, income, and repayment capacity.
            </p>

            <Table
              headers={["Parameter", "Salaried", "Self-Employed"]}
              rows={[
                ["Age Range", "21 – 70 years", "21 – 70 years"],
                ["Nationality", "Indian Resident / NRI", "Indian Resident / NRI"],
                ["Minimum Income", "As per bank norms (scheme & city dependent)", "As per bank norms (scheme & city dependent)"],
              ]}
            />
          </Card>
        </section>

        {/* Processing Fees & Charges */}
        <section>
          <SectionTitle>Processing Fee and Charges</SectionTitle>
          <Card>
            <Table
              headers={["Charge", "Details"]}
              rows={charges.map((c) => [c.name, c.value])}
            />
          </Card>
        </section>

        {/* Documents Required */}
        <section>
          <SectionTitle>Documents Required</SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <p className="font-bold text-basic-dark">Salaried Applicants</p>
              <div className="mt-4 space-y-4">
                {salariedDocs.map((sec, idx) => (
                  <div key={`${sec.title}-${idx}`}>
                    <p className="text-sm font-semibold text-gray-800">{sec.title}</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                      {sec.items.map((it, i) => (
                        <li key={`${sec.title}-${i}`}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="font-bold text-basic-dark">Self-Employed Applicants</p>
              <div className="mt-4 space-y-4">
                {selfEmployedDocs.map((sec, idx) => (
                  <div key={`${sec.title}-${idx}`}>
                    <p className="text-sm font-semibold text-gray-800">{sec.title}</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                      {sec.items.map((it, i) => (
                        <li key={`${sec.title}-${i}`}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {commonDocs.map((sec, idx) => (
              <Card key={`${sec.title}-${idx}`}>
                <p className="font-bold text-basic-dark">{sec.title}</p>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
                  {sec.items.map((it, i) => (
                    <li key={`${sec.title}-${i}`}>{it}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Apply */}
        <section>
          <SectionTitle>How to Apply</SectionTitle>
          <Card>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
              <li>Go to the application section on your website.</li>
              <li>Fill in your basic details (name and contact information) and submit.</li>
              <li>Your team can then connect with the applicant to continue the loan process.</li>
            </ol>

            <div className="mt-5 flex flex-wrap gap-3">
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
              Interest rates, fees, and eligibility can vary based on lender policy and applicant profile. Charges may
              attract applicable taxes and can change over time. For the latest terms, always refer to the official
              Union Bank of India website.
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
