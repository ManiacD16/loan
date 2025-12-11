
import { useMemo, useState } from "react"

function formatINR(value: number) {
  if (!Number.isFinite(value)) return "—"
  return value.toLocaleString("en-IN", { maximumFractionDigits: 0 })
}

export default function EmiCalculator() {
  const [amount, setAmount] = useState<number>(5000000) // 50,00,000
  const [rate, setRate] = useState<number>(8.5)
  const [tenureYears, setTenureYears] = useState<number>(20)

  const { emi, totalInterest, totalPayment, months } = useMemo(() => {
    const months = Math.max(1, Math.round(tenureYears * 12))
    const r = rate / (12 * 100)
    const p = amount
    const pow = Math.pow(1 + r, months)
    const emi = r === 0 ? p / months : (p * r * pow) / (pow - 1)
    const totalPayment = emi * months
    const totalInterest = totalPayment - p
    return { emi, totalInterest, totalPayment, months }
  }, [amount, rate, tenureYears])

  return (
    <div className="rounded-md border border-neutral-200 bg-white">
      <div className="p-4 md:p-6 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">EMI Calculator</h1>
        <p className="mt-1 text-sm text-neutral-600">Estimate your monthly EMI, total interest, and total payment.</p>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-semibold text-neutral-800">Loan Amount</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={100000}
                max={100000000}
                step={50000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                className="w-40 rounded border border-neutral-300 px-3 py-2 text-sm"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
              />
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              ₹ {formatINR(100000)} - ₹ {formatINR(100000000)}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-neutral-800">Interest Rate (% p.a.)</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={15}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                className="w-28 rounded border border-neutral-300 px-3 py-2 text-sm"
                value={rate}
                step={0.05}
                onChange={(e) => setRate(Number(e.target.value || 0))}
              />
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-semibold text-neutral-800">Loan Tenure (Years)</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                className="w-24 rounded border border-neutral-300 px-3 py-2 text-sm"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value || 0))}
              />
            </div>
            <div className="mt-1 text-xs text-neutral-500">{months} months</div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h3 className="text-sm font-semibold text-neutral-800">Summary</h3>
            <dl className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600">Monthly EMI</dt>
                <dd className="text-base font-extrabold text-neutral-900">₹ {formatINR(emi)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600">Total Interest</dt>
                <dd className="text-base font-semibold text-blue-600">₹ {formatINR(totalInterest)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600">Total Payment</dt>
                <dd className="text-base font-semibold text-neutral-900">₹ {formatINR(totalPayment)}</dd>
              </div>
            </dl>
            <button className="mt-4 w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              GET QUOTES
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
