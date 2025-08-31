import React from 'react';
import { HandCoins, IndianRupee, Smartphone, MapPin, User } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <HandCoins className="w-7 h-7" />,
      title: "Proprietary tech for best lender selection",
      description:
        "Get free instant and personalized quotes from top lenders in the market and buy your dream home with ease.",
    },
    {
      icon: (
        <div className="relative">
          <Smartphone className="w-7 h-7" />
          <IndianRupee className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      ),
      title: "Digital Loan Sanctions",
      description:
        "Utilizing our technology, you can get doorstep delivery of Basic Home Loan along with free advisory services from a dedicated relationship manager.",
    },
    {
      icon: (
        <div className="relative">
          <Smartphone className="w-7 h-7" />
          <MapPin className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      ),
      title: "Step by step tracking",
      description:
        "Our in-house online loan tracker showcases your home loan journey and notifies you of your loan application status from the login to the sanction stage.",
    },
    {
      icon: <User className="w-7 h-7" />,
      title: "Dedicated Relationship Manager",
      description:
        "Get a dedicated Relationship Manager for end-to-end support, ensuring smooth coordination, real-time updates, faster resolutions, and seamless assistance from application to loan disbursement.",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center tracking-tight">
            Key Features
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Blue accent line at top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-full" />
              
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200">
            GET STARTED
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;