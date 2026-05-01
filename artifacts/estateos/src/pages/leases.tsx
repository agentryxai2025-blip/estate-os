import React, { useState } from "react";
import { useListLeases, getListLeasesQueryKey } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, AlertCircle, FileCheck, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export default function Leases() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const { data: leases, isLoading } = useListLeases(
    { status: statusFilter === "all" ? undefined : statusFilter }, 
    { query: { queryKey: getListLeasesQueryKey({ status: statusFilter === "all" ? undefined : statusFilter }) } }
  );

  const filteredLeases = leases?.filter(l => 
    l.propertyAddress.toLowerCase().includes(search.toLowerCase()) || 
    l.tenantName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lease Management</h1>
          <p className="text-muted-foreground mt-1">Track expiries, compliance, and documents.</p>
        </div>
        <Button>New Lease</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search address or tenant..." 
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
            <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
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
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Property / Tenant</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeases?.map((lease, i) => {
                const expiringSoon = lease.daysUntilExpiry <= 60 && lease.daysUntilExpiry >= 0;
                const expired = lease.daysUntilExpiry < 0;

                return (
                  <motion.tr 
                    key={lease.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-border/30 hover:bg-muted/50 transition-colors cursor-pointer ${expiringSoon ? 'bg-orange-500/5' : expired ? 'bg-destructive/5' : ''}`}
                  >
                    <TableCell>
                      <div className="font-medium">{lease.propertyAddress}</div>
                      <div className="text-xs text-muted-foreground mt-1">Tenant: {lease.tenantName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground whitespace-nowrap">{new Date(lease.startDate).toLocaleDateString()} - {new Date(lease.endDate).toLocaleDateString()}</div>
                      <div className={`text-xs font-medium mt-1 ${expiringSoon ? 'text-orange-500 flex items-center gap-1' : expired ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {expiringSoon && <AlertCircle className="h-3 w-3" />}
                        {expired ? 'Expired' : `${lease.daysUntilExpiry} days left`}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(lease.weeklyRent)}/w</TableCell>
                    <TableCell>
                      {lease.documentParsed ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" /> Parsed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" /> Pending
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={lease.complianceStatus === 'compliant' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'}>
                        {lease.complianceStatus === 'compliant' ? <FileCheck className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        {lease.complianceStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={lease.status === 'active' ? 'default' : 'secondary'} className={lease.status === 'active' ? 'bg-primary/20 text-primary' : ''}>
                        {lease.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
