import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, ChevronRight } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, role: string) => void;
}

type Role = 'community' | 'asha' | 'official';

const roles = [
  {
    id: 'community' as Role,
    title: 'Community Member',
    description: 'Report symptoms and access health education',
    icon: Users,
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    id: 'asha' as Role,
    title: 'ASHA Worker',
    description: 'Conduct water tests and monitor health metrics',
    icon: Heart,
    color: 'bg-success/10 text-success border-success/20',
  },
  {
    id: 'official' as Role,
    title: 'Health Official',
    description: 'Access full dashboard and manage health data',
    icon: Shield,
    color: 'bg-warning/10 text-warning border-warning/20',
  },
];

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>('community');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just pass the email and role
    // In real implementation, this would handle authentication
    if (email) {
      onLogin(email, selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Sankat Mitra Alert
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isLogin && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Your Role</h3>
              <div className="grid gap-3">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                        selectedRole === role.id 
                          ? role.color + ' shadow-md' 
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{role.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {role.description}
                          </p>
                        </div>
                        {selectedRole === role.id && (
                          <ChevronRight className="h-5 w-5 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Demo Login - Select Role:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {roles.map((role) => (
                    <Badge
                      key={role.id}
                      variant={selectedRole === role.id ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      {role.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;