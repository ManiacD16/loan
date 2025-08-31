export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 text-pretty">
              Revolutionizing the Home Loan Experience for Middle India
            </h1>
            <p className="mt-3 text-neutral-600 max-w-prose">
              We are committed to improving the journey of home loans for every family, making it faster, simpler, and
              more pleasant.
            </p>
          </div>
          <div>
            <img src="/city-skyline-buildings.png" alt="" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </section>

      {/* Overview dark band */}
      <section className="bg-neutral-900 text-white">
        <div className="container mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="h-1 w-10 bg-blue-600 rounded-full mb-4" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-extrabold">Overview</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed max-w-prose">
              The adoption of new technologies has changed everything about how we live our lives. We aim to digitize
              and automate the home loan origination, documentation, customer verification, and disbursement process
              from the comfort of your home.
            </p>
          </div>
          <div>
            <img src="/mobile-app-loan-screen.png" alt="" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center">
          <div className="h-1 w-10 bg-blue-600 rounded-full mb-4 mx-auto" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold text-neutral-900">Our Core Values</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Vision",
              text: "To make home loans faster, stress-free & BASIC for mid- to low-income households",
            },
            {
              title: "Mission",
              text: "Digitize the home loan process for all and increase affordable loan penetration in India",
            },
            {
              title: "What We Believe",
              text: "We win through teamwork, ethics, and transparency in everything we do",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-md border border-neutral-200 bg-white p-6 text-center">
              <h3 className="font-semibold text-neutral-900">{card.title}</h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-neutral-900">Our Story</h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              Founded in 2020, BASIC Home Loan is a fintech company developing an automated platform for home lending in
              India. Our vision is to change the way Bharat finances its affordable homes.
            </p>
          </div>
          <img src="/diverse-team-outdoor.png" alt="" className="w-full h-auto rounded-md" />
        </div>
      </section>
    </div>
  )
}
