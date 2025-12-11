"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const CholamandalamHomeLoanPage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // 10 Lac
  const [interestRate, setInterestRate] = useState<number>(9.0);
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
      slab: "Salaried and Self-Employed (Standard Profiles)",
      range: "9.00% – 15.00% p.a.",
    },
    {
      slab: "Salaried – Low Income Segment",
      range: "10.00% – 18.00% p.a.",
    },
    {
      slab: "Affordable Housing (Purchase / Construction / Existing)",
      range: "10.00% – 20.00% p.a.",
    },
    {
      slab: "Cash-Salaried",
      range: "12.00% – 20.00% p.a.",
    },
  ];

  const chargesRows = [
    {
      label: "Processing Fee",
      value: "₹ 5,000 (including GST)",
    },
    {
      label: "Admin Fee",
      value: "2% of the sanctioned loan amount",
    },
    {
      label: "Duplicate NOC (No Objection Certificate)",
      value: "₹ 500 + GST",
    },
    {
      label: "Cheque / ECS Bounce Charges",
      value: "₹ 500 + GST per bounce",
    },
    {
      label: "Rate Package Swap (Fixed ↔ Floating)",
      value: "₹ 500 + GST",
    },
    {
      label: "Interest Rate Switch",
      value: "1% of outstanding principal",
    },
    {
      label: "Copy of Documents",
      value: "₹ 750 + GST",
    },
    {
      label: "Field Visit Charge",
      value: "₹ 250 + GST per visit",
    },
    {
      label: "CERSAI Registration",
      value: "₹ 118 (including GST)",
    },
    {
      label: "Additional Interest for Late Payment",
      value:
        "Approx. 1.50% p.a. over the applicable rate for the delayed period",
    },
  ];

  const schemes = [
    {
      title: "1. Home Extension Loans",
      bullets: [
        "Designed for borrowers who want to extend, renovate, or repair an existing house.",
        "Simple documentation requirements, even for first-time home loan customers.",
        "Flexible repayment options to suit cash flows.",
      ],
    },
    {
      title: "2. Self-Construction Loans",
      bullets: [
        "For individuals constructing a home on land they already own.",
        "Funds can be used for various stages of construction.",
        "Tax benefits may be available as per prevailing income-tax provisions.",
        "Structured disbursals linked to construction progress.",
      ],
    },
    {
      title: "3. Loans for Purchase of Resale Flat / Independent House",
      bullets: [
        "For buying a pre-owned flat or independent house from an existing owner.",
        "Eligibility aligned to both salaried and self-employed borrowers.",
        "Potential to benefit from future capital appreciation of the property.",
      ],
    },
    {
      title: "4. Loans for Purchase of New Flat / Independent House",
      bullets: [
        "For purchase from a builder, development authority, or housing board.",
        "Quick sanction and disbursal timelines for approved projects.",
        "Repayment tenures structured up to long durations for comfortable EMIs.",
      ],
    },
    {
      title: "5. Loans for Mixed-Use Properties",
      bullets: [
        "Suitable where property has residential as well as commercial usage.",
        "Can help business owners consolidate residence and business space.",
        "Loan structured based on value, usage type, and repayment capacity.",
      ],
    },
    {
      title: "6. Home Loan Balance Transfer",
      bullets: [
        "Shift an existing home loan from another lender to Cholamandalam.",
        "Possibility to lower EMI through better interest rate / revised tenure.",
        "Top-up facility may be available over and above the transferred loan.",
        "Tenure of up to 30 years, subject to profile and property.",
      ],
    },
    {
      title: "7. Chola PMAY Home Loans",
      bullets: [
        "Oriented towards Economically Weaker Section (EWS), LIG, MIG-I and MIG-II categories.",
        "Enables eligible borrowers to avail Credit Linked Subsidy Scheme (CLSS).",
        "Potential to save a significant amount in interest through subsidy benefit.",
      ],
    },
  ];

  const docsSalaried = {
    title: "Documents Required for Salaried Applicants",
    sections: [
      {
        heading: "Income Proof",
        items: [
          "Latest 3 months’ salary slips.",
          "Bank passbook / statements for previous 6 months with salary credits.",
          "Form 16 or ITR for the last 2 years, wherever available.",
        ],
      },
      {
        heading: "Other Required Documents",
        items: [
          "Duly completed and signed home loan application form.",
          "Recent passport-size photographs.",
          "Processing fee cheque drawn in favour of Cholamandalam HFL (as per latest instructions).",
        ],
      },
    ],
  };

  const docsSelfEmployed = {
    title: "Documents Required for Self-Employed Applicants",
    sections: [
      {
        heading: "Income / Business Proof",
        items: [
          "Shop & Establishment Act Certificate, where applicable.",
          "Sales Tax / GST registration certificate, as relevant.",
          "Certificate of Incorporation / registration documents for firms / companies.",
          "Bank passbook / statements for last 6 months with business transactions.",
          "ITR / financials for the past 2 years (wherever required under policy).",
        ],
      },
      {
        heading: "Other Required Documents",
        items: [
          "Duly completed and signed loan application form.",
          "Recent passport-size photographs of applicant / co-applicant(s).",
          "Processing fee cheque in favour of Cholamandalam HFL (as per current fee grid).",
        ],
      },
    ],
  };

  const docsCommon = {
    title:
      "Common Documents for Both Salaried and Self-Employed Applicants",
    sections: [
      {
        heading: "Identity & Address Proof",
        items: [
          "Any combination of Voter ID, Driving Licence, Aadhaar Card, Passport, PAN Card, etc. as per KYC norms.",
        ],
      },
      {
        heading: "Property Related Documents",
        items: [
          "Sale deed / allotment letter / builder-buyer agreement, as applicable.",
          "Occupancy certificate or completion certificate, if available.",
          "Payment receipts issued by builder / seller for amounts already paid.",
          "Approved building plan and permission to construct wherever needed.",
          "Registered development agreement with the builder, if relevant.",
          "No Objection Certificate (NOC) from builder / housing society, where required.",
        ],
      },
    ],
  };

  const faqs = [
    {
      q: "What is the interest rate range for Cholamandalam home loans?",
      a: "Indicatively, Cholamandalam home loan rates start around 9.00% per annum and may go up to about 20.00% per annum depending on the scheme, income profile and risk assessment.",
    },
    {
      q: "What is the processing fee charged by Cholamandalam for home loans?",
      a: "A processing fee of roughly ₹ 5,000 including GST is typically charged on home loan applications, along with applicable administrative and incidental charges.",
    },
    {
      q: "What is the maximum tenure available for a Chola home loan?",
      a: "Tenure can go up to about 30 years for eligible customers, subject to age at maturity, profile and internal credit norms.",
    },
    {
      q: "Do I need a very high credit score to apply?",
      a: "Cholamandalam is known for catering to a wide range of income and credit profiles. AraMount will still check your credit health and guide you on how it may impact the terms offered.",
    },
    {
      q: "How can AraMount help with a Cholamandalam home loan?",
      a: "AraMount helps you understand eligibility, prepares your documentation, compares options, and coordinates with Cholamandalam for login, processing and disbursal.",
    },
    {
      q: "Can I transfer my existing home loan to Cholamandalam?",
      a: "Yes, balance transfer schemes are available. You can shift your outstanding loan from another lender to Cholamandalam and may also be able to take a top-up, subject to eligibility.",
    },
  ];

  return (
    <main className="bg-[#F4F7FB] min-h-screen text-gray-900">
      {/* HERO + EMI */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10 grid gap-8 lg:grid-cols-[1.4fr,1fr] items-center">
          {/* LEFT CONTENT */}
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
              <span className="font-medium text-gray-700">
                Cholamandalam Home Loan
              </span>
            </nav>
 <img
                src="https://basichomeloan.com/admin/uploads/banner-section-logo/Cholamandalam_Home_Loan.jpg"
                alt="Cholamandalam Home Loan Logo"
                className="h-10 w-auto object-contain bg-white rounded-md shadow-sm"
              />
            <div className="flex items-center gap-3 mb-4 mt-4">
             
              <h1 className="text-2xl md:text-3xl font-semibold">
                Cholamandalam Home Loan
              </h1>
            </div>

            <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
              Cholamandalam Investment and Finance Company Ltd., headquartered
              in Chennai, offers home loans through its housing finance arm to a
              wide set of customers across India. Typical home loan rates start
              from around <span className="font-semibold">9.00% p.a.</span> and
              may go up to about{" "}
              <span className="font-semibold">20.00% p.a.</span>, with a
              processing fee of roughly{" "}
              <span className="font-semibold">₹ 5,000 (including GST)</span>.
            </p>

            <p className="text-sm text-gray-700 mb-4">
              Applicants often choose Chola home loans for relatively simple
              paperwork, flexible eligibility for salaried and self-employed
              borrowers, and customised options for affordable housing
              categories. Through AraMount, you can understand all of these
              details and get assisted through each step of the process.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#consult-form"
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-basic-blue text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              >
                Get Free AraMount Consultation
              </a>
              <a
                href="#emi-calculator"
                className="text-sm font-medium text-basic-blue hover:underline"
              >
                Use Cholamandalam EMI Calculator
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
                Cholamandalam Home Loan EMI Calculator
              </h2>
              <p className="text-xs text-gray-300 mb-4">
                Avoid guesswork. Use AraMount&apos;s EMI estimator before you
                finalise your loan.
              </p>

              {/* Loan amount */}
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wide text-gray-300 mb-1 block">
                  Loan Amount
                </label>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>1 Lac</span>
                  <span>10 Cr</span>
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
                    <span>Your Monthly EMI</span>
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
                      ₹{" "}
                      {isFinite(totalInterest)
                        ? formatINR(totalInterest)
                        : "0"}
                    </span>
                  </div>
                </div>

                <Link
                  to="/eligibility-check"
                  className="mt-4 inline-flex justify-center items-center w-full text-sm font-semibold bg-basic-blue hover:bg-blue-700 rounded-md py-2.5"
                >
                  Apply for Chola Home Loan via AraMount
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
            Key Highlights of Cholamandalam Home Loan
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            Below is an overview of loan amounts, pricing and key features for
            Cholamandalam home loans arranged via AraMount.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Loan Amount
              </p>
              <p className="text-base font-semibold text-gray-900">
                Starting at ₹ 10 Lakhs
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Ticket size and maximum amount depend on income, property value
                and lender policy.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Rate of Interest
              </p>
              <p className="text-base font-semibold text-gray-900">
                9.00% – 20.00% p.a.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Rate varies by scheme type, borrower profile and risk grade.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Processing Fee
              </p>
              <p className="text-base font-semibold text-gray-900">
                Around ₹ 5,000 (incl. GST)
              </p>
              <p className="text-xs text-gray-600 mt-1">
                One-time processing fee at login; other admin and technical
                charges may apply.
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
                Subject to age at loan maturity and eligibility criteria.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Rate Type
              </p>
              <p className="text-base font-semibold text-gray-900">
                Fixed / Floating Options
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Choice of interest rate package subject to product and policy at
                the time of sanction.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <p className="text-xs uppercase text-gray-500 mb-1">
                Prepayment / Foreclosure
              </p>
              <p className="text-base font-semibold text-gray-900">
                Generally Nil for many home loan cases
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Exact charges depend on scheme and borrower category; AraMount
                will share latest grid while applying.
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Indicative information only. Interest rates were last updated
            towards the end of 2025 as per public sources and may change anytime
            at lender&apos;s discretion.
          </p>
        </div>
      </section>

      {/* INTEREST RATES TABLE */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Cholamandalam Home Loan Interest Rates – Overview
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Cholamandalam structures home loan pricing as per borrower type,
            income segment and specific scheme. The table below gives a
            high-level view of indicative ranges.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Loan Slab / Borrower Category
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Indicative Interest Rate Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {interestRateRows.map((row) => (
                  <tr key={row.slab} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                    <td className="px-4 py-3 text-gray-800">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Actual rate will be finalised by Cholamandalam at the time of
            sanction after evaluating your profile, property details and overall
            risk.
          </p>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="bg-[#F4F7FB] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Cholamandalam Home Loan Eligibility Criteria
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            While the final decision lies with the NBFC, here is a consolidated
            snapshot of broad eligibility conditions for salaried and
            self-employed applicants.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Parameter
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Salaried
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Self-Employed
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">Age Range</td>
                  <td className="px-4 py-3 text-gray-800">
                    Typically 21 – 65 years at loan maturity.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Typically 21 – 65 years at loan maturity (may extend based
                    on program).
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">Nationality</td>
                  <td className="px-4 py-3 text-gray-800">
                    Indian residents, subject to documentation.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Indian residents, including small business owners and
                    professionals.
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-800">Minimum Income</td>
                  <td className="px-4 py-3 text-gray-800">
                    No very high fixed threshold mentioned publicly; income
                    should adequately support proposed EMI.
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    Overall business and cash-flows should justify the loan and
                    meet internal program requirements.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            These are broad guidelines compiled from publicly available
            information. AraMount will confirm the latest rule-set directly with
            the lender at login time.
          </p>
        </div>
      </section>

      {/* FEES & CHARGES */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Cholamandalam Home Loan Processing Fee & Other Charges
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Like other lenders, Cholamandalam applies processing and incidental
            fees for handling home loan applications and servicing. Below is an
            indicative list of key charge heads.
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
                {chargesRows.map((row) => (
                  <tr key={row.label} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{row.label}</td>
                    <td className="px-4 py-3 text-gray-800">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            All fees are typically subject to applicable taxes and may be
            revised by Cholamandalam without prior public notice. AraMount will
            provide you with the latest fee grid at the time of login.
          </p>
        </div>
      </section>

      {/* SCHEMES & TOP PLANS */}
      <section className="bg-[#F4F7FB] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Cholamandalam Home Finance Schemes and Top Plans
          </h2>
          <p className="text-sm text-gray-700 mb-5">
            Cholamandalam offers a range of home loan variants covering
            purchase, construction, extension, balance transfer and PMAY-linked
            affordable housing. Some of the popular plan categories are:
          </p>

          <div className="space-y-5">
            {schemes.map((scheme) => (
              <div
                key={scheme.title}
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
            Availability of any specific scheme and the exact rate offered is
            at the sole discretion of Cholamandalam, based on profile, location,
            property and repayment capacity. AraMount helps you match the right
            scheme to your needs.
          </p>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Documents Required for Cholamandalam Home Loan
          </h2>
          <p className="text-sm text-gray-700 mb-5">
            Here is a consolidated view of the documentation generally needed
            for Cholamandalam home loans. The actual list may vary depending on
            your profile and the scheme selected.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {/* SALARIED */}
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

            {/* SELF-EMPLOYED */}
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

          {/* COMMON DOCS */}
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

      {/* HOW TO APPLY + FORM CARD */}
      <section
        className="bg-[#F4F7FB] border-b border-gray-200"
        id="consult-form"
      >
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 grid gap-8 lg:grid-cols-[1.3fr,1fr]">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              How to Apply for Cholamandalam Home Loan via AraMount
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              AraMount simplifies your Cholamandalam home loan journey by
              bringing comparison, documentation support and lender coordination
              under one flow.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800 mb-4">
              <li>
                Share your requirement and basic details with AraMount through
                the website or a quick callback request.
              </li>
              <li>
                Based on income, city and property, AraMount shortlists suitable
                Cholamandalam schemes and explains them to you.
              </li>
              <li>
                Upload or hand over the requested documents; AraMount helps
                structure the file and submits it to Cholamandalam.
              </li>
              <li>
                Track the status with help from your AraMount relationship
                manager until sanction and disbursal.
              </li>
            </ol>

            <p className="text-[11px] leading-relaxed text-gray-500 mb-2">
              <span className="font-semibold">Disclaimer:</span> Interest
              rates, fees and eligibility norms are controlled entirely by
              Cholamandalam and can change without prior notice. Figures used on
              this page are indicative, compiled from public data and may not
              always be the latest.
            </p>
          </div>

          {/* Simple (non-functional) lead form UI */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <h3 className="text-sm md:text-base font-semibold mb-1">
              Get Free Home Loan Consultation from AraMount
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Share a few details and an AraMount home loan specialist will
              connect with you to discuss Cholamandalam options.
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
                  placeholder="e.g. 1000000"
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
                  and understand that loan approval is subject to lender terms.
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

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            FAQs – Cholamandalam Home Loan
          </h2>
          <p className="text-sm text-gray-700 mb-5">
            Some of the common questions borrowers ask about Cholamandalam home
            loans, answered in brief.
          </p>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">
                    {faq.q}
                  </span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-2 text-sm text-gray-800 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CholamandalamHomeLoanPage;
