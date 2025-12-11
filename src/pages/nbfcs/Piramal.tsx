// src/pages/nbfcs/PiramalHousingFinance.tsx
import React, { useState } from "react";

const PiramalHousingFinancePage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000); // ₹10 lakh
  const [interestRate, setInterestRate] = useState(11); // 11% p.a.
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    monthlyRate === 0
      ? loanAmount / totalMonths
      : (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(value));

  const keyHighlights: { label: string; value: string }[] = [
    { label: "Loan Amount", value: "₹5 Lakhs to ₹2 Crores" },
    { label: "Starting Rate of Interest*", value: "9.75% p.a. onwards" },
    { label: "RPLR", value: "As per Piramal policy" },
    { label: "Processing Fee", value: "Up to 3% of loan amount + Taxes" },
    { label: "Maximum Tenure", value: "Up to 30 years" },
    { label: "Penal Rate of Interest", value: "As per Piramal schedule" },
    { label: "Rate Packages", value: "Fixed / Floater, with swap option" },
    {
      label: "Prepayment / Foreclosure",
      value:
        "Floater: Nil | Fixed: 2% of loan amount + Taxes (as per applicable policy)",
    },
  ];

  const interestTable = [
    {
      slab: "Up to ₹70 Lakhs (Salaried)",
      rate: "Starts at 11.00% p.a.",
    },
    {
      slab: "Up to ₹70 Lakhs (Self-Employed)",
      rate: "Starts at 11.00% p.a.",
    },
  ];

  const eligibilityRows = [
    {
      parameter: "Age Range (in years)",
      salaried: "21 – 62 (Salaried), 21 – 70 (Govt employees)",
      selfEmployed: "23 – 70 (Self-employed)",
    },
    {
      parameter: "Nationality",
      salaried: "Indian Resident",
      selfEmployed: "Indian Resident",
    },
    {
      parameter: "Minimum Income",
      salaried: "No specific minimum stated",
      selfEmployed: "No specific minimum stated",
    },
  ];

  const chargesRows = [
    {
      charge: "Processing Fee",
      detail: "Up to 3.00% of the loan amount + Taxes",
    },
    {
      charge: "Login / Application Fee",
      detail: "₹3,500 + Taxes",
    },
    {
      charge: "Retrieval of Original Property Documents",
      detail: "₹500 + Taxes",
    },
    {
      charge: "Photocopy of Documents",
      detail: "₹1,000 + Taxes",
    },
    {
      charge: "Package Swapping (Fixed ↔ Floater)",
      detail: "0.5% of outstanding loan amount + Taxes",
    },
    {
      charge: "Foreclosure / Prepayment",
      detail:
        "Floater: Nil | Fixed: 2.00% of the loan amount + Taxes (as per scheme)",
    },
    {
      charge: "Loan Pre-Closure Statement",
      detail: "₹1,000 + Taxes",
    },
    {
      charge: "Collection Pickup Charges",
      detail: "₹250 per visit + Taxes",
    },
    {
      charge: "Document List Provided to Lender",
      detail: "₹1,000 + Taxes",
    },
    {
      charge: "CERSAI Registration",
      detail: "₹500 + Taxes",
    },
    {
      charge: "Dishonour of Repayment Instrument",
      detail: "₹500 + Taxes per instance",
    },
    {
      charge: "NOC Issue Charges",
      detail: "₹500 + Taxes",
    },
    {
      charge: "Statement of Account",
      detail: "₹500 + Taxes",
    },
    {
      charge: "Change in Repayment Mode",
      detail: "₹500 + Taxes",
    },
    {
      charge: "Custodial Charges",
      detail:
        "₹500 + Taxes (if title documents not collected within 60 days of closure)",
    },
  ];

  const schemes = [
    {
      title: "1. Housing Loan",
      points: [
        "Home loan for purchase of ready, resale or under-construction residential property.",
        "Loan amount generally from ₹5 Lakhs up to ₹2 Crores (subject to eligibility).",
        "Repayment tenure of up to 30 years.",
        "High LTV ratio as per Piramal Housing Finance internal policy.",
      ],
    },
    {
      title: "2. Home Construction Loan",
      points: [
        "Designed to construct a house on an owned residential plot.",
        "Up to around 90% of construction cost as funding, subject to norms.",
        "Flexible tenure, typically up to 30 years.",
      ],
    },
    {
      title: "3. Home Extension Loan",
      points: [
        "For extending an existing home (e.g., adding a room or floor).",
        "Loan amounts generally between ₹5 Lakhs and ₹2 Crores.",
        "Tenure up to 30 years, depending on age and profile.",
      ],
    },
    {
      title: "4. Home Renovation Loan",
      points: [
        "For renovating or upgrading an existing residential property.",
        "Loan amount typically from ₹5 Lakhs to ₹2 Crores.",
        "Longer repayment tenure options to keep EMIs manageable.",
      ],
    },
    {
      title: "5. Home Loan Balance Transfer",
      points: [
        "Ideal for customers who wish to shift their home loan from another lender to Piramal.",
        "May allow lower interest rates and better terms, as per offer.",
        "Balance transfer facility as per Piramal Housing Finance policy.",
      ],
    },
    {
      title: "6. Super Home Loan",
      points: [
        "Can lead to up to ~15% reduction in EMIs (subject to structure).",
        "Top-up facility often available with an additional EMI.",
        "Funding up to a high share of the property cost as LTV.",
      ],
    },
    {
      title: "7. PMAY-Linked Home Loan",
      points: [
        "Linked to Pradhan Mantri Awas Yojana (EWS, LIG, MIG-1 segments).",
        "Interest subsidy for eligible customers as per PMAY guidelines.",
        "Loan amount and tenure as per scheme norms (for example, up to 20 years).",
      ],
    },
  ];

  const propertyDocs = [
    "Registered Sale Deed / Allotment Letter of the property",
    "Occupancy Certificate (if applicable)",
    "Payment receipts for instalments paid to builder / seller",
    "Sanctioned building plan and layout copy",
    "Permission to construct (in case of construction loan)",
    "Registered development agreement with builder (where applicable)",
    "NOC from builder or housing society, as required",
  ];

  const faqs = [
    {
      q: "What is the current Piramal Housing Finance home loan interest rate?",
      a: "Aggregator data indicates that Piramal Housing Finance home loan rates currently start at around 11.00% p.a., with reference key rates mentioned at 9.75–9.50% p.a. historically. You should always confirm the latest rate slab directly with Piramal Finance.",
    },
    {
      q: "What is the eligible age limit for a Piramal home loan?",
      a: "Indicatively, salaried applicants are typically eligible between 21 and 62 years, government employees between 21 and 70 years, and self-employed applicants between 23 and 70 years, subject to Piramal’s credit policy.",
    },
    {
      q: "How much processing fee does Piramal Housing Finance charge?",
      a: "The processing fee for a Piramal home loan is usually up to 3.00% of the sanctioned loan amount plus applicable taxes. This is charged at the time of login or sanction as per the product policy.",
    },
    {
      q: "What are the basic eligibility requirements for Piramal home loans?",
      a: "Typical requirements include being an Indian resident, falling within the allowed age band, having a satisfactory credit score (often 750+ is considered strong), stable income, and sufficient repayment capacity. Co-applicants may be mandatory in some cases.",
    },
    {
      q: "How long does it take to get a Piramal home loan approved?",
      a: "If all KYC, income and property documents are provided correctly, home loan approval may take only a few working days to about a week, depending on internal checks and verification.",
    },
    {
      q: "Are there foreclosure charges on Piramal home loans?",
      a: "On floating-rate home loan variants, prepayment and foreclosure charges are generally not applicable. On fixed-rate packages, Piramal may levy around 2.00% of the loan amount plus taxes as foreclosure charges, subject to the latest policy.",
    },
    {
      q: "How can I get my Piramal home loan statement?",
      a: "Typically, you can download the statement by logging into the Piramal customer portal or using the loan statement option on their official website, entering your loan account details and generating the statement.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-10">
        {/* Hero Section */}
        <section className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Home Loans &nbsp;/&nbsp; NBFCs &nbsp;/&nbsp; Piramal Housing
              Finance
            </p>
            <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/Piramal_Housing_Finance.jpg"
                  alt="Piramal Housing Finance Logo"
                  className="h-full w-auto object-contain rounded-xl"
                />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Piramal Housing Finance Home Loan
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              Piramal Capital &amp; Housing Finance, popularly known as Piramal
              Finance, is an emerging housing finance company offering digital
              first home loan solutions. It is known for relatively quick
              approvals, a wide bouquet of home loan schemes, and a
              customer-friendly experience.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              Piramal home loans typically start at{" "}
              <span className="font-semibold">around 11.00% p.a.</span>, with
              an indicative processing fee of up to{" "}
              <span className="font-semibold">3.00% of the loan amount</span>.
              Borrowers can choose fixed or floating rate options and may have
              the flexibility to swap packages during the tenure, subject to
              Piramal’s terms.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full bg-white shadow-sm px-4 py-2 border border-slate-200">
              <span className="text-xs font-medium text-slate-600">
                Assisted by AraMount Home Loan Experts
              </span>
            </div>
          </div>

          <div className="w-full md:w-80">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    NBFC Home Loan Partner
                  </p>
                  <p className="text-sm font-semibold">
                    Piramal Housing Finance
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500 mb-1">Loan Amount</p>
                  <p className="font-semibold">₹5 Lakhs – ₹2 Crores</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Indicative Tenure</p>
                  <p className="font-semibold">Up to 30 years</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Starting Rate*</p>
                  <p className="font-semibold">9.75% p.a. onwards</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Processing Fee</p>
                  <p className="font-semibold">Up to 3% + Taxes</p>
                </div>
              </div>
              <button className="w-full mt-2 rounded-lg bg-basic-blue text-white text-sm font-semibold py-2.5 hover:bg-blue-700 transition">
                Get Free Assistance from AraMount
              </button>
              <p className="text-[10px] text-slate-500 leading-snug">
                *All interest rates, fees, and product features are indicative
                and derived from the latest publicly available information.
                Always verify the exact applicable rates and charges with
                Piramal Housing Finance before applying.
              </p>
            </div>
          </div>
        </section>

        {/* EMI Calculator Section */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-1">
                Piramal Home Loan EMI Calculator
              </h2>
              <p className="text-sm text-slate-600">
                Avoid guesswork – use this quick Piramal home loan EMI
                illustration powered by AraMount. Adjust loan amount, interest
                rate and tenure to see an approximate monthly installment.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-lg border border-basic-blue text-basic-blue text-sm font-semibold px-4 py-2 hover:bg-blue-50">
              Talk to AraMount Expert
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-2">
            {/* Sliders */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">Loan Amount</span>
                  <span>₹{formatINR(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={20000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₹5 Lakhs</span>
                  <span>₹2 Crores</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">Interest Rate (% p.a.)</span>
                  <span>{interestRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min={9.5}
                  max={18}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>9.5%</span>
                  <span>18%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">Loan Tenure (Years)</span>
                  <span>{tenureYears} years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>

            {/* EMI Result */}
            <div className="bg-slate-50 rounded-lg p-4 md:p-5 flex flex-col justify-center space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  Approximate Monthly EMI
                </p>
                <p className="text-2xl md:text-3xl font-bold text-basic-blue">
                  ₹{formatINR(emi || 0)}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Amount Payable</span>
                  <span className="font-semibold">
                    ₹{formatINR(totalPayment || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Principal Amount</span>
                  <span>₹{formatINR(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Interest</span>
                  <span>₹{formatINR(totalInterest || 0)}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                This EMI is only for illustration based on standard
                amortisation. Actual EMI, tenure and interest rate will be as
                per Piramal Housing Finance’s sanctioned terms on your loan
                application date.
              </p>
            </div>
          </div>
        </section>

        {/* Key Highlights & Interest Rates */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">
              Key Highlights of Piramal Housing Finance Home Loan
            </h2>
            <p className="text-sm text-slate-600">
              Quick snapshot of the main parameters as referenced on the
              Piramal Housing Finance lender profile.
            </p>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
              {keyHighlights.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b border-slate-100 pb-1"
                >
                  <dt className="text-slate-600">{item.label}</dt>
                  <dd className="font-semibold text-right text-slate-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">
              Piramal Housing Finance Interest Rates (Indicative 2026)
            </h2>
            <p className="text-sm text-slate-600">
              As per the shared reference grid, Piramal Housing Finance home
              loan interest rates for 2026 start around 9.50% p.a. The table
              below summarises the current home loan slabs.
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Loan Slab
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Indicative Home Loan Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {interestTable.map((row) => (
                    <tr key={row.slab} className="border-t border-slate-200">
                      <td className="px-3 py-2 text-slate-700">{row.slab}</td>
                      <td className="px-3 py-2 font-semibold text-slate-900">
                        {row.rate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Interest rates were last updated on or around 30 November 2025 on
              the reference listing. You should always check Piramal’s official
              communication for the latest rate card.
            </p>
          </div>
        </section>

        {/* Eligibility Criteria & Charges */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">
              Piramal Home Loan Eligibility Criteria
            </h2>
            <p className="text-sm text-slate-600">
              Before sanctioning a home loan, Piramal Housing Finance reviews
              general parameters like age, CIBIL score, occupation type, and
              repayment capacity for both salaried and self-employed profiles.
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-[11px] md:text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Eligibility Parameter
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Salaried
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Self-Employed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eligibilityRows.map((row) => (
                    <tr
                      key={row.parameter}
                      className="border-t border-slate-200 align-top"
                    >
                      <td className="px-3 py-2 text-slate-700">
                        {row.parameter}
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {row.salaried}
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {row.selfEmployed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">
              Piramal Housing Finance Processing Fee & Charges
            </h2>
            <p className="text-sm text-slate-600">
              These are the indicative charges listed for Piramal Housing
              Finance home loan services and related requests.
            </p>
            <div className="mt-2 max-h-64 overflow-y-auto border border-slate-200 rounded-lg">
              <table className="min-w-full text-[11px] md:text-xs">
                <tbody>
                  {chargesRows.map((row) => (
                    <tr
                      key={row.charge}
                      className="border-b border-slate-200 align-top"
                    >
                      <td className="px-3 py-2 font-medium text-slate-700 w-1/3">
                        {row.charge}
                      </td>
                      <td className="px-3 py-2 text-slate-700">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500">
              All charges attract applicable taxes and may be revised at the
              sole discretion of Piramal Housing Finance.
            </p>
          </div>
        </section>

        {/* Schemes & Plans */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Piramal Home Finance Schemes and Top Plans
          </h2>
          <p className="text-sm text-slate-600">
            Piramal Housing Finance offers multiple home loan variants to suit
            diverse needs – from first-home purchase to extension, renovation,
            balance transfer and PMAY-linked options.
          </p>
          <div className="space-y-4">
            {schemes.map((scheme) => (
              <div
                key={scheme.title}
                className="border border-slate-200 rounded-lg p-4"
              >
                <h3 className="text-sm md:text-base font-semibold mb-2">
                  {scheme.title}
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  {scheme.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            All loan schemes are extended solely at the discretion of Piramal
            Housing Finance after evaluating the applicant’s income,
            creditworthiness and property profile.
          </p>
        </section>

        {/* Documents Required */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-5">
          <h2 className="text-lg md:text-xl font-semibold">
            Documents Required for Piramal Home Loan
          </h2>
          <p className="text-sm text-slate-600">
            Keep these documents handy when applying for a Piramal Housing
            Finance home loan through AraMount to ensure smoother processing.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                Common KYC & Income Documents (Illustrative)
              </h3>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Identity & Address Proof
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  <li>
                    PAN Card, Aadhaar Card, Voter ID, Passport or Driving
                    License (as applicable)
                  </li>
                  <li>
                    Recent utility bill / bank statement / Aadhaar as address
                    proof
                  </li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Income Proof (Salaried / Self-Employed)
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  <li>Latest salary slips or income documents</li>
                  <li>
                    Bank statements for the last 6–12 months (as per Piramal
                    requirement)
                  </li>
                  <li>ITR / financials for relevant years (if applicable)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                Property Related Documentation
              </h3>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Typical List of Property Papers
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  {propertyDocs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Other Forms & Declarations
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  <li>Duly filled home loan application form</li>
                  <li>Recent passport-size photographs</li>
                  <li>
                    Processing fee cheque in favour of Piramal Capital &amp;
                    Housing Finance Limited (as instructed)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply & Disclaimer */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            How to Apply for Piramal Housing Finance Home Loan via AraMount
          </h2>
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
            <li>
              Go to the Piramal Housing Finance section on the AraMount platform
              and choose the home loan option most relevant to your requirement.
            </li>
            <li>
              Share your basic details such as name, contact number, city,
              employment type, approximate property value and required loan
              amount.
            </li>
            <li>
              An AraMount home loan specialist will review your profile and
              match you with suitable Piramal schemes, keeping your EMI comfort
              and eligibility in mind.
            </li>
            <li>
              Submit soft copies or physical copies of the required documents as
              guided by the AraMount team and Piramal’s checklist.
            </li>
            <li>
              After internal appraisal and property verification by Piramal
              Housing Finance, your loan may be sanctioned and disbursed as per
              the final sanction letter.
            </li>
          </ol>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Disclaimer:</span> Interest rates,
              charges, eligibility criteria and product features mentioned here
              are based on the latest available reference information and may
              change without prior notice. For the most recent details on
              Piramal home loan interest rates, processing fees and other
              applicable charges, please refer to Piramal Housing Finance’s
              official website or latest communication.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Piramal Housing Finance Home Loan – FAQs
          </h2>
          <div className="space-y-2">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="border border-slate-200 rounded-lg"
                >
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-3 py-2 text-left text-sm font-medium text-slate-800"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="ml-3 text-xs text-slate-500">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 text-sm text-slate-700">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PiramalHousingFinancePage;
