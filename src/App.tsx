import { Routes, Route, Navigate } from "react-router-dom";
import Header, { ALL_ROUTES } from "./components/layout/Header"; // <- make sure Header exports ALL_ROUTES
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import CalculatorsPage from "./pages/CalculatorsPage";
import BlogsPage from "./pages/BlogsPage";
import TrackApplicationPage from "./pages/TrackApplicationPage";
// import BlogDetailPage from "./pages/BlogDetailPage"
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EligibilityCheckPage from "./pages/EligibilityCheckPage";
import Emi from "./pages/emi";
import Pmay from "./pages/Pmay";
import HdfcHomeLoan from "./pages/home-loan/HdfcHomeLoan";
import SbiHomeLoan from './pages/home-loan/SbiHomeLoan';
import ICICIHomeLoan from './pages/home-loan/ICICIHomeLoan';
import UBIHomeLoan from './pages/home-loan/UBIHomeLoan';
import AxisHomeLoan from './pages/home-loan/AxisHomeLoan';
import YesHomeLoan from './pages/home-loan/YesHomeLoan';
import IDFCHomeLoan from './pages/home-loan/IDFCHomeLoan';
import DCBHomeLoan from './pages/home-loan/DCBHomeLoan';
import BOBHomeLoan from './pages/home-loan/BOBHomeLoan';
import LIC from './pages/nbfcs/LIC';
import Shubham from './pages/nbfcs/Shubham';
import Hero from './pages/nbfcs/Hero';
import Capri from './pages/nbfcs/Capri';
import DMI from './pages/nbfcs/DMI';
import Piramal from './pages/nbfcs/Piramal';
import Aavas from './pages/nbfcs/Aavas';
import Aadhar from './pages/nbfcs/Aadhar';
import Chola from './pages/nbfcs/Chola';












// Simple placeholder for routes you haven't built yet.
// Replace with your real pages when ready.
function Placeholder({ title }: { title: string }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-neutral-600">
        This is a placeholder for <strong>{title}</strong>. Replace this with your real page.
      </p>
    </div>
  );
}

function App() {
  // Static pages you already wired, so we won't double-register them from ALL_ROUTES.
  const STATIC_PATHS = new Set<string>([
    "/",
    "/calculators",
    "/blogs",
    "/track-application",
    "/about-us",
    "/contact-us",
     "/eligibility-check",
     "/emi",
     "/pmay",
    //  "/home-loan/hdfc"

  ]);

  // Any dynamic nav route from the header that doesn't collide with the static ones above.
  const dynamicRoutes = (ALL_ROUTES || []).filter((r) => !STATIC_PATHS.has(r.path));

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Your existing pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          {/* <Route path="/blogs/:slug" element={<BlogDetailPage />} /> */}
          <Route path="/track-application" element={<TrackApplicationPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
<Route path="/eligibility-check" element={<EligibilityCheckPage />} />
<Route path="/emi" element={<Emi />} />
<Route path="/pmay" element={<Pmay />} />
<Route path="/home-loan/hdfc" element={<HdfcHomeLoan />} />
<Route path="/home-loan/sbi" element={<SbiHomeLoan />} />
<Route path="/home-loan/icici" element={<ICICIHomeLoan />} />
<Route path="/home-loan/union-bank-of-india" element={<UBIHomeLoan />} />
<Route path="/home-loan/axis" element={<AxisHomeLoan />} />
<Route path="/home-loan/yes" element={<YesHomeLoan />} />
<Route path="/home-loan/idfc-first" element={<IDFCHomeLoan />} />
<Route path="/home-loan/dcb" element={<DCBHomeLoan />} />
<Route path="/home-loan/bob" element={<BOBHomeLoan />} />
<Route path="nbfcs/lic-housing" element={<LIC />} />
<Route path="nbfcs/shubham" element={<Shubham />} />
<Route path="nbfcs/hero" element={<Hero />} />
<Route path="nbfcs/capri-global" element={<Capri />} />
<Route path="nbfcs/dmi" element={<DMI />} />
<Route path="nbfcs/piramal" element={<Piramal />} />
<Route path="nbfcs/aavas" element={<Aavas />} />
<Route path="nbfcs/aadhar" element={<Aadhar />} />
<Route path="/nbfcs/cholamandalam" element={<Chola />} />










          {/* Auto-generated routes for every dropdown & sub-dropdown link */}
          {dynamicRoutes.map(({ path, title }) => (
            <Route key={path} path={path} element={<Placeholder title={title} />} />
          ))}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
