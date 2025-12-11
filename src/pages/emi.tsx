import React, { useState, useEffect } from 'react';
import { Calculator, Home, DollarSign, Calendar, TrendingUp, FileText, CheckCircle } from 'lucide-react';

interface EMIResult {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
}

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('500000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('15');
  const [emiResult, setEMIResult] = useState<EMIResult>({
    monthlyEMI: 0,
    totalAmount: 0,
    totalInterest: 0
  });

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const N = parseFloat(loanTenure) * 12; // Total number of months

    if (P > 0 && R > 0 && N > 0) {
      const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalAmount = EMI * N;
      const totalInterest = totalAmount - P;

      setEMIResult({
        monthlyEMI: Math.round(EMI),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest)
      });
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

//   const formatNumber = (num: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0
//     }).format(num);
//   };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-tr
  from-slate-200 via-slate-200 to-slate-300
  from-0% via-50% to-50%
  text-white py-8">
       {/* <div className="bg-white py-16"> */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Calculate your monthly Home Loan EMI with our easy-to-use EMI calculator.
              </h1>
              <p className="text-xl text-cyan-400 leading-relaxed">
                EMIs are a long-term commitment but can be your greatest ally if planned properly. BASIC home loan EMI calculator is a simple tool that allows you to easily calculate your EMI by entering the loan amount, interest rate, and loan term.
              </p>
            </div>
            <div>
              <img 
                src="https://www.basichomeloan.com/assets/images/calculator/mob-emi-banner.jpg" 
                alt="Home Loan EMI Calculator"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        {/* </div> */}
      </div>

      </div>

      {/* Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">EMI Calculator</h2>
            </div>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Minimum ₹5,00,000"
                    min="500000"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Minimum loan amount is ₹5,00,000</p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8.5"
                    min="1"
                    max="30"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="15"
                    min="1"
                    max="30"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Minimum 1 year</p>
              </div>

              <button
                onClick={calculateEMI}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Break up of Total Payment */}
          <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Break up of Total Payment</h2>
              <div className="w-16 h-0.5 bg-white mx-auto"></div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-300 text-lg mb-2">Your monthly EMI is</p>
              <p className="text-4xl font-bold text-white">
                ₹{emiResult.monthlyEMI.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Circular Chart */}
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                {/* Outer Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="8"
                  />
                  {/* Principal Amount Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="8"
                    strokeDasharray={`${(parseFloat(loanAmount) / emiResult.totalAmount) * 264} 264`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <p className="text-gray-400 text-sm mb-1">Total Amount Payable</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{emiResult.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Principal Amount</span>
                </div>
                <p className="text-xl font-bold text-white">
                  ₹{parseFloat(loanAmount).toLocaleString('en-IN')}
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Total Interest</span>
                </div>
                <p className="text-xl font-bold text-white">
                  ₹{emiResult.totalInterest.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* What is EMI Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What is Home Loan EMI?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A home loan's Equated Monthly Installment (EMI) is a fixed payment made by borrowers to lenders every month as part of their repayment obligation for a housing loan. The EMI includes both the interest charges on the loan amount and the principal amount repayment. It depends on certain factors, such as the rate of interest on which the home loan is availed, the loan tenure, and the principal loan amount.
            </p>
          </div>

          {/* What is EMI Calculator Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What is a Home Loan EMI Calculator?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A home loan EMI calculator is a convenient online tool that helps individuals to estimate their monthly repayment obligations for a housing loan. The use of a home loan EMI calculator online empowers borrowers to make informed decisions for better financial planning while achieving home ownership. An individual can get instant EMI estimates by inputting details like loan amount, loan tenure, and interest rate in a home loan EMI calculator in India.
            </p>
          </div>

          {/* How is EMI Calculated Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How is EMI on Loan Calculated?</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Borrowers keen to know how to calculate home loan EMI can calculate it manually using a simple mathematical formula that is based on three main loan parameters; principal loan amount denoted by 'P', rate of interest denoted by 'R', and the loan tenure in terms of number of repayment installments denoted by 'N'. Here is the exact home loan EMI calculator formula:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <p className="text-xl font-mono text-gray-800">
                EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
              </p>
            </div>
          </div>

          {/* How to use Calculator Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How to use BASIC Home Loan EMI Calculator?</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              BASIC Home Loan offers the most accessible loan EMI calculator home loan calculator. Here is a detailed description of how to use the BASIC Home Loan EMI Calculator:
            </p>
            <ul className="space-y-3 text-lg text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                Visit the BASIC Home Loan EMI Calculator url
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                Enter the Loan Amount (minimum loan amount is Rs. 5 lakh)
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                Now, enter the Interest Rate
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                Fill in the preferred Loan Tenure (minimum 1 year)
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                Click on the 'Apply Now' option
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                Your Total Monthly EMI Amount Payable and the Total Amount Payable will then be displayed on the same page on the right-hand side panel
              </li>
            </ul>
          </div>

          {/* Amortization Schedule Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Home Loan Amortization Schedule</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The home loan amortization schedule is a detailed table that outlines the repayment schedule for a housing loan over the entire loan tenure. Through this table, the borrower can get detailed information on each installment payment with an exact breakdown of the principal amount, interest, and the outstanding loan amount after each home loan EMI.
            </p>
          </div>

          {/* Features and Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Features and Benefits of Home Loan EMI Calculator</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Home Loan EMI Calculator is a powerful financial tool that can simplify the process of calculating the Equated Monthly Installments (EMIs) for housing loans. Some of the main home loan EMI calculator features and benefits are listed below:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Accurate and Precise</h3>
                <p className="text-gray-600">
                  The use of an online home loan EMI calculator prevents the chances of human errors in calculating the EMI by providing accurate and precise calculations if the correct inputs are entered.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Convenient and Free</h3>
                <p className="text-gray-600">
                  The home loan EMI calculator is a convenient tool that can be assessed online anytime and anywhere. Moreover, it is completely free to use for multiple calculations.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Quick and Flexible</h3>
                <p className="text-gray-600">
                  Using an online EMI calculator tool for home loans means opting for quick results within a few clicks within seconds. These calculators offer the user the flexibility to input a variety of parameters.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Aids in Financial Planning</h3>
                <p className="text-gray-600">
                  The EMI calculator helps potential home loan borrowers make informed decisions about the most affordable home loan amount and better plan for other monetary obligations.
                </p>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-semibold text-red-800 mb-3">User-Friendly</h3>
                <p className="text-gray-600">
                  Home loan EMI calculators are user-friendly and just ask for three main details from the user to provide them with instant EMI estimates as many times as they want.
                </p>
              </div>
              
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <h3 className="text-xl font-semibold text-teal-800 mb-3">Compare Loan Offers</h3>
                <p className="text-gray-600">
                  You can use an EMI calculator to analyze multiple loan offers and determine which one is most affordable in terms of EMI and interest payable over the loan's entire term.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Our EMI Calculator?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Doorstep Documentation</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <Home className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Agent Support</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">100% Online Process</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Flexible Repayments</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <TrendingUp className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Disbursal within 15 Days</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;