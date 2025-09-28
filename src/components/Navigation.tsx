import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Heart, 
  LayoutDashboard, 
  FileText, 
  Droplets, 
  BookOpen, 
  Map, 
  User, 
  LogOut,
  Menu,
  Bell
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: string;
  userName: string;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange, 
  userRole, 
  userName, 
  onLogout 
}) => {
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['community', 'asha', 'official'] },
      { id: 'education', label: 'Health Education', icon: BookOpen, roles: ['community', 'asha', 'official'] },
      { id: 'map', label: 'Disease Map', icon: Map, roles: ['community', 'asha', 'official'] },
    ];

    const roleSpecificItems = [
      { id: 'symptoms', label: 'Report Symptoms', icon: FileText, roles: ['community'] },
      { id: 'water-test', label: 'Water Quality Test', icon: Droplets, roles: ['asha'] },
    ];

    return [...baseItems, ...roleSpecificItems].filter(item => 
      item.roles.includes(userRole)
    );
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-card shadow-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-bold text-lg">Sankat Mitra</h2>
              <p className="text-xs text-muted-foreground">Alert System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className="gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {userRole} {userRole === 'asha' ? 'Worker' : userRole === 'official' ? 'Official' : 'Member'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onPageChange('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <DropdownMenuItem 
                        key={item.id}
                        onClick={() => onPageChange(item.id)}
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;