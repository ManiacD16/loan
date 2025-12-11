// src/pages/nbfcs/AavasHousingFinance.tsx
import React, { useState } from "react";

const AavasHousingFinancePage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(100000); // ₹1 lakh
  const [interestRate, setInterestRate] = useState(10.5); // 10.50% p.a.
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
    { label: "Loan Amount", value: "Starts at ₹1 Lakh" },
    { label: "Rate of Interest", value: "10.50% p.a. (indicative)" },
    { label: "RPLR", value: "As per Aavas policy" },
    { label: "Processing Fee", value: "Up to 2% of loan amount" },
    { label: "Maximum Tenure for Repayment", value: "Up to 30 years" },
    { label: "Penal Rate of Interest", value: "As per lender schedule" },
    { label: "Rate Packages", value: "Fixed / Floater" },
    {
      label: "Prepayment / Foreclosure",
      value:
        "Floater – Nil | Fixed – 3% or 5% + GST (depending on closure timeline)",
    },
  ];

  const interestTable = [
    {
      slab: "Fixed / Floater Packages (Salaried)",
      rate: "Starts at 8.50% and up to 17.00% p.a.",
    },
    {
      slab: "Fixed / Floater Packages (Self-Employed)",
      rate: "Starts at 8.50% and up to 17.00% p.a.",
    },
  ];

  const eligibilityRows = [
    {
      parameter: "Age Range (in years)",
      salaried: "21 – 65 years",
      selfEmployed: "21 – 65 years",
    },
    {
      parameter: "Nationality",
      salaried: "Indian Resident",
      selfEmployed: "Indian Resident",
    },
    {
      parameter: "Minimum Income (per annum)",
      salaried: "₹1 Lakh",
      selfEmployed: "₹1 Lakh",
    },
  ];

  const chargesRows = [
    {
      charge: "Processing Fee",
      detail: "Up to 1% + GST on the loan amount",
    },
    {
      charge: "Administration Fee",
      detail:
        "Up to 2% + GST on the sanctioned amount, collected before / from first disbursement",
    },
    {
      charge: "Valuation / Technical Fee",
      detail: "₹2,500 + GST for each report",
    },
    {
      charge: "Cheque / ECS Dishonour Charges",
      detail: "₹500 + GST",
    },
    {
      charge: "Document Retrieval Charges",
      detail: "₹500 + GST",
    },
    {
      charge: "Rate Package Swapping (Fixed / Floater change)",
      detail: "Up to 2% + GST on the outstanding amount",
    },
    {
      charge: "Penal Interest",
      detail:
        "36% p.a. (charged for the number of days EMI / PEMI payment is overdue)",
    },
    {
      charge: "Copy of Property Papers",
      detail: "₹500 + GST",
    },
    {
      charge: "Completion Certificate",
      detail: "₹500 + GST",
    },
    {
      charge: "Foreclosure / Part Prepayment – Floater",
      detail: "Nil for individual borrowers on floating rate loans",
    },
    {
      charge: "Foreclosure / Part Prepayment – Fixed",
      detail:
        "5% + GST on principal (including part prepayments) if closed within the defined period",
    },
    {
      charge: "Charges for Missed Due Date",
      detail: "₹200 + GST",
    },
    {
      charge: "Document Custodian Fee",
      detail:
        "₹500 + GST per month (after 30 days of loan closure if documents are not collected)",
    },
    {
      charge: "Change for Post Disbursement Document (PDD)",
      detail: "0.20% of loan amount + GST",
    },
    {
      charge: "Disbursement Cheque Cancellation / Re-issuance",
      detail: "₹1,000 + GST plus applicable PEMI charges",
    },
    {
      charge: "CERSAI Registration",
      detail:
        "₹100 + GST (loans > ₹5 Lakhs) / ₹50 + GST (loans ≤ ₹5 Lakhs), as per CERSAI norms",
    },
  ];

  const schemes = [
    {
      title: "1. Aavas Home Loan",
      points: [
        "Suitable for both salaried and self-employed customers with at least 1 year of work experience.",
        "Repayment tenure of up to 30 years, depending on age and profile.",
        "Minimum loan amount starting at approximately ₹1 Lakh.",
      ],
    },
    {
      title: "2. Home Construction Loan",
      points: [
        "Designed for borrowers who wish to purchase a plot and construct a house on it.",
        "Flexible tenure up to 30 years for salaried borrowers (Government / Private / PSU) with net salary above a defined threshold.",
        "Indicative maximum of 25 years for other salaried profiles and 20 years for self-employed borrowers.",
      ],
    },
    {
      title: "3. Home Improvement Loan",
      points: [
        "For renovation, improvement or upgradation of an existing residential property.",
        "Long tenures – up to around 30 years for specified salaried categories.",
        "Tenure typically up to 25 years for other salaried customers and 20 years for self-employed borrowers.",
      ],
    },
    {
      title: "4. Home Loan Balance Transfer",
      points: [
        "Helps you transfer your existing home loan to Aavas Housing Finance.",
        "Possibility of a top-up facility along with balance transfer, subject to eligibility.",
        "Repayment tenure up to 30 years depending on age and scheme.",
      ],
    },
    {
      title: "5. Loan Against Property",
      points: [
        "Ideal to meet personal or medical expenses, education needs, marriage costs, etc.",
        "Repayment tenure up to 15 years.",
        "Higher loan amounts possible based on property value and income profile.",
        "Generally lower interest cost than unsecured credit options.",
      ],
    },
    {
      title: "6. Small Ticket Size (STS) Loan",
      points: [
        "For constructing, purchasing, renovating or extending a home, and for balance transfer of existing home loans.",
        "Maximum repayment tenure up to 12 years.",
        "Loan range broadly from ₹1 Lakh to ₹7.5 Lakhs (indicative).",
        "Self-occupied residential or commercial property can be mortgaged as security.",
      ],
    },
    {
      title: "7. Cash Salaried Plus Loan",
      points: [
        "For purchase / construction of a home and balance transfer of an existing home loan.",
        "Loan amount typically up to ₹15 Lakhs, subject to eligibility.",
        "Residential property is taken as collateral security.",
        "Property location and workplace are usually required to be within a fixed radius of the nearest Aavas branch.",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is the current interest rate of Aavas home loans?",
      a: "As per the shared rate grid, Aavas home loan rates currently start from around 8.50% p.a. and can go up to about 17.00% p.a. depending on the scheme type, income profile and risk assessment. Please check the latest rate card with Aavas before applying.",
    },
    {
      q: "How much home loan can I get from Aavas Housing Finance?",
      a: "Indicatively, Aavas offers home loans starting at a minimum of about ₹1 Lakh, and for select schemes the sanction can go up to several crores based on eligibility, property value and internal policy.",
    },
    {
      q: "What is the processing fee for an Aavas home loan?",
      a: "Aavas generally charges a processing fee of up to 1% of the loan amount plus applicable GST. There may also be a separate administration fee component as per the current schedule of charges.",
    },
    {
      q: "What is the loan approval process for Aavas Financiers?",
      a: "You need to fill out the application form, submit KYC, income and property documents, and pay the processing fee. After verification and credit appraisal, Aavas issues a sanction and disburses the loan as per the agreed terms.",
    },
    {
      q: "What is the minimum credit score preferred for Aavas home loans?",
      a: "Applicants with a strong credit history and a CIBIL score of around 750 or higher usually have a better chance of approval and attractive rates. However, sanction is always at Aavas Housing Finance’s discretion.",
    },
    {
      q: "Can I foreclose my Aavas housing loan before tenure ends?",
      a: "Yes, you can foreclose, but charges depend on whether your loan is on a fixed or floating interest rate. On floating-rate loans for individual borrowers, foreclosure is usually free, whereas fixed-rate loans may attract specified foreclosure charges.",
    },
    {
      q: "Is it possible to transfer an existing home loan to Aavas?",
      a: "Yes. Aavas offers a Home Loan Balance Transfer facility. Subject to documentation and eligibility, you can move your existing home loan to Aavas and may also be able to avail top-up funding.",
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
              Home Loans &nbsp;/&nbsp; NBFCs &nbsp;/&nbsp; Aavas Housing Finance
            </p>
            <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/Aavas_Housing_Finance.jpg"
                  alt="Aavas Housing Finance Logo"
                  className="h-full w-auto object-contain"
                />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Aavas Housing Finance Home Loan
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              Aavas Financiers Limited, commonly known as Aavas Housing Finance,
              focuses on providing easy home loans in under-served and
              semi-urban locations across India. Its presence covers multiple
              Tier II, Tier III and rural regions, giving first-time homebuyers
              access to formal housing finance.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              Aavas home loans are available at interest rates broadly in the{" "}
              <span className="font-semibold">8.50% – 17.00% p.a.</span> band,
              with a processing fee of up to{" "}
              <span className="font-semibold">1% + GST</span> on the loan
              amount. Depending on the product and eligibility, borrowers can
              get tenures of up to{" "}
              <span className="font-semibold">30 years</span>, along with
              multiple scheme variants like small ticket loans, home purchase
              loans, balance transfer and more.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full bg-white shadow-sm px-4 py-2 border border-slate-200">
              <span className="text-xs font-medium text-slate-600">
                Guided by AraMount Home Loan Advisors
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
                    Aavas Housing Finance
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500 mb-1">Loan Amount</p>
                  <p className="font-semibold">From ₹1 Lakh onwards</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Indicative Tenure</p>
                  <p className="font-semibold">Up to 30 years</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Interest Range*</p>
                  <p className="font-semibold">8.50% – 17.00% p.a.</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Processing Fee</p>
                  <p className="font-semibold">Up to 1% + GST</p>
                </div>
              </div>
              <button className="w-full mt-2 rounded-lg bg-basic-blue text-white text-sm font-semibold py-2.5 hover:bg-blue-700 transition">
                Get Free Assistance from AraMount
              </button>
              <p className="text-[10px] text-slate-500 leading-snug">
                *Interest rates, fees and product features are based on the
                latest available reference information and may change as per
                Aavas Housing Finance policy. Always confirm current details
                before applying.
              </p>
            </div>
          </div>
        </section>

        {/* EMI Calculator Section */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-1">
                Aavas Housing Finance EMI Calculator
              </h2>
              <p className="text-sm text-slate-600">
                Avoid confusion – get a quick EMI estimate on your Aavas home
                loan with this illustration supported by AraMount. Adjust the
                loan amount, interest rate and tenure to see an approximate EMI.
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
                  max={100000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹10 Crores</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">Interest Rate (% p.a.)</span>
                  <span>{interestRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min={8.5}
                  max={17}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-basic-blue"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>8.5%</span>
                  <span>17%</span>
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
                This EMI example is for guidance only and is based on standard
                amortisation. Actual EMI, interest and tenure will depend on the
                final sanction terms issued by Aavas Housing Finance.
              </p>
            </div>
          </div>
        </section>

        {/* Key Highlights & Interest Rates */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Key Highlights</h2>
            <p className="text-sm text-slate-600">
              Summary of the main parameters for Aavas Housing Finance home
              loans as referenced in the lender profile.
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
              Aavas Housing Finance Interest Rates in 2026
            </h2>
            <p className="text-sm text-slate-600">
              Aavas home loan interest rates start at about{" "}
              <span className="font-semibold">8.50% p.a.</span> and can go up to{" "}
              <span className="font-semibold">17.00% p.a.</span> depending on
              income profile, loan scheme, and risk evaluation.
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Loan Slab
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Interest Rate for Home Loan
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
              Rates were last referenced around 30 November 2025 on the public
              listing. Please check with Aavas for the most recent interest rate
              slabs.
            </p>
          </div>
        </section>

        {/* Eligibility Criteria & Charges */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 space-y-3">
            <h2 className="text-lg font-semibold">
              Aavas Housing Finance Eligibility Criteria
            </h2>
            <p className="text-sm text-slate-600">
              To qualify for an Aavas home loan, applicants must fulfil certain
              criteria related to age, nationality, and minimum annual income.
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-[11px] md:text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Eligibility Parameter
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Salaried Individuals
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Self-Employed Individuals
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
              Aavas Housing Finance Processing Fee & Charges
            </h2>
            <p className="text-sm text-slate-600">
              These are the typical fees and charges associated with an Aavas
              home loan application, as per the reference charge schedule.
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
              All fees and charges attract applicable taxes and may be revised
              at the sole discretion of Aavas Housing Finance.
            </p>
          </div>
        </section>

        {/* Schemes & Plans */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Aavas Housing Finance Schemes and Top Plans
          </h2>
          <p className="text-sm text-slate-600">
            Aavas offers several home loan schemes tailored for different needs,
            income segments and geographies. Below is a snapshot of the key
            plans.
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
            All loan schemes are offered only at the discretion of Aavas
            Financiers after considering the applicant’s earning and repayment
            capacity, as well as property profile.
          </p>
        </section>

        {/* How to Apply & AraMount Flow */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            How to Apply for Aavas Housing Finance via AraMount
          </h2>
          <p className="text-sm text-slate-600">
            The Aavas home loan application process is designed to be simple and
            documentation-light. AraMount further streamlines it for you:
          </p>
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
            <li>
              Visit the Aavas Housing Finance section on the AraMount platform
              and click on the apply / consultation option.
            </li>
            <li>
              Submit basic details such as your name, contact information,
              location, employment type, approximate loan requirement and
              property details.
            </li>
            <li>
              An AraMount home loan expert will evaluate your requirements and
              suggest the most suitable Aavas scheme.
            </li>
            <li>
              Share your KYC, income and property documents digitally or via the
              mode suggested by the AraMount and Aavas teams.
            </li>
            <li>
              After internal checks, Aavas issues a sanction and disburses the
              loan according to its underwriting policy and sanctioned terms.
            </li>
          </ol>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Disclaimer:</span> Interest rates,
              charges, eligibility norms and loan features mentioned above are
              based on publicly available information and may change without
              prior notice. For the latest home loan details, please refer to
              Aavas Housing Finance’s official communication or website.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Aavas Housing Finance Home Loan – FAQs
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

export default AavasHousingFinancePage;
