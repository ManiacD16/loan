const ProcessSection = () => {
  const steps = [
    {
      icon: "📝",
      title: "Apply at BASIC",
      description: "Find best loan offers while sitting at home",
    },
    {
      icon: "🏦",
      title: "Paperless Application",
      description: "Documentation support through dedicated agent",
    },
  ]

  return (
    <section className="bg-basic-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">The Home Loan Process, Now Online</h2>
            <p className="text-gray-300 mb-8">Grow Home with every BASIC step</p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl">{step.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img src="/professional-meeting-with-family-discussing-home-l.png" alt="Home loan consultation" className="w-full h-auto rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
