import { Route } from "wouter";
import { PageTransition } from "./PageTransition";

interface AnimatedRouteProps {
  path: string;
  component: () => React.JSX.Element;
}

export function AnimatedRoute({ path, component: Component }: AnimatedRouteProps) {
  return (
    <Route path={path}>
      <PageTransition>
        <Component />
      </PageTransition>
    </Route>
  );
}