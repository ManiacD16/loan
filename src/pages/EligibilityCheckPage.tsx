// src/pages/EligibilityCheckPage.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
// import Link from "@/lib/NextLinkShim";

type EmpType = "salaried" | "self";
type Gender = "male" | "female" | "other";
type Step = 1 | 2 | 3;

export default function EligibilityCheckPage() {
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [product, setProduct] = useState<"home" | "lap">("home");
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [dob, setDob] = useState<string>("");

  // Step 2
  const [empType, setEmpType] = useState<EmpType>("salaried");
  const [salaryMode, setSalaryMode] = useState<"bank" | "cheque" | "cash">("bank");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [coIncome, setCoIncome] = useState<string>("");
  const [existingEmi, setExistingEmi] = useState<string>("");

  // Step 3
  const [propertyIdentified, setPropertyIdentified] = useState<"yes" | "no">("no");
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("builder");
  const [usageType, setUsageType] = useState<string>("residential");
//   const [agreementType, setAgreementType] = useState<string>("registry");

  // Contact / consent
  const [mobile, setMobile] = useState<string>("");
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [pan, setPan] = useState<string>("");
//   const [pin, setPin] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [company, setCompany] = useState<string>("");
  const [agreeTnc, setAgreeTnc] = useState<boolean>(false);
  const [includeCredit, setIncludeCredit] = useState<boolean>(false);

  const goNext = () => setStep((s) => Math.min(3, s + 1) as Step);
  const goPrev = () => setStep((s) => Math.max(1, s - 1) as Step);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTnc) {
      alert("Please agree to Terms & Conditions before submitting.");
      return;
    }
    alert("Submitted! (Wire this to your backend to fetch eligible lenders.)");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header/Navigation */}
      {/* <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                BASIC
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/eligibility-check" className="text-blue-600 px-3 py-2 text-sm font-medium">
                  Eligibility Check
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Check your Eligibility through digitised credit policies of{" "}
              <span className="text-blue-600">90+ Banks</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in Seconds
            </p>
            <p className="mt-4 text-lg text-gray-500 max-w-4xl mx-auto">
              We take care of all the legwork so that you can focus on finding the right lender. 
              Just by filling in simple form fields, we can show you your eligibility with just a click of a button.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Tell us about your requirements
              </h2>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Step indicator */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      1
                    </div>
                    <div className={`hidden sm:block h-0.5 w-12 ${step > 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      2
                    </div>
                    <div className={`hidden sm:block h-0.5 w-12 ${step > 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    3
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    {/* Product Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choose Product Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setProduct("home")}
                          className={`p-4 rounded-lg border-2 font-medium transition-colors ${
                            product === "home"
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          Home Loan
                        </button>
                        <button
                          type="button"
                          onClick={() => setProduct("lap")}
                          className={`p-4 rounded-lg border-2 font-medium transition-colors ${
                            product === "lap"
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          Loan Against Property
                        </button>
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="loanAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                          Loan Amount (₹)
                        </label>
                        <input
                          id="loanAmount"
                          type="text"
                          placeholder="e.g., 35,00,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="tenure" className="block text-sm font-semibold text-gray-700 mb-2">
                          Loan Tenure (Years)
                        </label>
                        <input
                          id="tenure"
                          type="text"
                          placeholder="e.g., 20"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={tenure}
                          onChange={(e) => setTenure(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Gender
                        </label>
                        <div className="space-y-2">
                          {(["male", "female", "other"] as Gender[]).map((g) => (
                            <label key={g} className="flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                checked={gender === g}
                                onChange={() => setGender(g)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700 capitalize">{g}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          id="dob"
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        disabled
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    {/* Employment Type */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Employment Type
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="emp"
                              checked={empType === "salaried"}
                              onChange={() => setEmpType("salaried")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Salaried</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="emp"
                              checked={empType === "self"}
                              onChange={() => setEmpType("self")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Self Employed</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Salary Credit Mode
                        </label>
                        <div className="space-y-2">
                          {(["bank", "cheque", "cash"] as const).map((m) => (
                            <label key={m} className="flex items-center">
                              <input
                                type="radio"
                                name="salaryMode"
                                checked={salaryMode === m}
                                onChange={() => setSalaryMode(m)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700 capitalize">{m}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Income Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Annual Income (₹)
                        </label>
                        <input
                          type="text"
                          placeholder="Minimum ₹12,00,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(e.target.value)}
                        />
                        <p className="mt-1 text-xs text-gray-500">Minimum Rs. 12 lakh income</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Co-Applicant Income (₹)
                        </label>
                        <input
                          type="text"
                          placeholder="If any"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={coIncome}
                          onChange={(e) => setCoIncome(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Existing EMI (₹)
                        </label>
                        <input
                          type="text"
                          placeholder="If any"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={existingEmi}
                          onChange={(e) => setExistingEmi(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={goPrev}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    {/* Property Identification */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Is Property Identified?
                      </label>
                      <div className="flex space-x-4">
                        {(["yes", "no"] as const).map((v) => (
                          <label key={v} className="flex items-center">
                            <input
                              type="radio"
                              name="propid"
                              checked={propertyIdentified === v}
                              onChange={() => setPropertyIdentified(v)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">{v}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {propertyIdentified === "yes" && (
                      <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Property Value (₹)
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={propertyValue}
                              onChange={(e) => setPropertyValue(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Property Type
                            </label>
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={propertyType}
                              onChange={(e) => setPropertyType(e.target.value)}
                            >
                              <option value="builder">Builder</option>
                              <option value="resale">Resale</option>
                              <option value="allotment">Builder Allotment</option>
                              <option value="clp">Construction Linked Program</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Usage Type
                            </label>
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={usageType}
                              onChange={(e) => setUsageType(e.target.value)}
                            >
                              <option value="residential">Residential</option>
                              <option value="commercial">Commercial</option>
                              <option value="land">Land/Plot</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={agreeTnc}
                          onChange={(e) => setAgreeTnc(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          I agree to the{" "}
                          <Link to="/terms" className="text-blue-600 hover:underline" >
                            Terms & Conditions
                          </Link>
                        </span>
                      </label>
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={includeCredit}
                          onChange={(e) => setIncludeCredit(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Include credit score for more accurate results (optional)
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={goPrev}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Image/Benefits Section */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <img
                src="https://www.basichomeloan.com/assets/images/home/form-tab.jpg"
                alt="Home loan eligibility illustration"
                className="w-full rounded-lg shadow-lg mb-6"
                loading="lazy"
              />
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Doorstep Documentation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Agent Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">100% Online Process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Flexible Repayments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Disbursal within 15 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Sections */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Home Loan Eligibility?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Home loan eligibility refers to the set of criteria that financial institutions use to assess an individual's suitability for obtaining a housing loan. It involves the evaluation of various factors, including income, credit score, age, employment status, loan amount, and any other financial obligations. Prospective borrowers must understand and fulfill these criteria to secure financing for their home purchase.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Home Loan Eligibility Calculator</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A home loan eligibility calculator is a valuable tool for individuals aspiring to secure a home loan. Just like a home loan EMI eligibility calculator gives you an estimate of monthly installments required to be paid to repay the home loan amount, the online home loan eligibility calculator allows you to determine whether or not you qualify for a home loan. With a click, this home loan online eligibility calculator provides an instant estimate of the maximum loan amount one is eligible for, thereby helping the borrower make better financial decisions.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How is Eligibility on Home Loan Calculated?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Individuals keen to apply for a housing loan can easily check home loan eligibility using the home loan eligibility calculator. This online tool asks for simple loan-related information to help you make informed decisions for a housing loan. Listed below are the steps to use the home loan eligibility calculator:
              </p>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Visit the BASIC Home Loan Eligibility Check</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Choose 'Home Loan'</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Enter the desired loan amount, loan tenure, gender, and date of birth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">4</span>
                    <span>Click on 'Next'</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">5</span>
                    <span>Choose 'Salaried' if you are salaried, or 'Self-Employed' if you are self-employed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">6</span>
                    <span>Select the salary credit mode bank, cheque, or cash and enter the annual income (minimum Rs. 12 lakh income)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">7</span>
                    <span>Enter the co-applicant's income, if any</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">8</span>
                    <span>Fill in details about any existing EMI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">9</span>
                    <span>Click on 'Next'</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">10</span>
                    <span>Click 'Yes', if the property is identified and fill in the property details/ Click 'No' if it is not identified</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">11</span>
                    <span>Enter your mobile number</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">12</span>
                    <span>Click 'Submit' and you will see the list of banks and NBFCs offering home loans as per your filled requirement</span>
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Home Loan Eligibility Criteria</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The home loan eligibility criteria play a pivotal role in the process of securing financial assistance for purchasing a dream home. The key considerations include the employment status, a stable and regular source of income; no matter whether the applicant is self-employed or salaried, the applicant's age, credit score, ongoing debt or any other loan, property type and its location, and citizenship.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors that Determine Home Loan Eligibility</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Home loan eligibility is calculated using a combination of factors. Listed below are the prime factors affecting eligibility for home loans in banks and NBFCs:
              </p>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Applicant's Age</h3>
                      <p className="text-gray-700">Banks and NBFCs have an age bracket that is applied when approving home loans to applicants. Generally, younger individuals having longer working years to repay the loan are preferred for home loans.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Income</h3>
                      <p className="text-gray-700">The second crucial factor that determines the eligibility for a home loan is the income of the applicant. Through this, these lenders ensure whether or not the applicant is capable of repaying the loan with a steady source of income.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Interest Rate</h3>
                      <p className="text-gray-700">The interest rate is crucial to determining housing loan eligibility. Home loans with higher rates of interest generally come with less eligible loan amounts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Loan Tenure</h3>
                      <p className="text-gray-700">The chosen loan tenure or duration has a direct impact on the eligibility for a home loan. Home loan eligibility tends to improve significantly for longer loan tenures and vice versa.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">CIBIL or Credit Score</h3>
                      <p className="text-gray-700">The applicant's credit score or CIBIL score is another factor that plays a vital role in determining home loan eligibility.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Home Loan Eligibility?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Individuals can improve their home loan eligibility and secure finances for their dream homes by following these strategies:
              </p>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Maintaining a good credit or CIBIL score by paying bills on time and reducing the outstanding debt</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Saving for a larger down payment to reduce the loan amount</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Adding a co-applicant or guarantor with a strong financial profile</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Opting for a more structured repayment plan</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Maintaining a stable financial profile with a consistent income</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Clearing existing loan and legal issues associated with a property or their financial records</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="bg-white rounded-lg border border-gray-200 p-6 group">
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>What is PEM?</span>
                    <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    The Product Eligibility Matrix (PEM) is BASIC's automated engine that checks eligibility for
                    home loans and LAP based on partner-bank policies and your profile.
                  </p>
                </details>

                <details className="bg-white rounded-lg border border-gray-200 p-6 group">
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>How is it different from typical calculators?</span>
                    <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    PEM considers more factors (e.g., FOIR, LTV, credit score) than many simple calculators, so
                    results align better with what lenders use.
                  </p>
                </details>

                <details className="bg-white rounded-lg border border-gray-200 p-6 group">
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>Does it use my credit score?</span>
                    <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    Yes—if you consent to include it. Incorporating your score generally improves accuracy.
                  </p>
                </details>

                <details className="bg-white rounded-lg border border-gray-200 p-6 group">
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>How many lenders are checked?</span>
                    <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    The tool compares your profile with many partner banks and NBFCs to show suitable options.
                  </p>
                </details>

                <details className="bg-white rounded-lg border border-gray-200 p-6 group">
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>What appears in the results?</span>
                    <svg className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    Expect a report with indicative max loan amount, tenure, interest rate, and processing fees by
                    lender.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}