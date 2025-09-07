import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import AdminDashboard from "@/pages/admin/dashboard";
import EmployeeDashboard from "@/pages/employee/dashboard";
import WeekodWorkspace from "@/pages/weekod-workspace";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SplashCursor from "./components/ui/SplashCursor";
import { useState, useEffect } from "react";
import { InteractiveFeatures } from "@/components/ui/interactive-features";

// Protected route component
const ProtectedRoute = ({ component: Component, adminOnly = false, ...rest }: any) => {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      setIsAuthenticated(false);
      setLocation('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      setIsAdmin(userData.role === 'admin');
      setIsAuthenticated(true);
      
      if (adminOnly && userData.role !== 'admin') {
        setLocation('/employee/dashboard');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setLocation('/login');
    }
  }, [setLocation, adminOnly]);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (adminOnly && !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return <Component {...rest} />;
};

function Router() {
  const [location] = useLocation();
  const isAuthRoute = location.includes('/admin') || location.includes('/employee') || location === '/login' || location === '/weekod-workspace';

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin/dashboard">
        <ProtectedRoute component={AdminDashboard} adminOnly={true} />
      </Route>
      <Route path="/employee/dashboard">
        <ProtectedRoute component={EmployeeDashboard} />
      </Route>
      <Route path="/weekod-workspace" component={WeekodWorkspace} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthRoute = location.includes('/admin') || location.includes('/employee') || location === '/login' || location === '/weekod-workspace';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-dark flex flex-col">
        {!isAuthRoute && <Header toggleMobileMenu={toggleMobileMenu} />}
        <main className={`flex-grow ${isAuthRoute ? 'bg-gray-900' : ''}`}>
          <AnimatePresence mode="wait">
            <Router />
          </AnimatePresence>
        </main>
        {!isAuthRoute && <Footer />}
        {!isAuthRoute && <InteractiveFeatures />}
      </div>
      <Toaster />
      <SplashCursor />
    </QueryClientProvider>
  );
}

export default App;
