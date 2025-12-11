"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const AadharHousingFinancePage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1500000); // 15 Lac
  const [interestRate, setInterestRate] = useState<number>(10.25);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatINR = (value: number) =>
    value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const interestRateRows = [
    {
      slab: "Salaried Applicants",
      rateRange: "11.75% p.a. – 16.50% p.a.",
    },
    {
      slab: "Self-Employed Applicants",
      rateRange: "12.75% p.a. – 17.00% p.a.",
    },
    {
      slab: "Loan Against Property",
      rateRange: "15.00% p.a. – 17.00% p.a.",
    },
  ];

  const feeRows = [
    {
      label: "Processing Fee",
      value: "Up to ₹3,500 + GST",
    },
    {
      label: "Login Fee",
      value: "Up to ₹3,500 + GST (non-refundable, payable at application)",
    },
    {
      label: "Legal / Technical / Valuation Charges",
      value: "Up to ₹3,000 – ₹5,800 + GST",
    },
    {
      label: "Administrative Charges (Home Loan / Top-Up)",
      value: "₹5,100 or 1.5% of sanctioned amount + GST (whichever is higher)",
    },
    {
      label: "Administrative Charges (LAP / NIP / Project Loan)",
      value: "Up to ₹5,100 or 2% of sanctioned amount + GST (whichever is higher)",
    },
    {
      label: "Cheque / ECS / ACH Bounce Charges",
      value: "₹500 per instance",
    },
    {
      label: "Recovery Charges (Legal / Incidental / Possession)",
      value: "As per actuals + GST",
    },
    {
      label: "Copy of Property Papers",
      value: "₹500 + GST",
    },
    {
      label: "Handling of Documents",
      value: "₹2,000 + GST",
    },
    {
      label: "Switch Fees (Fixed → Variable)",
      value: "3% of outstanding + GST",
    },
    {
      label: "Switch Fees (Variable → Fixed)",
      value: "1.5% of outstanding + GST",
    },
    {
      label: "Insurance Charges",
      value: "As per actuals",
    },
    {
      label: "Documentation Charges",
      value: "Up to ₹2,000 – ₹5,000 + GST",
    },
    {
      label: "CERSAI Charge Creation",
      value: "₹100 + GST",
    },
    {
      label: "Subsequent Technical Verification (Construction cases)",
      value: "₹500 + GST",
    },
    {
      label: "Conversion Fees",
      value:
        "0.5% of outstanding principal + undisbursed amount (if any) at time of conversion",
    },
    {
      label: "Loan Cancellation Charges (Post-Disbursement)",
      value:
        "₹3,000 (up to ₹10 lakh), ₹5,000 (₹10–25 lakh), ₹10,000 (above ₹25 lakh)",
    },
  ];

  const schemes = [
    {
      id: "scheme-1",
      title: "1. Home Loan for Salaried Employees",
      bullets: [
        "Loan amount up to ₹1 Crore, generally capped at ~80% of the property value or registration cost (whichever is lower).",
        "Tenure: up to 30 years for bank-salaried profiles and up to 20 years for cash-salaried, subject to retirement age.",
        "Individual as well as joint home loans are allowed.",
        "Co-applicants can typically include spouse, parents, or children.",
      ],
    },
    {
      id: "scheme-2",
      title: "2. Home Loan for Self-Employed",
      bullets: [
        "Loan amount up to ₹1 Crore, up to ~80% of property cost (about 75% if loan exceeds ₹75 lakh).",
        "Sanction is based on income, business vintage, repayment capacity, and overall financial profile.",
        "Minimum 3 years’ business experience or inherited business continuity is usually required.",
        "Minimum monthly income considered around ₹10,000, subject to lender norms.",
        "Maximum tenure usually up to 20 years, subject to age being within ~70 years at maturity.",
      ],
    },
    {
      id: "scheme-3",
      title: "3. Loan for Plot Purchase and Construction",
      bullets: [
        "Loan up to about ₹1 Crore for buying a residential plot and/or constructing on it.",
        "Plot loan portion is typically capped around 60% of registered plot value.",
        "Construction portion can go up to roughly 80% of estimated construction cost.",
        "Construction must commence within timelines set as per applicable guidelines.",
        "Final sanction depends on need and repayment capacity.",
      ],
    },
    {
      id: "scheme-4",
      title: "4. Home Improvement Loan",
      bullets: [
        "Loan for renovation / repair / upgradation of an existing house, usually up to ₹1 Crore.",
        "Amount may cover 100% of estimated renovation cost (as certified/assessed) but overall capped at around 80% of market value (75% beyond ₹75 lakh).",
        "Covers civil, electrical, plumbing, doors/windows, flooring, tanks, grills, etc.",
      ],
    },
    {
      id: "scheme-5",
      title: "5. Home Extension Loan",
      bullets: [
        "Loan for adding rooms/floors or extending the existing house.",
        "Amount may cover up to 100% of estimated extension cost (subject to engineer/OEM assessment and internal policy).",
      ],
    },
    {
      id: "scheme-6",
      title: "6. Loan Against Residential / Commercial Property (LAP)",
      bullets: [
        "Loan up to about ₹25 lakh for some salaried borrowers and up to ₹1 Crore against commercial/residential assets (approximate ranges).",
        "Tenure up to 15 years, usually linked to retirement age or up to ~70 years at maturity for self-employed.",
        "Available in single or joint name with close family as co-applicants.",
      ],
    },
    {
      id: "scheme-7",
      title: "7. Balance Transfer and Top-Up",
      bullets: [
        "Option to shift an existing home loan to Aadhar Housing Finance for better terms.",
        "Can help reduce EMI burden where interest rate is lower or tenure is optimized.",
        "Top-up facility may be available over and above existing outstanding, subject to eligibility.",
      ],
    },
    {
      id: "scheme-8",
      title: "8. Loan for Purchase of Non-Residential Property",
      bullets: [
        "Financing for eligible non-residential properties up to about ₹1 Crore.",
        "Loan often limited to ~70% of registered cost or around 50% of market value (whichever is lower).",
        "Tenure can go up to 15 years, within age limits similar to other products.",
      ],
    },
    {
      id: "scheme-9",
      title: "9. Aadhar Gram Unnati",
      bullets: [
        "Focused product for underserved segments in smaller towns / rural belts.",
        "Relaxed income-proof norms; often no formal ITR/salary slip needed where profile supports it.",
        "Designed to be neutral towards occupation/income type with flexible repayment options.",
        "Can cover government employees, lower-grade staff, and small business owners, subject to internal policies.",
      ],
    },
  ];

  const docsSalaried = {
    title: "Documents Required for Salaried Applicants",
    sections: [
      {
        heading: "Proof of Income",
        items: [
          "Last 6 months’ bank statements showing salary credits.",
          "Latest 6 months’ salary slips (especially where salary components vary).",
          "Form 16 / salary certificate, where available.",
        ],
      },
      {
        heading: "Additional Documents (where applicable)",
        items: [
          "Work permit / employment letter for overseas profiles, if relevant.",
          "Continuous Discharge Certificate (for Merchant Navy cases).",
          "Passport with valid visa for NRIs / overseas applicants.",
          "NRE / NRO bank statements for the past 6 months (if applicable).",
        ],
      },
    ],
  };

  const docsSelfEmployed = {
    title: "Documents Required for Self-Employed Applicants",
    sections: [
      {
        heading: "Proof of Income",
        items: [
          "Computation of income with P&L statement and Balance Sheet (especially where loan exceeds ~₹25 lakh).",
        ],
      },
      {
        heading: "Business Proof (any suitable document as per profile)",
        items: [
          "Registration / membership with local market association.",
          "Letter from Gram Panchayat / Sarpanch for rural business locations.",
          "Valid Shop & Establishment license (where applicable).",
          "Current account maintained in the name of the business firm.",
        ],
      },
    ],
  };

  const docsCommon = {
    title:
      "Common Documents Required from Both Salaried and Self-Employed Applicants",
    sections: [
      {
        heading: "Identity & Address Proof",
        items: [
          "Aadhaar Card, PAN Card, Voter ID, Driving License, Passport (any valid combination as per policy).",
        ],
      },
      {
        heading: "Property-Related Documents",
        items: [
          "Relevant property papers and registered documents as required.",
          "Bank account statement / municipal tax receipt as applicable.",
          "Recent utility bill (typically not older than 2 months).",
        ],
      },
    ],
  };

  const faqs = [
    {
      question: "What is the interest rate of Aadhar Housing Finance?",
      answer:
        "Home loan rates for Aadhar Housing Finance generally start around 11.75% per annum and can go up to about 17% per annum, depending on applicant type and product.",
    },
    {
      question: "What is the maximum loan amount available?",
      answer:
        "Under many of its standard home loan schemes, Aadhar Housing Finance can offer loan amounts up to approximately ₹1 Crore, subject to eligibility and property value.",
    },
    {
      question:
        "What is the typical age limit for Aadhar Housing Finance home loans?",
      answer:
        "For salaried borrowers, the age at the end of tenure is usually capped around 60 years, while for self-employed profiles, it can go up to roughly 70 years at loan maturity.",
    },
    {
      question: "How can I apply for an Aadhar Housing Finance home loan?",
      answer:
        "You can apply online through AraMount by sharing your basic details and requirements. A home loan specialist from AraMount will coordinate with you and help process your Aadhar Housing Finance application smoothly.",
    },
    {
      question:
        "What is the maximum repayment tenure offered by Aadhar Housing Finance?",
      answer:
        "For eligible profiles, the overall tenure for home loans can go up to about 30 years, subject to age and credit policy.",
    },
    {
      question: "How can I track my Aadhar Housing Finance loan status?",
      answer:
        "You can contact Aadhar Housing Finance customer care or your assigned relationship officer to check the status of your loan application or existing loan.",
    },
    {
      question:
        "Who can be a co-applicant in an Aadhar Housing Finance home loan?",
      answer:
        "Generally, immediate family members like spouse, parents, and adult children can be taken as co-applicants, subject to policy.",
    },
    {
      question:
        "What are the typical processing fees for an Aadhar home loan?",
      answer:
        "Processing / login fees are typically around ₹3,500 plus applicable taxes, along with other administrative and technical charges as per the fee grid.",
    },
  ];

  return (
    <main className="bg-[#F4F7FB] min-h-screen text-gray-900">
      {/* HERO + EMI */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10 grid gap-8 lg:grid-cols-[1.4fr,1fr] items-center">
          {/* Left content */}
          <div>
            <nav className="text-xs text-gray-500 mb-4">
              <Link to="/" className="hover:text-basic-blue">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/home-loan-from-nbfcs" className="hover:text-basic-blue">
                Home Loans from NBFCs
              </Link>{" "}
              /{" "}
              <span className="text-gray-700 font-medium">
                Aadhar Housing Finance
              </span>
            </nav>
<img
                src="https://basichomeloan.com/admin/uploads/banner-section-logo/Aadhar_Home_Loan.jpg"
                alt="Aadhar Housing Finance Logo"
                className="h-full w-auto object-contain bg-black"
              />
            <div className="flex items-center gap-3 mb-4 mt-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Aadhar Housing Finance Home Loan
              </h1>
            </div>

            <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
              Aadhar Housing Finance focuses on affordable home finance for
              lower and middle-income households, helping families in smaller
              towns and cities to own a home with simple documentation and
              flexible EMIs. Interest rates usually start around{" "}
              <span className="font-semibold">10.25% p.a.</span> and can go up
              to about <span className="font-semibold">17% p.a.</span>, with
              processing charges kept modest so that repayments remain
              manageable.
            </p>

            <p className="text-sm text-gray-700 mb-5">
              Through AraMount, you can compare Aadhar Housing Finance plans,
              estimate your EMI, and get assisted end-to-end in the loan
              process.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#consult-form"
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-basic-blue text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              >
                Check Eligibility with AraMount
              </a>
              <a
                href="#emi-calculator"
                className="text-sm font-medium text-basic-blue hover:underline"
              >
                Use Aadhar Home Loan EMI Calculator
              </a>
            </div>
          </div>

          {/* EMI CALCULATOR CARD */}
          <div
            id="emi-calculator"
            className="bg-[#0C1024] text-white rounded-xl shadow-lg p-5 md:p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-gradient-to-br from-white via-transparent to-basic-blue" />
            <div className="relative">
              <h2 className="text-lg font-semibold mb-1">
                Aadhar Home Loan EMI Calculator
              </h2>
              <p className="text-xs text-gray-300 mb-4">
                Avoid confusion, get it right with AraMount’s EMI estimator
                before you apply.
              </p>

              {/* Loan amount */}
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wide text-gray-300 mb-1 block">
                  Loan Amount
                </label>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>1 Lac</span>
                  <span>1 Cr</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="mt-1 text-sm font-medium">
                  ₹ {formatINR(loanAmount)}
                </div>
              </div>

              {/* Interest rate */}
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wide text-gray-300 mb-1 block">
                  Interest Rate (% p.a.)
                </label>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>0%</span>
                  <span>20%</span>
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
                <div className="mt-1 text-sm font-medium">
                  {interestRate.toFixed(2)}% p.a.
                </div>
              </div>

              {/* Tenure */}
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wide text-gray-300 mb-1 block">
                  Loan Tenure (Years)
                </label>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>1</span>
                  <span>30</span>
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
                <div className="mt-1 text-sm font-medium">
                  {tenureYears} years
                </div>
              </div>

              {/* Breakup */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-xs font-semibold text-gray-200 mb-2">
                  Break-up of Total Payment
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly EMI</span>
                    <span className="font-semibold">
                      ₹ {isFinite(emi) ? formatINR(emi) : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount Payable</span>
                    <span className="font-semibold">
                      ₹ {isFinite(totalPayment) ? formatINR(totalPayment) : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Principal Amount</span>
                    <span>₹ {formatINR(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Total Interest</span>
                    <span>
                      ₹ {isFinite(totalInterest) ? formatINR(totalInterest) : "0"}
                    </span>
                  </div>
                </div>

                <Link
                  to="/eligibility-check"
                  className="mt-4 inline-flex justify-center items-center w-full text-sm font-semibold bg-basic-blue hover:bg-blue-700 rounded-md py-2.5"
                >
                  Apply for Aadhar Home Loan via AraMount
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section className="bg-[#F4F7FB] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Key Highlights of Aadhar Housing Finance Home Loan
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            A quick snapshot of major features, pricing, and limits for Aadhar
            Housing Finance home loans routed through AraMount.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Loan Amount
              </p>
              <p className="text-base font-semibold text-gray-900">
                Up to ₹1 Crore
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Subject to property value, eligibility, and policy of Aadhar
                Housing Finance.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Interest Rate
              </p>
              <p className="text-base font-semibold text-gray-900">
                From 10.25% p.a. onwards
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Exact rate depends on applicant profile, product type (HL / LAP
                etc.), and internal risk assessment.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Processing & Administrative Charges
              </p>
              <p className="text-base font-semibold text-gray-900">
                Processing fee up to ₹3,500 + GST
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Additional administrative, legal, technical, and documentation
                charges are applicable as per the current fee grid.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Maximum Tenure
              </p>
              <p className="text-base font-semibold text-gray-900">
                Up to 30 Years
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Tenure linked to age at loan maturity and product category.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Target Segment
              </p>
              <p className="text-base font-semibold text-gray-900">
                Affordable & Low-Income Housing
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Special focus on low and middle-income groups, especially in
                smaller towns and semi-urban locations.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Prepayment / Foreclosure
              </p>
              <p className="text-base font-semibold text-gray-900">
                As per Aadhar Housing policy
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Charges differ by product and borrower type; AraMount will share
                the latest terms at application time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEREST RATES TABLE */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Aadhar Housing Finance Home Loan Interest Rates (Indicative)
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Below is an overview of typical interest rate ranges for different
            borrower categories under Aadhar Housing Finance home loans.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Loan Slab / Borrower Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Interest Rate Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {interestRateRows.map((row) => (
                  <tr key={row.slab} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                    <td className="px-4 py-3 text-gray-800">
                      {row.rateRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Note: These bands are indicative ranges consolidated from publicly
            available information. Actual rate is decided by Aadhar Housing
            Finance based on property details, income profile, credit score,
            product type and other internal criteria. Interest rate cards are
            updated periodically by the lender.
          </p>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="bg-[#F4F7FB] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Aadhar Housing Finance Home Loan Eligibility Criteria
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            While final approval rests with Aadhar Housing Finance, the
            following points broadly summarize the kind of eligibility parameters
            typically considered for salaried and self-employed applicants.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Parameter
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Salaried Individuals
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Self-Employed Individuals
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">Age at Maturity</td>
                  <td className="px-4 py-3 text-gray-800">
                    Generally up to ~60 years by end of repayment tenure.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Typically up to ~70 years by end of repayment tenure.
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">
                    Income / Employment
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Stable salaried income with regular credits; minimum net
                    income threshold usually applies.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Business or professional income with adequate track record;
                    minimum business continuity of around 3 years is often
                    required.
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">Nationality</td>
                  <td className="px-4 py-3 text-gray-800">
                    Indian residents and, in some cases, select NRI / overseas
                    profiles as per policy.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Indian residents and permitted self-employed/non-professional
                    profiles, subject to program guidelines.
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">Min. Income</td>
                  <td className="px-4 py-3 text-gray-800">
                    Minimum monthly income often starts from ~₹10,000, varying
                    by city and product.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Overall income & cash-flows must support proposed EMI; exact
                    threshold depends on risk and program.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Exact eligibility rules, documentation, and permissible combinations
            of co-applicants are decided solely by Aadhar Housing Finance.
            AraMount helps you understand and prepare as per the latest policy
            at the time of application.
          </p>
        </div>
      </section>

      {/* FEES & CHARGES */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Aadhar Housing Finance Home Loan Processing Fee & Key Charges
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Aadhar Housing Finance levies certain processing, administrative,
            and incidental charges. Below is an indicative snapshot of the main
            fee heads usually applicable on home loan products.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Charge Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Indicative Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr key={row.label} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{row.label}</td>
                    <td className="px-4 py-3 text-gray-800">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Fees and charges are exclusive of applicable taxes and are subject
            to change as per Aadhar Housing Finance&apos;s policy. AraMount will
            share the most recent fee structure at the time of login and
            sanction.
          </p>
        </div>
      </section>

      {/* SCHEMES & TOP PLANS */}
      <section className="bg-[#F4F7FB] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Aadhar Home Finance Schemes and Top Plans
          </h2>
          <p className="text-sm text-gray-700 mb-5">
            Aadhar Housing Finance offers multiple home loan variants covering
            purchase, construction, improvement, extension, LAP and specialised
            affordable-housing programs. Here are some of the key scheme types
            typically available:
          </p>

          <div className="space-y-5">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5"
              >
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                  {scheme.title}
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                  {scheme.bullets.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-600">
            Note: Actual availability of specific schemes and ticket sizes is
            at the sole discretion of Aadhar Housing Finance, based on applicant
            profile, location, income, and repayment capacity. AraMount helps
            you choose the most suitable option at the time of counseling.
          </p>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Documents Required for Aadhar Housing Finance Home Loan
          </h2>
          <p className="text-sm text-gray-700 mb-5">
            Below is an overview of the typical documentation required by Aadhar
            Housing Finance. Specific requirements may vary by city, profile,
            and scheme. AraMount will share a personalized checklist once your
            case is logged in.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Salaried */}
            <div className="bg-[#F9FAFB] rounded-xl border border-gray-200 p-4 md:p-5">
              <h3 className="text-sm md:text-base font-semibold mb-3">
                {docsSalaried.title}
              </h3>
              {docsSalaried.sections.map((sec) => (
                <div key={sec.heading} className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {sec.heading}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                    {sec.items.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Self-Employed */}
            <div className="bg-[#F9FAFB] rounded-xl border border-gray-200 p-4 md:p-5">
              <h3 className="text-sm md:text-base font-semibold mb-3">
                {docsSelfEmployed.title}
              </h3>
              {docsSelfEmployed.sections.map((sec) => (
                <div key={sec.heading} className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {sec.heading}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                    {sec.items.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Common docs */}
          <div className="mt-5 bg-[#F9FAFB] rounded-xl border border-gray-200 p-4 md:p-5">
            <h3 className="text-sm md:text-base font-semibold mb-3">
              {docsCommon.title}
            </h3>
            {docsCommon.sections.map((sec) => (
              <div key={sec.heading} className="mb-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  {sec.heading}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                  {sec.items.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY + BRANCH INFO */}
      <section className="bg-[#F4F7FB] border-b border-gray-200" id="consult-form">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 grid gap-8 lg:grid-cols-[1.3fr,1fr]">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              How to Apply for an Aadhar Housing Finance Home Loan via AraMount
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              AraMount simplifies the entire Aadhar Housing Finance home loan
              journey — from initial discovery to documentation and final
              sanction.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800 mb-4">
              <li>
                Share your requirement on the AraMount platform or speak to an
                AraMount home loan expert.
              </li>
              <li>
                Our team shortlists the best-fit Aadhar Housing Finance schemes
                based on your income, location, and property type.
              </li>
              <li>
                Upload or hand over the required documents; AraMount coordinates
                with Aadhar Housing Finance for login and processing.
              </li>
              <li>
                Track your loan status with the help of your dedicated AraMount
                relationship manager till disbursement.
              </li>
            </ol>

            <p className="text-xs text-gray-600 mb-2">
              For branch-level questions, you can also search online for the
              nearest Aadhar Housing Finance branch and contact them directly.
              AraMount can further assist you with documentation and comparisons
              across multiple lenders if required.
            </p>

            <p className="text-[11px] leading-relaxed text-gray-500">
              <span className="font-semibold">Disclaimer:</span> Interest rates,
              processing fees, and eligibility norms are governed solely by
              Aadhar Housing Finance and may change without prior notice. All
              figures on this page are indicative and derived from publicly
              available information. For the latest terms, please refer to the
              official Aadhar Housing Finance website or connect with an
              AraMount representative.
            </p>
          </div>

          {/* Simple lead form style card (UI only) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="text-sm md:text-base font-semibold mb-1">
              Get Free Home Loan Consultation from AraMount
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Tell us briefly about your requirement and an AraMount expert will
              connect with you to discuss Aadhar Housing Finance options.
            </p>

            <form className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-basic-blue"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-basic-blue"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-basic-blue"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-basic-blue"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-basic-blue"
                  placeholder="e.g. 1500000"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-basic-blue"
                  placeholder="Area pincode"
                />
              </div>

              <div className="flex items-start gap-2 text-[11px] text-gray-600">
                <input type="checkbox" className="mt-0.5" />
                <span>
                  I agree to be contacted by AraMount for home loan assistance
                  and understand that lender terms and conditions will apply.
                </span>
              </div>

              <button
                type="button"
                className="w-full mt-1 bg-basic-blue hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-md"
              >
                Request a Call Back
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            FAQs – Aadhar Housing Finance Home Loan
          </h2>
          <p className="text-sm text-gray-700 mb-5">
            Have questions around Aadhar Housing Finance home loans? Here are
            some of the most commonly asked queries with concise answers.
          </p>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-2 text-sm text-gray-800 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AadharHousingFinancePage;
