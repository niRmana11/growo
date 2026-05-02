export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} GrowO. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">Build consistency. Achieve greatness.</p>
      </div>
    </footer>
  );
}
