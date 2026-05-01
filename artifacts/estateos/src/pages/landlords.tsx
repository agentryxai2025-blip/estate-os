import React, { useState } from "react";
import { useListLandlords, getListLandlordsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Mail, Phone, Building2, AlertTriangle, TrendingDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export default function Landlords() {
  const [search, setSearch] = useState("");

  const { data: landlords, isLoading } = useListLandlords({ query: { queryKey: getListLandlordsQueryKey() } });

  const filteredLandlords = landlords?.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const getChurnRiskColor = (risk: string) => {
    switch(risk) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getChurnRiskBgColor = (risk: string) => {
    switch(risk) {
      case 'critical': return 'bg-destructive/10 border-destructive/20';
      case 'high': return 'bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20';
      default: return 'bg-green-500/10 border-green-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landlord Rent Roll</h1>
          <p className="text-muted-foreground mt-1">Manage clients and monitor AI churn risk scores.</p>
        </div>
        <Button>Add Landlord</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search landlord name..." 
          className="pl-9 bg-card/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLandlords?.map((landlord, i) => {
            const isHighRisk = landlord.churnRisk === 'critical' || landlord.churnRisk === 'high';

            return (
              <motion.div
                key={landlord.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`bg-card/50 overflow-hidden border-border/50 h-full ${isHighRisk ? 'border-destructive/30' : ''}`}>
                  {isHighRisk && <div className="h-1 w-full bg-destructive" />}
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarFallback className="bg-primary/20 text-primary">{landlord.avatarInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{landlord.name}</CardTitle>
                          <CardDescription className="flex gap-4 mt-1">
                            <span className="flex items-center"><Building2 className="h-3.5 w-3.5 mr-1" /> {landlord.propertiesCount} Props</span>
                            <span>{formatCurrency(landlord.portfolioValue)}</span>
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" /> AI Risk Score
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getChurnRiskColor(landlord.churnRisk)}`}>{landlord.churnScore}</span>
                          <span className="text-muted-foreground text-sm">/ 100</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {landlord.email}</div>
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {landlord.phone}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Top Risk Factors</h4>
                        <ul className="space-y-1">
                          {landlord.topRiskFactors.map((factor, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${getChurnRiskBgColor(landlord.churnRisk)}`}>
                        <h4 className={`text-sm font-medium mb-1 ${getChurnRiskColor(landlord.churnRisk)}`}>Recommended Action</h4>
                        <p className="text-sm text-foreground/80">{landlord.recommendedIntervention}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
