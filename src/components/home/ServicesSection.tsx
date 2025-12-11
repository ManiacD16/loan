
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Drop-in single-file section. Tailwind + Framer Motion.
// Smooth accordion + image crossfade/slide + decorative floating blobs
// Keyboard-accessible and responsive. Paste into a Next.js project.

type Service = {
  title: string;
  description: string;
  link?: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "HOME LOAN",
    description:
      "Unlock your dream of buying a house with our unique home loan solutions.",
    link: "Learn More",
    image: "https://www.basichomeloan.com/assets/images/home/offer-img.png",
  },
  {
    title: "BALANCE TRANSFER",
    description:
      "Save by transferring your home loan from one bank to the other and enjoy better interest rates.",
    link: "Learn More",
    image:
      "https://www.basichomeloan.com/assets/images/home/balance-transfer.png",
  },
  {
    title: "LOAN AGAINST PROPERTY",
    description:
      "Avail a simple solution to your financial needs with a hassle-free loan against commercial and residential property.",
    link: "Learn More",
    image:
      "https://www.basichomeloan.com/assets/images/home/loanagainstproperty.png",
  },
];

function usePreloadImages(urls: string[]) {
  useEffect(() => {
    const imgs = urls.map((src) => {
      const i = new Image();
      i.src = src;
      return i;
    });
    return () => {
      // best-effort: hint GC
      imgs.forEach((i: any) => (i.onload = null));
    };
  }, [urls]);
}

// decide layer (0=top,1=mid,2=back) relative to active
const layerFor = (i: number, activeIdx: number, total: number) => {
  if (i === activeIdx) return 0;
  if (i === (activeIdx + 1) % total) return 1;
  return 2; // only show 3 layers
};

// angled panel shape (parallelogram)
const PANEL_CLIP = "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)";

const cardVariants3D: Record<number | "hidden", any> = {
  0: { x: 0,   y: 0,  z: 90,  rotateY: 0, scale: 1.0,  opacity: 1,   zIndex: 30 },
  1: { x: 30,  y: 40, z: 45,  rotateY: 0, scale: 0.97, opacity: 0.65, zIndex: 20 },
  2: { x: 60,  y: 80, z: 0,   rotateY: 0, scale: 0.94, opacity: 0.25, zIndex: 10 },
  hidden: { x: 48, y: 48, z: -40, rotateY: -10, scale: 0.9, opacity: 0, zIndex: 0 },
};


export default function ServicesSection() {
  const [active, setActive] = useState<string>(SERVICES[0].title);
  const activeIdx = useMemo(
    () => SERVICES.findIndex((s) => s.title === active),
    [active]
  );
  // const activeService = SERVICES[activeIdx];

  // Preload to make image crossfades buttery
  usePreloadImages(SERVICES.map((s) => s.image));

  // Allow keyboard navigation (↑/↓) within list
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const next = (activeIdx + dir + SERVICES.length) % SERVICES.length;
      setActive(SERVICES[next].title);
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [activeIdx]);

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-20">
      {/* soft gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <div className="absolute right-[-10%] top-[-10%] h-72 w-72 rounded-full bg-gradient-to-br from-indigo-100 to-transparent blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-96 w-96 rounded-full bg-gradient-to-tr from-amber-100 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 md:px-6 lg:grid-cols-2">
        {/* LEFT: copy + accordion */}
        <div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            What do we offer?
          </h2>

          <div
            ref={listRef}
            role="tablist"
            aria-label="Services"
            className="space-y-3 outline-none"
            tabIndex={0}
          >
            {SERVICES.map((service, idx) => {
              const isActive = active === service.title;
              return (
                <motion.div
                  key={service.title}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${idx}`}
                    id={`tab-${idx}`}
                    onClick={() => setActive(service.title)}
                    className={`flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-900"
                        : "bg-white text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* bullet */}
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full transition-colors ${
                          isActive ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                        aria-hidden
                      />
                      <h3 className="text-base font-semibold md:text-lg">
                        {service.title}
                      </h3>
                    </div>

                    <motion.span
                      initial={false}
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                      aria-hidden
                      className="grid h-6 w-6 place-items-center text-current"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  {/* Smooth expanding panel */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`panel-${idx}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${idx}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { type: "spring", stiffness: 250, damping: 28 },
                          opacity: { duration: 0.18 },
                        }}
                        className="overflow-hidden "
                      >
                        <div className="px-6 pb-6 pt-2">
                          <motion.p
                            initial={{ y: 6, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.04 }}
                            className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base"
                          >
                            {service.description}
                          </motion.p>
                          {service.link && (
                            <a
                              href="https://www.basichomeloan.com/products#overview"
                              className="group inline-flex items-center gap-2 font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                            >
                              {service.link}
                              <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: image stage */}
        {/* RIGHT: image stage – angled stacked cards */}
<div className="relative min-h-[420px] w-full">
  <div className="absolute inset-0" style={{ perspective: 1000 }}>
    <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
      {/* (optional) floating blobs can stay as-is */}

      {SERVICES.map((s, i) => {
        const layer = layerFor(i, activeIdx, SERVICES.length);
        const animateTo =
          layer === 0 ? cardVariants3D[0]
          : layer === 1 ? cardVariants3D[1]
          : layer === 2 ? cardVariants3D[2]
          : cardVariants3D.hidden;

        return (
          <motion.div
            key={s.image}
            className="absolute inset-0 flex items-center justify-center"
            initial={cardVariants3D.hidden}
            animate={animateTo}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative h-[92%] w-[78%] max-w-[520px] "
              style={{
                clipPath: PANEL_CLIP,
              }}
            >
              {/* image */}
              <img
                src={s.image}
                alt={`${s.title} illustration`}
                className="h-full w-full object-contain"
                onError={(e: any) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='300' y='200' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='16'%3EImage not available%3C/text%3E%3C/svg%3E";
                }}
              />

              {/* soft inner edge light to mimic glossy sheet */}
              {/* <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/55 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/45 to-transparent" />
              </div> */}

              {/* subtle drop shadow “cast” behind the card */}
              {/* <div className="pointer-events-none absolute -z-10 inset-0 blur-2xl" /> */}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
