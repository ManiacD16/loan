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
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 text-white text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200">
            <a
              href="https://wa.me/917388016015"
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              +91 73880 16015
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;