
import React, { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react"


// Helpers — INR formatting & digit parsing
const onlyDigits = (v: string) => (v || "").replace(/[^0-9]/g, "");
const toNum = (v: string | number) => {
  const s = typeof v === "number" ? String(v) : v;
  const n = Number(onlyDigits(s));
  return Number.isFinite(n) ? n : 0;
};
const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n || 0);
const isEmail = (s: string) => s.includes("@") && s.split("@")[1]?.includes(".");

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="mt-1 text-xs text-red-500 leading-snug">{message}</p>
  ) : null;

// Segmented control (pill)
const Segmented = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div className="inline-flex gap-2 rounded-full bg-white border border-gray-300 p-1">
    {options.map((opt) => {
      const active = opt === value;
      return (
        <button
          key={opt}
          type="button"
          className={
            "px-5 py-2 rounded-full text-sm transition-colors " +
            (active
              ? "bg-[#1084ff] text-white shadow"
              : "bg-transparent text-gray-700 hover:bg-gray-100")
          }
          aria-pressed={active}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      );
    })}
  </div>
);

// Underline input (for DOB, text, email etc.)
const UnderlineInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  leftIcon,
  maxLength,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  leftIcon?: React.ReactNode;
  maxLength?: number;
  autoComplete?: string;
}) => (
  <div className="relative">
    {leftIcon && (
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">{leftIcon}</span>
    )}
    <input
      className={
        "w-full bg-transparent text-gray-900 placeholder:text-gray-400 " +
        "border-b border-gray-300 focus:border-[#1084ff] outline-none " +
        (leftIcon ? "pl-8" : "") + " pb-1 pt-2"
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      autoComplete={autoComplete}
    />
  </div>
);

// Custom range that visually matches the screenshot
const TrackRange = ({
  value,
  setValue,
  min,
  max,
  step = 1,
}: {
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step?: number;
}) => {
  const pct = ((value - min) * 100) / (max - min);
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="slider w-full"
      style={{
        background: `linear-gradient(#1084ff, #1084ff) 0/ ${pct}% 100% no-repeat, #e5e7eb`,
      }}
    />
  );
};

export default function EligibilityReplicaV2() {
  const [step, setStep] = useState(1); // 1..4

  // STEP 1 (screenshot) — Requirements
  const [loanType, setLoanType] = useState("HOME LOAN");
  const [loanAmount, setLoanAmount] = useState(38765813); // screenshot-ish
  const [tenure, setTenure] = useState(10);
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("2002-01-14");

  // STEP 2 — Income
  const [employment, setEmployment] = useState(""); // Salaried | Self Employed
  const [salaryMode, setSalaryMode] = useState(""); // Bank | Cheque | Cash
  const [annualIncome, setAnnualIncome] = useState(0);
  const [coIncome, setCoIncome] = useState(0);
  const [existingEmi, setExistingEmi] = useState(0);

  // STEP 3 — Property & consent
  const [propertyIdentified, setPropertyIdentified] = useState(""); // Yes | No
  const [propertyValue, setPropertyValue] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [usageType, setUsageType] = useState("");
  const [agreementType, setAgreementType] = useState("");
  const [mobile, setMobile] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [agree, setAgree] = useState(false);
  const [consent, setConsent] = useState(false);

  // STEP 4 — Personal
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pan, setPan] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const age = useMemo(() => {
    if (!dob) return undefined;
    const d = new Date(dob);
    if (Number.isNaN(d.getTime())) return undefined;
    const now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) years--;
    return years;
  }, [dob]);

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!loanType) e.loanType = "Select loan type";
      if (!loanAmount) e.loanAmount = "Set amount";
      if (tenure < 5 || tenure > 30) e.tenure = "5–30 years";
      if (!gender) e.gender = "Select gender";
      if (!dob) e.dob = "Choose DOB";
      if (age !== undefined && (age < 18 || age > 75)) e.dob = "Age 18–75 only";
    }
    if (s === 2) {
      if (!employment) e.employment = "Employment required";
      if (employment === "Salaried" && !salaryMode) e.salaryMode = "Select mode";
      if (!annualIncome) e.annualIncome = "Annual income required";
    }
    if (s === 3) {
      if (!propertyIdentified) e.propertyIdentified = "Select Yes/No";
      if (!propertyValue) e.propertyValue = "Property value required";
      if (!propertyType) e.propertyType = "Select property type";
      if (!usageType) e.usageType = "Select usage";
      if (!agreementType) e.agreementType = "Select agreement";
      if (!/^[0-9]{10}$/.test(onlyDigits(mobile))) e.mobile = "10-digit mobile";
      if (!companyType) e.companyType = "Select company type";
      if (!agree || !consent) e.consent = "Accept both checkboxes";
    }
    if (s === 4) {
      if (!firstName) e.firstName = "First name required";
      if (!lastName) e.lastName = "Last name required";
      if (!/^([A-Z]{5}[0-9]{4}[A-Z])$/.test(pan.trim().toUpperCase())) e.pan = "Valid PAN e.g. ABCDE1234F";
      if (!/^[0-9]{6}$/.test(onlyDigits(pinCode))) e.pinCode = "6-digit PIN";
      if (!isEmail(email)) e.email = "Valid email";
      if (!companyName) e.companyName = "Company required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(4, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(4)) return;
    const payload = {
      loanType,
      loanAmount,
      tenure,
      gender,
      dob,
      employment,
      salaryMode: employment === "Salaried" ? salaryMode : undefined,
      annualIncome,
      coIncome,
      existingEmi,
      propertyIdentified,
      propertyValue,
      propertyType,
      usageType,
      agreementType,
      mobile: onlyDigits(mobile),
      companyType,
      agree,
      consent,
      firstName,
      lastName,
      pan: pan.toUpperCase(),
      pinCode: onlyDigits(pinCode),
      email,
      companyName,
    };
    console.log("✅ Submission", payload);
    alert("Form submitted! (Check console for payload)");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2  items-stretch">
          {/* LEFT — Image + overlay copy */}
          <div className="relative min-h-[420px] overflow-hidden">
          <img
    src="/modern-family-home-exterior-with-beautiful-landsca.png"
    alt="home"
    className="absolute inset-0 h-full w-full object-cover"
  />
  {/* Black overlay */}
  <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 md:p-10 lg:p-12 text-white flex flex-col justify-center h-full">
              <span className="inline-block h-1 w-16 bg-white/90 rounded mb-5" />
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Check your Eligibility through digitised credit
                <br /> policies of 100+ Banks
              </h2>
              <p className="mt-4 font-medium">Get started in Seconds</p>
              <p className="mt-4 max-w-xl text-white/90">
                We take care of all the legwork so that you can focus on finding the right lender. Just by filling in
                simple form fields, we can show you your eligibility with just a click of a button.
              </p>
            </div>
          </div>

          {/* RIGHT — Card with form */}
          <div className="bg-[#f7f8fa] p-6 md:p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tell us about your requirements</h3>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* STEP 1 — as screenshot */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Segmented
                      value={loanType}
                      onChange={setLoanType}
                      options={["HOME LOAN", "LOAN AGAINST PROPERTY"]}
                    />
                  </div>

                  {/* Loan Amount with ₹ on right, underline & slider */}
                  <div>
                    <div className="flex items-end justify-between text-gray-700">
                      <label className="text-sm">Loan Amount</label>
                      <div className="flex items-baseline gap-1 font-semibold">
                        <span className="text-gray-500">₹</span>
                        <span>{fmtINR(loanAmount)}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <TrackRange
                        min={100000}
                        max={100000000}
                        step={10000}
                        value={loanAmount}
                        setValue={setLoanAmount}
                      />
                    </div>
                    <FieldError message={errors.loanAmount} />
                  </div>

                  {/* Tenure */}
                  <div>
                    <div className="flex items-end justify-between text-gray-700">
                      <label className="text-sm">Loan Tenure Required</label>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 border-b border-gray-300 pb-1">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2" />
                            <path d="M3 10h18" stroke="#6b7280" strokeWidth="2" />
                          </svg>
                          <span className="font-semibold text-gray-900">{tenure}</span>
                          <span className="text-gray-500">Years</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <TrackRange min={5} max={30} value={tenure} setValue={setTenure} />
                    </div>
                    <FieldError message={errors.tenure} />
                  </div>

                  {/* Gender + DOB */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Gender</label>
                      <Segmented value={gender} onChange={setGender} options={["Male", "Female", "Others"]} />
                      <FieldError message={errors.gender} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
                      <UnderlineInput
                        type="date"
                        value={dob}
                        onChange={setDob}
                        leftIcon={
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2" />
                            <path d="M3 10h18" stroke="#6b7280" strokeWidth="2" />
                          </svg>
                        }
                      />
                      <FieldError message={errors.dob} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-2"
                    >
                      NEXT
                       <ArrowRight size={20} strokeWidth={3.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 — Income details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Tell us more about your income</h4>

                  <Segmented
                    value={employment}
                    onChange={setEmployment}
                    options={["Salaried", "Self Employed"]}
                  />
                  <FieldError message={errors.employment} />

                  {employment === "Salaried" && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Salary Credit Mode</label>
                      <Segmented value={salaryMode} onChange={setSalaryMode} options={["Bank", "Cheque", "Cash"]} />
                      <FieldError message={errors.salaryMode} />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Annual Income</label>
                      <UnderlineInput
                        value={annualIncome ? fmtINR(annualIncome) : ""}
                        onChange={(v) => setAnnualIncome(toNum(v))}
                        leftIcon={<span className="text-gray-500">₹</span>}
                        placeholder="12,00,000"
                        autoComplete="off"
                      />
                      <FieldError message={errors.annualIncome} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Co-Applicant Income (If Any)</label>
                      <UnderlineInput
                        value={coIncome ? fmtINR(coIncome) : ""}
                        onChange={(v) => setCoIncome(toNum(v))}
                        leftIcon={<span className="text-gray-500">₹</span>}
                        placeholder="0"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Existing EMI (If Any)</label>
                    <UnderlineInput
                      value={existingEmi ? fmtINR(existingEmi) : ""}
                      onChange={(v) => setExistingEmi(toNum(v))}
                      leftIcon={<span className="text-gray-500">₹</span>}
                      placeholder="0"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex gap-3 justify-between pt-2">
                    <button
                      type="button"
                      onClick={prev}
                                           className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-1"

                    >
                      <ArrowLeft size={20} strokeWidth={3.5} /> Previous
                    </button>
                   <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={next}
                                           className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-2"
  >
                      NEXT
                       <ArrowRight size={20} strokeWidth={3.5} />
                    </button>
                  </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — Property details & consents */}
              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Property details</h4>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Is Property Identified?</label>
                    <Segmented value={propertyIdentified} onChange={setPropertyIdentified} options={["Yes", "No"]} />
                    <FieldError message={errors.propertyIdentified} />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Property Value</label>
                    <UnderlineInput
                      value={propertyValue ? fmtINR(propertyValue) : ""}
                      onChange={(v) => setPropertyValue(toNum(v))}
                      leftIcon={<span className="text-gray-500">₹</span>}
                      placeholder="50,00,000"
                    />
                    <FieldError message={errors.propertyValue} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Property Type</label>
                      <UnderlineInput
                        value={propertyType}
                        onChange={setPropertyType}
                        placeholder="Builder Resale / Freehold / ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Usage Type</label>
                      <UnderlineInput
                        value={usageType}
                        onChange={setUsageType}
                        placeholder="Residential / Commercial / ..."
                      />
                    </div>
                  </div>
                  <FieldError message={errors.propertyType || errors.usageType} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Agreement Type</label>
                      <UnderlineInput
                        value={agreementType}
                        onChange={setAgreementType}
                        placeholder="Registry / GPA / ..."
                      />
                      <FieldError message={errors.agreementType} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Mobile Number</label>
                      <UnderlineInput
                        value={mobile}
                        onChange={(v) => setMobile(onlyDigits(v).slice(0, 10))}
                        placeholder="9999999999"
                        autoComplete="tel"
                      />
                      <FieldError message={errors.mobile} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Type</label>
                    <UnderlineInput
                      value={companyType}
                      onChange={setCompanyType}
                      placeholder="Private / LLP / Public / NGO"
                    />
                    <FieldError message={errors.companyType} />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-[#1084ff]"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      <span>
                        I agree to
                        <a
                          href="https://www.basichomeloan.com/terms-and-conditions"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1084ff] underline ml-1"
                        >
                          Terms & Conditions
                        </a>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-[#1084ff]"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        Include Credit Score for better loan eligibility results. I
                        <a href="https://da.basichomeloan.com/" target="_blank" rel="noreferrer" className="text-[#1084ff] underline mx-1">
                          consent
                        </a>
                        to allow access of my Credit Score to create the credit report.
                      </span>
                    </label>
                    <FieldError message={errors.consent} />
                  </div>

                  <div className="flex gap-3 justify-between pt-2">
                    <button
                      type="button"
                      onClick={prev}
                                            className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-2"
>
                      <ArrowLeft size={20} strokeWidth={3.5} /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={next}
                                          className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-2"
 >
                      Next  <ArrowRight size={20} strokeWidth={3.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 — Personal details */}
              {step === 4 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Personal details</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">FIRST NAME</label>
                      <UnderlineInput value={firstName} onChange={setFirstName} placeholder="John" autoComplete="given-name" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">LAST NAME</label>
                      <UnderlineInput value={lastName} onChange={setLastName} placeholder="Doe" autoComplete="family-name" />
                    </div>
                  </div>
                  <FieldError message={errors.firstName || errors.lastName} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">PAN NUMBER</label>
                      <UnderlineInput
                        value={pan}
                        onChange={(v) => setPan(v.toUpperCase().slice(0, 10))}
                        placeholder="ABCDE1234F"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">PIN CODE</label>
                      <UnderlineInput
                        value={pinCode}
                        onChange={(v) => setPinCode(onlyDigits(v).slice(0, 6))}
                        placeholder="110011"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                  <FieldError message={errors.pan || errors.pinCode} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">EMAIL ID</label>
                      <UnderlineInput value={email} onChange={setEmail} placeholder="john.doe@example.com" type="email" autoComplete="email" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">COMPANY NAME</label>
                      <UnderlineInput value={companyName} onChange={setCompanyName} placeholder="Acme Pvt Ltd" autoComplete="organization" />
                    </div>
                  </div>
                  <FieldError message={errors.email || errors.companyName} />

                  <div className="flex gap-3 justify-between pt-2">
                    <button
                      type="button"
                      onClick={prev}
                                            className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-3"
>
                      <ArrowLeft size={20} strokeWidth={3.5} /> Previous
                    </button>
                    <button
                      type="submit"
                                          className="inline-flex items-center gap-2 bg-[#1084ff] hover:bg-[#0d74e6] text-white font-semibold rounded-md px-5 py-2"
 >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* slider CSS */}
      <style >{`
        .slider { height: 6px; border-radius: 9999px; appearance: none; outline: none; }
        .slider::-webkit-slider-thumb { appearance: none; height: 18px; width: 18px; border-radius: 9999px; background: #1084ff; border: 2px solid #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.15); cursor: pointer; margin-top: -6px; }
        .slider::-moz-range-thumb { height: 18px; width: 18px; border-radius: 9999px; background: #1084ff; border: 2px solid #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.15); cursor: pointer; }
        .slider::-webkit-slider-runnable-track { height: 6px; background: transparent; border-radius: 9999px; }
        .slider::-moz-range-track { height: 6px; background: #e5e7eb; border-radius: 9999px; }
      `}</style>
    </section>
  );
}
