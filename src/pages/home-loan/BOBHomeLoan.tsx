import React from "react";
import { Link } from "react-router-dom";

export default function BankOfBarodaHomeLoan() {
  const bank = {
    name: "Bank of Baroda (BOB)",
    pageTitle: "Bank Of Baroda Home Loan",
    logoUrl:
      "https://basichomeloan.com/admin/uploads/banner-section-logo/Bank_of_Baroda_Home_Loan.jpg",
  };

  const keyHighlights: { label: string; value: string }[] = [
    { label: "Loan Amount", value: "Up to ₹20 crore (Mumbai)" },
    { label: "Interest Rate (starts from)", value: "8.60% p.a." },
    { label: "RPLR", value: "9.15%" },
    { label: "Processing / Upfront Fee", value: "No processing fee; discounted upfront fee" },
    { label: "Maximum Tenure", value: "Up to 30 years" },
    { label: "Rate Packages", value: "Floating / Fixed" },
    { label: "Prepayment / Foreclosure Charges", value: "Nil" },
  ];

  const interestRates: { label: string; value: string }[] = [
    { label: "Repo Rate + Spread (Salaried)", value: "BRLLR: 0.55% – BRLLR + 1.35%" },
    { label: "Repo Rate + Spread (Self-employed)", value: "BRLLR: 0.45% – BRLLR + 1.45%" },
    { label: "ROI Range (Salaried)", value: "8.60% – 10.50%" },
    { label: "ROI Range (Self-employed)", value: "8.70% – 10.60%" },
    { label: "Rates last updated (as per source)", value: "30 November 2025" },
  ];

  const eligibility: { label: string; salaried: string; selfEmployed: string }[] = [
    { label: "Age Range", salaried: "21 – Retirement", selfEmployed: "21 – 65 years" },
    { label: "Nationality", salaried: "Resident / NRI / PIO / OCI", selfEmployed: "Resident / NRI / PIO / OCI" },
    { label: "Minimum Income", salaried: "Not specified", selfEmployed: "Not specified" },
  ];

  const charges: { label: string; value: string }[] = [
    { label: "Cheque bounce charges", value: "₹350 per instance" },
    {
      label: "Fixed-to-floating conversion",
      value:
        "0.50% p.a. for the residual period (max 2%) + applicable taxes on outstanding at conversion date",
    },
    { label: "Note", value: "Processing fee is unified; loans below ₹5 lakh have no processing fee." },
  ];

  const schemes: { title: string; points: string[] }[] = [
    {
      title: "Baroda Home Loan",
      points: [
        "For purchase / construction / extension of a home",
        "Accident cover included",
        "Tenure can extend up to 30 years",
      ],
    },
    {
      title: "Baroda Home Loan Advantage",
      points: [
        "Loan linked with the applicant’s savings account",
        "EMIs can be auto-recovered via the linked account",
        "Interest can reduce based on daily outstanding with account balance",
      ],
    },
    {
      title: "Baroda Pre-Approved Home Loan",
      points: [
        "In-principle approval before final property identification",
        "Approval validity up to 4 months",
        "Helps with negotiation confidence as eligibility-backed amount is known",
      ],
    },
    {
      title: "Baroda Home Improvement Loan",
      points: [
        "Rates linked to 1-year MCLR",
        "Group credit life cover for borrower/family",
        "Higher limits vary by location; moratorium up to 36 months",
      ],
    },
    {
      title: "Baroda Home Loan Takeover",
      points: [
        "Transfer existing home loan; higher limits (Mumbai up to ₹20 crore)",
        "No prepayment/foreclosure charges",
        "Top-up facility; interest computed on daily reducing balance",
      ],
    },
    {
      title: "Baroda Home Loan for NRIs & PIOs",
      points: ["For NRIs/PIOs buying in India", "Accident insurance benefit", "Tenure up to 30 years"],
    },
    {
      title: "Baroda Credit Risk Guarantee (CRE)",
      points: [
        "For NRIs/PIOs purchasing a third house",
        "ROI higher by ~0.25% compared to NRI/PIO home loan",
        "No prepayment/foreclosure charges",
      ],
    },
    {
      title: "Baroda Top-Up Home Loan",
      points: ["For Resident Indians / NRO / PIOs", "₹1 lakh to ₹2 crore", "Tenure = remaining period of existing loan"],
    },
    {
      title: "ISHUP (Interest Subsidy Scheme for Housing Urban Poor)",
      points: ["For LIG/EWS categories", "Income thresholds apply as per the scheme guidelines"],
    },
    {
      title: "PMAY Home Loan",
      points: ["Credit/interest subsidy-linked housing finance", "Subsidy depends on income category and eligibility"],
    },
  ];

  const docsSalaried = [
    "Latest salary slips (last 3–6 months)",
    "Bank statements showing salary credits",
    "Investment proofs (if any)",
    "ITR (last 3 years)",
    "Form 16",
    "Employer letter confirming role & employment duration",
    "Filled and signed application form",
    "2 passport-size photos",
    "Processing fee cheque in favour of BOB",
  ];

  const docsSelfEmployed = [
    "Business address proof",
    "Business / professional licence (as applicable)",
    "Business registration proof (office/clinic/shop etc.)",
    "Balance sheet + P&L attested by CA",
    "ITR (last 3 years)",
    "Filled and signed application form",
    "2 passport-size photos",
    "Processing fee cheque in favour of BOB",
  ];

  const commonDocs = [
    "Identity & address proof: Voter ID / DL / Aadhaar / Passport copy / PAN",
    "Property documents: Sale deed / allotment letter, occupancy certificate, builder payment receipts, construction permission, approved plan copy, builder development agreement, NOC from builder/society (as applicable)",
  ];

  const faqs: { q: string; a: string }[] = [
    {
      q: "What interest rate range is shown for Bank of Baroda home loans here?",
      a: "The source page lists a starting ROI of 8.60% p.a. and ranges up to 10.50%/10.60% depending on borrower profile. Always confirm the latest ROI on the official bank site before applying.",
    },
    {
      q: "Who can apply for a Bank of Baroda home loan?",
      a: "Resident Indians as well as NRIs/PIOs/OCIs can apply, subject to lender eligibility checks like age and repayment capacity.",
    },
    {
      q: "Are there prepayment or foreclosure charges?",
      a: "The source lists prepayment/foreclosure charges as nil for these home loan offerings.",
    },
    {
      q: "What is the maximum repayment tenure mentioned?",
      a: "Up to 30 years is mentioned as the maximum tenure.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="bg-basic-dark text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-4xl font-bold">{bank.pageTitle}</h1>
              <p className="mt-3 text-white/80">
                {bank.name} home loans are presented here with key highlights, indicative interest-rate ranges,
                eligibility overview, charges, popular schemes, documents checklist, and FAQs—so you can make a faster,
                cleaner decision with AraMount.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/917388016015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-basic-blue hover:bg-blue-600 px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  Apply / Get Call Back
                </a>
                <Link
                  to="/eligibility-check"
                  className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>

            <div className="shrink-0 bg-white rounded-2xl p-3 shadow-lg ring-1 ring-black/10 w-fit">
              <img
                src={bank.logoUrl}
                alt={`${bank.name} logo`}
                className="h-14 md:h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-10 md:py-12 space-y-10">
        {/* Key Highlights */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">Key Highlights</h2>
            <p className="text-sm text-gray-600 mt-1">Quick snapshot of major features as listed on the source page.</p>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {keyHighlights.map((row) => (
                    <tr key={row.label} className="border-b last:border-b-0">
                      <td className="p-3 font-medium bg-gray-50 w-72">{row.label}</td>
                      <td className="p-3">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm">
              <p className="font-semibold text-basic-dark">AraMount note</p>
              <p className="mt-1 text-gray-700">
                Rates/fees can change by lender policy and applicant profile. Treat this as a reference and verify the
                latest terms during application.
              </p>
            </div>
          </div>
        </div>

        {/* Interest Rates */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">Home Loan Interest Rate (Indicative)</h2>
            <p className="text-sm text-gray-600 mt-1">As stated on the source page (rate slabs & ranges).</p>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {interestRates.map((row) => (
                  <tr key={row.label} className="border-b last:border-b-0">
                    <td className="p-3 font-medium bg-gray-50 w-72">{row.label}</td>
                    <td className="p-3">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Eligibility */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">Eligibility Overview</h2>
            <p className="text-sm text-gray-600 mt-1">Basic eligibility parameters (salaried vs self-employed).</p>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 bg-gray-50">Parameter</th>
                  <th className="text-left p-3 bg-gray-50">Salaried</th>
                  <th className="text-left p-3 bg-gray-50">Self-employed</th>
                </tr>
              </thead>
              <tbody>
                {eligibility.map((row) => (
                  <tr key={row.label} className="border-b last:border-b-0">
                    <td className="p-3 font-medium">{row.label}</td>
                    <td className="p-3">{row.salaried}</td>
                    <td className="p-3">{row.selfEmployed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charges */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">Processing Fee & Other Charges (Reference)</h2>
            <p className="text-sm text-gray-600 mt-1">Typical charges listed on the source page.</p>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {charges.map((row) => (
                  <tr key={row.label} className="border-b last:border-b-0">
                    <td className="p-3 font-medium bg-gray-50 w-72">{row.label}</td>
                    <td className="p-3">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schemes */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">Schemes & Top Plans</h2>
            <p className="text-sm text-gray-600 mt-1">Popular schemes listed for this lender.</p>
          </div>
          <div className="p-5 grid md:grid-cols-2 gap-5">
            {schemes.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <h3 className="font-bold text-basic-dark">{s.title}</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">Documents Required</h2>
            <p className="text-sm text-gray-600 mt-1">Checklist for faster processing.</p>
          </div>

          <div className="p-5 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold">For Salaried Applicants</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {docsSalaried.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold">For Self-Employed Applicants</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {docsSelfEmployed.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold">Common Documents (All Applicants)</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {commonDocs.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* How to apply */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">How to Apply (Via AraMount)</h2>
            <p className="text-sm text-gray-600 mt-1">Simple steps to get started.</p>
          </div>
          <div className="p-5">
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
              <li>Click on “Apply / Get Call Back”.</li>
              <li>Share your contact details and basic loan requirement.</li>
              <li>Our team connects to guide eligibility, documents, and the end-to-end process smoothly.</li>
            </ol>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://wa.me/917388016015"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-basic-blue hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold"
              >
                WhatsApp: +91 73880 16015
              </a>
              <Link
                to="/emi"
                className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl text-sm font-semibold"
              >
                Calculate EMI
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b">
            <h2 className="text-lg md:text-xl font-bold">FAQs</h2>
          </div>
          <div className="p-5 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-gray-200 p-4">
                <p className="font-semibold text-basic-dark">{f.q}</p>
                <p className="mt-2 text-sm text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Disclaimer: Rates/fees/eligibility vary by lender policy and applicant profile; verify latest terms on official channels.
        </div>
      </section>
    </main>
  );
}
