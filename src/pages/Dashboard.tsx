import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck,
  Plus,
  Search,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();

  const diagnosisData = [
    { name: 'Depresi', count: 45, color: '#2563EB' },
    { name: 'Kecemasan', count: 38, color: '#60A5FA' },
    { name: 'Stress', count: 32, color: '#93C5FD' },
    { name: 'Trauma', count: 28, color: '#DBEAFE' },
    { name: 'Lainnya', count: 22, color: '#EFF6FF' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, description }: any) => (
    <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              {value}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-success" />
              {description}
            </p>
          </div>
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
            color
          )}>
            <Icon className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ActionCard = ({ title, description, icon: Icon, onClick }: any) => (
    <Card 
      className="shadow-card border-0 hover:shadow-elevation transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground text-lg">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Selamat datang kembali, Dr. John Doe</h1>
        <p className="text-muted-foreground">Berikut adalah ringkasan sistem arsip hari ini</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Pasien"
          value="245"
          icon={Users}
          color="bg-gradient-primary"
          description="+12% dari bulan lalu"
        />
        <StatCard
          title="Dokter Aktif"
          value="3"
          icon={UserCheck}
          color="bg-gradient-secondary"
          description="Dr. Tanti, Dr. Lina, Admin"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ActionCard
            title="Tambah Arsip"
            description="Buat arsip pasien baru"
            icon={Plus}
            onClick={() => navigate("/arsip")}
          />
          <ActionCard
            title="Pencarian Arsip"
            description="Cari arsip pasien dengan cepat"
            icon={Search}
            onClick={() => navigate("/pencarian")}
          />
        </div>
      </div>

      {/* Chart Section */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-xl">Diagnosa Terbanyak</CardTitle>
          <CardDescription>Statistik diagnosa pasien bulan ini</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diagnosisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-card)'
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {diagnosisData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Dashboard;
