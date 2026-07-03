import type { FC } from "react";
import { BrowserRouter, Navigate, useLocation, useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "~react-pages";
import RootLayout from "./layouts/RootLayout";
import { useAuth } from "./hooks";
import { AuthProvider } from "./contexts/AuthProvider";

const Routes = () => useRoutes(routes);

const AppContent: FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.some((page) => location.pathname.startsWith(page));

  if (!isAuthenticated && !isPublicPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <RootLayout>
      <Routes />
    </RootLayout>
  );
};

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-center"
          gutter={10}
          containerStyle={{ bottom: 20 }}
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#312e81",
              border: "1px solid #e9d5ff",
              borderRadius: "14px",
              fontSize: "13px",
              padding: "12px 16px",
              boxShadow: "0 16px 40px rgba(91, 33, 182, 0.14)",
              maxWidth: "380px",
            },
          }}
        />
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
