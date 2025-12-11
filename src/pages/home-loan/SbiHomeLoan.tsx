import { useState } from "react";
import { Link } from "react-router-dom";

export default function SbiHomeLoan() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(9.15);
  const [tenure, setTenure] = useState(20);

  // EMI Calculation
  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                SBI Bank Home Loan
              </h1>
              <p className="text-lg md:text-xl leading-relaxed">
                SBI is one of India's most trusted public sector banks with a long-standing history. The competitive interest rates starting at 8% per annum, diverse home loan products, flexible repayment options, 30 years of repayment tenure, and responsive customer service make SBI home loans popular among borrowers.
              </p>
              <p className="mt-4 text-lg">
                Over 30 lakh families have achieved their dream of owning a home through SBI housing loans that come with a processing fee of Rs. 10,000 to 0.25%. SBI offers exclusive concessions on interest rates for females, defence personnel, and tribal people through its various home loan schemes that are all available on a floating rate basis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EMI Calculator Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            SBI Bank Home Loan EMI Calculator
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Avoid confusion get it right with BASIC
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>₹1L</span>
                  <span className="font-semibold text-blue-600">
                    ₹{(loanAmount / 100000).toFixed(1)}L
                  </span>
                  <span>₹1Cr</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="range"
                  min="8"
                  max="15"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>8%</span>
                  <span className="font-semibold text-blue-600">
                    {interestRate.toFixed(2)}%
                  </span>
                  <span>15%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>1 Yr</span>
                  <span className="font-semibold text-blue-600">
                    {tenure} Years
                  </span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Break up of Total Payment
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{emi.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600">Principal Amount</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    ₹{totalInterest.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-2xl font-semibold text-green-600">
                    ₹{totalPayment.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SBI Bank Home Loan Key Highlights
          </h2>
          <p className="text-gray-600 mb-6">
            Get the lowest interest rates with SBI Bank
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Loan Amount
                  </td>
                  <td className="py-4 px-4">Up to 90% of the cost of property</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Rate of Interest
                  </td>
                  <td className="py-4 px-4">8% p.a. onwards</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    RPLR
                  </td>
                  <td className="py-4 px-4">14.85%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Processing Fee
                  </td>
                  <td className="py-4 px-4">0.35%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Maximum Tenure for Repayment
                  </td>
                  <td className="py-4 px-4">30 years</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Penal Rate of Interest
                  </td>
                  <td className="py-4 px-4">
                    2% per annum for loans above Rs. 25,000
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Rate Packages
                  </td>
                  <td className="py-4 px-4">Floating</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Charges for Prepayment/Foreclosure
                  </td>
                  <td className="py-4 px-4">Nil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interest Rates */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SBI Home Loan Interest Rates in 2025
          </h2>
          <p className="text-gray-600 mb-6">
            SBI home loan interest rate starts from 8% onwards and largely depends on the credit score and the type of plan chosen by the applicant. The table below lists the SBI home loan interest rate 2025 for all the popular plans based on the CIBIL score:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 text-left">Loan Slab</th>
                  <th className="py-3 px-4 text-left">
                    Interest Rate for Home Loan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">SBI Regular Home Loan</td>
                  <td className="py-3 px-4">9.15% - 9.75%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">SBI Tribal Plus Home Loan</td>
                  <td className="py-3 px-4">9.25% - 9.75%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">SBI Top-Up Home Loan</td>
                  <td className="py-3 px-4">9.55% - 10.45%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">SBI Realty Home Loan</td>
                  <td className="py-3 px-4">9.45% - 10.05%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">SBI CRE Home Loan</td>
                  <td className="py-3 px-4">9.35% - 10.15%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">SBI P-LAP Home Loan</td>
                  <td className="py-3 px-4">10.90% - 11.30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Interest rates were last updated on 22nd May 2025
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SBI Bank Home Loan Eligibility Criteria
          </h2>
          <p className="text-gray-600 mb-6">
            SBI bank offers multiple types of home loan facilities to resident Indians and NRIs based on their age, nationality, credit score, and income source. You can check the same using the SBI home loan eligibility calculator on BASIC home loan.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 text-left">Eligibility Parameters</th>
                  <th className="py-3 px-4 text-left">For Salaried Individuals</th>
                  <th className="py-3 px-4 text-left">
                    For Self-Employed Individuals
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">Age Range (in years)</td>
                  <td className="py-3 px-4">18 - 75 years</td>
                  <td className="py-3 px-4">18 - 75 years</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">Nationality</td>
                  <td className="py-3 px-4">Indian Resident/ NRIs/ PIOs</td>
                  <td className="py-3 px-4">Indian Resident/ NRIs/ PIOs</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">Minimum Income Earned</td>
                  <td className="py-3 px-4">Rs. 25,000 per month</td>
                  <td className="py-3 px-4">Rs. 25,000 per month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Processing Fee and Charges */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SBI Home Loan Processing Fee and Charges
          </h2>
          <p className="text-gray-600 mb-6">
            SBI bank charges a fee to process the customer's home loan application, termed the processing fee. Besides the SBI home loan processing fee, there are other charges subject to charge by the bank for different home loan products.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Processing Fee
                  </td>
                  <td className="py-4 px-4">INR 10,000 to 0.35%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    ECS Dishonour Charges
                  </td>
                  <td className="py-4 px-4">Rs. 250</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Late EMI Payment Charges
                  </td>
                  <td className="py-4 px-4">
                    2% per annum for loans above Rs. 25,000
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Statutory Charges
                  </td>
                  <td className="py-4 px-4">As per state-applicable laws</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                    Cheque Bounce Charges
                  </td>
                  <td className="py-4 px-4">Rs. 250 for every bounced payment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Home Loan Schemes */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SBI Home Loan Schemes and Top Plans
          </h2>
          <p className="text-gray-600 mb-8">
            SBI bank offers a variety of home loan plans to choose from. Evaluate the considering factors like interest rates, processing fees, tenure, and other hidden charges before choosing an SBI bank home loan plan. Here is the list of the top SBI home loan schemes and plans that are popular among SBI customers:
          </p>

          <div className="space-y-6">
            {/* Scheme 1 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                1. SBI Regular Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Repayment tenure extendable up to 30 years</li>
                <li>Interest rate 0.05% lower for women applicants</li>
                <li>No charges on pre-payments</li>
                <li>Interest rates are 9.15% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 2 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                2. SBI NRI Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Offered exclusively to Non-Resident Indians to purchase a home in India</li>
                <li>Special discount for women applicants</li>
                <li>Comes with no extra fee or interest rates if compared with a regular SBI home loan</li>
                <li>Interest rates are 9.15% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 3 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                3. SBI Realty Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Aims to promote the purchase of a plot that can be later on developed into a home</li>
                <li>Flexible option to take a separate SBI bank home loan for the real construction</li>
                <li>Borrowing limit of up to Rs. 15 crore for 10 years repayment tenure period</li>
                <li>Interest rates are 9.45% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 4 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                4. SBI Pre-Approved Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Enables home buyers to negotiate with the builder confidently</li>
                <li>Comes with no hidden charges</li>
                <li>Interest rates are 10.90% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 5 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                5. SBI Privilege Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Exclusively offered for government employees</li>
                <li>Special concessions for women borrowers</li>
                <li>Repayment tenure up to 30 years</li>
                <li>Interest rates are 9.15% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 6 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                6. SBI Shaurya Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Exclusively for defence personnel belonging to the army, navy, and air force</li>
                <li>No prepayment penalties</li>
                <li>Repayment tenure up to the age of 75 years</li>
                <li>Interest rates are 9.15% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 7 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                7. SBI Flexipay Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Helps borrowers with their initial years of low repayment burden</li>
                <li>Easy eligibility criteria for the young professionals</li>
                <li>Flexible option to set up EMIs in the coming years</li>
                <li>Interest rates are 8.85% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 8 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                8. SBI Tribal Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Offered Especially to people residing in tribal or hilly areas</li>
                <li>Maximum tenure for repayment is 15 years</li>
                <li>No need for a land mortgage, as a third-party guarantor, is permitted</li>
                <li>Interest rates are 9.25% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 9 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                9. SBI Home Loans for Non-Salaried-Differential Offerings
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Loans offered between Rs. 50,000 – Rs. 50 crore</li>
                <li>Offered to partners, directors of companies, and proprietors</li>
                <li>Designed for individuals who do not earn a fixed monthly salary but have an income</li>
                <li>Interest rates are 8.85% per annum onwards</li>
              </ul>
            </div>

            {/* Scheme 10 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                10. SBI Top-Up Home Loans
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Offered to those who already have an existing SBI home loan and want additional funds</li>
                <li>No pre-payment penalty</li>
                <li>Repayment tenure up to 30 years</li>
                <li>Interest rates are 9.55% per annum onwards</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> All of the above home loan plans are made available to applicants solely at the discretion of SBI Bank, taking into consideration the earning and repayment capacity of the applicant.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Home Loan Starting at 8.5%*
          </h2>
          <p className="text-lg mb-6">
            Get a Free Consultation from BASIC Home Loan
          </p>
          <Link
            to="/apply"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </Link>
        </div>

        {/* Documents Required */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Documents Required for SBI Home Loan
          </h2>
          <p className="text-gray-600 mb-8">
            It is mandatory for a home loan applicant to submit a set of specific documents to apply for an SBI home loan. Here is a list of all the required SBI home loan documents that an applicant needs to submit while applying for a home loan from SBI:
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Salaried */}
            <div className="border rounded-lg p-6 bg-blue-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Documents Required for Salaried Applicants
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Salary slip/ certificate for last 3 months</li>
                <li>Copy of Form 16 acknowledged by the IT Department</li>
                <li>Duly filled application form with passport-size photographs</li>
                <li>A cheque for the processing fee payable in the name of SBI Home Loan</li>
              </ul>
            </div>

            {/* Self-Employed */}
            <div className="border rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Documents Required for Self-Employed Applicants
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>ITR for the last 3 years</li>
                <li>TDS Certificate/ Form 16</li>
                <li>Profit and loss balance sheet for last 3 years</li>
                <li>Duly filled application form with passport-size photographs</li>
                <li>A cheque for the processing fee payable in the name of SBI Home Loan</li>
                <li>Proof of Business Address</li>
                <li>Business License Details</li>
                <li>Qualification Certificate for Doctors, C.A. and other professionals</li>
              </ul>
            </div>
          </div>

          {/* Common Documents */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Common Documents Required from Both Salaried and Self-Employed Applicants
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left font-semibold">Type of Document</th>
                    <th className="py-3 px-4 text-left font-semibold">Documents Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      Identity & Address Proof
                    </td>
                    <td className="py-3 px-4">
                      Voter ID, Driving License, Aadhaar Card, Copy of Passport
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      Documents Related to Property
                    </td>
                    <td className="py-3 px-4">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Sale Deed</li>
                        <li>Agreement of Sale</li>
                        <li>Allotment Letter</li>
                        <li>NOC from Builder</li>
                        <li>Approved Building Plan</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Find SBI Offices */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find SBI Home Loan Offices Near You
          </h2>
          <p className="text-gray-700 mb-6">
            SBI has a vast network of over 16,000+ home loan branches across the country. You can easily search online for an SBI home loan branch near me or fill in the Free Consultation Form, and the BASIC Home Loan team will assist you in applying for an SBI bank home loan.
          </p>
          <p className="text-sm text-gray-600 italic">
            Interest rates and fees on home loans vary based on eligibility and lender criteria. All applicable fees and charges are subject to relevant taxes and can change at the lender's discretion. For the most current information on home loan interest rates, processing fees, other applicable charges, and updates on eligibility criteria and loan offers, please visit the official website of the bank.
          </p>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the current SBI home loan interest rate?
              </h3>
              <p className="text-gray-700">
                The current SBI home loan interest rate is 8.75% - 9.75% per annum, which varies for different types of SBI home loan plans.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the maximum loan amount offered by SBI?
              </h3>
              <p className="text-gray-700">
                SBI bank offers up to Rs. 15 crores as the maximum loan amount limit for a customer, and this comes with a repayment tenure of 10 years.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                How can I reduce my SBI home loan interest rate?
              </h3>
              <p className="text-gray-700 mb-2">
                Try the following tips to reduce your SBI home loan interest rate:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Opt for a shorter tenure</li>
                <li>Pay maximum as a down payment</li>
                <li>Prepaying is a good way to reduce the rate</li>
                <li>Try to increase your EMI</li>
                <li>Compare interest rates</li>
              </ul>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What percentage of property value can I get as a home loan from SBI?
              </h3>
              <p className="text-gray-700">
                A borrower can get up to 90% of the property value as a home loan from SBI. However, this depends on the salary or income of the borrower, along with the repaying capacity.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Does SBI offer fixed or floating interest rates?
              </h3>
              <p className="text-gray-700">
                SBI bank offers home loans with floating interest rate packages. At present, these start at 8.75% per annum.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What are the best SBI home loan schemes based on interest rates?
              </h3>
              <p className="text-gray-700 mb-2">
                The best SBI home loan schemes based on the interest rate are:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>SBI Pre-Approved Home Loans</li>
                <li>SBI Realty Home Loans</li>
                <li>SBI Top-Up Home Loans</li>
                <li>SBI Flexipay Home Loans</li>
                <li>SBI Tribal Plus Home Loans</li>
              </ul>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the maximum repayment tenure for an SBI home loan?
              </h3>
              <p className="text-gray-700">
                The maximum repayment tenure for an SBI home loan is up to 30 years; however, this may reduce for some specific home loan plans.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the minimum salary requirement to apply for an SBI home loan?
              </h3>
              <p className="text-gray-700">
                The minimum salary requirement to apply for an SBI home loan is Rs. 1,80,000 per annum or Rs. 25,000 per month.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the minimum CIBIL score for an SBI home loan?
              </h3>
              <p className="text-gray-700">
                The minimum CIBIL score for an SBI home loan is 650.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the minimum work experience required for salaried individuals?
              </h3>
              <p className="text-gray-700">
                For salaried individuals applying for an SBI home loan, the minimum work experience required is 2 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}