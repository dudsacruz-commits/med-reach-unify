import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  gradient?: boolean;
}

export function MetricsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  description,
  icon: Icon,
  gradient = false
}: MetricsCardProps) {
  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-accent';
      case 'decrease':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={`shadow-soft hover:shadow-medium transition-shadow ${
      gradient ? 'bg-gradient-primary text-primary-foreground' : ''
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${
          gradient ? 'text-primary-foreground/90' : 'text-muted-foreground'
        }`}>
          {title}
        </CardTitle>
        {Icon && (
          <Icon className={`h-4 w-4 ${
            gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {value}
        </div>
        <div className="flex items-center justify-between">
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-xs ${
              gradient ? 'text-primary-foreground/80' : getTrendColor()
            }`}>
              {getTrendIcon()}
              <span>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
          {description && (
            <p className={`text-xs ${
              gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}