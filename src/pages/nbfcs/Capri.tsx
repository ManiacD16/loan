// src/pages/nbfcs/CapriGlobalHousingFinance.tsx
import React, { useState } from "react";

type Highlight = {
  label: string;
  value: string;
};

type Charge = {
  label: string;
  value: string;
};

type Scheme = {
  title: string;
  points: string[];
};

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const keyHighlights: Highlight[] = [
  { label: "Loan Amount", value: "Up to ₹50 Lakh" },
  { label: "Rate of Interest", value: "10.50% – 12.50% p.a." },
  { label: "Processing Fee", value: "Up to 2.5%" },
  { label: "Maximum Tenure", value: "Up to 20 years" },
  { label: "Rate Type", value: "Fixed for initial period, then Floating" },
  {
    label: "Prepayment / Foreclosure",
    value: "5% up to 2 years from date of last disbursal",
  },
];

const interestRateInfo = {
  description:
    "Capri Global Housing Finance offers home loans at interest rates typically between 10.50% and 12.50% per annum. Actual rate depends on scheme, profile, and employment type.",
  slab: "First 3 months (fixed) and thereafter (floating)",
  rateRange: "8.99% – 16.00% p.a.",
  lastUpdated: "30th November 2025",
};

const processingCharges: Charge[] = [
  { label: "Application Fee (Non-Refundable)", value: "₹5,000" },
  { label: "ECS Dishonour Charges", value: "₹500 per instance" },
  { label: "Document Retrieval Charges", value: "₹1,100 per instance" },
  {
    label: "CERSAI Charges",
    value: "₹50 for loans < ₹50 lakh, ₹100 for loans ≥ ₹50 lakh",
  },
  { label: "Loan Cancellation Charges", value: "₹5,000" },
  {
    label: "Legal Handling Charges (BT / Resale Loans)",
    value: "₹1,500",
  },
  { label: "Foreclosure / Statement Charges", value: "₹500" },
  {
    label: "Document Handling & Administration",
    value: "Starting from 1.00% – 2.00%",
  },
  { label: "Document Verification Charges", value: "₹750" },
  { label: "Repayment Swapping Charges", value: "₹500" },
  {
    label: "Income Estimation Charges (LIP)",
    value: "₹1,750 wherever applicable",
  },
  { label: "Stamp Duty", value: "As per actuals" },
  { label: "Valuation Charges", value: "₹2,000" },
  {
    label: "Subsequent Valuation Charges (Construction Loans)",
    value: "₹500",
  },
];

const schemes: Scheme[] = [
  {
    title: "1. Home Extension Loan",
    points: [
      "Designed to extend an existing residential property",
      "Fixed interest during the first 3 years, then floating rate thereafter",
      "Loan amount from ₹5 lakh to ₹50 lakh",
      "Maximum repayment tenure of up to 20 years",
    ],
  },
  {
    title: "2. Home Purchase Loan",
    points: [
      "Suitable for purchase of ready-to-move or under-construction homes",
      "Loan amount from ₹2 lakh to ₹50 lakh",
      "Maximum repayment tenure of up to 20 years",
    ],
  },
  {
    title: "3. Home Renovation Loan",
    points: [
      "For renovation or improvement of an existing residential property",
      "Loan amount from ₹2 lakh to ₹25 lakh",
      "Maximum repayment tenure of up to 15 years",
    ],
  },
  {
    title: "4. Home Construction Loan",
    points: [
      "For constructing a house on a residential non-agricultural plot",
      "Loan amount from ₹2 lakh to ₹50 lakh",
      "Maximum repayment tenure of up to 20 years",
    ],
  },
  {
    title: "5. Plot Purchase Loan",
    points: [
      "Best suited for buying a residential plot",
      "Helps you buy the plot now and construct later at your convenience",
      "Loan amount from ₹2 lakh to ₹25 lakh",
      "Maximum repayment tenure of up to 15 years",
    ],
  },
  {
    title: "6. Top-Up Plan",
    points: [
      "Top-up facility on existing home loan for personal or business needs",
      "Easy balance transfer of existing home loan",
      "Loan amount from ₹2 lakh to ₹50 lakh",
      "Maximum repayment tenure of up to 20 years",
    ],
  },
  {
    title: "7. Home Loan under PMAY (Pradhan Mantri Awas Yojana)",
    points: [
      "Focused on the informal segment to support home ownership",
      "Interest subsidy of 6.5% under PMAY",
      "Maximum repayment tenure of up to 20 years",
    ],
  },
];

const faqs: FAQ[] = [
  {
    question: "What is the Capri Global Housing Finance home loan interest rate?",
    answer: (
      <p>
        Capri Global home loan interest rates typically start around{" "}
        <strong>8.99% p.a.</strong> and can go up to{" "}
        <strong>16.00% p.a.</strong>, depending on the home loan scheme,
        customer profile, and rate package selected.
      </p>
    ),
  },
  {
    question:
      "How many days does Capri Global take for home loan disbursement?",
    answer: (
      <p>
        In most straightforward cases, loan disbursement is completed in{" "}
        <strong>about 3 to 5 working days</strong> once the NBFC is satisfied
        with your documentation and verification.
      </p>
    ),
  },
  {
    question: "What is the maximum home loan amount offered by Capri Global?",
    answer: (
      <p>
        Capri Global Housing Finance usually offers home loans of up to{" "}
        <strong>₹50 lakh</strong>, subject to eligibility, income, and property
        value.
      </p>
    ),
  },
  {
    question: "What are the basic eligibility criteria for a Capri Global loan?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Age:</strong> 21 – 65 years
        </li>
        <li>
          <strong>Nationality:</strong> Indian resident
        </li>
        <li>
          <strong>Employment type:</strong> Salaried or Self-Employed
        </li>
        <li>
          Other internal policy checks such as credit profile and repayment
          capacity also apply.
        </li>
      </ul>
    ),
  },
  {
    question: "What types of home loans does Capri Global provide?",
    answer: (
      <p>
        Capri Global offers loans for home purchase, plot purchase, home
        construction, extension, and renovation, along with top-up options and
        loans under the PMAY scheme.
      </p>
    ),
  },
  {
    question: "Is a guarantor mandatory for Capri Global home loans?",
    answer: (
      <p>
        Generally, a guarantor is <strong>not required</strong>. However, in
        some specific profiles or cases, Capri Global may request one as per
        their risk assessment.
      </p>
    ),
  },
  {
    question: "How can I check my Capri Global home loan status?",
    answer: (
      <p>
        You can track your loan by visiting the nearest Capri Global branch or
        checking via the official Capri home loans website / customer care
        channels.
      </p>
    ),
  },
  {
    question: "What are the key benefits of Capri Global home loans?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Doorstep services with relatively simple documentation</li>
        <li>Customized loan amounts for higher eligibility</li>
        <li>Option for balance transfer from other lenders</li>
        <li>
          PMAY interest subsidy of <strong>6.5%</strong> for eligible informal
          segment borrowers
        </li>
        <li>Straightforward eligibility criteria for both salaried and self-employed</li>
      </ul>
    ),
  },
];

const CapriGlobalHousingFinance: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // 10L
  const [interest, setInterest] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [emi, setEmi] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [showFaq, setShowFaq] = useState<number | null>(0);

  const handleCalculate = () => {
    const principal = loanAmount;
    const monthlyRate = interest / 12 / 100;
    const months = tenureYears * 12;

    if (principal <= 0 || monthlyRate <= 0 || months <= 0) {
      setEmi(null);
      setTotalPayment(null);
      return;
    }

    const emiVal =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = emiVal * months;

    setEmi(Math.round(emiVal));
    setTotalPayment(Math.round(total));
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="grid md:grid-cols-[2fr,1.3fr] gap-8 items-start mb-10">
          <div className="space-y-4">
            <img
                src="https://basichomeloan.com/admin/uploads/banner-section-logo/Capri_Global_Housing_Finance_(1).jpg"
                alt="Capri Global Housing Finance"
                className="h-full w-auto object-contain rounded-xl"
              />
            <div className="flex items-center gap-3">
              {/* Update src path according to where you store logos */}
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Capri Global Housing Finance Home Loan
                </h1>
                <p className="text-sm text-slate-600">
                  Compare & apply via AraMount for Capri Global Housing Finance
                  home loans.
                </p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed">
              Capri Global Housing Finance Limited is a growing NBFC that helps
              individuals fulfil their dream of owning a home through structured
              home loan offerings. Loan interest typically ranges between{" "}
              <strong>10.5% – 12.5% p.a.</strong>, with a processing fee (for
              certain products) of around <strong>₹2,000 + GST</strong>. Loans
              are available for purchase, construction, extension, and
              renovation of residential properties, along with PMAY-linked
              options for the informal segment.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Under the{" "}
              <strong>Pradhan Mantri Awas Yojana (PMAY)</strong>, eligible
              informal sector borrowers may receive an interest subsidy of{" "}
              <strong>6.5%</strong> for a tenure of up to{" "}
              <strong>20 years</strong>, making overall home ownership more
              affordable.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-4">
              <div className="bg-white shadow-sm rounded-xl p-3 border border-slate-100">
                <div className="text-[11px] text-slate-500">
                  Loan Amount (Up to)
                </div>
                <div className="font-semibold text-slate-900">₹50 Lakh</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-3 border border-slate-100">
                <div className="text-[11px] text-slate-500">
                  Interest Rate Range
                </div>
                <div className="font-semibold text-slate-900">
                  10.50% – 12.50% p.a.
                </div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-3 border border-slate-100">
                <div className="text-[11px] text-slate-500">Tenure</div>
                <div className="font-semibold text-slate-900">Up to 20 yrs</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-3 border border-slate-100">
                <div className="text-[11px] text-slate-500">
                  PMAY Subsidy (Eligible)
                </div>
                <div className="font-semibold text-slate-900">6.5%</div>
              </div>
            </div>
          </div>

          {/* EMI Calculator Card */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Capri Global Loan EMI Calculator
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Avoid confusion and get it right with AraMount – estimate EMI for
              your Capri Global home loan.
            </p>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-600 mb-1">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(Number(e.target.value) || 0)
                  }
                  min={100000}
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value) || 0)}
                  min={5}
                  max={25}
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tenureYears}
                  onChange={(e) =>
                    setTenureYears(Number(e.target.value) || 0)
                  }
                  min={1}
                  max={30}
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition"
              >
                Calculate EMI
              </button>

              <div className="mt-4 border-t pt-3 space-y-2 text-sm">
                <h3 className="font-semibold text-slate-900">
                  Breakup of Total Payment
                </h3>
                {emi !== null && totalPayment !== null ? (
                  <>
                    <div className="flex justify-between">
                      <span>Your monthly EMI</span>
                      <span className="font-semibold text-blue-700">
                        {formatCurrency(emi)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount Payable</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(totalPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Principal Amount</span>
                      <span>{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Total Interest</span>
                      <span>
                        {formatCurrency(totalPayment - loanAmount)}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-500">
                    Enter loan details above and click{" "}
                    <strong>Calculate EMI</strong> to view EMI and interest
                    breakup.
                  </p>
                )}
              </div>

              <button
                type="button"
                className="w-full mt-3 border border-blue-600 text-blue-600 font-semibold text-sm py-2.5 rounded-lg hover:bg-blue-50 transition"
              >
                Apply for Capri Global Home Loan via AraMount
              </button>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Key Highlights – Capri Global Housing Finance
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Below are some quick highlights of Capri Global Housing Finance
            home loans to help you compare and decide.
          </p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
            <table className="min-w-full text-sm">
              <tbody>
                {keyHighlights.map((item) => (
                  <tr
                    key={item.label}
                    className="border-b last:border-b-0 border-slate-100"
                  >
                    <td className="px-4 py-2 font-medium text-slate-700 w-1/2">
                      {item.label}
                    </td>
                    <td className="px-4 py-2 text-slate-800">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interest Rates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Capri Global Housing Finance Interest Rates (2026)
          </h2>
          <p className="text-sm text-slate-700 mb-3">
            {interestRateInfo.description}
          </p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100 mb-2">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">
                    Loan Slab
                  </th>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">
                    Interest Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 text-slate-800">
                    {interestRateInfo.slab}
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    {interestRateInfo.rateRange}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Interest rates were last updated on{" "}
            <strong>{interestRateInfo.lastUpdated}</strong> on the reference
            site. Actual rates are subject to change as per Capri Global’s
            policies; always confirm on the official lender portal.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Capri Global Home Loan Eligibility Criteria
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Capri Global evaluates eligibility based on age, nationality, income
            profile, employment type, and repayment capacity.
          </p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-slate-700 font-semibold">
                    Parameter
                  </th>
                  <th className="px-4 py-2 text-left text-slate-700 font-semibold">
                    Salaried
                  </th>
                  <th className="px-4 py-2 text-left text-slate-700 font-semibold">
                    Self-Employed
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium text-slate-700">Age</td>
                  <td className="px-4 py-2 text-slate-800">21 – 65 years</td>
                  <td className="px-4 py-2 text-slate-800">21 – 65 years</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium text-slate-700">
                    Nationality
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    Indian Residents
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    Indian Residents
                  </td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium text-slate-700">
                    Minimum Income
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    No specific minimum mentioned
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    No specific minimum mentioned
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Processing Fees & Charges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Capri Global Housing Loan Processing Fees & Charges
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            The following charges typically apply for Capri Global Housing
            Finance home loans. These are indicative and may vary as per latest
            lender policy.
          </p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
            <table className="min-w-full text-sm">
              <tbody>
                {processingCharges.map((charge) => (
                  <tr
                    key={charge.label}
                    className="border-b last:border-b-0 border-slate-100"
                  >
                    <td className="px-4 py-2 font-medium text-slate-700 w-1/2">
                      {charge.label}
                    </td>
                    <td className="px-4 py-2 text-slate-800">{charge.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Schemes & Plans */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Capri Global Home Finance Schemes and Top Plans
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Capri Global Housing Finance offers multiple home loan schemes to
            cater to different requirements. Below are the major schemes
            available:
          </p>
          <div className="space-y-4">
            {schemes.map((scheme) => (
              <div
                key={scheme.title}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {scheme.title}
                </h3>
                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                  {scheme.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Note: All schemes are offered at the sole discretion of Capri
            Global, subject to internal policy, income assessment, and repayment
            capacity of the applicant.
          </p>
        </section>

        {/* Documents Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Documents Required for Capri Global Home Loan
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Here is a consolidated list of documents typically required by Capri
            Global Housing Finance for home loan processing:
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                For Salaried Applicants
              </h3>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">
                Proof of Income
              </h4>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-3">
                <li>Salary slips for the last 3 months</li>
                <li>
                  Bank passbook / bank statements for the last 6 months of all
                  accounts
                </li>
                <li>Latest filed Income Tax Return (ITR)</li>
              </ul>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">
                Other Documents
              </h4>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Duly filled and signed loan application form</li>
                <li>
                  Processing fee cheque in favour of{" "}
                  <strong>Capri Global Housing Finance Ltd.</strong>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                For Self-Employed Applicants
              </h3>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">
                Proof of Income
              </h4>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-3">
                <li>
                  Balance sheet and profit &amp; loss account for the last 2
                  years
                </li>
                <li>
                  Bank passbook / bank statements for the last 6 months of all
                  accounts
                </li>
                <li>Filed ITR for the last 2 years</li>
                <li>Latest audited financials for the last 2 years</li>
              </ul>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">
                Other Documents
              </h4>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Duly filled and signed loan application form</li>
                <li>
                  Processing fee cheque in favour of{" "}
                  <strong>Capri Global Housing Finance Ltd.</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mt-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              Common Documents (Both Salaried & Self-Employed)
            </h3>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">
              Identity & Address Proof (any as accepted by lender)
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-3">
              <li>Voter ID</li>
              <li>Driving Licence</li>
              <li>Aadhaar Card</li>
              <li>Passport copy</li>
              <li>PAN Card</li>
            </ul>

            <h4 className="text-sm font-semibold text-slate-800 mb-1">
              Property Related Documents
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Sale Deed / Allotment Letter</li>
              <li>Occupancy Certificate (where applicable)</li>
              <li>Payment receipts issued by builder</li>
              <li>Permission to construct (for construction loans)</li>
              <li>Copy of approved building plan</li>
              <li>Registered development agreement of builder (if any)</li>
              <li>
                NOC from builder / housing society, as required by Capri Global
              </li>
            </ul>
          </div>
        </section>

        {/* How to Apply / Offices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            How to Apply for Capri Global Home Loan via AraMount
          </h2>
          <p className="text-sm text-slate-700 mb-3">
            Applying for a Capri Global home loan through AraMount is a
            straightforward, assisted process:
          </p>
          <ul className="list-decimal pl-5 text-sm text-slate-700 space-y-1 mb-4">
            <li>
              Go to the relevant Capri Global home loan page on the AraMount
              platform.
            </li>
            <li>
              Fill out the form with your name, contact details, loan amount,
              city, and basic income information.
            </li>
            <li>
              Submit the request; an AraMount home loan specialist will reach
              out to discuss eligibility, offers, and documentation.
            </li>
            <li>
              Share required documents; Capri Global completes credit and
              property assessment.
            </li>
            <li>
              Once approved, sign the agreement and move towards loan
              disbursal.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Finding Capri Global Housing Finance Offices Near You
          </h3>
          <p className="text-sm text-slate-700">
            If you prefer an in-person discussion, you can locate the nearest
            Capri Global branch through their official website or customer care.
            You can also submit a free consultation request via AraMount, and
            the team will coordinate with Capri Global to guide you on offers
            and documentation for your city.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
            <strong>Disclaimer:</strong> Interest rates, fees, and eligibility
            criteria for Capri Global Housing Finance are subject to change at
            the lender’s discretion. Values shown here are based on publicly
            available information and may not reflect the latest updates. Always
            verify current details with Capri Global’s official website or
            direct communication channels before making any final decision.
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            FAQs – Capri Global Housing Finance Home Loan
          </h2>
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={item.question}
                className="bg-white rounded-2xl shadow-sm border border-slate-100"
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowFaq(showFaq === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {item.question}
                  </span>
                  <span className="text-xl text-slate-400">
                    {showFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {showFaq === idx && (
                  <div className="px-4 pb-4 text-sm text-slate-700">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CapriGlobalHousingFinance;
