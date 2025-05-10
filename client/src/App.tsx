import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Topic from "@/pages/topic";
import ConflictView from "@/pages/conflict-view";
import Timeline from "@/pages/timeline";
import AuthPage from "@/pages/auth-page";
import ResearchDashboard from "@/pages/research-dashboard";
import ResearchDetails from "@/pages/research-details";
import { AuthProvider } from "@/lib/auth-context";
import { ProtectedRoute } from "@/lib/protected-route";

// Import all static pages
import HowItWorks from "@/pages/static/HowItWorks";
import Methodology from "@/pages/static/Methodology";
import SourceVerification from "@/pages/static/SourceVerification";
import BiasDetection from "@/pages/static/BiasDetection";
import AboutUs from "@/pages/static/AboutUs";
import Team from "@/pages/static/Team";
import Press from "@/pages/static/Press";
import Contact from "@/pages/static/Contact";
import PrivacyPolicy from "@/pages/static/PrivacyPolicy";
import TermsOfService from "@/pages/static/TermsOfService";
import CookiePolicy from "@/pages/static/CookiePolicy";
import GDPRCompliance from "@/pages/static/GDPRCompliance";

function Router() {
  return (
    <Switch>
      {/* Main application routes */}
      <ProtectedRoute path="/" component={Home} />
      <ProtectedRoute path="/topic/:slug" component={Topic} />
      <ProtectedRoute path="/conflict-view/:id" component={ConflictView} />
      <ProtectedRoute path="/timeline/:id" component={Timeline} />
      <ProtectedRoute path="/research" component={ResearchDashboard} />
      <ProtectedRoute path="/research/:id" component={ResearchDetails} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Platform pages */}
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/methodology" component={Methodology} />
      <Route path="/source-verification" component={SourceVerification} />
      <Route path="/bias-detection" component={BiasDetection} />
      
      {/* Company pages */}
      <Route path="/about-us" component={AboutUs} />
      <Route path="/team" component={Team} />
      <Route path="/press" component={Press} />
      <Route path="/contact" component={Contact} />
      
      {/* Legal pages */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/gdpr-compliance" component={GDPRCompliance} />
      
      {/* 404 not found route - must be last */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
