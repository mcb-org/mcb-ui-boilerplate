import type { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_22%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[1440px] items-center justify-center lg:min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
