import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type KV = { k: string; v: React.ReactNode };
type Row = { a: string; b: React.ReactNode };
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

function KVTable({ rows }: { rows: KV[] }) {
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

function SimpleTable({
  headA,
  headB,
  rows,
  rowKey,
}: {
  headA: string;
  headB: string;
  rows: Row[];
  rowKey: (r: Row) => string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-black/5">
      <table className="w-full text-sm bg-white">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold text-gray-800">{headA}</th>
            <th className="px-4 py-3 font-semibold text-gray-800">{headB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-800">{r.a}</td>
              <td className="px-4 py-3 text-gray-700">{r.b}</td>
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

export default function DCBHomeLoan() {
  // Calculator ranges shown on reference: 1 Lac -> 10 Cr, 0 -> 20%, 1 -> 30 years
  const [loanAmount, setLoanAmount] = useState<number>(5_000_000);
  const [interestRate, setInterestRate] = useState<number>(9.75);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const emi = useMemo(() => calcEmi(loanAmount, interestRate, tenureYears), [loanAmount, interestRate, tenureYears]);

  const principalPct = useMemo(() => {
    const total = emi.totalPayable || 1;
    const p = (loanAmount / total) * 100;
    return Math.max(0, Math.min(100, p));
  }, [emi.totalPayable, loanAmount]);

  const interestPct = useMemo(() => 100 - principalPct, [principalPct]);

  // DCB logo from the reference page (you can replace with local path later if you want)
  const logoUrl = "https://basichomeloan.com/admin/uploads/banner-section-logo/DCB_Bank.jpg";

  const highlights: KV[] = [
    { k: "Loan Amount", v: "Up to ₹5 crores" },
    { k: "Rate of Interest", v: "Starts at 9.75% per annum" },
    { k: "Processing Fee", v: "Up to 2.00% of the loan amount (Minimum ₹5,000)" },
    { k: "Maximum Tenure for Repayment", v: "20 years" },
    { k: "Rate Packages", v: "Fixed / Floater" },
    {
      k: "Prepayment / Foreclosure",
      v: "Floater: Nil • Part Fixed + Part Floater: Nil – 25% of the outstanding principal",
    },
  ];

  const interestRates: Row[] = [
    { a: "Fixed Plans (For Salaried)", b: "Starts at 9.75% per annum" },
    { a: "Fixed Plans (For Self-Employed)", b: "Starts at 9.75% per annum" },
    { a: "Floater Plans (For Salaried)", b: "Starts at 9.75% per annum" },
    { a: "Floater Plans (For Self-Employed)", b: "Starts at 9.75% per annum" },
  ];

  const eligibility: Row[] = [
    { a: "Age Range (in years)", b: "21 – 65 years (Salaried & Self-Employed)" },
    { a: "Nationality", b: "Indian Resident / NRIs (NRI requires an Indian Resident co-applicant)" },
    { a: "Minimum Income Earned", b: "Nothing specific" },
  ];

  const charges: Row[] = [
    { a: "Processing Fee", b: "Up to 2.00% of the loan amount (Minimum ₹5,000)" },
    {
      a: "Collection Charges",
      b: (
        <ul className="list-disc ml-5 space-y-1">
          <li>₹100 + applicable taxes per call</li>
          <li>₹250 + applicable taxes per visit (dues recovery)</li>
        </ul>
      ),
    },
    { a: "Annual Maintenance Charges", b: "Up to 1.00% of the outstanding principal" },
    { a: "Duplicate NOC (No Objection Certificate)", b: "₹100 per instance" },
    { a: "Statement of Account", b: "₹100 per instance" },
    { a: "Foreclosure Statement", b: "₹100 per instance" },
    { a: "Loan Agreement Copy", b: "₹500 per instance" },
    { a: "Part / Full Prepayment Charges", b: "Floater: Nil • Part Fixed + Part Floater: Nil – 25% of outstanding principal" },
    { a: "Cheque Bounce Charges", b: "₹750 per instance" },
    { a: "Cheque / Instrument Swapping Charges", b: "₹500 per instance" },
    { a: "Re-Pricing Charges", b: "Up to 1.00% of outstanding loan amount (Minimum ₹5,000)" },
    { a: "Penal Interest", b: "3.00% per month" },
    { a: "Property Documents Retrieval Charges", b: "₹500 per set" },
    { a: "Amortization Schedule", b: "₹100 per schedule" },
  ];

  const faqs: FAQ[] = [
    { q: "What is the home loan rate of DCB Bank?", a: "DCB home loan ROI starts at 9.75% per annum." },
    { q: "What is the CIBIL score for the DCB Bank home loan?", a: "A CIBIL score of 700 and above is considered good." },
    {
      q: "What are the charges for DCB home loan closure?",
      a: "Foreclosure is nil for floater; for part fixed + part floater it can be up to 25% of outstanding principal.",
    },
    { q: "What is the required minimum salary for a DCB bank home loan?", a: "Minimum monthly salary mentioned is ₹25,000." },
    {
      q: "What is the maximum home loan amount offered by DCB Bank?",
      a: "Up to ₹5 crores (minimum loan amount mentioned is ₹10 lakhs).",
    },
    {
      q: "How long is the home loan approval process for DCB Bank?",
      a: "Approval may take around 5 to 10 days (depends on documentation and eligibility).",
    },
    {
      q: "Can I transfer my existing home loan to DCB Bank?",
      a: "Yes, balance transfer option is mentioned, with an additional top-up facility.",
    },
    {
      q: "Is it mandatory to have a co-applicant for a DCB Bank home loan?",
      a: "Yes, a close family member (spouse/parents/children) can be co-applicant/guarantor.",
    },
  ];

  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center">
            <div>
              <p className="text-sm text-white/80 mb-2">Home / Home Loans / DCB</p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">DCB Bank Home Loan</h1>

              <p className="mt-4 text-white/90 leading-relaxed">
                DCB Bank home loans are shown with ROI starting at 9.75% p.a., loan amount up to ₹5 crores,
                and repayment tenure up to 20 years.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center rounded-xl bg-basic-cyan text-basic-dark px-5 py-3 text-sm font-semibold hover:opacity-90"
                >
                  Apply Now
                </Link>
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
                <img src={logoUrl} alt="DCB Bank" className="h-12 w-24 rounded-xl bg-white p-2 object-contain" />
                <div>
                  <div className="text-sm text-white/80">Processing fee</div>
                  <div className="font-bold">Up to 2.00% (Min ₹5,000)</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5">
                <div className="text-sm text-white/80">Rates last updated</div>
                <div className="font-semibold">30th November 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR */}
      <section className="container mx-auto px-4 py-10">
        <SectionTitle>DCB Bank Home Loan EMI Calculator</SectionTitle>

        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-5">Avoid confusion—get it right with AraMount.</p>

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
                <div className="text-3xl font-extrabold text-basic-dark mt-1">₹{formatINR(emi.emi)}</div>

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
            <KVTable rows={highlights} />
          </div>
        </Card>
      </section>

      {/* INTEREST RATES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>DCB Bank Home Loan Interest Rates in 2026</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              DCB home loan interest rates are shown in the range of 8.25% – 12.72% p.a. depending on eligibility and plan.
            </p>

            <SimpleTable headA="Loan Slab" headB="Interest Rate for Home Loan" rows={interestRates} rowKey={(r) => r.a} />

            <div className="mt-4 text-xs text-gray-500">
              Interest rates last updated on <b>30th November 2025</b>.
            </div>
          </div>
        </Card>
      </section>

      {/* ELIGIBILITY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>DCB Bank Home Loan Eligibility Criteria</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <SimpleTable headA="Eligibility Parameters" headB="Details" rows={eligibility} rowKey={(r) => r.a} />
          </div>
        </Card>
      </section>

      {/* FEES & CHARGES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>DCB Bank Home Loan Processing Fee and Charges</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <SimpleTable headA="Charge" headB="Amount" rows={charges} rowKey={(r) => r.a} />
          </div>
        </Card>
      </section>

      {/* SCHEMES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>DCB Bank Home Loan Schemes and Top Plans</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 space-y-6">
            <div>
              <h3 className="font-bold text-basic-dark">1. DCB Regular Home Loans</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                <li>For purchase of home/land or construction on owned land</li>
                <li>Maximum loan amount up to ₹5 crores</li>
                <li>Loan-to-Value ratio up to 90% of property cost</li>
                <li>Balance transfer facility</li>
                <li>Additional top-up loans</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-basic-dark">2. DCB Micro Home Loans</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                <li>For informal employed segments (traders, small business owners, etc.)</li>
                <li>Loan amount from ₹1 lakh up to ₹15 lakh</li>
                <li>Quick approvals with attractive ROI</li>
              </ul>
            </div>

            <p className="text-xs text-gray-500">
              Note: Plans are offered at the bank’s discretion based on earning and repayment capacity.
            </p>
          </div>
        </Card>
      </section>

      {/* DOCUMENTS */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Documents Required For DCB Bank Home Loan</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-gray-50 ring-1 ring-black/5 p-5">
                <h3 className="font-bold text-basic-dark">Salaried Applicants</h3>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-800">Proof of Income</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Salary slips (last 3 months)</li>
                    <li>Salary account statements (last 6 months)</li>
                    <li>ITR (last 2 years)</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-800">Other Required Documents</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Filled & signed application form with passport-size photo</li>
                    <li>Processing fee cheque in favour of DCB Bank</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 ring-1 ring-black/5 p-5">
                <h3 className="font-bold text-basic-dark">Self-Employed Applicants</h3>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-800">Proof of Income</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Trade/statutory license</li>
                    <li>Business bank statements (all accounts, last 1 year)</li>
                    <li>Professional qualification proof</li>
                    <li>Last 2 GST returns</li>
                    <li>ITR (last 3 years)</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-800">Other Required Documents</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Filled & signed application form with passport-size photo</li>
                    <li>Processing fee cheque in favour of DCB Bank</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white ring-1 ring-black/5">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-basic-dark">Common Documents</h3>
              </div>
              <div className="p-5">
                <KVTable
                  rows={[
                    {
                      k: "Identity & Address Proof",
                      v: "Voter ID, Driving License, Aadhaar Card, Passport copy, PAN Card",
                    },
                    {
                      k: "Property Documents",
                      v: (
                        <ul className="list-disc ml-5 space-y-1">
                          <li>Sale deed / allotment letter</li>
                          <li>Occupancy certificate</li>
                          <li>Payment receipts to builder</li>
                          <li>Permission to construct</li>
                          <li>Approved plan copy</li>
                          <li>Registered development agreement (builder)</li>
                          <li>NOC from builder / housing society</li>
                        </ul>
                      ),
                    },
                  ]}
                />
              </div>
            </div>

            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-xl bg-basic-blue text-white px-5 py-3 text-sm font-semibold hover:opacity-95"
            >
              Apply Now
            </Link>
          </div>
        </Card>
      </section>

      {/* HOW TO APPLY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>How to Apply for DCB Bank Home Loan?</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Go to the <b>Apply Now</b> section on the AraMount website</li>
              <li>Fill your name and contact details and submit</li>
              <li>The AraMount team will connect to help start the home loan process</li>
            </ul>

            <div className="mt-5">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center rounded-xl bg-basic-blue text-white px-5 py-3 text-sm font-semibold hover:opacity-95"
              >
                Apply Now
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Disclaimer: Rates/fees can change as per lender policy; check official bank sources for latest.
            </p>
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
