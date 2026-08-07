import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Testimonials from '@/pages/Testimonials';
import Contact from '@/pages/Contact';
import TheVillages from '@/pages/TheVillages';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/not-found';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import Ocala from '@/pages/Ocala';
import Clermont from '@/pages/Clermont';
import Apopka from '@/pages/Apopka';
import LadyLake from '@/pages/LadyLake';
import Leesburg from '@/pages/Leesburg';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Admin — full-page, no nav/footer */}
      <Route path="/admin" component={Admin} />

      {/* Public site */}
      <Route>
        {() => (
          <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/services" component={Services} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/about" component={About} />
                <Route path="/testimonials" component={Testimonials} />
                <Route path="/contact" component={Contact} />
                <Route path="/villages-fl-flooring-installation" component={TheVillages} />
                <Route path="/ocala" component={Ocala} />
                <Route path="/clermont" component={Clermont} />
                <Route path="/apopka" component={Apopka} />
                <Route path="/lady-lake" component={LadyLake} />
                <Route path="/leesburg" component={Leesburg} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
