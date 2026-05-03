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
  History,
  Network,
  BookMarked,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
  { name: "Architecture", href: "/architecture", icon: Network },
  { name: "Strategy Hub", href: "/strategy-hub", icon: BookMarked },
  { name: "Branch Alignment", href: "/team-alignment", icon: UserCheck },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <div className="w-64 border-r flex flex-col hidden md:flex shrink-0" style={{ background: "hsl(var(--sidebar))", borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="h-16 flex items-center px-6 border-b font-bold text-lg tracking-tight" style={{ borderColor: "hsl(var(--sidebar-border))", color: "hsl(var(--sidebar-foreground))" }}>
          EstateOS
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-0.5">
            {navigation.map((item) => {
              const isActive = location.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-sidebar-primary-foreground"
                      : "hover:opacity-100"
                  )}
                  style={isActive ? {
                    background: "hsl(var(--sidebar-primary) / 0.18)",
                    color: "hsl(var(--sidebar-primary))",
                  } : {
                    color: "hsl(var(--sidebar-foreground) / 0.65)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "hsl(var(--sidebar-accent))";
                      (e.currentTarget as HTMLElement).style.color = "hsl(var(--sidebar-accent-foreground))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "hsl(var(--sidebar-foreground) / 0.65)";
                    }
                  }}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <ThemeSwitcher />
      </div>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
