import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map, MapPin, Activity, AlertTriangle, TrendingUp, Filter } from 'lucide-react';

const DiseaseMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');

  const diseaseData = [
    {
      id: 1,
      location: 'Sector A - Village 1',
      disease: 'Dengue',
      cases: 12,
      severity: 'high',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      lastUpdated: '2 hours ago',
      trend: 'increasing'
    },
    {
      id: 2,
      location: 'Zone B - Village 2',
      disease: 'Typhoid',
      cases: 5,
      severity: 'medium',
      coordinates: { lat: 28.6200, lng: 77.2150 },
      lastUpdated: '4 hours ago',
      trend: 'stable'
    },
    {
      id: 3,
      location: 'Sector C - Village 3',
      disease: 'Malaria',
      cases: 3,
      severity: 'low',
      coordinates: { lat: 28.6080, lng: 77.2050 },
      lastUpdated: '1 day ago',
      trend: 'decreasing'
    },
    {
      id: 4,
      location: 'Zone D - Village 4',
      disease: 'Chikungunya',
      cases: 8,
      severity: 'medium',
      coordinates: { lat: 28.6250, lng: 77.2200 },
      lastUpdated: '6 hours ago',
      trend: 'increasing'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-3 w-3 text-destructive" />;
      case 'decreasing': return <TrendingUp className="h-3 w-3 text-success rotate-180" />;
      default: return <Activity className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const filteredData = diseaseData.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.severity === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <Map className="h-5 w-5" />
            <span className="font-medium">Disease Hotspot Map</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Community Health Monitoring</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time visualization of disease outbreaks and health alerts across monitored areas.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="high">High Severity</SelectItem>
              <SelectItem value="medium">Medium Severity</SelectItem>
              <SelectItem value="low">Low Severity</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <Card className="lg:col-span-2 shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Disease Map
              </CardTitle>
              <CardDescription>
                Geographic visualization of disease hotspots and health alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground mb-4">
                    Disease hotspot visualization will be displayed here
                  </p>
                  <Button variant="outline">
                    Load Map View
                  </Button>
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <h4 className="font-medium mb-3">Legend</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-xs">High Risk (10+ cases)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-xs">Medium Risk (5-9 cases)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-xs">Low Risk (1-4 cases)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-xs">No Cases</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disease Summary */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Active Hotspots
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredData.map((item) => (
                  <div key={item.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{item.location}</h4>
                        <p className="text-xs text-muted-foreground">{item.lastUpdated}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.disease}</p>
                        <p className="text-sm text-muted-foreground">{item.cases} cases</p>
                      </div>
                      <Badge variant={getSeverityColor(item.severity) as any}>
                        {item.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-destructive/10 rounded-lg">
                    <p className="text-2xl font-bold text-destructive">4</p>
                    <p className="text-xs text-muted-foreground">Active Hotspots</p>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <p className="text-2xl font-bold text-warning">28</p>
                    <p className="text-xs text-muted-foreground">Total Cases</p>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success">24</p>
                    <p className="text-xs text-muted-foreground">Areas Monitored</p>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">156</p>
                    <p className="text-xs text-muted-foreground">Reports Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Panel */}
            <Card className="shadow-alert bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Priority Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-2">
                  Dengue outbreak detected in Sector A
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  12 confirmed cases in the last 48 hours. Immediate vector control measures recommended.
                </p>
                <Button size="sm" variant="destructive" className="w-full">
                  View Full Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseMap;