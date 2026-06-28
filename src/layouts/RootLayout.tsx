import type { FC, ReactNode } from "react";
import MainLayout from "./MainLayout";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../hooks";


interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated → use MainLayout (with sidebar)
  // If NOT authenticated → use AuthLayout (minimal, no sidebar)

  if (isAuthenticated) {
    return <MainLayout>{children}</MainLayout>;
  }

  return <AuthLayout>{children}</AuthLayout>;
};

export default RootLayout;
