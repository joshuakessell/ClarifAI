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
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { AnimatedRoute } from "@/components/AnimatedRoute";

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
      <AnimatedRoute path="/" component={Home} />
      <AnimatedRoute path="/topic/:slug" component={Topic} />
      <AnimatedRoute path="/conflict-view/:id" component={ConflictView} />
      <AnimatedRoute path="/timeline/:id" component={Timeline} />
      <ProtectedRoute path="/research" component={ResearchDashboard} />
      <ProtectedRoute path="/research/:id" component={ResearchDetails} />
      <AnimatedRoute path="/auth" component={AuthPage} />
      
      {/* Platform pages */}
      <AnimatedRoute path="/how-it-works" component={HowItWorks} />
      <AnimatedRoute path="/methodology" component={Methodology} />
      <AnimatedRoute path="/source-verification" component={SourceVerification} />
      <AnimatedRoute path="/bias-detection" component={BiasDetection} />
      
      {/* Company pages */}
      <AnimatedRoute path="/about-us" component={AboutUs} />
      <AnimatedRoute path="/team" component={Team} />
      <AnimatedRoute path="/press" component={Press} />
      <AnimatedRoute path="/contact" component={Contact} />
      
      {/* Legal pages */}
      <AnimatedRoute path="/privacy-policy" component={PrivacyPolicy} />
      <AnimatedRoute path="/terms-of-service" component={TermsOfService} />
      <AnimatedRoute path="/cookie-policy" component={CookiePolicy} />
      <AnimatedRoute path="/gdpr-compliance" component={GDPRCompliance} />
      
      {/* 404 not found route - must be last */}
      <AnimatedRoute path="/:rest*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <AnimatedRoutes>
          <Router />
        </AnimatedRoutes>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
