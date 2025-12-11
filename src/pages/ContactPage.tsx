
import { useState } from "react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  return (
    <div className="bg-white">
      {/* Hero with form */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <img src="/people-discussing.png" alt="" className="w-full h-auto rounded-md" />
          </div>
          <form
            className="rounded-md border border-neutral-200 p-4 bg-white w-full"
            onSubmit={(e) => {
              e.preventDefault()
              console.log(" Contact submit", form)
            }}
          >
            <h1 className="text-xl font-extrabold text-neutral-900">Reach out to us</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-700">Name</label>
                <input
                  className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700">Your Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700">Your Number</label>
                <input
                  className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-neutral-700">Write Your Message Here...</label>
                <textarea
                  className="mt-1 w-full min-h-[100px] rounded border border-neutral-300 px-3 py-2 text-sm"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Registered office + map placeholder */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-extrabold text-neutral-900">Registered Office</h2>
            <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
              Plot Number 97, KCC House, Ground Floor, Sector 44, Gurugram, Haryana - 122022
            </p>
            <p className="mt-3 text-neutral-600 text-sm">
              <span className="font-semibold">Email:</span> hello@basichomeloan.com
            </p>
            <p className="text-neutral-600 text-sm">
              <span className="font-semibold">Phone:</span> +91 72 7006 9008
            </p>
          </div>
          <img src="/map-gurugram.png" alt="Map" className="w-full h-auto rounded-md" />
        </div>

        {/* Branch offices grid */}
        <div className="mt-10">
          <h3 className="text-xl font-extrabold text-neutral-900 mb-4">Branch Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: "Delhi - Jhandewalan", addr: "205, Jhandewalan Extension, New Delhi" },
              { city: "Noida", addr: "B-72, 2nd Floor, Sector 2, Noida" },
              { city: "Lucknow", addr: "B-1/5, Vibhuti Khand, Gomti Nagar" },
              { city: "Mumbai", addr: "8th Floor, C.T.E Road, Vile Parle" },
              { city: "Bangalore", addr: "HSR Layout, Sector 2" },
              { city: "Kolkata", addr: "Shantiniketan Building, Camac Street" },
            ].map((b) => (
              <div key={b.city} className="rounded-md border border-neutral-200 bg-white p-4">
                <div className="font-semibold text-neutral-900">{b.city}</div>
                <div className="text-sm text-neutral-600 mt-1">{b.addr}</div>
                <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                  View Map
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
