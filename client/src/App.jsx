import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FDF4] to-[#E2F4CC]">
      <div className="container-custom py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-[#0D1117]">Grow</span>
          <span className="text-[#7ED957]">O</span>
        </h1>
        <p className="text-xl md:text-2xl mb-2">
          <span className="text-[#7ED957] font-semibold">Grow</span>
          <span className="text-[#0D1117]"> every day. </span>
          <span className="text-[#7ED957] font-semibold">Go</span>
          <span className="text-[#0D1117]"> every day.</span>
        </p>
        <p className="text-gray-600 text-lg mb-8">AI-powered growth tracker for developers</p>

        <div className="card max-w-md mx-auto">
          <p className="text-gray-600 mb-4">Welcome to GrowO! The initial setup is complete.</p>
          <div className="space-y-2 text-sm text-left">
            <p>✓ Monorepo structure initialized</p>
            <p>✓ Express server configured</p>
            <p>✓ React + Vite frontend ready</p>
            <p>✓ MongoDB connection setup</p>
            <p>✓ Tailwind CSS integrated</p>
          </div>
          <p className="text-gray-500 text-xs mt-4">Next: Phase 2 - Authentication System</p>
        </div>
      </div>
    </div>
  );
}

export default App;
