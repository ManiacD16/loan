import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type KV = { k: string; v: React.ReactNode };
type RateRow = { scheme: string; rate: string };
type Charge = { name: string; value: React.ReactNode };
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

function KeyValueTable({ rows }: { rows: KV[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-t border-gray-100">
              <td className="w-[42%] px-4 py-3 font-medium text-gray-800">{r.k}</td>
              <td className="px-4 py-3 text-gray-700">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccordionItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="font-semibold text-basic-dark">{q}</span>
        <span className="text-gray-500">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{a}</div>}
    </div>
  );
}

export default function YesBankHomeLoan() {
  // slider ranges
  const [loanAmount, setLoanAmount] = useState<number>(5_000_000); // 50L
  const [interestRate, setInterestRate] = useState<number>(9.4);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const emi = useMemo(() => calcEmi(loanAmount, interestRate, tenureYears), [loanAmount, interestRate, tenureYears]);

  const principalPct = useMemo(() => {
    const total = emi.totalPayable || 1;
    const p = (loanAmount / total) * 100;
    return Math.max(0, Math.min(100, p));
  }, [emi.totalPayable, loanAmount]);

  const interestPct = useMemo(() => 100 - principalPct, [principalPct]);

  const highlights: KV[] = [
    { k: "Loan Amount", v: "Up to ₹10 crores" },
    { k: "Interest Rate (starts)", v: "8.90% p.a. onwards (as shown on reference highlight)" },
    { k: "Processing Fee", v: "1.5% of loan amount or ₹10,000 (whichever is higher) + GST" },
    { k: "Maximum Tenure", v: "Up to 30 years (highlight) / up to 35 years (FAQ text)" },
    { k: "Rate Packages", v: "Fixed / Floating" },
    { k: "Foreclosure / Prepayment", v: "Floating: Nil | Fixed: 2.5% on outstanding loan amount" },
  ];

  const rateRows: RateRow[] = [
    { scheme: "YES Bank Regular Home Loan Scheme", rate: "9.40% – 10.25% p.a." },
    { scheme: "YES Khushi Home Loan Scheme", rate: "10.50% – 12.50% p.a." },
  ];

  const charges: Charge[] = [
    { name: "Processing Fee", value: "1.5% of loan amount or ₹10,000 (whichever is higher) + GST" },
    { name: "Login Fee", value: "₹5,000" },
    { name: "Cheque Bounce Charges", value: "₹750 per instance" },
    { name: "Document Retrieval Charges", value: "₹500 per instance" },
    { name: "LOD (List of Documents) Charges", value: "₹500 per instance" },
    { name: "EMI Cycle Date Change Charges", value: "₹500 per instance" },
    { name: "Property Swapping Charges", value: "0.1% of outstanding loan (minimum ₹10,000)" },
    {
      name: "Rate Package Conversion Charges",
      value: (
        <ul className="list-disc ml-5 space-y-1">
          <li>Floating → Fixed: 0.5% of outstanding loan amount</li>
          <li>Fixed → Floating: 1% of outstanding loan amount</li>
          <li>Higher Floating → Lower Floating: 0.5% of outstanding loan amount</li>
          <li>Higher Fixed → Lower Fixed: 1% of outstanding loan amount</li>
        </ul>
      ),
    },
    { name: "Loan Cancellation Charges", value: "₹2,000" },
    {
      name: "Foreclosure Charges",
      value: (
        <ul className="list-disc ml-5 space-y-1">
          <li>Floating: Nil</li>
          <li>Fixed: 2.5% on outstanding loan amount</li>
        </ul>
      ),
    },
    { name: "Foreclosure Statement Charges", value: "₹100 per instance" },
    { name: "NOC Charges", value: "₹100 per certificate" },
  ];

  const faqs: FAQ[] = [
    {
      q: "What is the interest rate for YES Bank home loan?",
      a: "Rates depend on scheme and profile. The reference lists regular home loan range and YES Khushi range separately.",
    },
    {
      q: "What are foreclosure charges for YES Bank home loan?",
      a: "Floating rate: Nil. Fixed rate: 2.5% on outstanding loan amount (as shown on the reference).",
    },
    {
      q: "What is the maximum tenure?",
      a: "The reference shows up to 30 years in highlights and mentions up to 35 years in FAQs (scheme/profile dependent).",
    },
    {
      q: "What is the processing fee?",
      a: "1.5% of loan amount or ₹10,000 (whichever is higher) + GST.",
    },
  ];

  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center">
            <div>
                 <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/YES_Bank_Home_Loan.jpg"
                  alt="YES Bank"
                  className="h-auto md:w-1/2 w-full object-contain mb-2 rounded-xl"
                />
              <p className="text-sm text-white/80 mb-2">Home / Home Loans / YES</p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">YES Bank Home Loan</h1>

              <p className="mt-4 text-white/90 leading-relaxed">
                Apply for YES Bank home loan with fixed/floating options, high loan amount eligibility and flexible
                repayment tenure. (Content structured to match reference page sections.)
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {/* <Link
                  to="/apply"
                  className="inline-flex items-center justify-center rounded-xl bg-basic-cyan text-basic-dark px-5 py-3 text-sm font-semibold hover:opacity-90"
                >
                  Apply Now
                </Link> */}
                <a
                  href="https://wa.me/917388016015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
                >
                  WhatsApp: +91 73880 16015
                </a>
              </div>
            </div>

            <div className="md:justify-self-end space-y-4">
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5 flex items-center gap-4">
                
                <div>
                  <div className="text-sm text-white/80">Processing fee</div>
                  <div className="font-bold">1.5% or ₹10,000 (min) + GST</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5">
                <div className="text-sm text-white/80">Rates last updated</div>
                <div className="font-semibold">30th November 2025 (as shown on reference)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI CALC */}
      <section className="container mx-auto px-4 py-10">
        <SectionTitle>YES Bank Home Loan EMI Calculator</SectionTitle>

        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-5">
              Adjust loan amount, interest rate and tenure to estimate monthly EMI (illustrative).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Loan Amount</span>
                    <span className="text-sm font-bold text-basic-dark">₹{formatINR(loanAmount)}</span>
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

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Interest Rate (% p.a.)</span>
                    <span className="text-sm font-bold text-basic-dark">{interestRate.toFixed(2)}%</span>
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

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Loan Tenure (Years)</span>
                    <span className="text-sm font-bold text-basic-dark">{tenureYears} years</span>
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
                  Apply Now
                </Link>
              </div>

              {/* Results */}
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
                    <div className="font-bold text-gray-900">₹{formatINR(emi.totalInterest)}</div>
                  </div>
                  <div className="rounded-xl bg-white ring-1 ring-black/5 p-4 col-span-2">
                    <div className="text-xs text-gray-500">Total Amount Payable</div>
                    <div className="font-bold text-gray-900">₹{formatINR(emi.totalPayable)}</div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Principal ({principalPct.toFixed(0)}%)</span>
                    <span>Interest ({interestPct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full overflow-hidden bg-white ring-1 ring-black/5">
                    <div className="h-full bg-basic-blue" style={{ width: `${principalPct}%` }} />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  EMI is an estimate; final offer depends on eligibility and lender policy.
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
            <KeyValueTable rows={highlights} />
          </div>
        </Card>
      </section>

      {/* INTEREST RATES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>YES Bank Home Loan Interest Rates</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <div className="overflow-x-auto rounded-xl ring-1 ring-black/5">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-gray-800">Scheme</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">Interest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {rateRows.map((r) => (
                    <tr key={r.scheme} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-800">{r.scheme}</td>
                      <td className="px-4 py-3 text-gray-700">{r.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Rates last updated on <b>30th November 2025</b> (as shown on reference).
            </div>
          </div>
        </Card>
      </section>

      {/* FEES & CHARGES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Processing Fees and Charges</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 space-y-4">
            {charges.map((c) => (
              <div key={c.name} className="rounded-xl border border-gray-100 p-4">
                <div className="font-semibold text-gray-900">{c.name}</div>
                <div className="mt-1 text-sm text-gray-700">{c.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-14">
        <SectionTitle>FAQs</SectionTitle>
        <div className="space-y-3">
          {faqs.map((f) => (
            <AccordionItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </main>
  );
}
