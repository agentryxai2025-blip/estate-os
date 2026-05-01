import React from "react";
import { useRoute } from "wouter";
import { useGetTenant, getGetTenantQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Home, Calendar, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export default function TenantDetail() {
  const [, params] = useRoute("/tenants/:id");
  const id = params?.id || "";

  const { data: tenant, isLoading } = useGetTenant(id, { 
    query: { enabled: !!id, queryKey: getGetTenantQueryKey(id) } 
  });

  if (isLoading) {
    return <div className="space-y-6">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>;
  }

  if (!tenant) return <div>Tenant not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className={`border-white/5 bg-card/50 overflow-hidden relative ${tenant.arrears > 0 ? 'border-destructive/30' : ''}`}>
        {tenant.arrears > 0 && <div className="absolute top-0 left-0 right-0 h-1 bg-destructive" />}
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-2 border-white/10">
              <AvatarFallback className="text-3xl bg-primary/20 text-primary">{tenant.avatarInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{tenant.name}</h1>
                  <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'} className={`mt-2 ${tenant.status === 'active' ? 'bg-green-500/20 text-green-500' : ''}`}>
                    {tenant.status.toUpperCase()}
                  </Badge>
                </div>
                {tenant.arrears > 0 && (
                  <div className="text-right bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                    <div className="text-sm font-medium text-destructive flex items-center gap-1 justify-end"><AlertTriangle className="h-4 w-4" /> Current Arrears</div>
                    <div className="text-2xl font-bold text-destructive">{formatCurrency(tenant.arrears)}</div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {tenant.email}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {tenant.phone}</div>
                <div className="flex items-center gap-2 text-primary"><Home className="h-4 w-4" /> {tenant.propertyAddress}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Lease Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-muted-foreground">Weekly Rent</span>
              <span className="font-bold">{formatCurrency(tenant.weeklyRent)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-muted-foreground">Lease Start</span>
              <span className="font-medium">{new Date(tenant.leaseStart).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-muted-foreground">Lease End</span>
              <span className="font-medium">{new Date(tenant.leaseEnd).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
