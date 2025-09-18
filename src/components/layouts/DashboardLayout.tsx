import { useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  Menu,
  Bell,
  Search,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Atendimento", href: "/dashboard", icon: MessageSquare, current: true },
  { name: "Relatórios", href: "/reports", icon: BarChart3, current: false },
  { name: "Equipe", href: "/team", icon: Users, current: false },
  { name: "Configurações", href: "/settings", icon: Settings, current: false },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">MedChat</h1>
                <p className="text-xs text-sidebar-foreground/60">Sistema Omnichannel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/dashboard" && location.pathname === "/");
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {item.name === "Atendimento" && (
                    <Badge className="ml-auto bg-primary text-primary-foreground">
                      12
                    </Badge>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  João Silva
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  Atendente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  className="pl-10 bg-muted border-0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}