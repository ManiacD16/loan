const FeaturesSection = () => {
  const features = [
    {
      icon: "🔧",
      title: "Proprietary tech for best lender selection",
      description:
        "We have created any personalized process from big lenders in the market and find your dream home with ease.",
    },
    {
      icon: "📱",
      title: "Digital Loan Sanctions",
      description:
        "Utilizing our technology, you can get loan approval very fast. BASIC Home Loan along with free advisory services from a loan expert from beginning to end.",
    },
    {
      icon: "📊",
      title: "Step by step tracking",
      description:
        "You no longer online loan tracking. We provide end-to-end loan journey and verified you of your loan application status from Day One to the successful closure.",
    },
    {
      icon: "👤",
      title: "Dedicated Relationship Manager",
      description:
        "Get a dedicated Relationship Manager for end-to-end support ensuring smooth communication, real-time updates, faster processing, and maximum assistance throughout.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-basic-dark mb-12">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-basic-dark mb-3">{feature.title}</h3>
              <p className="text-sm text-basic-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-basic-blue hover:bg-blue-600 text-white px-8 py-3 rounded font-medium transition-colors">
            GET STARTED
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
