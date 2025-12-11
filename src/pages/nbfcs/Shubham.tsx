import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type KVRow = { label: string; value: React.ReactNode };
type RateRow = { slab: string; rate: string };
type EligibilityRow = { param: string; salaried: string; selfEmployed: string };
type ChargeRow = { charge: string; amount: React.ReactNode };
type FAQ = { q: string; a: React.ReactNode };

function formatINR(n: number) {
  if (!Number.isFinite(n)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );
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

export default function ShubhamHousingFinance() {
  // EMI calculator – mirrors the ranges on the source page
  const [loanAmount, setLoanAmount] = useState<number>(2_000_000); // 20L
  const [interestRate, setInterestRate] = useState<number>(10.45);
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

  const logoUrl =
    "https://basichomeloan.com/admin/uploads/banner-section-logo/Shubham.jpg";

  // Data based on the reference page – numbers & slabs kept, text paraphrased.
  const highlights: KVRow[] = [
    { label: "Loan Amount", value: "Up to ₹50 lakh" },
    {
      label: "Rate of Interest (starts from)",
      value: "10.45% per annum (overall band ~10.45%–12% p.a.)",
    },
    { label: "RPLR", value: "17.50%" },
    { label: "Processing Fee (headline)", value: "Around 2%–3% of the loan amount" },
    { label: "Maximum Tenure", value: "Up to 30 years (scheme dependent)" },
    { label: "Penal Rate of Interest", value: "As per internal grid; see agreement" },
    { label: "Rate Packages", value: "Fixed / Floating options" },
    {
      label: "Prepayment / Foreclosure Charge",
      value: "Approx. ₹500 + GST (as referenced)",
    },
  ];

  const rateRows: RateRow[] = [
    { slab: "Home Loan", rate: "9.90% – 16.00% p.a." },
    { slab: "Loan Against Property", rate: "13.90% – 22.00% p.a." },
  ];

  const eligibilityRows: EligibilityRow[] = [
    {
      param: "Age Range (years)",
      salaried: "21 – 65 years",
      selfEmployed: "21 – 65 years",
    },
    {
      param: "Residential Condition",
      salaried:
        "Applicant should reside in a city/town where Shubham Housing Finance has a branch",
      selfEmployed:
        "Applicant should reside in a city/town where Shubham Housing Finance has a branch",
    },
    {
      param: "Income Requirement",
      salaried:
        "Loan sanctioned based on income and repayment capacity (no fixed minimum published)",
      selfEmployed:
        "Loan sanctioned based on income and repayment capacity (no fixed minimum published)",
    },
  ];

  const charges: ChargeRow[] = [
    { charge: "Processing Fee (standard)", amount: "Minimum 2.00% of the loan amount" },
    { charge: "Cheque Bounce Charges", amount: "₹500 + GST" },
    { charge: "Document Retrieval Charges", amount: "₹1,000 + GST" },
    { charge: "ECS Dishonour Charges", amount: "₹500 + GST" },
    { charge: "Charges for Providing Document List", amount: "₹250 + GST" },
    { charge: "EMI Payment Instrument Swapping", amount: "₹500 + GST" },
    {
      charge: "Photocopies of Title Documents",
      amount: "₹500 + GST",
    },
  ];

  const schemes = [
    {
      title: "Shubham Home Loan",
      points: [
        "For buying a new/old home or a residential plot for self-construction",
        "Also suitable for home extension or enhancement/renovation",
        "Loan amount up to ₹50 lakh",
        "Tenure up to 20 years",
        "Up to ~80%–90% of the property value can be funded",
        "EMIs structured to suit even lower-income and informal-income segments",
      ],
    },
    {
      title: "Shubh Shakti Home Loan",
      points: [
        "Specifically designed for working women who wish to buy a home in their own name",
        "Available to both salaried and self-employed women",
        "Loan amount up to ₹50 lakh",
        "Tenure up to 30 years",
        "Special interest-rate concession when the first applicant is a working woman",
        "Up to ~80%–90% of the property value can be financed",
      ],
    },
    {
      title: "Shubh Yodha Home Loan",
      points: [
        "Targeted towards COVID-19 frontline workers like doctors, grocery shop owners, electricians, plumbers, insurance staff, municipal employees, etc.",
        "Tenure up to 20 years",
        "Loan amount up to ₹20 lakh",
        "Funding up to ~80% of the property value",
        "Customisable EMIs to align with borrower cash flows",
      ],
    },
  ];

  const docsSalaried = [
    "Recent salary slips",
    "Recent bank statements showing salary credits",
    "Income Tax Returns (last 2 years)",
    "Filled and signed loan application form",
    "Processing fee cheque in favour of Shubham Housing Finance Ltd.",
  ];

  const docsSelfEmployed = [
    "Profit & Loss statement of the business",
    "Latest balance sheet",
    "ITR for the last 2 years attested by a CA",
    "Filled and signed loan application form",
    "Processing fee cheque in favour of Shubham Housing Finance Ltd.",
  ];

  const commonDocs = [
    "Identity & address proof: Voter ID, Driving Licence, Aadhaar Card, Passport, PAN Card",
    "Property documents: Sale agreement / allotment letter, occupancy certificate, builder payment receipts, registered development agreement, NOC from builder / seller etc.",
  ];

  const faqs: FAQ[] = [
    {
      q: "What is the starting interest rate of Shubham Housing Finance home loan?",
      a: "The aggregator page notes that Shubham Housing Finance home loan interest may start around 9.90% p.a. (overall band 10.45%–12% p.a. mentioned), with the exact rate depending on scheme and customer profile. Always cross-check latest rates before applying.",
    },
    {
      q: "How can I check my Shubham home loan status?",
      a: "You can contact Shubham Housing Finance via their branch network or customer care, and in many cases you can also track status online through their official website using loan/account details.",
    },
    {
      q: "Can I get a 100% home loan from Shubham?",
      a: "No lender normally finances 100% of the property value. As per the reference, Shubham can usually extend up to about 80%–90% of property value, and overall loan amount can go up to ₹50 lakh depending on the city and profile.",
    },
    {
      q: "What are the key benefits of Shubham home loans?",
      a: (
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Caters to both formal and informal income segments</li>
          <li>Flexible EMIs and practical eligibility norms</li>
          <li>Funding allowed for purchase, self-construction, extension or enhancement of a home</li>
          <li>Streamlined, documentation-light process for many customers</li>
        </ul>
      ),
    },
    {
      q: "What is the toll-free customer care number of Shubham Housing Finance?",
      a: "The toll-free number stated is 1800-258-2225 (subject to change, please verify with the official site).",
    },
    {
      q: "What minimum CIBIL score is typically expected?",
      a: "The reference suggests that a CIBIL score of around 750 is generally viewed as healthy for Shubham home loans, though final decisions depend on the wider credit profile.",
    },
    {
      q: "How long does it take for Shubham home loan approval?",
      a: "Turnaround time can vary, but the reference indicates that approval may often take about a week, assuming documentation and eligibility are in order.",
    },
    {
      q: "How can I try to get a lower Shubham home loan interest rate?",
      a: (
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Opt for a shorter tenure to reduce overall risk to the lender</li>
          <li>Maintain a strong repayment track record and credit score</li>
          <li>Explore a balance transfer if you currently pay a higher rate elsewhere</li>
          <li>Review and revise EMIs periodically as your income grows</li>
        </ul>
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
              <p className="text-sm text-white/70 mb-2">
                Home / Home Loans / Shubham Housing Finance
              </p>
               <img
                  src={logoUrl}
                  alt="Shubham Housing Finance logo"
                  className="h-full w-auto object-contain rounded-xl"
                />
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Shubham Housing Finance Home Loan
              </h1>
              <p className="mt-4 text-white/90 leading-relaxed">
                Shubham Housing Finance is among the early NBFCs in India to design
                customised credit programmes for borrowers with informal income streams.
                It has helped tens of thousands of families purchase homes with practical
                EMIs and flexible repayment structures.
              </p>
              <p className="mt-2 text-sm text-white/80">
                Through AraMount, you can understand Shubham&apos;s rates, eligibility,
                fees and schemes in one place and move faster on your home loan.
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
                    ~10.45% – 12% p.a.
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Processing fee: typically 2%–3% of loan amount
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
        <SectionTitle>Shubham Home Loan EMI Calculator</SectionTitle>
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
                  EMI shown here is indicative. Final EMI, rate and terms will depend on
                  Shubham Housing Finance&apos;s sanction and prevailing grid.
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
        <SectionTitle>Shubham Home Loan Interest Rates in 2026</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              The reference grid shows Shubham Housing Finance home loans generally
              ranging between <strong>10.45% and 12% p.a.</strong> for many profiles, with
              specific bands for each product type.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-gray-800 w-[50%]">
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
              *Interest ranges as per the Shubham Housing Finance home loan page
              (reference), last updated around 30 November 2025. Always confirm the
              latest rates with the lender.
            </p>
          </div>
        </Card>
      </section>

      {/* ELIGIBILITY */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Shubham Home Loan Eligibility Criteria</SectionTitle>
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
        <SectionTitle>Shubham Home Loan Processing Fee and Charges</SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <p className="text-sm text-gray-600 mb-4">
              Shubham Housing Finance applies certain standard fees while processing and
              servicing home loans. Below is the charge grid mirrored from the reference
              page.
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
              Taxes such as GST may apply on the above charges. The lender can revise
              these charges as per its policies.
            </p>
          </div>
        </Card>
      </section>

      {/* SCHEMES & TOP PLANS */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>Shubham Home Loan Schemes and Top Plans</SectionTitle>
        <Card>
          <div className="p-5 md:p-6 grid md:grid-cols-3 gap-5">
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
        <SectionTitle>Documents Required for Shubham Home Loan</SectionTitle>
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
              <h3 className="font-bold">Common Documents (All Applicants)</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {commonDocs.map((d) => (
                  <li key={`common-${d}`}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* HOW TO APPLY + OFFICES */}
      <section className="container mx-auto px-4 pb-10">
        <SectionTitle>
          How to Apply for Shubham Home Loan with AraMount
        </SectionTitle>
        <Card>
          <div className="p-5 md:p-6">
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
              <li>
                Start from the home loan journeys on the AraMount platform and choose
                Shubham Housing Finance as a preferred option.
              </li>
              <li>
                Share your basic details – name, city, contact information, loan amount
                and property type – in the enquiry form.
              </li>
              <li>
                An AraMount specialist connects with you, validates eligibility and
                explains the most suitable Shubham schemes (Home Loan / Shubh Shakti /
                Shubh Yodha).
              </li>
              <li>
                We assist with documentation, login, sanction and disbursement steps so
                that your Shubham home loan stays smooth and time-efficient.
              </li>
            </ol>

            <p className="mt-4 text-sm text-gray-700">
              Shubham Housing Finance runs over 140 branches across about 12 states, so
              you can also locate a nearby branch if you prefer submitting documents
              physically. AraMount can still support you end-to-end during the process.
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
              Interest rates, fees and eligibility are controlled by Shubham Housing
              Finance and may change over time. Always refer to official lender
              communication for the final terms on your loan.
            </p>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-14">
        <SectionTitle>Shubham Housing Finance Home Loan – FAQs</SectionTitle>
        <div className="space-y-3">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </main>
  );
}
