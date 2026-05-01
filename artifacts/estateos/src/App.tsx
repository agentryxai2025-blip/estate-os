import React from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/lib/theme-context";

import Dashboard from "@/pages/dashboard";
import Properties from "@/pages/properties";
import PropertyDetail from "@/pages/property-detail";
import Tenants from "@/pages/tenants";
import TenantDetail from "@/pages/tenant-detail";
import Maintenance from "@/pages/maintenance";
import Leases from "@/pages/leases";
import Landlords from "@/pages/landlords";
import Campaigns from "@/pages/campaigns";
import DataSources from "@/pages/data-sources";
import AiConfig from "@/pages/ai-config";
import Audit from "@/pages/audit";
import Architecture from "@/pages/architecture";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/properties" component={Properties} />
        <Route path="/properties/:id" component={PropertyDetail} />
        <Route path="/tenants" component={Tenants} />
        <Route path="/tenants/:id" component={TenantDetail} />
        <Route path="/maintenance" component={Maintenance} />
        <Route path="/leases" component={Leases} />
        <Route path="/landlords" component={Landlords} />
        <Route path="/campaigns" component={Campaigns} />
        <Route path="/data-sources" component={DataSources} />
        <Route path="/ai-config" component={AiConfig} />
        <Route path="/audit" component={Audit} />
        <Route path="/architecture" component={Architecture} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
