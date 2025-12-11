
import { useState } from "react"

const CalculatorsPage = () => {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const calculateEMI = () => {
    const principal = loanAmount
    const rate = interestRate / 12 / 100
    const time = tenure * 12

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    return Math.round(emi)
  }

  const emi = calculateEMI()
  const totalAmount = emi * tenure * 12
  const totalInterest = totalAmount - loanAmount

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-basic-dark mb-12">Home Loan Calculator</h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-basic-dark mb-2">Loan Amount (₹)</label>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-basic-gray mt-1">
                    <span>₹1L</span>
                    <span className="font-medium">₹{(loanAmount / 100000).toFixed(1)}L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-basic-dark mb-2">Interest Rate (% per annum)</label>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-basic-gray mt-1">
                    <span>6%</span>
                    <span className="font-medium">{interestRate}%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-basic-dark mb-2">Loan Tenure (Years)</label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-basic-gray mt-1">
                    <span>5 Years</span>
                    <span className="font-medium">{tenure} Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-basic-dark text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Loan Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly EMI</span>
                    <span className="font-bold text-basic-cyan">₹{emi.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Principal Amount</span>
                    <span>₹{loanAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Interest</span>
                    <span>₹{totalInterest.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between border-t border-gray-600 pt-4">
                    <span>Total Amount</span>
                    <span className="font-bold">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-basic-blue hover:bg-blue-600 text-white py-3 rounded mt-6 font-medium transition-colors">
                  Apply for Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorsPage
