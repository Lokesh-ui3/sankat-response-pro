import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Clock,
  Zap,
  Loader2
} from 'lucide-react';

interface DashboardProps {
  userRole: string;
  userName: string;
}

// Interface for the prediction result from the backend
interface PredictionResult {
    prediction: number;
    risk_label: string;
    probabilities: {
        low: number;
        medium: number;
        high: number;
    };
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userName }) => {
    // State for the new live prediction form
    const [predictionInput, setPredictionInput] = useState({
        temperature_celsius: 28.5,
        rainfall_mm: 5.2,
        ph_level: 7.1,
        turbidity_ntu: 3.5,
        chlorine_mg_per_l: 0.4,
        reported_symptoms_count: 5,
        is_contaminated: 0, // 0 for Negative, 1 for Positive
    });
    const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


  const getGreeting = () => {
    // ... (rest of your existing component code remains the same)
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
    { id: 1, type: 'High', message: 'Dengue outbreak risk in Sector A', severity: 'destructive' as const, time: '2 hours ago' },
    { id: 2, type: 'Medium', message: 'Water contamination detected in Zone 3', severity: 'warning' as const, time: '4 hours ago' },
    { id: 3, type: 'Low', message: 'Seasonal flu increase reported', severity: 'secondary' as const, time: '1 day ago' },
  ];

  const recentReports = [
    { id: 1, type: 'Symptom Report', location: 'Village A', time: '30 min ago', status: 'pending' },
    { id: 2, type: 'Water Test', location: 'Zone B', time: '1 hour ago', status: 'completed' },
    { id: 3, type: 'Health Survey', location: 'Sector C', time: '2 hours ago', status: 'review' },
  ];

  // --- NEW: Function to handle input changes for the prediction form ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPredictionInput(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // --- NEW: Function to call the backend for a prediction ---
  const handleGetPrediction = async () => {
      setIsLoading(true);
      setError(null);
      setPredictionResult(null);

      // We need to add the date-based features the model expects
      const now = new Date();
      const featurePayload = {
          ...predictionInput,
          // These are dummy values but required by the model.
          // A real implementation might get these from a selected village.
          latitude: 26.0,
          longitude: 92.0,
          population: 1500,
          // Date features
          month: now.getMonth() + 1,
          day_of_year: Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000),
          day_of_week: now.getDay(),
      };
      
      try {
          // --- Reverted to point to the Node.js server ---
          const response = await fetch('http://localhost:3001/api/predict', { 
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(featurePayload),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to get prediction.');
          }

          const result: PredictionResult = await response.json();
          setPredictionResult(result);

      } catch (err: any) {
          setError(err.message);
          console.error("Prediction error:", err);
      } finally {
          setIsLoading(false);
      }
  };


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
          {/* ... Your existing 4 stat cards ... */}
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

        {/* --- NEW: Live Risk Prediction Card --- */}
        <Card className="mb-6 shadow-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary"/>Live Risk Prediction</CardTitle>
                <CardDescription>Enter current conditions to get a real-time risk assessment from the AI model.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {Object.entries(predictionInput).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                            <Label htmlFor={key} className="text-xs capitalize">{key.replace(/_/g, ' ')}</Label>
                            <Input
                                id={key}
                                name={key}
                                type="number"
                                value={value}
                                onChange={handleInputChange}
                                step={key.includes('mm') || key.includes('ntu') ? '0.1' : '1'}
                            />
                        </div>
                    ))}
                </div>
                <Button onClick={handleGetPrediction} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Analyzing...' : 'Predict Risk Level'}
                </Button>

                {predictionResult && (
                    <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                        <h4 className="font-semibold mb-2">Prediction Result:</h4>
                        <div className="flex items-center gap-4">
                           <Badge variant={
                                predictionResult.risk_label === 'High Risk' ? 'destructive' : 
                                predictionResult.risk_label === 'Medium Risk' ? 'warning' : 'success'
                            } className="text-lg px-4 py-1">
                                {predictionResult.risk_label}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                                <p>Low: {(predictionResult.probabilities.low * 100).toFixed(2)}%</p>
                                <p>Medium: {(predictionResult.probabilities.medium * 100).toFixed(2)}%</p>
                                <p>High: {(predictionResult.probabilities.high * 100).toFixed(2)}%</p>
                            </div>
                        </div>
                    </div>
                )}
                {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
            </CardContent>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Alerts */}
          <Card className="lg:col-span-2 shadow-card">
            {/* ... Your existing alerts card ... */}
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
                      <Badge variant={alert.severity}>
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
            {/* ... Your existing AI prediction card ... */}
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
          {/* ... Your existing recent reports card ... */}
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