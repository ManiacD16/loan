import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type KVRow = { label: string; value: React.ReactNode };
type RateRow = { slab: string; rate: string };
type EligibilityRow = { param: string; salaried: string; selfEmployed: string };
type ChargeRow = { charge: string; amount: React.ReactNode };
type FAQ = { q: string; a: React.ReactNode };

function formatINR(n: number) {
  if (!Number.isFinite(n)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
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
  return (
    <h2 className="text-xl md:text-2xl font-bold text-basic-dark mb-3">
      {children}
    </h2>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      {children}
    </div>
  );
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
            <th className="px-4 py-3 font-semibold text-gray-800 w-[40%]">
              {headingA}
            </th>
            <th className="px-4 py-3 font-semibold text-gray-800">
              {headingB}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={renderKey(row)}
              className="border-t border-gray-100 align-top"
            >
              <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">
                {row.label}
              </td>
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
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function HeroHousingFinance() {
  // EMI calculator aligned with the widget on the reference page
  const [loanAmount, setLoanAmount] = useState<number>(2_000_000); // 20L
  const [interestRate, setInterestRate] = useState<number>(9.5);
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

  // Logo taken directly from the Hero Housing Finance page on the reference site
  const logoUrl =
    "https://basichomeloan.com/admin/uploads/banner-section-logo/Hero_Housing_Finance.jpg";

  // Key highlights – based on the table in the reference content
  const highlights: KVRow[] = [
    { label: "Loan Amount", value: "Up to ₹5 crores" },
    {
      label: "Rate of Interest (starts from)",
      value: "9.50% per annum (scheme & profile-based)",
    },
    { label: "RPLR", value: "As per Hero Housing Finance internal grid" },
    {
      label: "Processing Fee",
      value: "Up to ₹5,000 + taxes (non-refundable)",
    },
    {
      label: "Maximum Tenure for Repayment",
      value: "Up to 30 years (Salaried) / up to 20 years (Self-employed)",
    },
    {
      label: "Penal Rate of Interest",
      value: "2% per month + taxes on overdue amounts",
    },
    { label: "Rate Packages", value: "Fixed / Floating (Floater) options" },
    {
      label: "Prepayment / Foreclosure Charges",
      value: "Nil, as per current reference grid (subject to policy)",
    },
  ];

  const rateRows: RateRow[] = [
    { slab: "Hero Housing Finance – All Home Loan Slabs", rate: "Starts at 9.50% p.a." },
  ];

  const eligibilityRows: EligibilityRow[] = [
    {
      param: "Age Range (years)",
      salaried: "Up to 65 years at loan maturity",
      selfEmployed: "Up to 70 years at loan maturity",
    },
    {
      param: "Nationality",
      salaried: "Indian resident",
      selfEmployed: "Indian resident",
    },
    {
      param: "Minimum Monthly Income",
      salaried: "Around ₹15,000 per month (as per reference)",
      selfEmployed: "Subject to business income and assessment",
    },
    {
      param: "Repayment Capacity",
      salaried:
        "Loan amount decided based on FOIR, existing EMIs and overall credit profile",
      selfEmployed:
        "Assessed on business cash flows, ITRs, banking and overall credit profile",
    },
  ];

  const charges: ChargeRow[] = [
    {
      charge: "Processing Fee (standard)",
      amount: "Up to ₹5,000 + taxes",
    },
    {
      charge: "Penal Interest",
      amount: "2% per month + taxes on overdue payment",
    },
    {
      charge: "Disbursement Cheque Collection",
      amount: "₹500 + taxes",
    },
    {
      charge: "Cheque / ECS Dishonour Charges",
      amount: "₹1,000 + taxes",
    },
    {
      charge: "Switch to Lower Rate",
      amount: "0.5% or ₹2,500 + taxes, whichever is lower",
    },
    {
      charge: "Document Handling Charges",
      amount:
        "₹300 per day + taxes, beyond 30 days from the date of loan closure",
    },
    {
      charge: "List of Documents",
      amount:
        "Nil for the first time, then ₹500 + taxes for subsequent requests",
    },
    {
      charge: "Document Copy Retrieval",
      amount: "Up to ₹3,000 + taxes",
    },
  ];

  const schemes = [
    {
      title: "Home Loan for Purchase of New Property",
      points: [
        "Meant for buying a ready-to-move or under-construction residential property",
        "Loan to value (LTV) up to 90% for properties priced below ₹30 lakh",
        "LTV up to 80% for properties between ₹30 lakh and ₹75 lakh",
        "LTV up to 75% for properties priced above ₹75 lakh",
        "Suitable for a wide range of property types, subject to lender due-diligence",
      ],
    },
    {
      title: "Home Loan for Construction / Extension / Improvement",
      points: [
        "For building a new house on a plot, extending an existing home or renovating it",
        "Maximum loan repayment tenure typically up to 20 years",
        "Flexible EMIs structured to suit customer cash flows",
        "Funding proportion linked to property cost and stage of construction",
      ],
    },
  ];

  const docsSalaried = [
    "Salary slips for the last 3 months",
    "Updated bank passbook or statements for the last 6 months",
    "Form 16 for the last 2 years",
    "Appointment letter with salary break-up (if current employment is less than 1 year)",
    "Duly filled and signed application form",
    "Passport-size photographs of applicant and co-applicant",
    "Processing fee cheque in favour of Hero Housing Finance Ltd.",
  ];

  const docsSelfEmployed = [
    "Updated bank passbook or statements for the last 6 months",
    "GST returns for the last 1 year",
    "ITR and balance sheet for the last 3 years",
    "ITR with income computation for the last 2 assessment years",
    "Duly filled and signed application form",
    "Passport-size photographs of applicant and co-applicant",
    "Processing fee cheque in favour of Hero Housing Finance Ltd.",
  ];

  const commonDocs = [
    "Identity & Address Proof: Voter ID, Driving Licence, Aadhaar Card, Passport copy, PAN Card",
    "Property-related documents: sale agreement / allotment letter, title documents, approved building plan, NOC as applicable, and other papers requested by the lender",
  ];

  const faqs: FAQ[] = [
    {
      q: "What is the current starting home loan interest rate at Hero Housing Finance?",
      a: "As per the latest reference grid, Hero Housing Finance home loan rates start from about 9.50% per annum. Final pricing depends on the scheme and the individual profile, so it is always best to re-confirm with the lender before applying.",
    },
    {
      q: "How do I apply for a Hero Housing Finance home loan through AraMount?",
      a: (
        <>
          You can begin on the AraMount platform by submitting a quick enquiry
          form. An AraMount specialist will contact you, check your eligibility
          for a Hero Housing Finance loan and help you complete documentation,
          login and disbursement in a smooth, guided way.
        </>
      ),
    },
    {
      q: "What minimum monthly income is typically expected for a Hero Housing Finance home loan?",
      a: "The reference material mentions a minimum income of around ₹15,000 per month for salaried applicants. However, the actual requirement may vary by city, profile and scheme.",
    },
    {
      q: "What is the maximum Hero Housing Finance home loan I can get?",
      a: "Eligible borrowers can get a housing loan of up to ₹5 crores from Hero Housing Finance, subject to property value, income, LTV rules and internal credit checks.",
    },
    {
      q: "What processing fee does Hero Housing Finance charge?",
      a: "Hero Housing Finance generally charges a processing fee of up to ₹5,000 plus applicable taxes toward initial loan processing, as per the current reference table.",
    },
    {
      q: "Can I obtain 100% funding of my property value from Hero Housing Finance?",
      a: "No lender usually finances 100% of the property value. Hero Housing Finance can fund up to about 90% of the property cost, depending on ticket size and other criteria. The remaining amount has to be contributed as margin by the borrower.",
    },
    {
      q: "Is a long property chain necessary to get a Hero Housing Finance home loan?",
      a: "Yes, the reference page mentions that a clean property chain of at least around 13 years is required. The lender may ask for additional title documents where necessary.",
    },
    {
      q: "Can I transfer my existing home loan to Hero Housing Finance?",
      a: "Yes. There is a balance transfer option that allows you to move your existing home loan from another institution to Hero Housing Finance, and you may also be eligible for a top-up facility, subject to policy.",
    },
    {
      q: "What types of home loan requirements does Hero Housing Finance cover?",
      a: (
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Purchase of a new or under-construction home</li>
          <li>Construction of a house on a residential plot</li>
          <li>Extension / improvement / renovation of an existing house</li>
          <li>Top-up loans and balance transfers from other lenders</li>
        </ul>
      ),
    },
  ];

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO SECTION */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-[1.3fr_.7fr] gap-6 items-center">
            <div>
              <p className="text-sm text-white/70 mb-2">
                Home / Home Loans / Hero Housing Finance
              </p>
               <img
                  src={logoUrl}
                  alt="Hero Housing Finance logo"
                  className="h-full w-auto object-contain rounded-xl"
                />
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Hero Housing Finance Home Loan
              </h1>
              <p className="mt-4 text-white/90 leading-relaxed">
                Hero Housing Finance Ltd. (HHFL), a group company of Hero
                FinCorp, focuses on making home ownership easy with quick
                approvals, competitive rates and simple documentation. It offers
                loans for buying, constructing, extending or renovating a home.
              </p>
              <p className="mt-2 text-sm text-white/80">
                With AraMount you can explore Hero Housing Finance schemes,
                understand eligibility and charges in one place, and move to
                sanction faster.
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
                  <div className="text-xs text-gray-500">
                    Indicative home loan rate range
                  </div>
                  <div className="font-bold text-basic-dark">
                    Starting from ~9.50% p.a.
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Processing fee: up to ₹5,000 + taxes
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-4">
                <div className="text-xs text-white/80">
                  Rates last updated (reference)
                </div>
                <div className="font-semibold">30th November 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR */}
      <section className="container mx-auto px-4 py-10">
        <SectionTitle>Hero Housing Finance EMI Calculator</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-5">
              Avoid confusion – get your EMI estimate right with{" "}
              <span className="font-semibold">AraMount</span>.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Loan Amount
                    </span>
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
                    <span className="text-sm font-semibold text-gray-800">
                      Interest Rate (% p.a.)
                    </span>
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
                    <span className="text-sm font-semibold text-gray-800">
                      Loan Tenure (Years)
                    </span>
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
                    <div className="font-bold text-gray-900">
                      ₹{formatINR(loanAmount)}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white ring-1 ring-black/5 p-4">
                    <div className="text-xs text-gray-500">Total Interest</div>
                    <div className="font-bold text-gray-900">
                      ₹{formatINR(emi.totalInterest)}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white ring-1 ring-black/5 p-4 col-span-2">
                    <div className="text-xs text-gray-500">
                      Total Amount Payable
                    </div>
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
                  EMI is indicative only. Final EMI, interest rate and terms are
                  as per Hero Housing Finance sanction letter and current policy.
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
              rows={highlights}
              renderKey={(row) => row.label}
              headingA="Feature"
              headingB="Details"
            />
          </div>
        </Card>
      </section>

      {/* INTEREST RATES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Hero Home Finance Interest Rates in 2026</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              The Hero Housing Finance rate of interest starts from{" "}
              <strong>9.50% per annum</strong> and depends on the plan chosen
              and the applicant&apos;s repayment profile, as reflected in the
              reference rate table.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-gray-800 w-[55%]">
                      Loan Slab
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-800">
                      Indicative Interest Rate (p.a.)*
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rateRows.map((row) => (
                    <tr
                      key={row.slab}
                      className="border-t border-gray-100 align-top"
                    >
                      <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                      <td className="px-4 py-3 text-gray-700">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              *Rates based on the Hero Housing Finance home loan reference grid
              (last updated around 30 November 2025). Please check the lender&apos;s
              official website or AraMount advisor for the latest offers before
              applying.
            </p>
          </div>
        </Card>
      </section>

      {/* ELIGIBILITY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Hero Housing Finance Eligibility Criteria</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 overflow-x-auto">
            <table className="w-full text-sm bg-white">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-gray-800">
                    Eligibility Parameter
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800">
                    Salaried Individuals
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-800">
                    Self-Employed Individuals
                  </th>
                </tr>
              </thead>
              <tbody>
                {eligibilityRows.map((row) => (
                  <tr
                    key={row.param}
                    className="border-t border-gray-100 align-top"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">
                      {row.param}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.salaried}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.selfEmployed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* PROCESSING FEE & CHARGES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>
          Hero Housing Finance Processing Fee and Charges
        </SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              Hero Housing Finance usually sanctions loans quickly (often within
              about 48 hours in standard cases). The grid below summarises the
              common processing and service charges that appear in the reference
              table.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-gray-800 w-[45%]">
                      Fee / Charge Type
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-800">
                      Amount (indicative)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {charges.map((row) => (
                    <tr
                      key={row.charge}
                      className="border-t border-gray-100 align-top"
                    >
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
              Taxes (like GST) are extra wherever applicable. The lender can
              modify these fees at its discretion, so always confirm charges at
              the time of application.
            </p>
          </div>
        </Card>
      </section>

      {/* SCHEMES & TOP PLANS */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Hero Housing Finance Schemes and Top Plans</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 grid md:grid-cols-2 gap-5">
            {schemes.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-200 p-4 hover:shadow-sm transition-shadow bg-white"
              >
                <h3 className="font-bold text-basic-dark">{s.title}</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* DOCUMENTS */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Documents Required for Hero Housing Finance</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold">For Salaried Applicants</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {docsSalaried.map((d) => (
                  <li key={`sal-${d}`}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold">For Self-Employed Applicants</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {docsSelfEmployed.map((d) => (
                  <li key={`self-${d}`}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold">
                Common Documents (Salaried & Self-Employed)
              </h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {commonDocs.map((d) => (
                  <li key={`common-${d}`}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* HOW TO APPLY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>How to Apply for Hero Housing Finance via AraMount</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
              <li>
                Visit the AraMount platform and choose Hero Housing Finance
                under home loan options.
              </li>
              <li>
                Enter your basic details – name, mobile number, city, desired
                loan amount and property type – and submit the form.
              </li>
              <li>
                An AraMount home loan expert will contact you to assess your
                eligibility, explain Hero Housing Finance schemes and curate the
                best fit.
              </li>
              <li>
                AraMount coordinates with Hero Housing Finance for login,
                sanction and disbursement, guiding you on documentation and
                property checks at each step.
              </li>
            </ol>

            <p className="mt-4 text-sm text-gray-700">
              If you prefer an in-person visit, you can locate a nearby Hero
              Housing Finance branch as well. AraMount can still support you
              with comparisons, paperwork and coordination so that your home
              loan journey is smoother.
            </p>

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
              Interest rates, fees and eligibility are set by Hero Housing
              Finance and may change without prior notice. Please refer to the
              lender&apos;s official communication for final terms.
            </p>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-14">
        <SectionTitle>Hero Housing Finance Home Loan – FAQs</SectionTitle>
        <div className="space-y-3">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </main>
  );
}
