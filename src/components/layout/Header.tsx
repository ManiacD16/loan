"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-basic-dark text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            BASIC
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-basic-cyan">
                <span>Home Loan</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <Link to="/track-application" className="hover:text-basic-cyan">
              Track Your Application
            </Link>

            <div className="relative group">
              <Link to="/calculators" className="flex items-center space-x-1 hover:text-basic-cyan">
                <span>Calculators</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="relative group">
              <Link to="/blogs" className="flex items-center space-x-1 hover:text-basic-cyan">
                <span>Blogs</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-basic-cyan">
                <span>Partner Zone</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <button className="bg-basic-blue hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium">
              BECOME A CUSTOMER
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-600">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-basic-cyan">
                Home Loan
              </Link>
              <Link to="/track-application" className="hover:text-basic-cyan">
                Track Your Application
              </Link>
              <Link to="/calculators" className="hover:text-basic-cyan">
                Calculators
              </Link>
              <Link to="/blogs" className="hover:text-basic-cyan">
                Blogs
              </Link>
              <button className="bg-basic-blue hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium w-fit">
                BECOME A CUSTOMER
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
