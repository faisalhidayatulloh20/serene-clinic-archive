import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ArsipPasien from "./pages/ArsipPasien";
import Pencarian from "./pages/Pencarian";
import DetailArsip from "./pages/DetailArsip";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/arsip" element={<ArsipPasien />} />
            <Route path="/arsip/:id" element={<DetailArsip />} />
            <Route path="/pencarian" element={<Pencarian />} />
            <Route path="/users" element={<div className="p-6"><h1 className="text-2xl font-bold">Manajemen User</h1><p className="text-muted-foreground">Halaman manajemen user akan segera tersedia</p></div>} />
            <Route path="/pengaturan" element={<div className="p-6"><h1 className="text-2xl font-bold">Pengaturan</h1><p className="text-muted-foreground">Halaman pengaturan akan segera tersedia</p></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
