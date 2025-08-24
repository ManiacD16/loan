"use client"

import { Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import CalculatorsPage from "./pages/CalculatorsPage"
import BlogsPage from "./pages/BlogsPage"
import TrackApplicationPage from "./pages/TrackApplicationPage"

console.log("[v0] Component imports:", {
  Header,
  Footer,
  HomePage,
  CalculatorsPage,
  BlogsPage,
  TrackApplicationPage,
})

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/track-application" element={<TrackApplicationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
