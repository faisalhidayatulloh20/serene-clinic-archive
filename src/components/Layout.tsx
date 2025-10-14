import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Brain, BarChart3, FileText, Search, Users, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "Arsip Pasien", path: "/arsip" },
    { icon: Search, label: "Pencarian Arsip", path: "/pencarian" },
    { icon: Users, label: "Manajemen User", path: "/users" },
  ];

  const userName = "Dr. John Doe";

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo Section */}
      <div className={cn(
        "flex items-center gap-3 p-6 border-b border-border transition-all duration-300",
        sidebarCollapsed && !isMobile && "justify-center px-2"
      )}>
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        {(!sidebarCollapsed || isMobile) && (
          <div className="overflow-hidden">
            <h2 className="font-semibold text-foreground whitespace-nowrap">Fideya Psikologi</h2>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Sistem Arsip</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-soft hover:bg-primary-dark" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
                sidebarCollapsed && !isMobile && "justify-center px-0"
              )}
              onClick={() => {
                navigate(item.path);
                setMobileSidebarOpen(false);
              }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {(!sidebarCollapsed || isMobile) && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Toggle Button - Desktop Only */}
      {!isMobile && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-center"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex lg:flex-col transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-50 lg:hidden transition-transform duration-300 ease-in-out",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent isMobile />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border shadow-card z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Search Bar */}
              <div className="relative hidden sm:block flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari arsip pasien..."
                  className="pl-10 bg-muted/50 border-border focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="font-medium text-foreground">{userName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-soft">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
