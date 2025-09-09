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
