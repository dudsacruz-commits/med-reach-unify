import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AttendantDashboard } from "@/components/dashboard/AttendantDashboard";
import { ManagerDashboard } from "@/components/dashboard/ManagerDashboard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3 } from "lucide-react";

const Index = () => {
  const [viewMode, setViewMode] = useState<'attendant' | 'manager'>('attendant');

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Mode Selector */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sistema Omnichannel - Clínica Médica</h1>
            <p className="text-muted-foreground">Plataforma unificada de atendimento ao paciente</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary-light text-primary">
              Demo Mode
            </Badge>
            <Button
              variant={viewMode === 'attendant' ? 'default' : 'outline'}
              onClick={() => setViewMode('attendant')}
              size="sm"
            >
              <Users className="h-4 w-4 mr-2" />
              Atendente
            </Button>
            <Button
              variant={viewMode === 'manager' ? 'default' : 'outline'}
              onClick={() => setViewMode('manager')}
              size="sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Gerente
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {viewMode === 'attendant' ? (
          <AttendantDashboard />
        ) : (
          <ManagerDashboard />
        )}
      </div>
    </div>
  );
};

export default Index;
