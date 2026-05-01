import React, { useState } from "react";
import { Link } from "wouter";
import { useListProperties, getListPropertiesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Bed, Bath, Home, ArrowRight, Grid, List as ListIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export default function Properties() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const { data: properties, isLoading } = useListProperties(
    { status: statusFilter === "all" ? undefined : statusFilter }, 
    { query: { queryKey: getListPropertiesQueryKey({ status: statusFilter === "all" ? undefined : statusFilter }) } }
  );

  const filteredProperties = properties?.filter(p => 
    p.address.toLowerCase().includes(search.toLowerCase()) || 
    p.suburb.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage portfolio and track status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-primary/20 text-primary" : ""}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-primary/20 text-primary" : ""}>
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button>Add Property</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search address or suburb..." 
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
            <SelectItem value="leased">Leased</SelectItem>
            <SelectItem value="vacant">Vacant</SelectItem>
            <SelectItem value="for-lease">For Lease</SelectItem>
            <SelectItem value="for-sale">For Sale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredProperties?.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <Link href={`/properties/${property.id}`}>
                <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer bg-card/50 group h-full flex flex-col">
                  <div className="h-40 bg-muted relative overflow-hidden">
                    {property.imageUrl ? (
                      <img src={property.imageUrl} alt={property.address} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                        <Home className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant={
                        property.status === 'leased' ? 'default' : 
                        property.status === 'vacant' ? 'destructive' : 
                        'secondary'
                      } className={property.status === 'leased' ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30' : ''}>
                        {property.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    {property.maintenanceOpen > 0 && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="destructive" className="animate-pulse shadow-lg">
                          {property.maintenanceOpen} Issues
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{property.address}</h3>
                      <div className="flex items-center text-muted-foreground mt-1 text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {property.suburb} • {property.type}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center"><Bed className="h-4 w-4 mr-1" /> {property.bedrooms}</div>
                        <div className="flex items-center"><Bath className="h-4 w-4 mr-1" /> {property.bathrooms}</div>
                      </div>
                      <div className="font-bold text-primary">{formatCurrency(property.weeklyRent)}<span className="text-xs font-normal text-muted-foreground">/w</span></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card className="bg-card/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties?.map((property) => (
                <TableRow key={property.id} className="border-border/30 hover:bg-muted/50 cursor-pointer">
                  <TableCell>
                    <div className="font-medium">{property.address}</div>
                    <div className="text-xs text-muted-foreground">{property.suburb}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Home className="h-3.5 w-3.5" />
                      {property.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      property.status === 'leased' ? 'default' : 
                      property.status === 'vacant' ? 'destructive' : 
                      'secondary'
                    } className={property.status === 'leased' ? 'bg-green-500/20 text-green-600' : ''}>
                      {property.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(property.weeklyRent)}/w</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.tenantName || '—'}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/properties/${property.id}`}>
                      <Button variant="ghost" size="sm">View <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
