import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Droplets, Bug, Shield, PlayCircle } from 'lucide-react';

const HealthEducation = () => {
  const educationContent = [
    {
      id: 1,
      title: 'Dengue Prevention and Symptoms',
      category: 'Vector-borne Diseases',
      icon: Bug,
      description: 'Learn about dengue fever symptoms, prevention methods, and when to seek medical help.',
      difficulty: 'Beginner',
      duration: '5 min read',
      color: 'destructive',
      content: [
        'High fever (40°C/104°F)',
        'Severe headache',
        'Pain behind eyes',
        'Muscle and joint pains',
        'Skin rash'
      ]
    },
    {
      id: 2,
      title: 'Water Purification Methods',
      category: 'Water Safety',
      icon: Droplets,
      description: 'Safe methods to purify water at home and prevent waterborne diseases.',
      difficulty: 'Beginner',
      duration: '7 min read',
      color: 'info',
      content: [
        'Boiling water for 10-15 minutes',
        'Using water purification tablets',
        'Solar water disinfection (SODIS)',
        'Proper storage in clean containers'
      ]
    },
    {
      id: 3,
      title: 'Community Health Monitoring',
      category: 'Public Health',
      icon: Heart,
      description: 'Understanding the importance of community health surveillance and reporting.',
      difficulty: 'Intermediate',
      duration: '10 min read',
      color: 'success',
      content: [
        'Early detection of disease outbreaks',
        'Importance of accurate reporting',
        'Community participation in health monitoring',
        'Role of ASHA workers and health officials'
      ]
    },
    {
      id: 4,
      title: 'Personal Hygiene Best Practices',
      category: 'Prevention',
      icon: Shield,
      description: 'Essential hygiene practices to prevent the spread of infectious diseases.',
      difficulty: 'Beginner',
      duration: '6 min read',
      color: 'warning',
      content: [
        'Proper handwashing technique',
        'Food safety and preparation',
        'Personal cleanliness',
        'Environmental sanitation'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'destructive': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'success': return 'bg-success/10 text-success border-success/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      case 'info': return 'bg-info/10 text-info-cyan border-info/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">Health Education Center</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Community Health Resources</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access essential health information to keep yourself and your community safe. 
            Learn about disease prevention, water safety, and public health best practices.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge variant="outline" className="px-4 py-2">All Topics</Badge>
          <Badge variant="outline" className="px-4 py-2">Vector-borne Diseases</Badge>
          <Badge variant="outline" className="px-4 py-2">Water Safety</Badge>
          <Badge variant="outline" className="px-4 py-2">Prevention</Badge>
          <Badge variant="outline" className="px-4 py-2">Public Health</Badge>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationContent.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.id} className="shadow-card hover:shadow-elevated transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-full ${getColorClasses(item.color)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{item.category}</Badge>
                      <div className="text-xs text-muted-foreground">{item.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Points:</h4>
                    <ul className="space-y-1">
                      {item.content.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.difficulty}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <PlayCircle className="h-4 w-4" />
                        Watch Video
                      </Button>
                      <Button size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 bg-destructive/5 border-destructive/20 shadow-alert">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Emergency Health Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-semibold mb-1">Emergency Helpline</p>
                <p className="text-2xl font-bold text-destructive">108</p>
              </div>
              <div className="text-center">
                <p className="font-semibold mb-1">District Health Office</p>
                <p className="text-lg font-semibold">+91-XXXX-XXXXXX</p>
              </div>
              <div className="text-center">
                <p className="font-semibold mb-1">Nearest Hospital</p>
                <p className="text-sm text-muted-foreground">Community Health Center<br />Main Road, District</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthEducation;