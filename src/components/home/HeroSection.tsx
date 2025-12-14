
import type React from "react"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(" Phone number submitted:", phoneNumber)
  }

  return (
    <section className="relative ">
      {/* Background images for all screens */}
      <div 
        className="absolute inset-0 bg-center bg-cover md:hidden"
        style={{
          backgroundImage: "url('/banner-1.png')",
        }}
      />
      <div 
        className="absolute inset-0 hidden md:block bg-cover"
        style={{
          backgroundImage: "url('/banner.png')",
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-neutral-900/40" />

      <div className="relative container mx-auto px-4">
        <div className="min-h-[560px] grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* Image for mobile */}
          {/* <div className="lg:hidden">
            <img src="/happy-couple-at-home.png" alt="Happy couple" className="w-full h-auto rounded-md" />
          </div> */}

          {/* Right copy */}
          <div className="text-white lg:col-start-2 py-16">
            <h1 className="text-3xl sm:text-4xl lg:text-[32px] leading-tight font-extrabold text-pretty">
              Getting home loan is very BASIC now
            </h1>

            <p className="mt-4 text-sky-400 text-[15px]">
              With Us You Get Free Eligibility Check & End To End Fulfillment
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Get a free consultation</h3>
              <form onSubmit={handleSubmit} className="flex w-full">
                <div className="flex w-full max-w-xl mt-2 bg-white ">
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Your Phone Number"
                    aria-label="Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 min-w-0 px-4 py-3 rounded-l-md text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Submit phone number"
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-sm font-semibold flex-shrink-0 ml-2 mr-1 my-1"
                  >
                    <ArrowRight size={20} strokeWidth={3.5} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection