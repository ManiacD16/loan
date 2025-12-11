// src/pages/nbfcs/DmiHousingFinance.tsx
import React, { useState } from "react";

const DmiHousingFinancePage: React.FC = () => {
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
    { label: "Loan Amount", value: "Up to ₹30 Lakhs" },
    { label: "Starting Rate of Interest*", value: "11.00% p.a." },
    { label: "Processing Fee", value: "1.50% + GST" },
    { label: "Maximum Tenure", value: "Up to 25–30 years (as per scheme)" },
    { label: "Prepayment / Foreclosure Charges", value: "Nil (as per policy)" },
    { label: "Rate Type", value: "Fixed / Floater (Construction Loans)" },
  ];

  const interestTable = [
    { slab: "Home Loans", rate: "11.00% – 15.50% p.a." },
    { slab: "Loan Against Property", rate: "15.00% – 18.00% p.a." },
  ];

  const eligibilityRows = [
    {
      parameter: "Age Range (in years)",
      salaried: "18 – 70 years",
      selfEmployed: "18 – 70 years",
    },
    {
      parameter: "Nationality",
      salaried: "Indian Residents / NRIs / PIOs",
      selfEmployed: "Indian Residents / NRIs / PIOs",
    },
    {
      parameter: "Minimum Income",
      salaried: "No specific minimum mentioned",
      selfEmployed: "No specific minimum mentioned",
    },
  ];

  const chargesRows = [
    { charge: "Processing Fee – Home Loans", detail: "1.50% of loan amount + GST" },
    { charge: "Processing Fee – Loan Against Property", detail: "2% of loan amount + GST" },
    { charge: "Legal Verification", detail: "₹1,500" },
    { charge: "Technical Verification", detail: "₹1,500" },
    { charge: "Cheque Bounce Charges", detail: "₹590 per instance" },
    { charge: "Charges for Providing Document List", detail: "₹590" },
    {
      charge: "Overdue Charges on Default Payment (EMI / Pre-EMI)",
      detail: "2% per month on outstanding dues",
    },
    { charge: "Duplicate Foreclosure Letter", detail: "₹590" },
    {
      charge: "CERSAI Registration",
      detail: "₹59 (loans up to ₹5 Lakhs), ₹118 (loans above ₹5 Lakhs)",
    },
    {
      charge: "Duplicate Interest Certificate",
      detail: "₹236 per copy (one copy allowed per year)",
    },
    { charge: "Custodian Fee", detail: "₹590" },
    { charge: "Document Retrieval Charges", detail: "₹590" },
    { charge: "Cheque / ACH Swapping Charges", detail: "₹590" },
  ];

  const schemes = [
    {
      title: "1. House / Flat Purchase Loan",
      points: [
        "Suitable for buying ready-to-move or under-construction residential properties.",
        "Maximum repayment tenure of up to 25 years.",
        "Loan amount up to ₹30 Lakhs.",
        "Up to 6 co-applicants permitted (subject to policy).",
      ],
    },
    {
      title: "2. Plot Purchase Loan",
      points: [
        "Designed for purchasing a residential plot.",
        "Can be taken individually or jointly.",
        "Available for both salaried and self-employed applicants.",
        "Maximum tenure up to 25 years, loan amount up to ₹30 Lakhs.",
      ],
    },
    {
      title: "3. Home Construction Loan",
      points: [
        "For constructing a home on an owned plot.",
        "Affordable interest rates with no hidden charges.",
        "High LTV as per internal policy.",
        "Quick approval and disbursal, subject to documentation.",
      ],
    },
    {
      title: "4. Home Extension Loan",
      points: [
        "For extending an existing residential property.",
        "Quick approvals and transparent terms.",
        "Simple eligibility criteria.",
        "Up to 6 co-applicants allowed, as per norms.",
      ],
    },
    {
      title: "5. Home Renovation Loan",
      points: [
        "For renovation, repair, or upgrade of an existing home.",
        "Loan with flexible tenure and competitive rates.",
        "Funding linked to property value and repayment capacity.",
      ],
    },
    {
      title: "6. Home Loan – Balance Transfer",
      points: [
        "Available on self-occupied residential properties, generally purchased within a defined period from loan application.",
        "Option to avail top-up facility (subject to conditions).",
        "Loan amount up to ₹30 Lakhs.",
      ],
    },
    {
      title: "7. Loan Against Property",
      points: [
        "Helps meet personal or business funding needs against property security.",
        "Can be used for business expansion or other eligible purposes.",
        "No hidden charges and straightforward process.",
        "Competitive interest rates as per DMI Housing Finance policy.",
      ],
    },
  ];

  const salariedDocs = {
    income: [
      "Salary slips for the last 3 months",
      "Updated bank passbook or bank statements for the last 6 months",
      "Photocopies of property papers",
      "Latest Income Tax Return (ITR) for at least 1 year",
    ],
    others: [
      "Duly filled home loan application form",
      "Recent passport-size photographs",
      "Processing fee cheque in favour of DMI Housing Finance Ltd.",
    ],
  };

  const selfEmployedDocs = {
    income: [
      "Business continuity proof for the last 3 years",
      "Profit & Loss account and balance sheet for the last 3 years",
      "Updated bank passbook or bank statements for the last 12 months",
      "Photocopies of property papers",
      "ITR for the last 3 years",
      "Proof of operating address (e.g., GST / VAT / Shop & Establishment License, or latest bank statement in entity’s name)",
    ],
    others: [
      "Duly filled home loan application form",
      "Recent passport-size photographs",
      "Processing fee cheque in favour of DMI Housing Finance Ltd.",
    ],
  };

  const commonDocs = {
    kyc: [
      "Valid photo identity & address proof: Voter ID, Driving License, Aadhaar Card, Passport, PAN Card, etc.",
    ],
    property: [
      "Sale deed / Allotment letter",
      "Occupancy certificate (if applicable)",
      "Payment receipts for installments paid to builder",
      "Permission to construct (where applicable)",
      "Copy of approved building plan",
      "Registered development agreement with builder (if required)",
      "NOC from builder / housing society as applicable",
    ],
  };

  const faqs = [
    {
      q: "What is the maximum home loan I can get from DMI Housing Finance?",
      a: "Subject to eligibility and internal policy, DMI Housing Finance can offer home loans up to about ₹30 Lakhs.",
    },
    {
      q: "What is the current interest rate range for DMI home loans?",
      a: "Indicative home loan interest rates generally start around 11.00% p.a. and may go up to about 15.50% p.a., depending on profile, product, and risk parameters.",
    },
    {
      q: "How can I check the status of my DMI home loan?",
      a: "You can either visit a nearby DMI Housing Finance branch or check the status online using their official website / customer portal.",
    },
    {
      q: "What minimum CIBIL score is generally preferred?",
      a: "A CIBIL score of around 750 and above is typically considered strong. However, applicants with scores in the 550–750 band may also be considered as per DMI’s credit policy.",
    },
    {
      q: "What are some notable features of DMI Housing Finance home loans?",
      a: "Funding for salaried and self-employed customers, multiple purposes (purchase, construction, renovation, extension, plot purchase), transparent charges, quick approvals, balance transfer options, and relatively low paperwork.",
    },
    {
      q: "By when can the home loan amount be disbursed?",
      a: "Once all documentation is submitted and eligibility checks are complete, disbursal can typically happen in about 5–6 working days, subject to DMI’s internal processes.",
    },
    {
      q: "Who is eligible for a DMI housing finance home loan?",
      a: "Applicants in the 18–70 years age band with Indian Resident / NRI / PIO status and salaried or self-employed income profiles can be considered, subject to credit norms.",
    },
    {
      q: "What processing fee does DMI Housing Finance charge?",
      a: "For home loans, DMI generally charges a processing fee of about 1.5% of the sanctioned amount plus applicable GST. This fee is non-refundable.",
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
              Home Loans &nbsp;/&nbsp; NBFCs &nbsp;/&nbsp; DMI Housing Finance
            </p>
            <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/DMI.png"
                  alt="DMI Housing Finance Logo"
                  className="h-full w-auto object-contain rounded-xl"
                />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              DMI Housing Finance Home Loan
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              DMI Housing Finance Limited offers affordable housing finance
              solutions for customers looking to buy, build, extend, or renovate
              their homes, as well as loans against property. Indicative DMI
              home loan rates start from around{" "}
              <span className="font-semibold">11.00% p.a.</span>, with a
              processing fee of about{" "}
              <span className="font-semibold">1.5% + GST</span>.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              Depending on the product and eligibility, borrowers can get a loan
              amount of up to <span className="font-semibold">₹30 Lakhs</span>{" "}
              with longer repayment tenures (up to about{" "}
              <span className="font-semibold">25–30 years</span>) and a variety
              of schemes tailored to different needs.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full bg-white shadow-sm px-4 py-2 border border-slate-200">
              <span className="text-xs font-medium text-slate-600">
                Powered by AraMount Home Loan Assistance
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
                  <p className="text-sm font-semibold">DMI Housing Finance</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500 mb-1">Loan Amount</p>
                  <p className="font-semibold">Up to ₹30 Lakhs</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Indicative Tenure</p>
                  <p className="font-semibold">Up to 25–30 years</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Starting Rate*</p>
                  <p className="font-semibold">11.00% p.a.</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Processing Fee</p>
                  <p className="font-semibold">1.5% + GST</p>
                </div>
              </div>
              <button className="w-full mt-2 rounded-lg bg-basic-blue text-white text-sm font-semibold py-2.5 hover:bg-blue-700 transition">
                Get Free Assistance from AraMount
              </button>
              <p className="text-[10px] text-slate-500 leading-snug">
                *Interest rates, fees and loan features are indicative and may
                change as per DMI Housing Finance’s latest policies. Always
                verify with the lender before applying.
              </p>
            </div>
          </div>
        </section>

        {/* EMI Calculator Section */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-1">
                DMI Home Loan EMI Calculator
              </h2>
              <p className="text-sm text-slate-600">
                Avoid confusion – get your DMI Housing Finance EMI estimate
                right with AraMount. Adjust the loan amount, interest rate and
                tenure to see an approximate EMI.
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
                  min={100000}
                  max={3000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹30 Lakhs</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">Interest Rate (% p.a.)</span>
                  <span>{interestRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min={11}
                  max={18}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>11%</span>
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

            {/* Result */}
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
                This EMI illustration is for guidance only and based on standard
                amortisation. Actual EMI, interest and tenure will be decided by
                DMI Housing Finance as per its latest policy.
              </p>
            </div>
          </div>
        </section>

        {/* Key Highlights & Interest Rates */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Key Highlights</h2>
            <p className="text-sm text-slate-600">
              A quick view of the main parameters for DMI Housing Finance home
              loans, as referenced on the lender profile.
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
              DMI Housing Finance Interest Rates (Indicative 2026)
            </h2>
            <p className="text-sm text-slate-600">
              Rates depend on CIBIL score, income profile, employment type and
              other risk factors. DMI also offers fixed / floating variants in
              select categories.
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Loan Slab
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Indicative Rate Range
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
              Last reviewed reference on the aggregator page mentioned 30
              November 2025. Always confirm the latest rate grid with DMI
              Housing Finance before applying.
            </p>
          </div>
        </section>

        {/* Eligibility Criteria & Charges */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">
              DMI Home Loan Eligibility Criteria
            </h2>
            <p className="text-sm text-slate-600">
              DMI Housing Finance evaluates eligibility mainly on age,
              nationality, income stability, and repayment capacity for both
              salaried and self-employed customers.
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
              DMI Housing Loan Processing Fee & Charges
            </h2>
            <p className="text-sm text-slate-600">
              Below is the typical charge grid shared for DMI Housing Finance
              home loan and loan against property applications.
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
              All fees are subject to applicable taxes and may be revised by DMI
              Housing Finance at its sole discretion.
            </p>
          </div>
        </section>

        {/* Schemes & Plans */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            DMI Home Finance Schemes and Top Plans
          </h2>
          <p className="text-sm text-slate-600">
            DMI Housing Finance offers multiple home loan variants to suit
            different requirements. Below is a quick snapshot of the major
            schemes.
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
            Note: All plans are extended at the discretion of DMI Housing
            Finance after reviewing income stability, property profile and
            overall creditworthiness.
          </p>
        </section>

        {/* Documents Required */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-5">
          <h2 className="text-lg md:text-xl font-semibold">
            Documents Required for DMI Home Loan
          </h2>
          <p className="text-sm text-slate-600">
            Keep the following documents ready before applying for a DMI Housing
            Finance home loan through AraMount to ensure faster processing.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                For Salaried Applicants
              </h3>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Proof of Income
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  {salariedDocs.income.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Other Documents
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  {salariedDocs.others.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                For Self-Employed Applicants
              </h3>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Proof of Income
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  {selfEmployedDocs.income.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-600">
                  Other Documents
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
                  {selfEmployedDocs.others.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 space-y-2">
            <h3 className="text-sm font-semibold">
              Common Documents for Both Profiles
            </h3>
            <p className="text-xs font-semibold text-slate-600">
              Identity & Address Proof
            </p>
            <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
              {commonDocs.kyc.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-slate-600 mt-2">
              Property Documents
            </p>
            <ul className="list-disc pl-5 text-xs md:text-sm text-slate-700 space-y-1">
              {commonDocs.property.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to Apply & Offices */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            How to Apply for DMI Housing Finance Home Loan via AraMount
          </h2>
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
            <li>
              Visit the DMI Housing Finance page on the AraMount platform and
              navigate to the “Apply Now” or consultation section.
            </li>
            <li>
              Share your basic details such as name, mobile number, email,
              location and approximate loan requirement.
            </li>
            <li>
              An AraMount Home Loan specialist will contact you, understand your
              profile, and shortlist the most suitable DMI home loan options.
            </li>
            <li>
              Submit the required documents digitally or at the nearest branch
              as guided by the AraMount representative.
            </li>
            <li>
              After verification and sanction by DMI Housing Finance, your loan
              will be disbursed as per the agreed terms.
            </li>
          </ol>

          <h3 className="text-sm md:text-base font-semibold pt-3">
            Find DMI Housing Finance Home Loan Offices Near You
          </h3>
          <p className="text-sm text-slate-700">
            If you prefer visiting a physical branch, AraMount can help you
            locate the nearest DMI Housing Finance office and coordinate a
            meeting. Simply fill out the free consultation form and the AraMount
            team will guide you through the entire process.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Disclaimer:</span> Interest rates,
              fees, eligibility criteria and loan features are subject to change
              at the sole discretion of DMI Housing Finance. For the most
              updated details, always refer to the official DMI Housing Finance
              website or latest communication from the lender.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            DMI Housing Finance Home Loan – FAQs
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

export default DmiHousingFinancePage;
