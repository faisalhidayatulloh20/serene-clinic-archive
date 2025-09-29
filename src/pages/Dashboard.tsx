import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Clock, 
  Heart,
  Brain,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalPasien: 245,
    sesiKonseling: 156,
    arsipBaru: 23,
    psikolog: 8
  });

  const recentActivities = [
    {
      id: 1,
      patient: "Maria Santos",
      action: "Sesi konseling selesai",
      time: "2 jam lalu",
      type: "session"
    },
    {
      id: 2,
      patient: "Ahmad Rahman",
      action: "Arsip baru ditambahkan",
      time: "4 jam lalu",
      type: "archive"
    },
    {
      id: 3,
      patient: "Siti Nurhaliza",
      action: "Diagnosis diperbarui",
      time: "6 jam lalu",
      type: "update"
    },
    {
      id: 4,
      patient: "Budi Santoso",
      action: "Jadwal konseling terjadwal",
      time: "1 hari lalu",
      type: "schedule"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Lisa Permata",
      time: "10:00",
      type: "Konseling Individual",
      status: "confirmed"
    },
    {
      id: 2,
      patient: "Robert Chen",
      time: "14:30",
      type: "Tes Psikologi",
      status: "pending"
    },
    {
      id: 3,
      patient: "Diana Sari",
      time: "16:00",
      type: "Follow-up",
      status: "confirmed"
    }
  ];

  const StatCard = ({ title, value, icon: Icon, description, trend, color }: any) => (
    <Card className="shadow-card border-0 hover:shadow-hover transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-success mr-1" />
            <span className="text-xs text-success">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali, Dr. John Doe</p>
        </div>
        <Button 
          onClick={() => navigate("/arsip/tambah")}
          className="bg-gradient-primary hover:shadow-hover transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Arsip Pasien
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pasien"
          value={stats.totalPasien}
          icon={Users}
          description="Pasien terdaftar"
          trend="+12% dari bulan lalu"
          color="text-primary"
        />
        <StatCard
          title="Sesi Konseling"
          value={stats.sesiKonseling}
          icon={Brain}
          description="Sesi bulan ini"
          trend="+8% dari bulan lalu"
          color="text-secondary"
        />
        <StatCard
          title="Arsip Baru"
          value={stats.arsipBaru}
          icon={FileText}
          description="Minggu ini"
          trend="+23% dari minggu lalu"
          color="text-accent"
        />
        <StatCard
          title="Psikolog Aktif"
          value={stats.psikolog}
          icon={Heart}
          description="Tim psikolog"
          color="text-info"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Aksi Cepat
            </CardTitle>
            <CardDescription>Shortcut untuk aksi yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 border-primary/20 hover:bg-primary/5"
              onClick={() => navigate("/arsip/tambah")}
            >
              <Plus className="w-4 h-4" />
              Tambah Arsip Pasien
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 border-secondary/20 hover:bg-secondary/5"
              onClick={() => navigate("/pencarian")}
            >
              <FileText className="w-4 h-4" />
              Cari Arsip
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 border-accent/20 hover:bg-accent/5"
              onClick={() => navigate("/users/tambah")}
            >
              <Users className="w-4 h-4" />
              Tambah Psikolog
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>Aktivitas sistem terkini</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'session' ? 'bg-primary' :
                  activity.type === 'archive' ? 'bg-secondary' :
                  activity.type === 'update' ? 'bg-accent' : 'bg-info'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.patient}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Jadwal Hari Ini
            </CardTitle>
            <CardDescription>Sesi konseling terjadwal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{appointment.patient}</p>
                  <p className="text-xs text-muted-foreground">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                  <Badge 
                    variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {appointment.status === 'confirmed' ? 'Dikonfirmasi' : 'Menunggu'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Ringkasan Bulanan</CardTitle>
          <CardDescription>Target dan pencapaian bulan ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sesi Konseling</span>
                <span className="font-medium">156/200</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">78% dari target</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Arsip Baru</span>
                <span className="font-medium">23/30</span>
              </div>
              <Progress value={77} className="h-2" />
              <p className="text-xs text-muted-foreground">77% dari target</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kepuasan Pasien</span>
                <span className="font-medium">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-muted-foreground">96% rating positif</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;