"use client";

import { FlyoutPortal } from "./FlyoutPortal";

// state near your other states
// const [fly, setFly] = useState<FlyKey>(null);
import { useLocation, NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type MenuKey = "home" | "calculators" | "blogs" | "partner" | null;
export type NavRoute = { path: string; title: string };
type FlyKey = "banks" | "nbfcs" | "rates" | "cities" | "emiCalcs" | "lap" | "bt" | null;

const CaretDown = () => (
  <svg className="w-4 h-4 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);
const CaretRight = () => (
  <svg className="w-4 h-4 ml-2 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 118.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
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
      { label: "Aditya Birla Housing Finance", to: "/nbfcs/aditya-birla" },
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
  { label: "Repay Right", to: "/repay-right" },
] as const;

const BLOG_CATS = [
  { label: "home loans", to: "/blogs/category/home-loans" },
  { label: "real estate news", to: "/blogs/category/real-estate-news" },
] as const;

const PARTNER = [
  { label: "Agent Zone", to: "/partner/agent" },
  { label: "Builder Zone", to: "/partner/builder" },
  { label: "Banker Zone", to: "/partner/banker" },
] as const;

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
  PARTNER.forEach((i) => add(i.to, i.label));

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
  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) closeAllNow(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAllNow(); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);
  useEffect(() => { closeAllNow(); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // click outside to close
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setMenu(null);
        setFly(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

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
      <div ref={navRef} className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="BASIC Home">
            <span className="text-2xl font-extrabold tracking-tight">BASIC</span>
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
                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between hover:bg-gray-100 hover:text-basic-blue ${fly===secKey ? "bg-gray-100 text-basic-blue" : ""}`}
                aria-haspopup="true"
                aria-expanded={fly === secKey}
                onMouseEnter={(e) => { cancelClose(); setFly(secKey); setFlyAnchor(e.currentTarget as HTMLElement); }}
                onFocus={(e) => { cancelClose(); setFly(secKey); setFlyAnchor(e.currentTarget as HTMLElement); }}
              >
                <span>{sec.label}</span><CaretRight/>
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
    onEnter={cancelClose}          // hovering the flyout keeps both open
    onLeave={closeAllAfterDelay}   // leaving flyout schedules close
  >
    <div className="flex items-center justify-between px-2 py-1">
      <p className="text-sm font-semibold text-gray-800">
        {HOME_LOAN_SECTIONS.find((s:any)=>s.key===fly)?.label}
      </p>
      {(() => { const sec:any = HOME_LOAN_SECTIONS.find((s:any)=>s.key===fly);
        return sec?.viewAllTo ? <NavLink to={sec.viewAllTo} className="text-xs font-medium text-basic-blue hover:underline">View all</NavLink> : null; })()}
    </div>
    <ul>
      {(() => { const sec:any = HOME_LOAN_SECTIONS.find((s:any)=>s.key===fly);
        return (sec?.children||[]).map((child:any)=>(
          <li key={child.label}>
            <NavLink to={child.to} className="block px-3 py-2 text-sm rounded-md hover:bg-gray-50 hover:text-basic-blue">
              {child.label}
            </NavLink>
          </li>
        )); })()}
    </ul>
  </FlyoutPortal>
)}

            </div>

            {/* Track */}
            <NavLink to="/track-application" className={({ isActive }) => `${navBtn} ${isActive ? "text-basic-cyan" : "text-white"}`}>
              Track Your Application
            </NavLink>

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
            <DropdownSimple
              label="Blogs"
              items={BLOG_CATS}
              width="w-56"
              menu={menu}
              setMenu={setMenu}
              id="blogs"
            />

            {/* Partner Zone */}
            <DropdownSimple
              label="Partner Zone"
              items={PARTNER}
              width="w-56"
              menu={menu}
              setMenu={setMenu}
              id="partner"
            />

            <Link
              to="/apply"
              className="bg-basic-blue hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-basic-cyan"
            >
              BECOME A CUSTOMER
            </Link>
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

        {/* Mobile drawer (same as before — accordions) */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-2">
            {/* … keep your existing mobile accordions here … */}
          </div>
        )}
      </div>
    </header>
  );
}

/** Simple one-panel dropdown used by Calculators / Blogs / Partner */
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
  const navBtn =
    "inline-flex items-center py-2 text-sm font-medium hover:text-basic-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-basic-cyan rounded";

  return (
    <div className="relative">
      <button
        className={navBtn}
        aria-haspopup="true"
        aria-expanded={menu === id}
        onMouseEnter={() => setMenu(id)}
        onFocus={() => setMenu(id)}
        onClick={() => setMenu(menu === id ? null : id)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setMenu(null);
          if (e.key === "ArrowDown") setMenu(id);
        }}
      >
        {label} <CaretDown />
      </button>
      {menu === id && (
        <div
          className={`absolute left-0 mt-2 ${width} rounded-xl bg-white text-basic-dark shadow-2xl ring-1 ring-black/5 p-2`}
          role="menu"
          aria-label={label}
          onMouseEnter={() => setMenu(id)}
          onMouseLeave={() => setMenu(null)}
        >
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 hover:text-basic-blue ${isActive ? "text-basic-blue" : "text-gray-800"
                }`
              }
              role="menuitem"
            >
              {i.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
