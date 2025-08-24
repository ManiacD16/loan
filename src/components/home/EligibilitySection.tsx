"use client"

import type React from "react"
import { useState } from "react"

const EligibilitySection = () => {
  const [loanType, setLoanType] = useState("HOME LOAN")
  const [loanAmount, setLoanAmount] = useState("5,00,000")
  const [tenure, setTenure] = useState("30")
  const [gender, setGender] = useState("Male")
  const [dateOfBirth, setDateOfBirth] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Eligibility check submitted")
  }

  return (
    <section className="py-16 bg-basic-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative">
            <img
              src="/modern-family-home-exterior-with-beautiful-landsca.png"
              alt="Dream home"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Form */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Check your Eligibility through digitised credit policies of 100+ Banks
            </h2>
            <p className="text-gray-300 mb-2">Get started in Seconds</p>
            <p className="text-sm text-gray-400 mb-8">
              We take care of all the legwork so that you can focus on finding the right lender. Just by filling a
              simple form below, we can show you your eligibility with just a click of a button.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tell us about your requirements</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded text-sm ${
                      loanType === "HOME LOAN" ? "bg-basic-blue text-white" : "bg-gray-600 text-gray-300"
                    }`}
                    onClick={() => setLoanType("HOME LOAN")}
                  >
                    HOME LOAN
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded text-sm ${
                      loanType === "LOAN AGAINST PROPERTY" ? "bg-basic-blue text-white" : "bg-gray-600 text-gray-300"
                    }`}
                    onClick={() => setLoanType("LOAN AGAINST PROPERTY")}
                  >
                    LOAN AGAINST PROPERTY
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Loan Amount</label>
                <input
                  type="text"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-basic-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Loan Tenure Required</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm">{tenure} Years</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-basic-blue"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="dd-mm-yyyy"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-basic-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-basic-blue hover:bg-blue-600 text-white py-3 rounded font-medium transition-colors"
              >
                NEXT →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EligibilitySection
