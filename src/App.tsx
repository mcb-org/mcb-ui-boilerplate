import type { FC } from "react";
import { BrowserRouter, useRoutes, Navigate, useLocation } from "react-router-dom";
import routes from "~react-pages";
import RootLayout from "./layouts/RootLayout";
import { useAuth } from "./hooks";
import { AuthProvider } from "./contexts/AuthProvider";

// Generate routes from pages/
const Routes = () => {
  return useRoutes(routes);
};

// Wrapper: Check auth + redirect if needed
const AppContent: FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Public pages (accessible without login)
  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.some((page) =>
    location.pathname.startsWith(page)
  );

  // If NOT logged in AND trying to access protected page → redirect to login
  if (!isAuthenticated && !isPublicPage) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise: Show RootLayout (which picks MainLayout or AuthLayout)
  return (
    <RootLayout>
      <Routes />
    </RootLayout>
  );
};

// Main App
const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
