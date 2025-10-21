import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, FolderOpen, Search, Users, Brain, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Layout = () => {
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const allMenuItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/arsip", label: "Arsip Pasien", icon: FolderOpen },
    { path: "/pencarian", label: "Pencarian Global", icon: Search },
    { path: "/users", label: "Manajemen User", icon: Users, adminOnly: true },
  ];

  const menuItems = allMenuItems.filter(item => !item.adminOnly || isAdmin());

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="flex items-center gap-3 px-4 py-6 border-b border-border">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-soft">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        {!isSidebarCollapsed && (
          <div>
            <h2 className="font-bold text-foreground text-lg">PsiArsip</h2>
            <p className="text-xs text-muted-foreground">Klinik Psikologi</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 rounded-lg transition-all ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-background w-full">
      <aside className={`hidden lg:flex lg:flex-col transition-all ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}>
        <SidebarContent />
      </aside>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 z-50 lg:hidden transition-transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} className="lg:hidden">
              {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden lg:flex">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">PsiArsip</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {user?.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <span className="text-sm font-medium hidden md:block">{user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="gap-2 text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gradient-soft">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
