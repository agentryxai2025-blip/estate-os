import React, { useState } from "react";
import { Link } from "wouter";
import { useListTenants, getListTenantsQueryKey } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Mail, Phone, ArrowRight, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export default function Tenants() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const { data: tenants, isLoading } = useListTenants(
    { status: statusFilter === "all" ? undefined : statusFilter }, 
    { query: { queryKey: getListTenantsQueryKey({ status: statusFilter === "all" ? undefined : statusFilter }) } }
  );

  const filteredTenants = tenants?.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.propertyAddress.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground mt-1">Manage tenants and track arrears.</p>
        </div>
        <Button>Add Tenant</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name or address..." 
            className="pl-9 bg-card/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-card/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="arrears">In Arrears</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Card className="bg-card/50">
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        </Card>
      ) : (
        <Card className="bg-card/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants?.map((tenant, i) => (
                <motion.tr 
                  key={tenant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${tenant.arrears > 0 ? 'bg-destructive/5' : ''}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarFallback className="bg-primary/20 text-primary">{tenant.avatarInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          {tenant.arrears > 0 && <AlertCircle className="h-3 w-3 text-destructive" />}
                          {tenant.arrears > 0 ? <span className="text-destructive font-medium">{formatCurrency(tenant.arrears)} in arrears</span> : 'Up to date'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {tenant.propertyAddress}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {tenant.email}</div>
                      <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {tenant.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(tenant.weeklyRent)}/w</TableCell>
                  <TableCell>
                    <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'} className={tenant.status === 'active' ? 'bg-green-500/20 text-green-500' : ''}>
                      {tenant.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/tenants/${tenant.id}`}>
                      <Button variant="ghost" size="sm">View <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </Link>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
