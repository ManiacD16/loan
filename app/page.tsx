// app/page.tsx
"use client";

import dynamic from "next/dynamic";

// Build a client-only component that wraps App with BrowserRouter
const ClientOnlyApp = dynamic(async () => {
  const { BrowserRouter } = await import("react-router-dom");
  const App = (await import("../src/App")).default;

  // Return a component so BrowserRouter renders only on the client
  return function Wrapped() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };
}, { ssr: false });

export default function Page() {
  return <ClientOnlyApp />;
}
