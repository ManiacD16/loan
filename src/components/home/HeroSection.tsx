"use client"

import type React from "react"
import { useState } from "react"

const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Phone number submitted:", phoneNumber)
  }

  return (
    <section className="relative bg-gradient-to-r from-basic-dark via-basic-dark to-basic-cyan min-h-[600px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Getting home loan is very <span className="text-basic-cyan">BASIC</span> now
            </h1>

            <p className="text-basic-cyan text-lg mb-8">
              With Us You Get Free Eligibility Check & End To End Fulfillment
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Get a free consultation</h3>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-basic-blue"
                />
                <button
                  type="submit"
                  className="bg-basic-blue hover:bg-blue-600 px-6 py-3 rounded-r-md font-medium transition-colors"
                >
                  →
                </button>
              </form>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="/happy-couple-holding-house-keys-with-modern-home-b.png"
              alt="Happy couple with house keys"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
