import React from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Wrench, 
  FileText, 
  UserCircle, 
  Megaphone, 
  Database, 
  Settings2, 
  History
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/properties", icon: Home },
  { name: "Tenants", href: "/tenants", icon: Users },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Leases", href: "/leases", icon: FileText },
  { name: "Landlords", href: "/landlords", icon: UserCircle },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Data Sources", href: "/data-sources", icon: Database },
  { name: "AI Config", href: "/ai-config", icon: Settings2 },
  { name: "Audit Log", href: "/audit", icon: History },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden dark">
      <div className="w-64 border-r bg-card flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b font-bold text-lg tracking-tight">
          EstateOS
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.startsWith(item.href);
              return (
                <Link key={item.name} href={item.href} className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
