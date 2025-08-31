import { Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import CalculatorsPage from "./pages/CalculatorsPage"
// import BlogsPage from "./pages/BlogsPage"
import TrackApplicationPage from "./pages/TrackApplicationPage"
// import BlogDetailPage from "./pages/BlogDetailPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          {/* <Route path="/blogs" element={<BlogsPage />} /> */}
          {/* <Route path="/blogs/:slug" element={<BlogDetailPage />} /> */}
          <Route path="/track-application" element={<TrackApplicationPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
