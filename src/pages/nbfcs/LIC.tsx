import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type KVRow = { label: string; value: React.ReactNode };
type RateRow = { slab: string; rate: string };
type EligibilityRow = { param: string; salaried: string; selfEmployed: string };
type ChargeRow = { charge: string; amount: React.ReactNode };
type FAQ = { q: string; a: React.ReactNode };

function formatINR(n: number) {
  if (!Number.isFinite(n)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function calcEmi(principal: number, annualRatePct: number, tenureYears: number) {
  const P = Math.max(0, principal);
  const r = Math.max(0, annualRatePct) / 12 / 100;
  const n = Math.max(1, Math.round(Math.max(1, tenureYears) * 12));

  if (r === 0) {
    const emi0 = P / n;
    const total0 = emi0 * n;
    return { emi: emi0, totalPayable: total0, totalInterest: total0 - P };
  }

  const pow = Math.pow(1 + r, n);
  const emi = (P * r * pow) / (pow - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - P;

  return { emi, totalPayable, totalInterest };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl md:text-2xl font-bold text-basic-dark mb-3">{children}</h2>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">{children}</div>;
}

function SimpleTable({
  rows,
  renderKey,
  headingA,
  headingB,
}: {
  rows: KVRow[];
  renderKey: (row: KVRow) => string;
  headingA: string;
  headingB: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm bg-white">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold text-gray-800 w-[40%]">{headingA}</th>
            <th className="px-4 py-3 font-semibold text-gray-800">{headingB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={renderKey(row)} className="border-t border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">{row.label}</td>
              <td className="px-4 py-3 text-gray-700">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="font-semibold text-basic-dark">{q}</span>
        <span className="text-gray-500">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function LICHousingFinance() {
  // EMI calculator state – as per LIC EMI section: 1 Lac–10 Cr, 0–20%, 1–30 yrs
  const [loanAmount, setLoanAmount] = useState<number>(2_500_000); // 25L
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const emi = useMemo(
    () => calcEmi(loanAmount, interestRate, tenureYears),
    [loanAmount, interestRate, tenureYears]
  );

  const principalPct = useMemo(() => {
    const total = emi.totalPayable || 1;
    const p = (loanAmount / total) * 100;
    return Math.max(0, Math.min(100, p));
  }, [emi.totalPayable, loanAmount]);

  const interestPct = useMemo(() => 100 - principalPct, [principalPct]);

  const logoUrl = "https://basichomeloan.com/admin/uploads/banner-section-logo/LIC.jpg";

  // Data taken from reference page (numbers/charges), text paraphrased.
  const highlights: KVRow[] = [
    { label: "Loan Amount", value: "Up to 90% of property value (depending on customer profile)" },
    { label: "Starting Interest Rate", value: "From 8.50% per annum" },
    { label: "RPLR", value: "17.05%" },
    { label: "Processing Fee", value: "Up to 0.50% of the sanctioned amount" },
    {
      label: "Maximum Tenure",
      value: "Up to 30 years or until the borrower turns 80 years, whichever is earlier",
    },
    { label: "Penal Interest", value: "NIL (as per reference grid, separate late-EMI charges apply)" },
    { label: "Rate Packages", value: "Floating / semi-fixed / fixed variants offered by LIC HFL" },
    { label: "Prepayment / Foreclosure", value: "NIL, as mentioned in reference table" },
  ];

  const rateRows: RateRow[] = [
    { slab: "LIC HFL Griha Suvidha", rate: "8.70% – 8.80% p.a. onwards" },
    { slab: "LIC HFL for NRI", rate: "8.45% – 8.55% p.a. onwards" },
    { slab: "LIC HFL Home Extension Loan", rate: "8.60% – 8.70% p.a. onwards" },
    { slab: "LIC HFL Home Construction Loan", rate: "8.45% – 8.55% p.a. onwards" },
    { slab: "LIC HFL Home Loan Top Up", rate: "9.70% – 11.55% p.a. onwards" },
    { slab: "LIC HFL Advantage Plus", rate: "8.45% – 8.55% p.a. onwards" },
    { slab: "LIC HFL Home Loan for Pensioners", rate: "8.45% – 8.55% p.a. onwards" },
    { slab: "LIC HFL Home Loan", rate: "8.45% – 8.55% p.a. onwards" },
    { slab: "LIC HFL Home Renovation Loan", rate: "8.45% – 8.55% p.a. onwards" },
    { slab: "LIC HFL Plot Loan", rate: "8.75% – 8.85% p.a. onwards" },
  ];

  const eligibilityRows: EligibilityRow[] = [
    {
      param: "Age (years)",
      salaried: "18 – 50 years",
      selfEmployed: "18 – 75 years",
    },
    {
      param: "Nationality",
      salaried: "Resident & Non-Resident Indian",
      selfEmployed: "Resident & Non-Resident Indian",
    },
    {
      param: "Minimum Monthly Income",
      salaried: "₹30,000 per month",
      selfEmployed: "₹30,000 per month",
    },
  ];

  const charges: ChargeRow[] = [
    { charge: "Processing Fee", amount: "Up to 0.50% of loan amount" },
    { charge: "Rewriting Charges", amount: "₹2,500" },
    { charge: "Statutory Charges", amount: "₹250 – ₹1,000" },
    { charge: "Cheque Bounce Charges", amount: "₹350 per instance" },
    { charge: "Document Retrieval Charges", amount: "₹2,500" },
    { charge: "ECS Dishonour Charges", amount: "₹200 per instance" },
    { charge: "Charges for Providing Document List", amount: "₹500" },
    { charge: "Late EMI Payment Charges", amount: "1.5% – 2% per month" },
    { charge: "Photocopies of Title Documents", amount: "₹1,000" },
  ];

  const faqs: FAQ[] = [
    {
      q: "What is the starting interest rate for LIC Housing Finance home loans?",
      a: "The reference page shows LIC Housing Finance home loans starting at 8.50% per annum, with exact rates depending on scheme, profile, and other eligibility parameters. Always re-check the latest rate grid before applying.",
    },
    {
      q: "How can I pay LIC HFL home loan EMIs online?",
      a: (
        <>
          Registered borrowers can pay EMIs through the LIC HFL customer portal:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Log in with your user credentials</li>
            <li>Choose the “Pay Online” option in the loan section</li>
            <li>Fetch dues, confirm the amount, and complete payment via available gateway</li>
            <li>Download or email the receipt from the same screen after payment</li>
          </ul>
        </>
      ),
    },
    {
      q: "Is LIC Housing Finance a safe option for a home loan?",
      a: "LIC HFL is one of India’s established housing finance companies, backed by LIC, and is widely considered a trusted and regulated lender for home loans.",
    },
    {
      q: "What is the maximum LIC home loan amount mentioned?",
      a: "The reference content mentions that eligible customers can access home loan amounts up to ₹15 crore, subject to profile and property conditions.",
    },
    {
      q: "How do I download my LIC HFL home loan statement?",
      a: (
        <>
          Typically you can:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Visit the official LIC HFL portal</li>
            <li>Log in as an existing customer with account details and date of birth</li>
            <li>Go to the loan account section / status report</li>
            <li>View and download the required statement from the menu</li>
          </ul>
        </>
      ),
    },
    {
      q: "What are some benefits of LIC HFL home loans as mentioned?",
      a: (
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Competitive rates on home loans and top-ups</li>
          <li>Online approval and digital process options</li>
          <li>Long repayment tenure (up to 30 years)</li>
          <li>No pre-payment penalty for specified products</li>
          <li>Relatively simple and streamlined documentation</li>
        </ul>
      ),
    },
    {
      q: "What is the minimum CIBIL score required?",
      a: "The reference page mentions that LIC Housing Finance generally expects a minimum CIBIL score of 600 to qualify for a home loan.",
    },
    {
      q: "How can I try to reduce my interest rate with LIC HFL?",
      a: "Keeping EMIs regular (no overdue instalments), maintaining a strong credit profile, and following the lender’s policies around rate-reduction requests can help when seeking a lower rate on an existing loan.",
    },
    {
      q: "Does LIC Housing Finance offer only one type of interest rate?",
      a: (
        <>
          No. The reference content lists three types:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Floating / variable rate</li>
            <li>Semi-fixed rate for a part of the loan tenure</li>
            <li>Full-term fixed rate</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-[1.3fr_.7fr] gap-6 items-center">
            <div>
              
                
              <p className="text-sm text-white/70 mb-2">Home / Home Loans / LIC Housing Finance</p>
              <img
                  src={logoUrl}
                  alt="LIC Housing Finance logo"
                  className="h-full  w-auto object-contain rounded-xl"
                />
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                LIC Housing Finance Home Loan
              </h1>
              <p className="mt-4 text-white/90 leading-relaxed">
                LIC Housing Finance Limited (LIC HFL), a subsidiary of LIC, offers a wide basket of home
                loan products with starting interest rates from 8.50% p.a., loan amounts from ₹1 lakh up to
                ₹15 crore, and tenures going up to 30 years.
              </p>
              <p className="mt-2 text-sm text-white/80">
                With AraMount, you can compare, understand charges, and move faster on your LIC HFL home loan
                journey.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/917388016015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-basic-cyan text-basic-dark px-5 py-3 text-sm font-semibold hover:opacity-90"
                >
                  Apply with AraMount
                </a>
                <Link
                  to="/eligibility-check"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white px-5 py-3 text-sm font-semibold hover:bg-white/15"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>

            <div className="md:justify-self-end space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/10 flex items-center gap-4">
                <div>
                  <div className="text-xs text-gray-500">Starting interest rate</div>
                  <div className="font-bold text-basic-dark">From 8.50% p.a.</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Processing fee: up to 0.50% of loan amount
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-4">
                <div className="text-xs text-white/80">Rates last updated (reference)</div>
                <div className="font-semibold">30th November 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR */}
      <section className="container mx-auto px-4 py-10">
        <SectionTitle>LIC Housing Finance EMI Calculator</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-5">
              Avoid confusion – get it right with <span className="font-semibold">AraMount</span>.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Loan Amount</span>
                    <span className="text-sm font-bold text-basic-dark">
                      ₹{formatINR(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={100000000}
                    step={50000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1 Lac</span>
                    <span>₹10 Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Interest Rate (% p.a.)</span>
                    <span className="text-sm font-bold text-basic-dark">
                      {interestRate.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={0.05}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Loan Tenure (Years)</span>
                    <span className="text-sm font-bold text-basic-dark">
                      {tenureYears} years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </div>

                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center w-full rounded-xl bg-basic-blue text-white px-5 py-3 text-sm font-semibold hover:opacity-95"
                >
                  Apply Now via AraMount
                </Link>
              </div>

              {/* Outputs */}
              <div className="rounded-2xl bg-gray-50 ring-1 ring-black/5 p-5 md:p-6">
                <div className="text-sm text-gray-600">Your monthly EMI is</div>
                <div className="text-3xl font-extrabold text-basic-dark mt-1">
                  ₹{formatINR(emi.emi)}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white ring-1 ring-black/5 p-4">
                    <div className="text-xs text-gray-500">Principal Amount</div>
                    <div className="font-bold text-gray-900">₹{formatINR(loanAmount)}</div>
                  </div>
                  <div className="rounded-xl bg-white ring-1 ring-black/5 p-4">
                    <div className="text-xs text-gray-500">Total Interest</div>
                    <div className="font-bold text-gray-900">
                      ₹{formatINR(emi.totalInterest)}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white ring-1 ring-black/5 p-4 col-span-2">
                    <div className="text-xs text-gray-500">Total Amount Payable</div>
                    <div className="font-bold text-gray-900">
                      ₹{formatINR(emi.totalPayable)}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Principal ({principalPct.toFixed(0)}%)</span>
                    <span>Interest ({interestPct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full overflow-hidden bg-white ring-1 ring-black/5">
                    <div
                      className="h-full bg-basic-blue"
                      style={{ width: `${principalPct}%` }}
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  EMI is indicative. Final EMI and interest will depend on LIC HFL&apos;s actual
                  sanction and rate grid at the time of approval.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Key Highlights</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <SimpleTable
              rows={highlights.map((h) => ({ label: h.label, value: h.value }))}
              renderKey={(row) => row.label}
              headingA="Feature"
              headingB="Details"
            />
          </div>
        </Card>
      </section>

      {/* INTEREST RATES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>LIC Housing Finance Interest Rates in 2026</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              The LIC HFL grid lists different home loan schemes with their typical interest
              ranges. These depend on scheme selection and customer profile.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-gray-800 w-[50%]">Loan Slab / Scheme</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">
                      Indicative Interest Rate (p.a.)*
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rateRows.map((row) => (
                    <tr key={row.slab} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                      <td className="px-4 py-3 text-gray-700">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              *Interest rates as per reference page; last updated on 30th November 2025. Always
              verify current rates before proceeding.
            </p>
          </div>
        </Card>
      </section>

      {/* ELIGIBILITY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>LIC Housing Finance Eligibility Criteria</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 overflow-x-auto">
            <table className="w-full text-sm bg-white">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-gray-800">Eligibility Parameter</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">Salaried Individuals</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">Self-Employed Individuals</th>
                </tr>
              </thead>
              <tbody>
                {eligibilityRows.map((row) => (
                  <tr key={row.param} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">
                      {row.param}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.salaried}</td>
                    <td className="px-4 py-3 text-gray-700">{row.selfEmployed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* PROCESSING FEE & CHARGES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>LIC Housing Finance Processing Fee and Charges</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              LIC HFL levies certain administrative and service charges while processing and
              managing your home loan. Below is the reference grid from the source content.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-gray-800 w-[45%]">
                      Fee / Charge Type
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-800">Amount (as per grid)</th>
                  </tr>
                </thead>
                <tbody>
                  {charges.map((row) => (
                    <tr key={row.charge} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">
                        {row.charge}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Taxes (like GST) may apply on these charges. The bank can revise fees at its
              discretion.
            </p>
          </div>
        </Card>
      </section>

      {/* HOW TO APPLY + AROUND YOU */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>How to Apply for LIC Housing Finance Home Loan with AraMount</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
              <li>Click on the apply button or connect with AraMount via WhatsApp.</li>
              <li>Share basic details like loan requirement, city, income and property type.</li>
              <li>Our team helps match you with suitable LIC HFL schemes and prepares your file.</li>
              <li>We guide you on documentation, login, sanction and disbursement steps end-to-end.</li>
            </ol>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://wa.me/917388016015"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-basic-blue hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold"
              >
                Chat on WhatsApp
              </a>
              <Link
                to="/emi"
                className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl text-sm font-semibold"
              >
                Use AraMount EMI Calculator
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Interest rates and fees on home loans vary with time and eligibility. For the most
              current LIC HFL information, always refer to the official LIC Housing Finance
              website and documents provided at sanction.
            </p>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-14">
        <SectionTitle>LIC Housing Finance Home Loan – FAQs</SectionTitle>
        <div className="space-y-3">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </main>
  );
}
