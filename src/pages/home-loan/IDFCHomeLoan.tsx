import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type KV = { k: string; v: React.ReactNode };
type RateRow = { label: string; value: string };
type ChargeRow = { label: string; value: React.ReactNode };
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

function SimpleTable({
  headA,
  headB,
  rows,
  rowKey,
}: {
  headA: string;
  headB: string;
  rows: Array<{ a: string; b: React.ReactNode }>;
  rowKey: (r: { a: string; b: React.ReactNode }) => string;
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

export default function IDFCFirstBankHomeLoan() {
  // EMI calculator ranges shown on the reference page: 1 Lac -> 10 Cr, 0% -> 20%, 1 -> 30 yrs :contentReference[oaicite:1]{index=1}
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

  // Content (facts) from the reference page
  const highlights: KV[] = [
    { k: "Loan Amount", v: "Up to ₹5 crore" },
    { k: "Rate of Interest", v: "9.40% p.a. onwards" },
    { k: "Processing Fee", v: "Up to 3%" },
    { k: "Maximum Tenure for Repayment", v: "30 years" },
  ]; // :contentReference[oaicite:2]{index=2}

  const interestRates2026: RateRow[] = [
    { label: "Housing Loan (For Salaried)", value: "Starts at 8.85%" },
    { label: "Home Loan Balance Transfer (For Salaried)", value: "Starts at 8.85%" },
    {
      label: "Home Loan Top-Up (For Salaried)",
      value: "Same ROI as Balance Transfer up to max cap limit of 100% of the Balance Transfer loan amount",
    },
    { label: "Housing Loan (For Self Employed)", value: "Starts at 9.25%" },
    { label: "Home Loan Balance Transfer (For Self Employed)", value: "Starts at 9.25%" },
    {
      label: "Home Loan Top-Up (For Self Employed)",
      value: "Same ROI as Balance Transfer up to max capping of 100% of the Balance Transfer loan amount",
    },
  ]; // :contentReference[oaicite:3]{index=3}

  const charges: ChargeRow[] = [
    { label: "Processing Fee", value: "0.25% - 0.50%" },
    { label: "EMI Bounce Charges", value: "₹400 (GST excluded)" },
    { label: "Charges for Copies of Documents", value: "₹500 for a physical copy (GST excluded)" },
    { label: "Charges for Duplicate NOC Issuance", value: "₹500 (GST excluded)" },
    { label: "MCLR to EBR Type", value: "-" },
    { label: "Schedule for Repayment", value: "₹500 for a physical copy (GST excluded)" },
    { label: "Charges for Document Retrieval", value: "₹500 (GST excluded)" },
    { label: "Charges for Cheque/Instrument Swap (per swap)", value: "₹500 (GST excluded)" },
    {
      label: "Penal Charges / Late Payment Charges",
      value: "2% per month for unpaid EMI (GST excluded) or ₹300 (GST excluded), whichever is higher",
    },
    { label: "Charges for Repayment Instrument Swap", value: "₹500" },
    { label: "List of Documents", value: "₹500 for a physical copy (GST excluded)" },
    { label: "Charges for Stamping", value: "As per actuals" },
    { label: "Charges for Loan Rescheduling", value: "-" },
    { label: "Account Statement", value: "₹500 for a physical copy (GST excluded)" },
    { label: "Charges for EMI Collection", value: "₹350 (GST excluded)" },
    {
      label: "Charges for Cancellation and rebooking",
      value: "1% of the loan amount + interest from disbursal date until cancellation request receipt",
    },
    { label: "Incidental Charges (dues recovery)", value: "As per actuals" },
  ]; // :contentReference[oaicite:4]{index=4}

  const faqs: FAQ[] = [
    { q: "What is the home loan interest rate in IDFC?", a: "The page states IDFC home loan rate of interest ranges between 8.85% and 10.75%." },
    { q: "What is the required CIBIL score for an IDFC home loan?", a: "A CIBIL credit score of 750 or higher is mentioned as ideal." },
    {
      q: "What are the features of IDFC First Bank home loans?",
      a: (
        <ul className="list-disc ml-5 space-y-1">
          <li>Customized loans</li>
          <li>Minimal documentation</li>
          <li>Digitized application process</li>
          <li>Loans up to ₹5 crore and up to 30 years</li>
          <li>Top-up up to 100% at same ROI as Balance Transfer</li>
          <li>Higher eligibility for salaried/self-employed applicants</li>
        </ul>
      ),
    },
    { q: "How can I lower my IDFC home loan interest rate?", a: "Making a higher down payment is suggested as a way to reduce ROI." },
    { q: "How much home loan amount can I avail from IDFC First Bank?", a: "Maximum home loan amount mentioned is up to ₹5 crore." },
    { q: "Can I apply for a joint home loan with a co-applicant in IDFC?", a: "Yes—joint home loan with an immediate family member is mentioned." },
    { q: "How to apply for an IDFC First Bank home loan?", a: "Apply via AraMount Home Loan website “Apply Now”; a representative connects to help initiate the process." },
    { q: "How long does it take for home loan approval in IDFC?", a: "Approval time may vary based on eligibility and other factors." },
  ]; // :contentReference[oaicite:5]{index=5}

  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center">
            <div>
                <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/IDFC_first_bank_Home_Loan.jpg"
                  alt="IDFC FIRST Bank"
                  className="h-full w-auto rounded-xl object-contain mb-4"
                />
              <p className="text-sm text-white/80 mb-2">Home / Home Loans / IDFC</p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">IDFC First Bank Home Loan</h1>

              <p className="mt-4 text-white/90 leading-relaxed">
                IDFC First Bank home loan is shown with tenure up to 30 years and interest around 9.40% (as described on
                the reference page). Processing fee is listed between 0.25% and 0.50% for the application. 
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
              {/* Put logo here: /public/banks/idfc-first.png */}
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5 flex items-center gap-4">
                
                <div>
                  <div className="text-sm text-white/80">Processing fee</div>
                  <div className="font-bold">0.25% – 0.50% </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5">
                <div className="text-sm text-white/80">Rates last updated</div>
                <div className="font-semibold">30th November 2025 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR */}
      <section className="container mx-auto px-4 py-10">
        <SectionTitle>IDFC First Bank Home Loan EMI Calculator</SectionTitle>

        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-5">
              Adjust loan amount, interest rate and tenure to estimate EMI (illustrative). 
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
                  EMI shown is an estimate. Final terms depend on eligibility and lender policy.
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
        <SectionTitle>IDFC First Bank Home Loan Interest Rates in 2026</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              Interest rates by applicant type and product, with last update date shown on the reference page.
            </p>

            <SimpleTable
              headA="Loan Slab"
              headB="Interest Rate for Home Loan"
              rows={interestRates2026.map((r) => ({ a: r.label, b: r.value }))}
              rowKey={(r) => r.a}
            />

            <div className="mt-4 text-xs text-gray-500">
              Interest rates last updated on <b>30th November 2025</b>. 
            </div>
          </div>
        </Card>
      </section>

      {/* ELIGIBILITY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>IDFC First Bank Home Loan Eligibility Criteria</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <SimpleTable
              headA="Eligibility Parameters"
              headB="Details"
              rows={[
                { a: "Age Range (Salaried)", b: "21–60 years" },
                { a: "Age Range (Self-Employed)", b: "23–70 years" },
                { a: "Nationality", b: "Indian Resident" },
                { a: "Minimum Income (Salaried)", b: "₹1 lakh p.a. (minimum)" },
                { a: "Minimum Income (Self-Employed)", b: "₹1.5 lakh p.a. (minimum)" },
              ]}
              rowKey={(r) => r.a}
            />
            <div className="mt-3 text-xs text-gray-500">Eligibility table values are as listed on the reference.</div>
          </div>
        </Card>
      </section>

      {/* FEES & CHARGES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>IDFC First Bank Home Loan Processing Fee and Charges</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <SimpleTable
              headA="Charge"
              headB="Amount"
              rows={charges.map((c) => ({ a: c.label, b: c.value }))}
              rowKey={(r) => r.a}
            />
          </div>
        </Card>
      </section>

      {/* SCHEMES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>IDFC First Bank Home Loan Schemes and Top Plans</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 space-y-6">
            <div>
              <h3 className="font-bold text-basic-dark">1. IDFC First Suvidha Shakti</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                <li>Plan for women for home improvement (water connection, sanitation, renovation, repairs, etc.)</li>
                <li>Tenure: 3 years</li>
                <li>Sanitation loan: ₹15,000 – ₹50,000</li>
                <li>Repair/renovation/extension: ₹25,000 – ₹1,00,000</li>
                <li>Water connection: ₹10,000 – ₹50,000</li>
                <li>Water + sanitation: ₹25,000 – ₹1,00,000</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-basic-dark">2. IDFC First Housing Loan</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                <li>Loan amount up to ₹5 crore</li>
                <li>For purchase, construction, or renovation</li>
                <li>Tenure up to 30 years</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-basic-dark">3. IDFC FASTRACK Home Loan Balance Transfer</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                <li>Loan amount up to ₹2 crore</li>
                <li>For transferring existing home loan from other lenders</li>
                <li>Top-up facility available</li>
                <li>Tenure up to 30 years</li>
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
        <SectionTitle>Documents Required For IDFC First Bank Home Loan</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-gray-50 ring-1 ring-black/5 p-5">
                <h3 className="font-bold text-basic-dark">Salaried Applicants</h3>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-800">Proof of Income</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>ITR of the latest year / Form 16</li>
                    <li>Bank statement to track repayment with amortization schedule/letter for loan sanction</li>
                    <li>Salary certificate / salary slip of last 3 months</li>
                    <li>Bank statement indicating salary credits of last 6 months</li>
                  </ul>
                </div>
                <div className="mt-4 text-sm text-gray-700">
                  <b>Other Required Documents:</b> Not specified on the reference (“No Details”). 
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 ring-1 ring-black/5 p-5">
                <h3 className="font-bold text-basic-dark">Self-Employed Applicants</h3>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-800">Proof of Income</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Credit card statement (6 months)</li>
                    <li>ITR with computation of income</li>
                    <li>Account of borrower and co-borrower (if applicable)</li>
                    <li>Balance sheets and P&amp;L accounts with schedules (if applicable)</li>
                    <li>Bank statement (last 6 months)</li>
                    <li>GST return for months not covered in the latest FY</li>
                    <li>Contract order + Form 16A (if income from contracts)</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-800">Other Required Documents</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Professional / Trade license</li>
                    <li>Possession / Allotment letter</li>
                    <li>Draft sale deed and chain title documents (if applicable)</li>
                    <li>NOC from the society</li>
                    <li>Latest updated bank statement / passbook (borrower)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white ring-1 ring-black/5">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-basic-dark">Common Documents (Both)</h3>
              </div>
              <div className="p-5">
                <KeyValueTable
                  rows={[
                    {
                      k: "Identity & Address Proof",
                      v: "Voter ID, Driving License, Aadhaar Card, Copy of Passport, PAN Card",
                    },
                    {
                      k: "Documents Related to Property",
                      v: "Not specified on the reference (“No Details”).",
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
        <SectionTitle>How to Apply for IDFC First Bank Home Loan?</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Visit the AraMount Home Loan portal</li>
              <li>Go to the “Apply Now” section</li>
              <li>Fill the form with correct details</li>
              <li>Submit the form</li>
              <li>A team member will connect and guide you further</li>
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
              Disclaimer: Interest rates/fees vary by eligibility and can change; check official bank site for latest.
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
