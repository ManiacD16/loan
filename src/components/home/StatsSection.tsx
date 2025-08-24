const StatsSection = () => {
  const stats = [
    { number: "650", suffix: "+", label: "Clients" },
    { number: "2,80,000", suffix: "+", label: "Families Served" },
    { number: "1,50,000", suffix: "+Cr", label: "Applications Processed" },
    { number: "100", suffix: "+", label: "Lending Partners" },
  ]

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-basic-dark mb-2">
                {stat.number}
                <span className="text-basic-blue">{stat.suffix}</span>
              </div>
              <p className="text-basic-gray text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
