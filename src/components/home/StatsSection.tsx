const StatsSection = () => {
  const stats = [
    { number: "650", suffix: "+", label: "Districts" },
    { number: "2,80,000", suffix: "+", label: "Families Served" },
    { number: "1,50,000", suffix: "+Cr", label: "Applications Processed" },
    { number: "100", suffix: "+", label: "Lending Partners" },
  ]

  return (
    <section className="bg-white border-y border-neutral-200 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center group hover:scale-105 transition-transform duration-300 ease-out"
            >
              <div className="relative">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-neutral-900 leading-none mb-1">
                  <span className="inline-block animate-pulse">
                    {stat.number}
                  </span>
                  <span className="text-blue-600 align-top text-xl sm:text-2xl lg:text-3xl xl:text-4xl ml-1 group-hover:text-blue-700 transition-colors duration-300">
                    {stat.suffix}
                  </span>
                </div>
                
                {/* Subtle underline animation */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-8 h-0.5 bg-blue-600 transition-all duration-300 ease-out"></div>
              </div>
              
              <p className="mt-3 text-xs sm:text-sm lg:text-base text-neutral-500 font-medium tracking-wide uppercase letterspacing group-hover:text-neutral-700 transition-colors duration-300">
                {stat.label}
              </p>
              
              {/* Mobile divider (hidden on larger screens) */}
              {index < stats.length - 1 && (
                <div className="sm:hidden mt-6 w-16 h-px bg-neutral-200 mx-auto"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 opacity-20"></div>
        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 opacity-20"></div>
      </div>
    </section>
  )
}

export default StatsSection