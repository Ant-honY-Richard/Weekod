import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-dark flex flex-col">
        <Header toggleMobileMenu={toggleMobileMenu} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Router />
          </AnimatePresence>
        </main>
        <Footer />
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
