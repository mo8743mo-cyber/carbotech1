import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lip/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ui/ScrollToTop';
import { LanguageProvider } from '@/lib/i18n';

// Public site
import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import Spoilers from '@/pages/Spoilers';
import MirrorCaps from '@/pages/MirrorCaps';
import CustomParts from '@/pages/CustomParts';
import Technology from '@/pages/Technology';
import Portfolio from '@/pages/Portfolio';
import About from '@/pages/About';
import SalesGuide from '@/pages/SalesGuide';
import Quote from '@/pages/Quote';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';

// Auth
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Admin
import AdminRoute from '@/components/AdminRoute';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminOverview from '@/pages/admin/AdminOverview';
import AdminInquiries from '@/pages/admin/AdminInquiries';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminPortfolio from '@/pages/admin/AdminPortfolio';
import AdminMedia from '@/pages/admin/AdminMedia';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public site */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/spoilers" element={<Spoilers />} />
        <Route path="/mirror-caps" element={<MirrorCaps />} />
        <Route path="/custom-parts" element={<CustomParts />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/sales-guide" element={<SalesGuide />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin backend */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/admin/media" element={<AdminMedia />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App