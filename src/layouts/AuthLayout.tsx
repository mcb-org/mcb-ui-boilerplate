import type { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl">
        {/* Logo/Brand */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            MC
          </div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Medi Car</h1>
            </div>

        {/* Content */}
        {children}

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>&copy; 2026 Medi Care. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
