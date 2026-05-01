import React from "react";
import { useRoute } from "wouter";
import { useGetProperty, getGetPropertyQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Bed, Bath, Home, Calendar, Wrench, FileText, User } from "lucide-react";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export default function PropertyDetail() {
  const [, params] = useRoute("/properties/:id");
  const id = params?.id || "";

  const { data: property, isLoading } = useGetProperty(id, { 
    query: { enabled: !!id, queryKey: getGetPropertyQueryKey(id) } 
  });

  if (isLoading) {
    return <div className="space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-48 md:col-span-2" />
        <Skeleton className="h-48" />
      </div>
    </div>;
  }

  if (!property) return <div>Property not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Image hero — white text intentional: always overlaid on dark photo gradient */}
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-muted">
        {property.imageUrl ? (
          <img src={property.imageUrl} alt={property.address} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/50">
            <Home className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge variant={property.status === 'leased' ? 'default' : 'secondary'} className={property.status === 'leased' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                  {property.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-white/10 text-white">{property.type}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{property.address}</h1>
              <div className="flex items-center text-white/80 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                {property.suburb}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{formatCurrency(property.weeklyRent)}<span className="text-lg font-normal text-white/70">/w</span></div>
              <div className="flex items-center gap-4 mt-2 text-white/80">
                <div className="flex items-center"><Bed className="h-4 w-4 mr-1" /> {property.bedrooms}</div>
                <div className="flex items-center"><Bath className="h-4 w-4 mr-1" /> {property.bathrooms}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Lease Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tenant</p>
                  <p className="font-medium flex items-center gap-2"><User className="h-4 w-4" /> {property.tenantName || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expiry</p>
                  <p className="font-medium flex items-center gap-2"><Calendar className="h-4 w-4" /> {property.leaseExpiry ? new Date(property.leaseExpiry).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Landlord Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{property.landlordNotes || 'No notes available.'}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Active Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.maintenanceOpen > 0 ? (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                  <Wrench className="h-8 w-8 text-destructive mx-auto mb-2" />
                  <p className="font-bold text-destructive">{property.maintenanceOpen} Open Tickets</p>
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  <div className="bg-muted h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <p>No active issues</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
