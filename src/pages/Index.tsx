import React, { useState } from 'react';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import Navigation from '@/components/Navigation';
import SymptomReportForm from '@/components/SymptomReportForm';
import WaterQualityForm from '@/components/WaterQualityForm';
import HealthEducation from '@/components/HealthEducation';
import DiseaseMap from '@/components/DiseaseMap';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string; name: string } | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (email: string, role: string) => {
    // Extract name from email for demo purposes
    const name = email.split('@')[0];
    setUser({ email, role, name });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={user.role} userName={user.name} />;
      case 'symptoms':
        return <SymptomReportForm />;
      case 'water-test':
        return <WaterQualityForm />;
      case 'education':
        return <HealthEducation />;
      case 'map':
        return <DiseaseMap />;
      default:
        return <Dashboard userRole={user.role} userName={user.name} />;
    }
  };

  if (!isAuthenticated || !user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userRole={user.role}
        userName={user.name}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
};

export default Index;
