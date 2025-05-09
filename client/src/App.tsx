import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Topic from "@/pages/topic";
import ConflictView from "@/pages/conflict-view";
import Timeline from "@/pages/timeline";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/topic/:slug" component={Topic} />
      <Route path="/conflict-view/:id" component={ConflictView} />
      <Route path="/timeline/:id" component={Timeline} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
