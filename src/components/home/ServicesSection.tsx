"use client"

import { useState } from "react"

const ServicesSection = () => {
  const [activeService, setActiveService] = useState("HOME LOAN")

  const services = [
    {
      title: "HOME LOAN",
      description: "Unlock your dream of buying a house with our unique home loan solutions.",
      link: "Learn More",
    },
    {
      title: "BALANCE TRANSFER",
      description: "Transfer your existing home loan to get better rates and terms.",
    },
    {
      title: "LOAN AGAINST PROPERTY",
      description: "Get funds against your property for various financial needs.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-basic-dark mb-8">What do we offer?</h2>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="border-l-4 border-basic-blue pl-6">
                  <button
                    className={`text-left w-full ${
                      activeService === service.title ? "text-basic-dark font-semibold" : "text-basic-gray"
                    }`}
                    onClick={() => setActiveService(service.title)}
                  >
                    <h3 className="text-lg font-medium mb-2">+ {service.title}</h3>
                    {activeService === service.title && (
                      <div>
                        <p className="text-sm text-basic-gray mb-3">{service.description}</p>
                        {service.link && (
                          <a href="#" className="text-basic-blue text-sm hover:underline">
                            {service.link}
                          </a>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="/happy-couple-making-house-shape-with-hands--modern.png"
              alt="Happy couple planning home"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
