import React, { useState, useRef } from "react";

const ProcessSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

// const ProcessSection = () => {
  const steps = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Apply at BASIC",
      description: "Grow Home with every BASIC step",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Find best loan offers while sitting at home",
      description: "Compare lender quotes instantly",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Paperless Application",
      description: "Digital KYC and document uploads",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: "Documentation support through dedicated agent",
      description: "End-to-end assistance until disbursement",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-slate-900 text-white py-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/3 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                  Digital Experience
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                The Home Loan Process,{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Now Online
                </span>
              </h2>
              <p className="text-neutral-300 text-lg">
                Grow Home with every BASIC step
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-5 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-sky-400/30 transition-all duration-300 hover:translate-x-2"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:from-sky-400/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <div className="text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-sky-100 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                  <div className="text-neutral-500 group-hover:text-sky-400 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {/* <div className="pt-4">
              <button className="group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-1">
                Get Started Today
                <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div> */}
          </div>

          {/* Right Video Thumbnail */}
          {/* Right Video Thumbnail */}
      <div className="relative group">
        <div className="relative bg-gradient-to-br from-neutral-800/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          <div className="relative overflow-hidden rounded-xl">
            <video
              ref={videoRef}
              className="w-full aspect-video rounded-xl object-cover"
              muted
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="Consultation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* ✅ Only show overlay if NOT playing */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                <button
                  aria-label="Play video"
                  onClick={togglePlay}
                  className="w-20 h-20 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
                >
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.2-10.4a.8.8 0 00-1.2.7v4.4a.8.8 0 001.2.7l3.8-2.2a.8.8 0 000-1.4l-3.8-2.2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection