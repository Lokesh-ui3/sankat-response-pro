import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Droplets, 
  Brain, 
  FileText,
  Users,
  Activity,
  Calendar,
  Clock
} from 'lucide-react';

interface DashboardProps {
  userRole: string;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userName }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'community': return 'Community Member';
      case 'asha': return 'ASHA Worker';
      case 'official': return 'Health Official';
      default: return 'User';
    }
  };

  const alertsData = [
    { id: 1, type: 'High', message: 'Dengue outbreak risk in Sector A', severity: 'destructive', time: '2 hours ago' },
    { id: 2, type: 'Medium', message: 'Water contamination detected in Zone 3', severity: 'warning', time: '4 hours ago' },
    { id: 3, type: 'Low', message: 'Seasonal flu increase reported', severity: 'secondary', time: '1 day ago' },
  ];

  const recentReports = [
    { id: 1, type: 'Symptom Report', location: 'Village A', time: '30 min ago', status: 'pending' },
    { id: 2, type: 'Water Test', location: 'Zone B', time: '1 hour ago', status: 'completed' },
    { id: 3, type: 'Health Survey', location: 'Sector C', time: '2 hours ago', status: 'review' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      {/* Header */}
      <div className="bg-card shadow-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {getGreeting()}, {userName}
              </h1>
              <p className="text-muted-foreground">
                {getRoleTitle(userRole)} • Sankat Mitra Alert System
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Reports Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-full">
                  <MapPin className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Villages Monitored</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-info/10 rounded-full">
                  <Droplets className="h-6 w-6 text-info-cyan" />
                </div>
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">Water Tests Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Alerts */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Health Alerts
              </CardTitle>
              <CardDescription>
                Current health alerts requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertsData.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={alert.severity as any}>
                        {alert.type} Priority
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm font-medium">{alert.message}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Outbreak Prediction */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Prediction
              </CardTitle>
              <CardDescription>
                Machine learning outbreak analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning rounded-full mb-4">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Moderate Risk</span>
                </div>
                <p className="text-2xl font-bold text-warning">68%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Probability of dengue outbreak in next 7 days based on weather patterns and symptom reports
                </p>
              </div>
              <Button className="w-full" variant="outline">
                View Full Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Health Reports
            </CardTitle>
            <CardDescription>
              Latest submissions and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{report.type}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                        <span>•</span>
                        <span>{report.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={
                    report.status === 'completed' ? 'default' : 
                    report.status === 'pending' ? 'secondary' : 'outline'
                  }>
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;