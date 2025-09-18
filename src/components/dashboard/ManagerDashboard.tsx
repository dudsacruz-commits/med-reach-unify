import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsCard } from "./MetricsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Timer,
  Target,
  Star,
  Activity
} from "lucide-react";

const teamPerformance = [
  {
    id: 1,
    name: "João Silva",
    avatar: "/placeholder-avatar.jpg",
    conversations: 24,
    avgResponseTime: "2.5 min",
    satisfaction: 4.8,
    status: "online",
    completionRate: 92
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "/placeholder-avatar.jpg",
    conversations: 18,
    avgResponseTime: "3.1 min",
    satisfaction: 4.6,
    status: "busy",
    completionRate: 88
  },
  {
    id: 3,
    name: "Carlos Lima",
    avatar: "/placeholder-avatar.jpg",
    conversations: 31,
    avgResponseTime: "1.8 min",
    satisfaction: 4.9,
    status: "online",
    completionRate: 95
  },
  {
    id: 4,
    name: "Ana Costa",
    avatar: "/placeholder-avatar.jpg",
    conversations: 15,
    avgResponseTime: "4.2 min",
    satisfaction: 4.3,
    status: "away",
    completionRate: 78
  }
];

const recentActivity = [
  {
    id: 1,
    type: "resolved",
    message: "João Silva resolveu conversa com Maria Oliveira",
    time: "2 min atrás",
    icon: CheckCircle,
    color: "text-accent"
  },
  {
    id: 2,
    type: "escalated",
    message: "Conversa escalada para supervisor - Paciente Pedro Silva",
    time: "5 min atrás",
    icon: AlertCircle,
    color: "text-warning"
  },
  {
    id: 3,
    type: "assigned",
    message: "Nova conversa atribuída para Maria Santos",
    time: "8 min atrás",
    icon: MessageSquare,
    color: "text-primary"
  },
  {
    id: 4,
    type: "completed",
    message: "Carlos Lima completou 5 atendimentos seguidos",
    time: "12 min atrás",
    icon: Target,
    color: "text-accent"
  }
];

export function ManagerDashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Conversas Ativas"
          value={47}
          change={12}
          changeType="increase"
          description="últimas 24h"
          icon={MessageSquare}
          gradient
        />
        <MetricsCard
          title="Tempo Médio de Resposta"
          value="2.8 min"
          change={-8}
          changeType="increase"
          description="meta: < 3 min"
          icon={Timer}
        />
        <MetricsCard
          title="Taxa de Resolução"
          value="89%"
          change={5}
          changeType="increase"
          description="este mês"
          icon={CheckCircle}
        />
        <MetricsCard
          title="Satisfação do Cliente"
          value="4.7"
          change={3}
          changeType="increase"
          description="de 5.0"
          icon={Star}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Performance */}
        <Card className="lg:col-span-2 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Desempenho da Equipe</span>
              </div>
              <Button variant="outline" size="sm">
                Ver Detalhes
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {teamPerformance.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-accent' :
                          member.status === 'busy' ? 'bg-warning' : 'bg-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{member.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{member.conversations} conversas</span>
                          <span>⏱️ {member.avgResponseTime}</span>
                          <span>⭐ {member.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{member.completionRate}%</span>
                        <Badge variant={member.completionRate >= 90 ? 'default' : 'secondary'}>
                          {member.completionRate >= 90 ? 'Excelente' : 'Bom'}
                        </Badge>
                      </div>
                      <Progress value={member.completionRate} className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Real-time Activity */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Atividade Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`h-8 w-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Users className="h-4 w-4 mr-2" />
              Redistribuir Filas
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Ver Escalações
            </Button>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Configurar SLA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}