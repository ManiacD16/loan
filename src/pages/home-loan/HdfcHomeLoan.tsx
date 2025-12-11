import React from "react";
import { Link } from "react-router-dom";

// NOTE: This page contains ORIGINAL placeholder copy.
// If you want, I can paraphrase/summarize the source page into these sections.

export default function HdfcHomeLoan() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <h1 className="text-2xl md:text-4xl font-bold">
            HDFC Bank Home Loan
          </h1>
          <p className="mt-3 max-w-3xl text-white/80">
            Explore HDFC Bank’s home loan offerings — interest rates, eligibility,
            documents, fees & charges, and more.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/eligibility-check"
              className="bg-basic-blue hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Check Eligibility
            </Link>
            <Link
              to="/emi"
              className="bg-white text-basic-dark hover:bg-gray-100 px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Calculate EMI
            </Link>
          </div>
        </div>
      </section>

      {/* Rate Highlights */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-semibold">Interest Rates & Key Highlights</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[720px] w-full border border-gray-200 text-sm">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50 w-72">Starting Interest Rate*</td>
                <td className="p-3">e.g., 8.50% p.a. (placeholder)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Loan Amount</td>
                <td className="p-3">As per policy & eligibility</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-gray-50">Tenure</td>
                <td className="p-3">Up to 30 years (typical)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-gray-50">Processing Fees</td>
                <td className="p-3">As per HDFC Bank’s schedule</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          *Exact rates depend on applicant profile, loan type, and lender policy.
        </p>
      </section>

      {/* Features & Benefits */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-semibold">Features & Benefits</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-sm md:text-base">
          <li>Competitive interest rates and flexible tenures.</li>
          <li>Balance transfer options to reduce EMI burden.</li>
          <li>Top-up facilities subject to eligibility.</li>
          <li>Doorstep/assisted documentation support.</li>
        </ul>
      </section>

      {/* Eligibility */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-semibold">Eligibility Criteria</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-sm md:text-base">
          <li>Age, income, employment type, and credit profile considered.</li>
          <li>Minimum work experience/continuity as per bank policy.</li>
          <li>Loan-to-Value (LTV) as per RBI/bank norms.</li>
        </ul>
      </section>

      {/* Documents */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-semibold">Documents Required</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-3 text-sm md:text-base">
          <div>
            <h3 className="font-semibold">KYC</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Identity & Address proof</li>
              <li>Photographs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Income Proof</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Salaried: Salary slips, Form 16/ITR, bank statements</li>
              <li>Self-employed: ITRs, P&L/Balance Sheet, bank statements</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold">Property Documents</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Title deeds, agreement to sell, approvals, etc.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fees & Charges */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-semibold">Fees & Charges</h2>
        <p className="mt-2 text-sm md:text-base">
          Processing fees, legal/technical charges, and prepayment/foreclosure
          terms apply as per HDFC Bank’s latest schedule.
        </p>
      </section>

      {/* How to Apply */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-semibold">How to Apply</h2>
        <ol className="mt-3 list-decimal pl-6 space-y-2 text-sm md:text-base">
          <li>Check eligibility & estimate EMI.</li>
          <li>Collect documents and submit application.</li>
          <li>Verification, sanction, and property evaluation.</li>
          <li>Sign agreement and disbursement.</li>
        </ol>
        <div className="mt-4">
          <Link
            to="/apply"
            className="inline-block bg-basic-blue hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* FAQs (accordion-lite) */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-semibold">FAQs</h2>
        <details className="mt-4 border rounded-lg p-4">
          <summary className="font-medium cursor-pointer">What is the starting interest rate?</summary>
          <p className="mt-2 text-sm text-gray-700">
            It varies by profile and policy. Contact us to get a personalized quote.
          </p>
        </details>
        <details className="mt-3 border rounded-lg p-4">
          <summary className="font-medium cursor-pointer">What is the maximum tenure?</summary>
          <p className="mt-2 text-sm text-gray-700">Up to 30 years (subject to eligibility).</p>
        </details>
        <details className="mt-3 border rounded-lg p-4">
          <summary className="font-medium cursor-pointer">Can I transfer an existing loan to HDFC?</summary>
          <p className="mt-2 text-sm text-gray-700">
            Balance transfer is typically available. We can help evaluate savings.
          </p>
        </details>
      </section>

      {/* Source link for transparency */}
      <section className="container mx-auto px-4 pb-12">
        <p className="text-xs text-gray-500">
          For more details, see{" "}
          <a
            href="https://www.basichomeloan.com/home-loans/hdfc-home-loan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            the original HDFC Bank Home Loan page on Basic Home Loan
          </a>.
        </p>
      </section>
    </main>
  );
}
