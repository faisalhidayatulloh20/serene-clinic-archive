import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FolderOpen, UserCheck, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const statsData = [
    { title: "Total Pasien", value: "45", icon: Users, color: "text-blue-500" },
    { title: "Total Arsip", value: "3", icon: FolderOpen, color: "text-green-500" },
    { title: "Total Dokter", value: "5", icon: UserCheck, color: "text-purple-500" },
  ];

  const chartData = [
    { name: "Cemas", value: 12 },
    { name: "Depresi", value: 10 },
    { name: "Stres", value: 8 },
    { name: "PTSD", value: 6 },
    { name: "Panik", value: 5 },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Selamat datang, {user?.role === 'admin' ? 'Admin' : 'Dokter'}!
        </h1>
        <p className="text-muted-foreground">Berikut adalah ringkasan aktivitas klinik Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300 cursor-pointer hover:scale-105" onClick={() => navigate("/arsip")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Manajemen Arsip</CardTitle>
                  <CardDescription>Kelola arsip pasien</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300 cursor-pointer hover:scale-105" onClick={() => navigate("/pencarian")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Pencarian Pasien</CardTitle>
                  <CardDescription>Cari data pasien dengan cepat</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Distribusi Diagnosa</CardTitle>
          <CardDescription>5 diagnosa pasien teratas di klinik</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
