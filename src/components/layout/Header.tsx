"use client";

import { FlyoutPortal } from "./FlyoutPortal";
// import Image from "next/image";

// state near your other states
// const [fly, setFly] = useState<FlyKey>(null);
import { useLocation, NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type MenuKey = "home" | "calculators" | null;
export type NavRoute = { path: string; title: string };
type FlyKey = "banks" | "nbfcs" | "rates" | "cities" | "emiCalcs" | "lap" | "bt" | null;

const CaretDown = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-4 h-4 ml-1 inline-block ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const CaretRight = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-4 h-4 ml-2 opacity-70 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 118.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// ------- DATA (trim as needed) -------
const HOME_LOAN_SECTIONS = [
  {
    key: "banks", label: "Home Loan From Banks", viewAllTo: "/home-loan-from-banks", children: [
      { label: "HDFC Bank Home Loan", to: "/home-loan/hdfc" },
      { label: "SBI Bank Home Loan", to: "/home-loan/sbi" },
      { label: "ICICI Bank Home Loan", to: "/home-loan/icici" },
      { label: "UBI Home Loan", to: "/home-loan/union-bank-of-india" },
      { label: "Axis Bank Home Loan", to: "/home-loan/axis" },
      { label: "Yes Bank Home Loan", to: "/home-loan/yes" },
      { label: "IDFC First Bank Home Loan", to: "/home-loan/idfc-first" },
      { label: "DCB Bank Home Loan", to: "/home-loan/dcb" },
      { label: "Bank Of Baroda Home Loan", to: "/home-loan/bob" },
    ]
  },
  {
    key: "nbfcs", label: "Home Loan From NBFCs", viewAllTo: "/home-loan-from-nbfcs", children: [
      { label: "LIC Housing Finance", to: "/nbfcs/lic-housing" },
      { label: "Shubham Housing Finance", to: "/nbfcs/shubham" },
      // { label: "Aditya Birla Housing Finance", to: "/nbfcs/aditya-birla" },
      { label: "Hero Housing Finance", to: "/nbfcs/hero" },
      { label: "Capri Global Housing Finance", to: "/nbfcs/capri-global" },
      { label: "DMI Housing Finance", to: "/nbfcs/dmi" },
      { label: "Piramal Housing Finance", to: "/nbfcs/piramal" },
      { label: "Aavas Housing Finance", to: "/nbfcs/aavas" },
      { label: "Aadhar Housing Finance", to: "/nbfcs/aadhar" },
      { label: "Cholamandalam Home Loan", to: "/nbfcs/cholamandalam" },
    ]
  },
  {
    key: "rates", label: "Home Loan Interest Rates", viewAllTo: "/home-loan-interest-rates", children: [
      { label: "HDFC Bank Interest Rate", to: "/rates/hdfc" },
      { label: "SBI Bank Interest Rate", to: "/rates/sbi" },
      { label: "ICICI Bank Interest Rate", to: "/rates/icici" },
      { label: "Union Bank of India Interest Rate", to: "/rates/ubi" },
      { label: "LIC Housing Finance Interest Rate", to: "/rates/lic-housing" },
      { label: "Shubham Housing Finance Interest Rate", to: "/rates/shubham" },
      { label: "Aditya Birla Housing Finance Interest Rate", to: "/rates/aditya-birla" },
      { label: "Piramal Housing Finance Interest Rate", to: "/rates/piramal" },
      { label: "Aadhar Housing Finance Interest Rate", to: "/rates/aadhar" },
    ]
  },
  {
    key: "cities", label: "Home Loan in City", viewAllTo: "/home-loan-in-city", children: [
      { label: "Home Loan in Delhi", to: "/home-loan/city/delhi" },
      { label: "Home Loan in Gurgaon", to: "/home-loan/city/gurgaon" },
      { label: "Home Loan in Noida", to: "/home-loan/city/noida" },
      { label: "Home Loan in Ghaziabad", to: "/home-loan/city/ghaziabad" },
      { label: "Home Loan in Faridabad", to: "/home-loan/city/faridabad" },
      { label: "Home Loan in Mumbai", to: "/home-loan/city/mumbai" },
      { label: "Home Loan in Navi Mumbai", to: "/home-loan/city/navi-mumbai" },
      { label: "Home Loan in Pune", to: "/home-loan/city/pune" },
      { label: "Home Loan in Bangalore", to: "/home-loan/city/bangalore" },
      { label: "Home Loan in Chennai", to: "/home-loan/city/chennai" },
    ]
  },
  {
    key: "emiCalcs", label: "Home Loan EMI Calculator", viewAllTo: "/home-loan-emi-calculator", children: [
      { label: "SBI Bank Home Loan EMI Calculator", to: "/emi/sbi" },
      { label: "ICICI Bank Home Loan EMI Calculator", to: "/emi/icici" },
      { label: "HDFC Bank Home Loan EMI Calculator", to: "/emi/hdfc" },
      { label: "Bank of India Home Loan EMI Calculator", to: "/emi/boi" },
      { label: "Union Bank Home Loan EMI Calculator", to: "/emi/ubi" },
      { label: "PNB Housing Home Loan EMI Calculator", to: "/emi/pnb-housing" },
      { label: "LIC Housing Home Loan EMI Calculator", to: "/emi/lic-housing" },
      { label: "Tata Capital Home Loan EMI Calculator", to: "/emi/tata-capital" },
      { label: "Shriram Finance Home Loan EMI Calculator", to: "/emi/shriram" },
    ]
  },
  {
    key: "lap", label: "Loan Against Property", viewAllTo: "/loan-against-property", children: [
      { label: "HDFC Loan Against Property", to: "/lap/hdfc" },
      { label: "SBI Loan Against Property", to: "/lap/sbi" },
      { label: "ICICI Bank Loan Against Property", to: "/lap/icici" },
      { label: "Axis Bank Loan Against Property", to: "/lap/axis" },
      { label: "Bank of Baroda Loan Against Property", to: "/lap/bob" },
      { label: "Tata Capital Loan Against Property", to: "/lap/tata-capital" },
      { label: "IDFC Loan Against Property", to: "/lap/idfc-first" },
      { label: "Bajaj Finance Loan Against Property", to: "/lap/bajaj" },
      { label: "Bank of India Loan Against Property", to: "/lap/boi" },
    ]
  },
  {
    key: "bt", label: "Home Loan Balance Transfer", viewAllTo: "/home-loan-balance-transfer", children: [
      { label: "HDFC Bank Home Loan Balance Transfer", to: "/bt/hdfc" },
      { label: "SBI Home Loan Balance Transfer", to: "/bt/sbi" },
      { label: "ICICI Bank Home Loan Balance Transfer", to: "/bt/icici" },
      { label: "Axis Home Loan Balance Transfer", to: "/bt/axis" },
    ]
  },
  { key: "topup", label: "Home Top Up Loan", to: "/home-top-up-loan" },
  { key: "plot", label: "Plot or Construction Loan", to: "/plot-or-construction-loan" },
  { key: "reno", label: "Renovation Or Extension Loan", to: "/renovation-or-extension-loan" },
  { key: "credit", label: "BASIC Credit", to: "/basic-credit" },
] as const;

const CALCULATORS = [
  { label: "Eligibility Check", to: "/eligibility-check" },
  { label: "EMI", to: "/emi" },
  { label: "PMAY", to: "/pmay" },
  // { label: "Repay Right", to: "/repay-right" },
] as const;

const BLOG_CATS = [
  { label: "home loans", to: "/blogs/category/home-loans" },
  { label: "real estate news", to: "/blogs/category/real-estate-news" },
] as const;

// const PARTNER = [
//   { label: "Agent Zone", to: "/partner/agent" },
//   { label: "Builder Zone", to: "/partner/builder" },
//   { label: "Banker Zone", to: "/partner/banker" },
// ] as const;

// Create a flattened list of ALL routes from your menus
export const ALL_ROUTES: NavRoute[] = (() => {
  const out: NavRoute[] = [];
  const add = (path: string, title: string) => {
    if (!path) return;
    if (!out.some((r) => r.path === path)) out.push({ path, title });
  };

  // Home Loan sections (parents may have viewAllTo and/or children)
  HOME_LOAN_SECTIONS.forEach((sec: any) => {
    if (sec.viewAllTo) add(sec.viewAllTo, `${sec.label} — All`);
    if (sec.children?.length) {
      sec.children.forEach((c: any) => add(c.to, c.label));
    } else if (sec.to) {
      add(sec.to, sec.label);
    }
  });

  // Calculators
  CALCULATORS.forEach((i) => add(i.to, i.label));

  // Blogs categories
  BLOG_CATS.forEach((i) => add(i.to, i.label));

  // Partner Zone
  // PARTNER.forEach((i) => add(i.to, i.label));

  // Extra top-level links
  // EXTRA_TOP_LEVEL.forEach((r) => add(r.path, r.title));
  // 
  return out;
})();
// ------------- COMPONENT -------------
export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [fly, setFly] = useState<FlyKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  // const closeTimers = useRef<{ main?: number; fly?: number }>({});
  const [flyAnchor, setFlyAnchor] = useState<HTMLElement | null>(null);

  const CLOSE_DELAY = 240;
  const timers = useRef<{ all?: number }>({});
  const location = useLocation();

  const cancelClose = () => { if (timers.current.all) { clearTimeout(timers.current.all); timers.current.all = undefined; } };
  const closeAllNow = () => { cancelClose(); setMenu(null); setFly(null); setFlyAnchor(null); };
  const closeAllAfterDelay = () => {
    cancelClose();
    timers.current.all = window.setTimeout(closeAllNow, CLOSE_DELAY);
  };

  // Close on outside click + route change + Esc
  // useEffect(() => {
  //   const onDown = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) closeAllNow(); };
  //   const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAllNow(); };
  //   document.addEventListener("mousedown", onDown);
  //   document.addEventListener("keydown", onKey);
  //   return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  // }, []);
  useEffect(() => { closeAllNow(); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // // click outside to close
  // useEffect(() => {
  //   const onDocClick = (e: MouseEvent) => {
  //     if (!navRef.current?.contains(e.target as Node)) {
  //       setMenu(null);
  //       setFly(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", onDocClick);
  //   return () => document.removeEventListener("mousedown", onDocClick);
  // }, []);

  // helper: open only via button hover/focus/click
  // const openHome = () => {
  //   window.clearTimeout(closeTimers.current.main);
  //   setMenu("home");
  // };
  // const scheduleCloseHome = () => {
  //   window.clearTimeout(closeTimers.current.main);
  //   closeTimers.current.main = window.setTimeout(() => setMenu(null), 120);
  // };
  // const openFly = (k: FlyKey) => {
  //   window.clearTimeout(closeTimers.current.fly);
  //   setFly(k);
  // };
  // const scheduleCloseFly = () => {
  //   window.clearTimeout(closeTimers.current.fly);
  //   closeTimers.current.fly = window.setTimeout(() => setFly(null), 120);
  // };

  const navBtn =
    "inline-flex items-center py-2 text-sm font-medium hover:text-basic-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-basic-cyan rounded";

  return (
    <header className={`sticky top-0 z-50 bg-basic-dark text-white transition-shadow ${sticky ? "shadow-lg shadow-black/20" : ""}`}>
      <div ref={navRef} className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="BASIC Home">
            <img src="/Logo1.svg" alt="BASIC Home" className="h-14 w-auto object-cover" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {/* HOME LOAN: opens ONLY from the button */}
            <div className="relative">
              <button
                className={navBtn}
                aria-haspopup="true"
                aria-expanded={menu === "home"}
                onMouseEnter={() => { cancelClose(); setMenu("home"); }}
                onFocus={() => { cancelClose(); setMenu("home"); }}
                onClick={() => (menu === "home" ? closeAllNow() : (cancelClose(), setMenu("home")))}
              >
                Home Loan <CaretDown />
              </button>

              {/* MAIN DROPDOWN */}
              {menu === "home" && (
                <div
                  className="absolute left-0 mt-2 w-[320px] rounded-xl bg-white text-basic-dark shadow-2xl ring-1 ring-black/5 p-2"
                  role="menu"
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeAllAfterDelay}   // leave main -> schedule close (will be canceled if we enter flyout)
                >
                  <ul className="max-h-[70vh] overflow-auto pr-1">
                    {HOME_LOAN_SECTIONS.map((sec) => {
                      const hasChildren = "children" in sec && Array.isArray((sec as any).children);
                      const secKey = (sec as any).key as FlyKey;
                      return (
                        <li key={secKey}>
                          {hasChildren ? (
                            <button
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between hover:bg-gray-100 hover:text-basic-blue ${fly === secKey ? "bg-gray-100 text-basic-blue" : ""}`}
                              aria-haspopup="true"
                              aria-expanded={fly === secKey}
                              onMouseEnter={(e) => { cancelClose(); setFly(secKey); setFlyAnchor(e.currentTarget as HTMLElement); }}
                              onFocus={(e) => { cancelClose(); setFly(secKey); setFlyAnchor(e.currentTarget as HTMLElement); }}
                            >
                              <span>{sec.label}</span><CaretRight />
                            </button>
                          ) : (
                            <NavLink to={(sec as any).to!} className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"> {sec.label} </NavLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* // --- FLYOUT via Portal (separate dropdown beside main) */}
              {fly && flyAnchor && (
                <FlyoutPortal
                  anchorEl={flyAnchor}
                  width={360}
                  gap={8}
                  onEnter={cancelClose}
                  onLeave={closeAllAfterDelay}
                  // onClick={closeAllNow}  // Close immediately when any link is clicked
                >
                  <div className="flex items-center justify-between px-2 py-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {HOME_LOAN_SECTIONS.find((s: any) => s.key === fly)?.label}
                    </p>
                    {/* {(() => {
                      const sec: any = HOME_LOAN_SECTIONS.find((s: any) => s.key === fly);
                      return sec?.viewAllTo ? (
                        <NavLink 
                          to={sec.viewAllTo} 
                          className="text-xs font-medium text-basic-blue hover:underline"
                        >
                          View all
                        </NavLink>
                      ) : null;
                    })()} */}
                  </div>
                  <ul>
                    {(() => {
                      const sec: any = HOME_LOAN_SECTIONS.find((s: any) => s.key === fly);
                      return (sec?.children || []).map((child: any) => (
                        <li key={child.label}>
                          <NavLink 
                            to={child.to} 
                            className="block px-3 py-2 text-sm rounded-md hover:bg-gray-50 hover:text-basic-blue"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ));
                    })()}
                  </ul>
                </FlyoutPortal>
              )}
            </div>

            {/* Track */}
            {/* <NavLink to="/track-application" className={({ isActive }) => `${navBtn} ${isActive ? "text-basic-cyan" : "text-white"}`}>
              Track Your Application
            </NavLink> */}

            {/* Calculators */}
            <DropdownSimple
              label="Calculators"
              items={CALCULATORS}
              width="w-64"
              menu={menu}
              setMenu={setMenu}
              id="calculators"
            />

            {/* Blogs */}
            {/* <DropdownSimple
              label="Blogs"
              items={BLOG_CATS}
              width="w-56"
              menu={menu}
              setMenu={setMenu}
              id="blogs"
            /> */}

            {/* Partner Zone */}
            {/* <DropdownSimple
              label="Partner Zone"
              items={PARTNER}
              width="w-56"
              menu={menu}
              setMenu={setMenu}
              id="partner"
            /> */}

            <a
              href="https://wa.me/917388016015"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              +91 73880 16015
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-basic-cyan"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Home Loan Accordion */}
            <div className="mb-2">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === "home" ? null : "home")}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-white/10 rounded"
              >
                <span>Home Loan</span>
                <CaretDown className={`transition-transform ${mobileAccordion === "home" ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordion === "home" && (
                <div className="pl-4 py-2 space-y-1">
                  {HOME_LOAN_SECTIONS.map((sec) => {
                    const hasChildren = "children" in sec && Array.isArray((sec as any).children);
                    return (
                      <div key={(sec as any).key}>
                        {hasChildren ? (
                          <div>
                            <div className="px-3 py-2 text-xs font-semibold text-basic-cyan">
                              {sec.label}
                            </div>
                            <div className="pl-2 space-y-1">
                              {(sec as any).children.map((child: any) => (
                                <NavLink
                                  key={child.to}
                                  to={child.to}
                                  className="block px-3 py-2 text-sm hover:bg-white/10 rounded"
                                >
                                  {child.label}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <NavLink
                            to={(sec as any).to!}
                            className="block px-3 py-2 text-sm hover:bg-white/10 rounded"
                          >
                            {sec.label}
                          </NavLink>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Track Application */}
            {/* <NavLink
              to="/track-application"
              className="block px-3 py-3 text-sm font-medium hover:bg-white/10 rounded mb-2"
            >
              Track Your Application
            </NavLink> */}

            {/* Calculators Accordion */}
            <div className="mb-2">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === "calculators" ? null : "calculators")}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-white/10 rounded"
              >
                <span>Calculators</span>
                <CaretDown className={`transition-transform ${mobileAccordion === "calculators" ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordion === "calculators" && (
                <div className="pl-4 py-2 space-y-1">
                  {CALCULATORS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="block px-3 py-2 text-sm hover:bg-white/10 rounded"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Blogs Accordion */}
            {/* <div className="mb-2">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === "blogs" ? null : "blogs")}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-white/10 rounded"
              >
                <span>Blogs</span>
                <CaretDown className={`transition-transform ${mobileAccordion === "blogs" ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordion === "blogs" && (
                <div className="pl-4 py-2 space-y-1">
                  {BLOG_CATS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="block px-3 py-2 text-sm hover:bg-white/10 rounded"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div> */}

            {/* Partner Zone Accordion */}
            {/* <div className="mb-2">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === "partner" ? null : "partner")}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-white/10 rounded"
              >
                <span>Partner Zone</span>
                <CaretDown className={`transition-transform ${mobileAccordion === "partner" ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordion === "partner" && (
                <div className="pl-4 py-2 space-y-1">
                  {PARTNER.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="block px-3 py-2 text-sm hover:bg-white/10 rounded"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div> */}

            {/* CTA Button */}
            <a
  href="https://wa.me/917388016015"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp: +91 73880 16015"
  className="block mx-3 mt-4 bg-basic-blue hover:bg-blue-600 px-4 py-3 rounded text-sm font-semibold text-center"
>
  +91 73880 16015
</a>

          </div>
        )}
      </div>
    </header>
  );
}

function DropdownSimple({
  label, items, width, menu, setMenu, id,
}: {
  label: string;
  items: readonly { label: string; to: string }[];
  width: string;
  menu: MenuKey;
  setMenu: (k: MenuKey) => void;
  id: Exclude<MenuKey, null>;
}) {
  const navBtn = "inline-flex items-center py-2 text-sm font-medium hover:text-basic-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-basic-cyan rounded";

  return (
    <div className="relative">
      <button
        className={navBtn}
        aria-haspopup="true"
        aria-expanded={menu === id}
        onMouseEnter={() => setMenu(id)}
        onFocus={() => setMenu(id)}
        onClick={() => setMenu(menu === id ? null : id)}
      >
        {label} <CaretDown />
      </button>
      {menu === id && (
        <div
          className={`absolute left-0 mt-2 ${width} rounded-xl bg-white text-basic-dark shadow-2xl ring-1 ring-black/5 p-2`}
          role="menu"
          onMouseEnter={() => setMenu(id)}
          onMouseLeave={() => setMenu(null)}
        >
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 hover:text-basic-blue ${
                  isActive ? "text-basic-blue" : "text-gray-800"
                }`
              }
            >
              {i.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
