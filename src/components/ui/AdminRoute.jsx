import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, isLoadingAuth, user } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const role = user?.role;
  if (role !== "admin" && role !== "moderator") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6 text-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Access Denied ]</span>
          <h1 className="mt-4 font-heading font-bold text-3xl">Restricted Area</h1>
          <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
            Your account does not have permission to access the Carbotech control panel. Contact an administrator if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet context={{ user }} />;
}