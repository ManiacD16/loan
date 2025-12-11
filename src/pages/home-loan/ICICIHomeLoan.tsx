import { useState } from "react";
import { Link } from "react-router-dom";

export default function IciciHomeLoan() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.35);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    if (!r) return Math.round(P / n);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - loanAmount;

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-900 via-orange-800 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-3/5">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://basichomeloan.com/admin/uploads/banner-section-logo/icici-bank-vector-logo_(1).png"
                  alt="ICICI Bank Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Home Loans with AraMount
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                ICICI Bank Home Loan
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/85">
                ICICI Bank is one of the leading private sector banks in India,
                offering a wide range of home loan solutions for salaried and
                self-employed borrowers. With competitive interest rates,
                flexible repayment options and digital processing, ICICI Bank
                home loans help you finance your dream home with ease.
              </p>
              <p className="mt-3 text-sm md:text-base text-white/80">
                Eligible customers can generally access ICICI Bank home loans
                at interest rates starting around <span className="font-semibold">8.30%–8.40% p.a.</span>,
                with loan tenures of up to <span className="font-semibold">30 years</span>, subject to the
                bank&apos;s policies and your credit profile.
              </p>
              <ul className="mt-5 grid md:grid-cols-2 gap-3 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Attractive interest rates with flexible tenure options up to 30 years
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Home loans linked with government schemes such as PMAY, for eligible borrowers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    Lower processing fee (typically around 0.50% of the loan amount, plus applicable taxes)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>
                    No prepayment charges on floating rate home loans for individual borrowers, as per policy
                  </span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {/* <a
                  href="https://www.basichomeloan.com/apply-now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-orange-900 font-semibold shadow-sm hover:bg-gray-100"
                >
                  Apply for ICICI Home Loan
                </a> */}
                <Link
                  to="/eligibility-check"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>

            <div className="md:w-2/5">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl backdrop-blur">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  Quick Snapshot – ICICI Bank Home Loan
                </h2>
                <p className="text-sm text-white/80 mb-4">
                  Key parameters based on public information. Actual terms may
                  vary as per bank policy.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Interest Rate (starting)</span>
                    <span className="font-semibold">8.30% p.a. onwards</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Loan Tenure</span>
                    <span className="font-semibold">Up to 30 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Processing Fee</span>
                    <span className="font-semibold">~0.50% of loan amount</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Loan Amount</span>
                    <span className="font-semibold">As per eligibility</span>
                  </div>
                </div>
                <p className="mt-4 text-[11px] text-white/70">
                  Disclaimer: The figures mentioned are indicative, based on
                  publicly available information and may change at the bank&apos;s
                  discretion. Please check the latest terms directly with ICICI
                  Bank before applying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            ICICI Bank Home Loan EMI Calculator
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Avoid confusion, get it right with AraMount. Adjust the sliders below
            to estimate your monthly EMI for an ICICI Bank home loan.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>₹ 1,00,000</span>
                  <span>₹ 10,00,00,000</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={100000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-2 text-sm font-medium text-gray-800">
                  {formatCurrency(loanAmount)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>8%</span>
                  <span>15%</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={15}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-2 text-sm font-medium text-gray-800">
                  {interestRate.toFixed(2)}% p.a.
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-2 text-sm font-medium text-gray-800">
                  {tenure} years
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Break-up of Total Payment
              </h3>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Your monthly EMI</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(emi)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount Payable</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(totalPayable)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Principal Amount</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(totalInterest)}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Note: This EMI calculation is for illustration purposes only.
                Actual EMI will depend on the final loan amount, tenure and
                interest rate offered by ICICI Bank, as well as applicable
                charges and taxes.
              </p>

              <div className="mt-6">
                <a
                  href="https://www.basichomeloan.com/apply-now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg bg-basic-blue text-white font-semibold hover:bg-blue-700"
                >
                  Apply for ICICI Bank Home Loan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Key Highlights – ICICI Bank Home Loan
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-600">
          The following key features are based on publicly available
          information about ICICI Bank home loans. Always confirm the latest
          figures with the bank before making a decision.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-[720px] w-full border border-gray-200 text-sm">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50 w-72">
                  Loan Amount
                </td>
                <td className="p-3">
                  Based on borrower&apos;s eligibility and property value, as per ICICI Bank policy.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">
                  Interest Rate (Starting)
                </td>
                <td className="p-3">
                  Around <span className="font-semibold">8.30% p.a. onwards</span> for eligible applicants, depending on loan slab and profile.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">RPLR</td>
                <td className="p-3">As per ICICI Bank&apos;s internal benchmark; not separately specified on partner pages.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">
                  Processing Fee
                </td>
                <td className="p-3">
                  Typically around <span className="font-semibold">0.50% of the loan amount</span> plus applicable taxes, subject to bank policy.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">
                  Maximum Tenure for Repayment
                </td>
                <td className="p-3">Up to <span className="font-semibold">30 years</span>, depending on borrower&apos;s age and income profile.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">
                  Penal Rate of Interest
                </td>
                <td className="p-3">
                  Delayed EMI payments generally attract additional interest/penal charges as per bank terms.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">
                  Rate Packages
                </td>
                <td className="p-3">
                  Floating, fixed or mixed rate options may be offered, depending on product variant and eligibility.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interest Rates Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            ICICI Bank Home Loan Interest Rates (Indicative)
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            ICICI Bank offers different interest rate slabs for salaried and
            self-employed borrowers, and for different loan amounts. Below is
            an indicative snapshot inspired by publicly available partner data.
            Please verify the latest grid with the bank.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[720px] w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">
                    Loan Slab
                  </th>
                  <th className="p-3 text-left font-semibold">
                    Salaried – Indicative Range (p.a.)
                  </th>
                  <th className="p-3 text-left font-semibold">
                    Self-Employed – Indicative Range (p.a.)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">
                    Up to ₹ 35 lakh
                  </td>
                  <td className="p-3">Approx. 9.25% – 9.65%</td>
                  <td className="p-3">Approx. 9.40% – 9.80%</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">
                    ₹ 35 lakh – ₹ 75 lakh
                  </td>
                  <td className="p-3">Approx. 9.50% – 9.80%</td>
                  <td className="p-3">Approx. 9.65% – 9.95%</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">
                    Above ₹ 75 lakh
                  </td>
                  <td className="p-3">Approx. 9.60% – 9.90%</td>
                  <td className="p-3">Approx. 9.75% – 10.05%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Interest rate ranges are indicative and based on partner
            aggregators as of late 2025. Actual ICICI Bank home loan interest
            rates will depend on product type, borrower profile, LTV, income,
            and prevailing policy.
          </p>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          ICICI Bank Home Loan Eligibility Criteria
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-600">
          Like most lenders, ICICI Bank evaluates home loan applications based
          on a mix of age, income, employment stability, property profile and
          credit history. Typical parameters (which may vary by product and
          region) include:
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-8 text-sm md:text-base">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Applicants should be Indian residents or NRIs, subject to product
              eligibility.
            </li>
            <li>
              Both salaried and self-employed individuals can apply, including
              professionals and business owners.
            </li>
            <li>
              Minimum age at the time of loan application is generally around{" "}
              <span className="font-semibold">18–21 years</span>, with maximum
              age at loan maturity usually up to{" "}
              <span className="font-semibold">60–65 years</span> for individuals.
            </li>
            <li>
              Minimum income requirements apply and may vary depending on the
              city, profile and ticket size.
            </li>
            <li>
              A stable employment or business track record, along with a
              satisfactory credit score and repayment history, is important.
            </li>
          </ul>

          <div className="overflow-x-auto">
            <table className="min-w-[420px] w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">
                    Parameter
                  </th>
                  <th className="p-3 text-left font-semibold">
                    Typical Range / Requirement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Age (Salaried)</td>
                  <td className="p-3">Approx. 18–65 years at loan maturity</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Age (Self-Employed)</td>
                  <td className="p-3">Approx. 18–65 years at loan maturity</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Nationality</td>
                  <td className="p-3">
                    Indian residents and NRIs, as per product terms
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Minimum Income</td>
                  <td className="p-3">
                    As per ICICI Bank policy; differs for salaried and self-employed applicants
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Maximum Loan-to-Value (LTV)</td>
                  <td className="p-3">
                    Up to around 75%–90% of property value, depending on ticket size and guidelines
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          The above criteria are a broad summary. ICICI Bank may apply
          additional checks and conditions while assessing individual home loan
          applications.
        </p>
      </section>

      {/* Fees & Charges Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            ICICI Bank Home Loan Processing Fee & Other Charges
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            In addition to the interest rate, borrowers should also be aware of
            various fees and charges that may apply over the life of the home
            loan. The table below summarizes some of the commonly mentioned
            charges based on publicly available information.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[720px] w-full border border-gray-200 text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50 w-72">
                    Charges for Loan Processing / Renewal
                  </td>
                  <td className="p-3">
                    Typically around <span className="font-semibold">0.50% of the loan amount</span>,
                    plus applicable taxes (subject to change).
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    Late Payment Charges – Home Loan
                  </td>
                  <td className="p-3">
                    Additional interest/charges (for example, around 2% per month
                    on overdue EMI) as per bank policy.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    Late Payment Charges – Home Overdraft
                  </td>
                  <td className="p-3">
                    May be levied as a percentage of the unpaid amount, subject
                    to a minimum and maximum cap, according to ICICI Bank terms.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    Repayment Mode Swap
                  </td>
                  <td className="p-3">
                    A fixed charge (e.g., around ₹ 500) may apply when changing
                    the repayment mode, as per schedule of charges.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    Cheque / EMI Bounce Charges
                  </td>
                  <td className="p-3">
                    A per-instance fee (often about ₹ 500) is typically levied
                    for every bounced EMI / cheque.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    CIBIL / Credit Report Charges
                  </td>
                  <td className="p-3">
                    A nominal fee (for example, around ₹ 50) may be charged for
                    pulling your credit report, where applicable.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    Administrative / Other Charges
                  </td>
                  <td className="p-3">
                    One-time administrative fees and incidental charges (legal,
                    valuation, repossession, etc.) are usually charged on an
                    actuals basis.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-gray-50">
                    Prepayment / Foreclosure Charges
                  </td>
                  <td className="p-3">
                    For individual borrowers on pure floating-rate home loans,
                    prepayment charges are often waived; however, charges may
                    apply in other cases (e.g., top-up loans or non-individual
                    borrowers). Always check the latest schedule of charges.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            The above charges are indicative and may be revised by ICICI Bank
            at any time. For accurate and updated details, please refer to the
            official ICICI Bank website or the most recent loan documentation.
          </p>
        </div>
      </section>

      {/* Why Choose ICICI + BASIC Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-basic-dark rounded-2xl text-white px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Why Choose ICICI Bank Home Loan via AraMount?
            </h2>
            <p className="text-sm md:text-base text-white/85">
              AraMount aims to simplify the home loan journey by helping
              you compare offers, understand eligibility and coordinate with
              lending partners like ICICI Bank. With guided assistance and
              digital processes, you can move from enquiry to sanction faster.
            </p>
            <ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>Personalised guidance on ICICI Bank home loan options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>Assistance with documentation and application tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>Support for PMAY-linked benefits wherever applicable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>Digital-first process to reduce branch visits and save time</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-2">
                Get a Free Consultation
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Share your details and a AraMount home loan expert can help you
                explore ICICI Bank home loan offers.
              </p>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg bg-white text-basic-dark font-semibold hover:bg-gray-100"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          ICICI Bank Home Loan – Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-600">
          You can explore more FAQs on the official ICICI Bank website and on
          AraMount Home Loan&apos;s knowledge pages. Typical queries cover topics
          like eligibility, documentation, part-prepayment, balance transfer
          and more.
        </p>
        <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm md:text-base">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold mb-1">
              How much home loan can I get from ICICI Bank?
            </h3>
            <p className="text-gray-700">
              The sanctioned amount depends on your income, credit score,
              obligations, property value and other risk parameters. Lenders
              may typically finance around 75%–90% of the property cost,
              subject to eligibility.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold mb-1">
              Does ICICI Bank charge prepayment fees?
            </h3>
            <p className="text-gray-700">
              For floating-rate home loans taken by individual borrowers, most
              lenders, including ICICI Bank, generally do not charge
              prepayment penalties. Charges may apply in other scenarios, so
              always confirm with the bank.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
